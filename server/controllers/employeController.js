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
