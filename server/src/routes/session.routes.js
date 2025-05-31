import express from "express";
import SessionsController from "../controllers/Session.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const sessionsRoutes = express.Router();

sessionsRoutes
    .route("/create")
    .post(authMiddleware, SessionsController.createSession);
sessionsRoutes
    .route("/my-sessions")
    .get(authMiddleware, SessionsController.getMySessions);
sessionsRoutes
    .route("/:id")
    .get(authMiddleware, SessionsController.getSessionById);
sessionsRoutes
    .route("/:id")
    .delete(authMiddleware, SessionsController.deleteSession);

export default sessionsRoutes;
