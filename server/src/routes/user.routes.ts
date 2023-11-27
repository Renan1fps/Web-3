import { UserController } from "../controller/user.controller";
import { Router } from "express";

export const userRoutes = Router();

userRoutes.post("/auth", async (req, res) => UserController.auth(req, res));

userRoutes.post("/users", async (req, res) => UserController.create(req, res));
userRoutes.get("/users", async (req, res) => UserController.getAll(req, res));
userRoutes.get("/users/:id", async (req, res) => UserController.getById(req, res));
userRoutes.put("/users/:id", async (req, res) => UserController.update(req, res));
userRoutes.delete("/users/:id", async (req, res) => UserController.delete(req, res));