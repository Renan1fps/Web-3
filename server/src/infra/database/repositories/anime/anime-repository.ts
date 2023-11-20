
import { Repository, } from "typeorm";
import {
	DatabaseProvider,
	AnimeEntity,
} from "../repository-protocols";
import { AnimeRepositoryInterface, WhereAnime } from "./anime-repository.interface";

export class AnimeRepository implements AnimeRepositoryInterface {
	private readonly repository: Repository<AnimeEntity>;

	constructor() {
		this.repository = DatabaseProvider.getRepository(AnimeEntity);
	}

	async create(anime: AnimeEntity): Promise<AnimeEntity> {
		const newAnime = this.repository.create(anime);
		const response = await this.repository.save(newAnime);

		return response;
	}

	async update(id: string, anime: AnimeEntity): Promise<AnimeEntity> {
		await this.repository.update(id, anime);
		const response = (await this.repository.findOneBy({ id })) as AnimeEntity;
		return response;
	}

	async softDeleteById(id: string, anime: AnimeEntity): Promise<void> {
		await this.repository.update({ id }, anime);
	}

	async select(where: WhereAnime, options?: string[]): Promise<AnimeEntity | null> {
		const response = await this.repository.findOne({
			where: { ...where },
			...(options && { relations: options })
		});

		return response;
	}

	async selectMany(where: WhereAnime, options?: string[]): Promise<AnimeEntity[]> {
		const response = await this.repository.find({
			where: { ...where },
			...(options && { relations: options }),
		});

		return response;
	}

	async selectById(id: string, options?: string[]): Promise<AnimeEntity | null> {
		const response = await this.repository.findOne({
			where: { id },
			...(options && { relations: options }),
		});

		return response;
	}
}
