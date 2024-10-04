import mongoose from "mongoose";

const { Schema } = mongoose;

// Définition du schéma JournalDesActions
const JournalDesActionsSchema = new Schema({
    id_log: {
        type: Number,
        required: [true, "Please provide log ID"],
        unique: [true, "Log ID exists"]
    },
    id_utilisateur: {
        type: mongoose.Schema.Types.ObjectId, // Référence à l'utilisateur (gestionnaire) avec ObjectId
        ref: 'User', // Référence au modèle User
        required: [true, "Please provide user ID"]
    },
    action: {
        type: String,
        required: [true, "Please provide action description"],
        maxlength: [255, "Action description cannot exceed 255 characters"]
    },
    date_action: {
        type: Date,
        required: [true, "Please provide action date"]
    },
    details: {
        type: String, // Utilisation de String pour des détails supplémentaires
        maxlength: [1000, "Details cannot exceed 1000 characters"]
    }
}, { timestamps: true });  // Ajout des timestamps pour suivi des créations et mises à jour

export default mongoose.models.JournalDesActions || mongoose.model('JournalDesActions', JournalDesActionsSchema);
