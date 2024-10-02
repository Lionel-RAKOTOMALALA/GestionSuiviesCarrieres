import mongoose from "mongoose";

const { Schema } = mongoose;

export const NotificationSchema = new Schema({
    id_notification: {
        type: Number,
        required: [true, "Please provide notification ID"],
        unique: [true, "Notification ID exists"]
    },
    message: {
        type: String,
        required: [true, "Please provide notification message"],
    },
    date_envoi: {
        type: Date,
        required: [true, "Please provide sending date"],
    },
    id_employe: {
        type: Number,
        required: [true, "Please provide employee ID"],
    }
});

export default mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
