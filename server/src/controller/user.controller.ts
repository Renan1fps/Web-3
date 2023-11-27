import { UserService } from "../service/user.service";
import { Request, Response } from "express";

export class UserController {
    static userService = UserService;
  
    static async auth(req: Request, res: Response) {
      let response;
      try {
        const data = req.body;        
        response = await this.userService.auth(data)
      } catch (err: any) {
        console.log(err);
        res.status(500).json({ err: err.message });
      }
      return res.status(200).json(response);
    }

    static async create(req: Request, res: Response) {
      let response;
      try {
        const user = req.body;
        response = await this.userService.create(user);
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
        response = await this.userService.getById(id);
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
        console.log("BVODYYYY", body);
        
        response = await this.userService.update(id, body);
      } catch (err: any) {
        console.log(err);
        res.status(500).json({ err: err.message });
      }
      return res.status(200).json(response);
    }
  
    static async getAll(req: Request, res: Response) {
      let response;
      try {
        response = await this.userService.getAll()
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
        response = await this.userService.delete(id)
      } catch (err: any) {
        console.log(err);
        res.status(500).json({ err: err.message });
      }
      return res.status(200).json(response);
    }
}