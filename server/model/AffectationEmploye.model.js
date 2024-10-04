import mongoose from "mongoose";

const { Schema } = mongoose;

const AffectationEmployeSchema = new Schema({
    date_affectation: {
        type: Date,
        required: [true, "Please provide the assignment date"],
    },
    id_service: {
        type: mongoose.Schema.Types.ObjectId,  // Utilisation d'ObjectId pour les relations
        ref: "Service",
        required: true
    },
    id_poste: {
        type: mongoose.Schema.Types.ObjectId,  // Utilisation d'ObjectId pour les relations
        ref: "Poste",
        required: true
    },
    id_employe: {
        type: mongoose.Schema.Types.ObjectId,  // Référence à l'employé avec ObjectId
        ref: "User",
        required: true
    }
});

export default mongoose.models.AffectationEmploye || mongoose.model('AffectationEmploye', AffectationEmployeSchema);
