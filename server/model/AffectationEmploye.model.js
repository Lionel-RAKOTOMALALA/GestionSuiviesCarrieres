import mongoose from "mongoose";

const { Schema } = mongoose;

export const AffectationEmployeSchema = new Schema({
    id_affectation: {
        type: Number,
        required: [true, "Please provide assignment ID"],
        unique: [true, "Assignment ID exists"]
    },
    date_affectation: {
        type: Date,
        required: [true, "Please provide assignment date"],
    },
    id_employe: {
        type: Number,
        required: [true, "Please provide employee ID"],
    },
    id_service: {
        type: Number,
        required: [true, "Please provide service ID"],
    },
    id_poste: {
        type: Number,
        required: [true, "Please provide post ID"],
    }
});

export default mongoose.models.AffectationEmploye || mongoose.model('AffectationEmploye', AffectationEmployeSchema);
