import { BcryptAdapter } from "../utils/bcrypt";
import { UserRepository } from "../infra/database/repositories";
import { Crypto } from "../utils/crypto";
import { v4 } from "uuid";

export class UserService {
  static userRepository = new UserRepository();
  static crypto = new Crypto();
  static bcrypt = new BcryptAdapter();

  static async auth(user: {
    email: string;
    password?: string;
    authType: string;
    name?: string;
  }) {
    const existsUser: any = await this.userRepository.select({
      email: user.email,
    });

    if (user.authType === 'google') {
      if (!existsUser) {
        const userCreated = await this.userRepository.create({
          id: v4(),
          name: user.name,
          email: user.email,
          profileType: 2,
        });
        return {
          ...this.generateTokens({ email: user.email, id: "", profileType: 2 }),
          id: userCreated.id,
        };
      } else {
        return {
          ...this.generateTokens({ email: user.email, id: "", profileType: 2 }),
          id: existsUser.id,
        };
      }
    }

    console.log("AAAAA", user.authType);
    if (user.authType === "api") {
      console.log("Entrou aqui");
      
      if (!existsUser) {
        throw new Error("User nor found");
      }

      console.log(this.crypto.encrypt(user.password as string));
      console.log(existsUser.password);
      

      if (
        existsUser &&
        existsUser.password !==
          this.crypto.encrypt(user.password as string)
      ) {
        throw new Error("Password incorrect");
      }

      return {
        ...this.generateTokens({
          email: user.email,
          id: existsUser?.id as string,
          profileType: existsUser?.profileType as number,
        }),
        id: existsUser?.id,
      };
    }

    throw new Error("")
  }

  private static generateTokens(user: {
    email: string;
    profileType: number;
    id: string;
  }) {
    const tokens = this.bcrypt.generateToken({
      userEmail: user.email,
      userProfileType: user.profileType,
      userId: user.id,
    });
    return tokens;
  }

  static async create(user: any) {
    const exists = await this.userRepository.select({ email: user.email });

    if (exists) {
      throw new Error("User already exists");
    }

    user.password = this.crypto.encrypt(user.password);

    console.log("USERRR", user);
    

    return this.userRepository.create(user);
  }

  static async getById(id: string) {
    const userExists = await this.userRepository.select({ id });

    if (!userExists) {
      throw new Error("User not found");
    }

    return userExists;
  }

  static async update(id: string, data: any) {
    const userExists = await this.userRepository.select({ id });

    if (!userExists) {
      throw new Error("User not found");
    }

    return this.userRepository.update(id, data);
  }

  static async getAll() {
    return this.userRepository.selectMany({});
  }

  static async delete(id: string) {
    const userExists = await this.userRepository.select({ id });

    if (!userExists) {
      throw new Error("Anime not found");
    }

    this.userRepository.softDeleteById(id, { deletedAt: new Date() });
  }
}
