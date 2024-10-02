import mongoose from "mongoose";

const { Schema } = mongoose;

export const JournalDesActionsSchema = new Schema({
    id_action: {
        type: Number,
        required: [true, "Please provide action ID"],
        unique: [true, "Action ID exists"]
    },
    action: {
        type: String,
        required: [true, "Please provide action description"],
    },
    date_action: {
        type: Date,
        required: [true, "Please provide action date"],
    },
    id_utilisateur: {
        type: Number,
        required: [true, "Please provide user ID"],
    }
});

export default mongoose.models.JournalDesActions || mongoose.model('JournalDesActions', JournalDesActionsSchema);
