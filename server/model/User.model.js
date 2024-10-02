import mongoose from "mongoose";

const { Schema } = mongoose; // Extraire Schema depuis mongoose

export const UserSchema = new Schema({
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
    },
    nom: {
        type: String,
    },
    mobile: {
        type: Number,
        match: [/\d{10}/, "Please provide a valid 10-digit mobile number"],
    },
    profile: {
        type: String,
    },
    address: {
        type: String,
    },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
