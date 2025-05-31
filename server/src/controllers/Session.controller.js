import Session from "../models/session.schema.js";
import getInterviewQA from "../utils/AiService.js";

const SessionsController = {
    createSession: async (req, res) => {
        try {
            const { role, experience, topicToFocus, description } = req.body;
            const userId = req.user;

            if (!role || !experience || !topicToFocus || !description) {
                return res.status(400).json({
                    message: "All fields are required",
                    success: false,
                });
            }

            const output = await getInterviewQA({
                role,
                experience,
                topicToFocus,
                description,
            });

            if (
                !Array.isArray(output) ||
                output.some((q) => !q.question || !q.answer)
            ) {
                return res.status(400).json({
                    message: "AI output format is invalid",
                    success: false,
                });
            }

            const newSession = await Session.create({
                userId,
                role,
                experience,
                topicToFocus,
                description,
                questions: output, 
            });

            return res.status(201).json({
                message: "Session created",
                success: true,
                newSession,
            });
        } catch (error) {
            console.error("Error in createSession:", error);
            return res.status(500).json({
                message: "Internal Server Error",
                success: false,
            });
        }
    },

    getMySessions: async (req, res) => {
        try {
            const userId = req.user;
            console.log("Fetching sessions for user:", userId);

            const sessions = await Session.find({ userId }).sort({
                createdAt: -1,
            });

            const totalSessions = sessions.length;

            return res.status(200).json({
                message: "Sessions fetched",
                success: true,
                sessions,
                total: totalSessions,
            });
        } catch (error) {
            console.error("Error in getMySessions:", error);
            return res.status(500).json({
                message: "Internal Server Error",
                success: false,
            });
        }
    },

    getSessionById: async (req, res) => {
        try {
            const userId = req.user;
            const { id } = req.params;

            const session = await Session.findOne({ _id: id, userId });

            if (!session) {
                return res.status(404).json({
                    message: "Session not found",
                    success: false,
                });
            }

            return res.status(200).json({
                message: "Session fetched",
                success: true,
                session,
            });
        } catch (error) {
            console.error("Error in getSessionById:", error);
            return res.status(500).json({
                message: "Internal Server Error",
                success: false,
            });
        }
    },

    deleteSession: async (req, res) => {
        try {
            const userId = req.user;
            const { id } = req.params;

            const session = await Session.findOneAndDelete({
                _id: id,
                userId,
            });

            if (!session) {
                return res.status(404).json({
                    message: "Session not found or already deleted",
                    success: false,
                });
            }

            return res.status(200).json({
                message: "Session deleted successfully",
                success: true,
            });
        } catch (error) {
            console.error("Error in deleteSession:", error);
            return res.status(500).json({
                message: "Internal Server Error",
                success: false,
            });
        }
    },
};

export default SessionsController;
