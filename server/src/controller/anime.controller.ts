import { AnimeService } from "../service/anime.service";
import { Request, Response } from "express";

export class AnimeController {
  static animeService = AnimeService;

  static async create(req: Request, res: Response) {
    let response;
    try {
      const anime = req.body;
      response = await this.animeService.create(anime);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ err: err.message });
    }
    return res.status(200).json(response);
  }

  static async getById(req: Request, res: Response) {
    let response;
    try {
      const id = req.params.id;
      response = await this.animeService.getById(id);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ err: err.message });
    }
    return res.status(200).json(response);
  }

  static async update(req: Request, res: Response) {
    let response;
    try {
      const id = req.params.id;
      const body = req.body;
      console.log('BODY', req.body);
      
      response = await this.animeService.update(id, body);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ err: err.message });
    }
    return res.status(200).json(response);
  }

  static async getAll(req: Request, res: Response) {
    let response;
    try {
      console.log('REQ', req.query)
      response = await this.animeService.getAll(req.query)
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ err: err.message });
    }
    return res.status(200).json(response);
  }

  static async delete(req: Request, res: Response) {
    let response;
    try {
        const id = req.params.id
      response = await this.animeService.delete(id)
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ err: err.message });
    }
    return res.status(200).json(response);
  }
}
