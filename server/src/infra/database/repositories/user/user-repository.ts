
import { Repository, } from "typeorm";
import {
	DatabaseProvider,
	UserEntity,
} from "../repository-protocols";
import { UserRepositoryInterface, WhereUser } from "./user-repository.interface";

export class UserRepository implements UserRepositoryInterface {
	private readonly repository: Repository<UserEntity>;

	constructor() {
		this.repository = DatabaseProvider.getRepository(UserEntity);
	}

	async create(user: UserEntity): Promise<UserEntity> {
		const newUser = this.repository.create(user);
		const response = await this.repository.save(newUser);

		return response;
	}

	async update(id: string, user: UserEntity): Promise<UserEntity> {
		await this.repository.update(id, user);
		const response = (await this.repository.findOneBy({ id })) as UserEntity;
		return response;
	}

	async softDeleteById(id: string, user: UserEntity): Promise<void> {
		await this.repository.update({ id }, user);
	}

	async select(where: WhereUser, options?: string[]): Promise<UserEntity | null> {
		const response = await this.repository.findOne({
			where: { ...where },
			...(options && { relations: options })
		});

		return response;
	}

	async selectMany(where: WhereUser, options?: string[]): Promise<UserEntity[]> {
		const response = await this.repository.find({
			where: { ...where },
			...(options && { relations: options }),
		});

		return response;
	}

	async selectById(id: string, options?: string[]): Promise<UserEntity | null> {
		const response = await this.repository.findOne({
			where: { id },
			...(options && { relations: options }),
		});

		return response;
	}
}
