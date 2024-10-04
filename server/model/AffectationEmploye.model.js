import mongoose from "mongoose";

const { Schema } = mongoose;

// Définition du schéma AffectationEmploye
const AffectationEmployeSchema = new Schema({
    id_employe: {
        type: mongoose.Schema.Types.ObjectId,  // Référence à l'employé avec ObjectId
        ref: "Employe",  // Référence à la collection Employe
        required: true
    },
    id_poste: {
        type: mongoose.Schema.Types.ObjectId,  // Référence au poste avec ObjectId
        ref: "Poste",  // Référence à la collection Poste
        required: true
    },
    date_entree_admin: {
        type: Date,  // Date d'entrée dans l'administration
        required: [true, "Please provide the entry date to administration"]
    },
    date_prise_service: {
        type: Date,  // Date de prise de service
        required: [true, "Please provide the service start date"]
    },
    lieu_affectation: {
        type: String,  // Lieu d'affectation
        required: [true, "Please provide the place of assignment"],
        maxlength: [255, "Place of assignment cannot exceed 255 characters"]
    },
    motif_depart_arrivee: {
        type: String,  // Motif de départ ou d'arrivée
        required: [true, "Please provide the reason for departure or arrival"],
        maxlength: [500, "Reason cannot exceed 500 characters"]
    },
    direction_srsp: {
        type: String,  // Direction ou SRSP
        maxlength: [255, "Direction or SRSP cannot exceed 255 characters"]
    }
}, { timestamps: true });  // Ajout de createdAt et updatedAt automatiquement

export default mongoose.models.AffectationEmploye || mongoose.model('AffectationEmploye', AffectationEmployeSchema);
