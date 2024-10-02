import mongoose from "mongoose";

const { Schema } = mongoose;

export const DiplomeSchema = new Schema({
    id_diplome: {
        type: Number,
        required: [true, "Please provide diploma ID"],
        unique: [true, "Diploma ID exists"]
    },
    libelle: {
        type: String,
        required: [true, "Please provide diploma label"],
    },
    date_obtention: {
        type: Date,
        required: [true, "Please provide date of obtaining the diploma"],
    },
    etablissement: {
        type: String,
        required: [true, "Please provide the name of the institution"],
    },
    id_employe: {
        type: Number,
        required: [true, "Please provide employee ID"],
    }
});

export default mongoose.models.Diplome || mongoose.model('Diplome', DiplomeSchema);
