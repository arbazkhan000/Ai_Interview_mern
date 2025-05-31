import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res
                .status(401)
                .json({ message: "No token provided", success: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.userId;
        next();
    } catch (error) {
        return res.status(403).json({
            message: "Invalid or expired token",
            success: false,
            error: error.message,
        });
    }
};
