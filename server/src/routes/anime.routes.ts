
import { AnimeController } from "../controller/anime.controller";
import { Router } from "express";

export const animesRoutes = Router();

animesRoutes.post("/animes", async (req, res) => AnimeController.create(req, res));
animesRoutes.get("/animes", async (req, res) => AnimeController.getAll(req, res));
animesRoutes.get("/animes/:id", async (req, res) => AnimeController.getById(req, res));
animesRoutes.put("/animes/:id", async (req, res) => AnimeController.update(req, res));
animesRoutes.delete("/animes/:id", async (req, res) => AnimeController.delete(req, res));
