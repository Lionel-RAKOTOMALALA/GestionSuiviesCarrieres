import mongoose from "mongoose";

const { Schema } = mongoose;

export const PosteSchema = new Schema({
    id_poste: {
        type: Number,
        required: [true, "Please provide post ID"],
        unique: [true, "Post ID exists"]
    },
    libelle: {
        type: String,
        required: [true, "Please provide post label"],
    }
});

export default mongoose.models.Poste || mongoose.model('Poste', PosteSchema);

