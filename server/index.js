import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import dbConnect from "./src/Db/dbConnect.js";
dotenv.config();

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_PORT || "http://localhost:5000",
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
        const port = process.env.PORT || 5000;
        await app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
        await dbConnect();
    } catch (error) {
        console.log(error, "Server not started");
    }
};

ServerStart();
