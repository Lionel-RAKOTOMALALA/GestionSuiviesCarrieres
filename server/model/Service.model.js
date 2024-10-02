import mongoose from "mongoose";

const { Schema } = mongoose;

export const ServiceSchema = new Schema({
    id_service: {
        type: Number,
        required: [true, "Please provide service ID"],
        unique: [true, "Service ID exists"]
    },
    nom_service: {
        type: String,
        required: [true, "Please provide service name"],
    },
    description: {
        type: String,
    }
});

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
