import mongoose from "mongoose";

const { Schema } = mongoose; // Extraire Schema depuis mongoose

export const EmployeSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide unique username"],
        unique: [true, "Username Exist"]
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: [8, "Password must be at least 8 characters long"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Please provide valid email"],
        unique: [true, "Email already registered"],
        match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },
    prenom: {
        type: String,
        required: true, // Champ obligatoire
    },
    nom: {
        type: String,
        required: true, // Champ obligatoire
    },
    date_naissance: {
        type: Date, // Type Date pour la date de naissance
        required: true, // Champ obligatoire
    },
    age: {
        type: Number, // Type Number pour l'âge
        required: true, // Champ obligatoire
    },
    genre: {
        type: String,
        enum: ['M', 'F'], // M pour Masculin, F pour Féminin
        required: true, // Champ obligatoire
    },
    situation_matrimoniale: {
        type: String,
        enum: ['Célibataire', 'Marié(e)', 'Divorcé(e)', 'Veuf(ve)'], // Enum pour les statuts
        required: true, // Champ obligatoire
    },
    contact_personnel: {
        type: String,
        match: [/\d{10}/, "Please provide a valid 10-digit personal contact"], // Validation numéro
        required: true, // Champ obligatoire
    },
    contact_flotte: {
        type: String,
        match: [/\d{10}/, "Please provide a valid 10-digit flotte contact"], // Validation numéro
        required: true, // Champ obligatoire
    },
    profile: {
        type: String,
    },
    adresse: {
        type: String,
        required: true, // Champ obligatoire pour l'adresse postale
    },
    address: {
        type: String, // Conserver ce champ pour la compatibilité avec d'autres structures
    },
});

export default mongoose.models.Employe || mongoose.model('Employe', EmployeSchema);
