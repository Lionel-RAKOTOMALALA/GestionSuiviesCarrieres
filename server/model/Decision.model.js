import mongoose from "mongoose";

const { Schema } = mongoose;

export const DecisionSchema = new Schema({
    id_decision: {
        type: Number,
        required: [true, "Please provide decision ID"],
        unique: [true, "Decision ID exists"]
    },
    description: {
        type: String,
        required: [true, "Please provide a description of the decision"],
    },
    date_decision: {
        type: Date,
        required: [true, "Please provide the decision date"],
    },
    id_employe: {
        type: mongoose.Schema.Types.ObjectId, // Correction ici pour utiliser ObjectId
        ref: 'User', // Référence au modèle Employe
        required: [true, "Please provide employee ID"],
    }
});

export default mongoose.models.Decision || mongoose.model('Decision', DecisionSchema);
