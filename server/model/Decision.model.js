import mongoose from "mongoose";

const { Schema } = mongoose;

// Définition du schéma Decision
const DecisionSchema = new Schema({
    id_decision: {
        type: Number,
        required: [true, "Please provide decision ID"],
        unique: [true, "Decision ID exists"]
    },
    numero_decision: {
        type: String,
        required: [true, "Please provide the decision number"],
        maxlength: [255, "Decision number cannot exceed 255 characters"]
    },
    date_decision: {
        type: Date,
        required: [true, "Please provide the decision date"]
    },
    observations: {
        type: String,
        maxlength: [1000, "Observations cannot exceed 1000 characters"]
    },
    id_employe: {
        type: mongoose.Schema.Types.ObjectId, // Référence à l'employé avec ObjectId
        ref: 'User', // Référence au modèle User
        required: [true, "Please provide employee ID"]
    }
}, { timestamps: true });  // Ajout des timestamps pour suivi des créations et mises à jour

export default mongoose.models.Decision || mongoose.model('Decision', DecisionSchema);
