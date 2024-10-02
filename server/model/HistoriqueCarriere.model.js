import mongoose from "mongoose";

const { Schema } = mongoose;

export const HistoriqueCarriereSchema = new Schema({
    id_historique: {
        type: Number,
        required: [true, "Please provide career history ID"],
        unique: [true, "Career history ID exists"]
    },
    date_changement: {
        type: Date,
        required: [true, "Please provide date of change"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
    },
    id_employe: {
        type: Number,
        required: [true, "Please provide employee ID"],
    }
});

export default mongoose.models.HistoriqueCarriere || mongoose.model('HistoriqueCarriere', HistoriqueCarriereSchema);
