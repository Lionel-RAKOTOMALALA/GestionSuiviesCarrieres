import mongoose from 'mongoose';
import Employe from '../model/Employe.model.js';
import StatutEmploye from '../model/StatutEmploye.model.js';
import AffectationEmploye from '../model/AffectationEmploye.model.js';
import Diplome from '../model/Diplome.model.js';
import Decision from '../model/Decision.model.js';

export const ajouterNouvelEmploye = async (req, res) => {
  const { employeData, statutData, affectationData, diplomeData, decisionData } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Créer et sauvegarder l'employé
    const employe = new Employe(employeData);
    await employe.save({ session });

    // Créer et sauvegarder le statut de l'employé
    const statut = new StatutEmploye({ ...statutData, employeId: employe._id });
    await statut.save({ session });

    // Ajouter l'ID de l'employé à l'affectation avant de la sauvegarder
    const affectation = new AffectationEmploye({ 
      ...affectationData, 
      id_employe: employe._id // Utiliser l'ID de l'employé nouvellement créé
    });
    await affectation.save({ session });

    // Sauvegarder les informations de diplôme, si disponibles
    if (diplomeData) {
      const diplome = new Diplome({ 
        ...diplomeData, 
        id_employe: employe._id // Assigner l'ID employé
      });
      await diplome.save({ session });
    }

    // Sauvegarder les informations de décision, si disponibles
    if (decisionData) {
      const decision = new Decision({ 
        ...decisionData, 
        id_employe: employe._id // Assigner l'ID employé ici également
      });
      await decision.save({ session });
    }

    // Valider la transaction
    await session.commitTransaction();
    session.endSession();

    // Répondre avec succès
    res.status(201).json({ employe });
  } catch (error) {
    // Annuler la transaction en cas d'erreur
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: error.message });
  }
};

export const obtenirDetailsEmploye = async (req, res) => {
  const { employeId } = req.params;

  try {
    // Récupérer les informations de l'employé
    const employe = await Employe.findById(employeId);
    if (!employe) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }

    // Récupérer les informations liées à cet employé
    const statutEmploye = await StatutEmploye.findOne({ employeId });
    const affectationEmploye = await AffectationEmploye.findOne({ id_employe: employeId });
    const diplomesEmploye = await Diplome.find({ id_employe: employeId });
    const decisionsEmploye = await Decision.find({ id_employe: employeId });

    // Construire la réponse avec toutes les données
    const employeDetails = {
      employe,
      statut: statutEmploye,
      affectation: affectationEmploye,
      diplomes: diplomesEmploye,
      decisions: decisionsEmploye
    };

    // Envoyer la réponse avec toutes les données liées à l'employé
    res.status(200).json(employeDetails);

  } catch (error) {
    // En cas d'erreur, envoyer une réponse d'erreur
    res.status(500).json({ error: error.message });
  }
};
export const afficherTousLesEmployes = async (req, res) => {
  try {
    // 1. Récupérer la liste de tous les employés
    const employes = await Employe.find();

    // 2. Vérifier si des employés existent
    if (!employes || employes.length === 0) {
      return res.status(404).json({ message: 'Aucun employé trouvé' });
    }

    // 3. Pour chaque employé, récupérer les informations associées
    const employeDetails = await Promise.all(employes.map(async (employe) => {
      const statut = await StatutEmploye.findOne({ employeId: employe._id });
      const affectation = await AffectationEmploye.findOne({ id_employe: employe._id });
      const diplome = await Diplome.findOne({ id_employe: employe._id });
      const decision = await Decision.findOne({ id_employe: employe._id });

      // Retourner les détails de chaque employé
      return {
        employe,
        statut,
        affectation,
        diplome,
        decision,
      };
    }));

    // 4. Répondre avec les détails des employés
    res.status(200).json(employeDetails);
  } catch (error) {
    // En cas d'erreur, retourner une erreur 500 avec le message d'erreur
    res.status(500).json({ error: error.message });
  }
};
// Récupérer la liste d'affectations d'un employé, triée par date
export const afficherTousLesEmployesAvecAffectationsTriees = async (req, res) => {
  try {
    // 1. Récupérer la liste de tous les employés
    const employes = await Employe.find();

    // 2. Vérifier si des employés existent
    if (!employes || employes.length === 0) {
      return res.status(404).json({ message: 'Aucun employé trouvé' });
    }

    // 3. Pour chaque employé, récupérer les informations associées
    const employeDetails = await Promise.all(employes.map(async (employe) => {
      const affectations = await AffectationEmploye.find({ id_employe: "66ffb922c591580c4733bf34d" })
        .sort({ date_affectation: 1 }); // Tri par date d'affectation

      const diplome = await Diplome.findOne({ id_employe: employe._id });
      const decision = await Decision.findOne({ id_employe: employe._id });

      // Retourner les détails de chaque employé avec les affectations triées
      return {
        employe,
        affectations, // Inclure toutes les affectations triées
        diplome,
        decision,
      };
    }));

    // 4. Trier les employés par la date d'affectation de la première affectation
    const employeDetailsTriees = employeDetails.sort((a, b) => {
      const dateA = a.affectations.length > 0 ? a.affectations[0].date_affectation : new Date(0);
      const dateB = b.affectations.length > 0 ? b.affectations[0].date_affectation : new Date(0);
      return dateA - dateB;
    });

    // 5. Retourner les détails des employés avec leurs affectations triées
    res.status(200).json(employeDetailsTriees);
  } catch (error) {
    // Gérer les erreurs en renvoyant un message d'erreur
    res.status(500).json({ error: error.message });
  }
};
