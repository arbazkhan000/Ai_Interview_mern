import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import dbConnect from "./src/Db/dbConnect.js";
dotenv.config();

const app = express();

const allowedOrigins = [
    process.env.CLIENT_PORT || "http://localhost:5173",
    "http://localhost:5173", 
    "http://localhost:3000", 
    "https://ai-interview-mern.vercel.app", 
];

app.use(
    cors({
        origin: function (origin, callback) {
           
            if (!origin) return callback(null, true);
            
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            } else {
                return callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// impoting routes

import userRouter from "./src/routes/user.routes.js";
import sessionsRoutes from "./src/routes/session.routes.js";

// use Routes
app.use("/api/v1", userRouter);
app.use("/api/v1/sessions", sessionsRoutes);



app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Interview Perpration",
        success: true,
    });
});

const ServerStart = async () => {
    try {
        const port = process.env.PORT || 3003;
        await app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
        await dbConnect();
    } catch (error) {
        console.log(error, "Server not started");
    }
};

ServerStart();
