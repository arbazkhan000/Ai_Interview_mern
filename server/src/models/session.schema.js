import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
});

const sessionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        experience: {
            type: String,
            required: true,
        },
        topicToFocus: {
            type: [String],
            required: true,
        },
        description: {
            type: String,
            maxlength: 500,
        },
        questions: [questionSchema],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true } 
);

export const Session = mongoose.model("Session", sessionSchema);

export default Session;
