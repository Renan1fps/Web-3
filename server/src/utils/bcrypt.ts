import { Constants } from "../constants";
import { sign } from "jsonwebtoken";

export class BcryptAdapter {
	generateToken(params: any): { token: string; refreshToken: string } {
		const token = sign(params, Constants.SECRET_TOKEN, { expiresIn: "4h" });
		const refreshToken = sign(params, Constants.SECRET_REFRESH_TOKEN, { expiresIn: "4h" });

		return {
			token,
			refreshToken,
		};
	}

	verifyToken: (token: string) => boolean;
}
