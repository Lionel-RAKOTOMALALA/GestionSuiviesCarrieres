import mongoose from "mongoose";

const { Schema } = mongoose;

// Définition du schéma HistoriqueCarriere
const HistoriqueCarriereSchema = new Schema({
    id_employe: {
        type: mongoose.Schema.Types.ObjectId,  // Référence à l'employé avec ObjectId
        ref: "Employe",  // Référence à la collection Employe
        required: true
    },
    poste_et_fonction: {
        type: String,  // Poste et fonction au moment de l'événement
        required: [true, "Please provide the position and function"],
        maxlength: [255, "Position and function cannot exceed 255 characters"]
    },
    date_debut_poste: {
        type: Date,  // Date de début du poste
        required: [true, "Please provide the start date of the position"]
    },
    date_fin_poste: {
        type: Date,  // Date de fin du poste (nullable)
        default: null  // Ce champ peut être null s'il n'y a pas de date de fin
    },
    numero_decision: {
        type: String,  // Numéro de la décision associée
        required: [true, "Please provide the decision number"],
        maxlength: [255, "Decision number cannot exceed 255 characters"]
    },
    date_decision: {
        type: Date,  // Date de la décision associée
        required: [true, "Please provide the decision date"]
    },
    obs: {
        type: String,  // Observations spécifiques
        maxlength: [500, "Observations cannot exceed 500 characters"],
        default: null  // Ce champ peut être null
    }
}, { timestamps: true });  // Ajout de createdAt et updatedAt automatiquement

export default mongoose.models.HistoriqueCarriere || mongoose.model('HistoriqueCarriere', HistoriqueCarriereSchema);
