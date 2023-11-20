import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

import { Constants } from "../../constants";

/**
 * Middleware to authenticate user using jwt token
 *
 * @export
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.Next} next
 * @returns void
 */

export function auth() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.headers || !req.headers.authorization) {
        throw new Error("authorization is not provided");
      }

      let token = null;
      const parts: string[] = req.headers.authorization.split(" ");
      if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
        [, token] = parts;
      }

      if (!token) {
        throw new Error("token is not provided");
      }
      const decoded = jwt.verify(token, Constants.SECRET_TOKEN) as any;
      // @ts-ignore
      req.user = {
        email: decoded.userEmail,
        profileType: decoded.userProfileType,
        id: decoded.userId,
      };
      return next();
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  };
}
