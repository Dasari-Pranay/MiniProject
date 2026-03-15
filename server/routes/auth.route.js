import express from "express";
import { registerUser, loginUser, googleAuth, logOut } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/google", googleAuth);
authRouter.get("/logout", logOut);

export default authRouter;