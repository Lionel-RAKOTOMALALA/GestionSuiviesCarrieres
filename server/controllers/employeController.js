import mongoose from 'mongoose';
import Employe from '../model/Employe.model.js';
import StatutEmploye from '../model/StatutEmploye.model.js';
import AffectationEmploye from '../model/AffectationEmploye.model.js';
import Diplome from '../model/Diplome.model.js';
import Decision from '../model/Decision.model.js';
import JournalDesActions from '../model/JournalDesActions.model.js';
import Notification from '../model/Notification.model.js';

// Fonction pour enregistrer les actions et les notifications
const enregistrerActionEtNotification = async (session, utilisateurId, action, message) => {
    const date_action = new Date(); // Créer automatiquement la date d'action
    const journalAction = new JournalDesActions({
        id_utilisateur: utilisateurId,
        action,
        date_action,
        details: `Action réalisée par l'utilisateur avec ID ${utilisateurId}`
    });

    const notification = new Notification({
        id_utilisateur: utilisateurId,
        type_alerte: "information", // Par exemple, une alerte de type "information"
        message_alerte: message,
        date_creation: new Date(), // Ajouter la date de création
        estVu: false // Initialiser à 'false', car la notification n'est pas encore vue
    });

    await journalAction.save({ session });
    await notification.save({ session });
};

// Ajouter un nouvel employé
export const ajouterNouvelEmploye = async (req, res) => {
    const { userId, username } = req.user; // Récupérer l'userId et le username de l'utilisateur connecté
    const { employe, statut, affectation, diplome, decision } = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Créer et sauvegarder l'employé
        const employeData = new Employe(employe);
        await employeData.save({ session });

        // Créer et sauvegarder le statut de l'employé
        const statutData = new StatutEmploye({ ...statut, id_employe: employeData._id });
        await statutData.save({ session });

        // Ajouter l'ID de l'employé à l'affectation avant de la sauvegarder
        const affectationData = new AffectationEmploye({
            ...affectation,
            id_employe: employeData._id
        });
        await affectationData.save({ session });

        // Sauvegarder les informations de diplôme, si disponibles
        if (diplome) {
            const diplomeData = new Diplome({
                ...diplome,
                id_employe: employeData._id
            });
            await diplomeData.save({ session });
        }

        // Sauvegarder les informations de décision, si disponibles
        if (decision) {
            const decisionData = new Decision({
                ...decision,
                id_employe: employeData._id
            });
            await decisionData.save({ session });
        }

        // Enregistrer l'action et la notification
        await enregistrerActionEtNotification(
            session,
            userId, // Passer l'ID de l'utilisateur connecté
            `Ajout de l'employé ${employe.nom} par ${username}`, // Action détaillée
            "Un nouvel employé a été ajouté." // Message de notification
        );

        // Valider la transaction
        await session.commitTransaction();
        session.endSession();

        // Répondre avec succès
        res.status(201).json({ employe: employeData });
    } catch (error) {
        // Annuler la transaction en cas d'erreur
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: error.message });
    }
};


// Obtenir les détails d'un employé
export const obtenirDetailsEmploye = async (req, res) => {
    const { employeId } = req.params;

    try {
        // Récupérer les informations de l'employé
        const employe = await Employe.findById(employeId);
        if (!employe) {
            return res.status(404).json({ message: "Employé non trouvé" });
        }

        // Récupérer les informations liées à cet employé
        const statutEmploye = await StatutEmploye.findOne({ id_employe: employeId });
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

// Afficher tous les employés
export const afficherTousLesEmployes = async (req, res) => {
    try {
        // Récupérer la liste de tous les employés
        const employes = await Employe.find();

        // Vérifier si des employés existent
        if (!employes || employes.length === 0) {
            return res.status(404).json({ message: 'Aucun employé trouvé' });
        }

        // Pour chaque employé, récupérer les informations associées
        const employeDetails = await Promise.all(employes.map(async (employe) => {
            const statut = await StatutEmploye.findOne({ id_employe: employe._id });
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

        // Répondre avec les détails des employés
        res.status(200).json(employeDetails);
    } catch (error) {
        // En cas d'erreur, retourner une erreur 500 avec le message d'erreur
        res.status(500).json({ error: error.message });
    }
};

// Récupérer la liste d'affectations d'un employé, triée par date
export const afficherTousLesEmployesAvecAffectationsTriees = async (req, res) => {
    try {
        // Récupérer la liste de tous les employés
        const employes = await Employe.find();

        // Vérifier si des employés existent
        if (!employes || employes.length === 0) {
            return res.status(404).json({ message: 'Aucun employé trouvé' });
        }

        // Pour chaque employé, récupérer les informations associées
        const employeDetails = await Promise.all(employes.map(async (employe) => {
            const affectations = await AffectationEmploye.find({ id_employe: employe._id })
                .sort({ date_prise_service: 1 }); // Tri par date de prise de service

            const diplome = await Diplome.findOne({ id_employe: employe._id });
            const decision = await Decision.findOne({ id_employe: employe._id });

            // Retourner les détails de chaque employé avec les affectations triées
            return {
                employe,
                affectations: affectations.length > 0 ? affectations : null,
                diplome: diplome || null,
                decision: decision || null,
            };
        }));

        // Trier les employés par la date de prise de service de la première affectation
        const employeDetailsTriees = employeDetails.sort((a, b) => {
            const dateA = a.affectations ? a.affectations[0].date_prise_service : new Date(0);
            const dateB = b.affectations ? b.affectations[0].date_prise_service : new Date(0);
            return dateA - dateB;
        });

        // Retourner les détails des employés avec leurs affectations triées
        res.status(200).json(employeDetailsTriees);
    } catch (error) {
        // Gérer les erreurs en renvoyant un message d'erreur
        res.status(500).json({ error: error.message });
    }
};
