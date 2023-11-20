import { UserController } from "../controller/user.controller";
import { Router } from "express";

export const userRoutes = Router();

userRoutes.post("/auth", async (req, res) => UserController.auth(req, res));