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
}