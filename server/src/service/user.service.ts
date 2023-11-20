import { BcryptAdapter } from "../utils/bcrypt";
import { UserRepository } from "../infra/database/repositories";
import { Crypto } from "../utils/crypto";

export class UserService {
  static userRepository = new UserRepository();
  static crypto = new Crypto();
  static bcrypt = new BcryptAdapter();

  static async auth(user: { email: string, password: string }) {
    const exists = await this.userRepository.select({ email: user.email });

    if (!exists || exists.password !== this.crypto.encrypt(user.password)) {
      throw new Error("Error");
    }

    const tokens = this.bcrypt.generateToken({
        userEmail: user.email,
        userProfileType: exists.profileType,
        userId: exists.id,
    });

    return tokens;
  }
}
