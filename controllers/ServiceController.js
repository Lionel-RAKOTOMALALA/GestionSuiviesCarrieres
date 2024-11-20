import Service from "../model/Service.model.js"; // Assurez-vous que le chemin est correct

export const addService = async (req, res) => {
    try {
        // Extraction des données de la requête
        const { nom_service, antenne } = req.body;

        // Validation des champs obligatoires
        if (!nom_service) {
            return res.status(400).json({ error: "Le nom du service est obligatoire." });
        }

        // Création du nouveau service
        const newService = new Service({
            nom_service,
            antenne,
        });

        // Sauvegarde dans la base de données
        await newService.save();

        // Réponse en cas de succès
        return res.status(201).json({ message: "Service ajouté avec succès.", service: newService });
    } catch (error) {
        // Gestion des erreurs
        console.error("Erreur lors de l'ajout du service :", error);
        return res.status(500).json({ error: "Une erreur est survenue lors de l'ajout du service." });
    }
};
