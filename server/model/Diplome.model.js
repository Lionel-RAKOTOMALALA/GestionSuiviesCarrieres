import mongoose from "mongoose";

const { Schema } = mongoose;

// Définition du schéma Diplome
const DiplomeSchema = new Schema({
    id_diplome: {
        type: Number,
        required: [true, "Please provide diploma ID"],
        unique: [true, "Diploma ID exists"]
    },
    diplome: {
        type: String,
        required: [true, "Please provide the diploma obtained"],
        maxlength: [255, "Diploma name cannot exceed 255 characters"]
    },
    cursus: {
        type: String,
        required: [true, "Please provide the academic curriculum"],
        maxlength: [255, "Curriculum name cannot exceed 255 characters"]
    },
    diplome_libre: {
        type: String,
        maxlength: [255, "Libre diploma name cannot exceed 255 characters"]
    },
    filiere_libre: {
        type: String,
        maxlength: [255, "Libre field name cannot exceed 255 characters"]
    },
    id_employe: {
        type: mongoose.Schema.Types.ObjectId,  // Référence à l'employé avec ObjectId
        ref: 'User',  // Référence au modèle User
        required: [true, "Please provide employee ID"]
    }
}, { timestamps: true });  // Ajout des timestamps pour suivi des créations et mises à jour

export default mongoose.models.Diplome || mongoose.model('Diplome', DiplomeSchema);
