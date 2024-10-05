import mongoose from "mongoose";

const { Schema } = mongoose;


// Définition du schéma Diplome
const DiplomeSchema = new Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please provide employee ID"]
    }
}, { timestamps: true });

export default mongoose.models.Diplome || mongoose.model('Diplome', DiplomeSchema);
