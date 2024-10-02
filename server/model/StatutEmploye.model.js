import mongoose from "mongoose";

const { Schema } = mongoose;

export const StatutEmployeSchema = new Schema({
    id_statut: {
        type: Number,
        required: [true, "Please provide status ID"],
        unique: [true, "Status ID exists"]
    },
    libelle: {
        type: String,
        required: [true, "Please provide status label"],
    }
});

export default mongoose.models.StatutEmploye || mongoose.model('StatutEmploye', StatutEmployeSchema);
