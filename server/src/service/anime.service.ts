import { AnimeRepository } from "../infra/database/repositories/anime";

export class AnimeService {
  static animeRepository = new AnimeRepository();

  static async create(anime: any) {
    const exists = await this.animeRepository.select({ name: anime.name });

    if (exists) {
      throw new Error("Anime already exists");
    }

    return this.animeRepository.create(anime);
  }

  static async getById(id: string) {
    const animeExists = await this.animeRepository.select({ id });

    if (!animeExists) {
      throw new Error("Anime not found");
    }

    return animeExists;
  }

  static async update(id: string, data: any) {
    const animeExists = await this.animeRepository.select({ id });

    if (!animeExists) {
      throw new Error("Anime not found");
    }

    if(data.popularity){
      data.popularity = data.popularity + animeExists.popularity;
    }

    return this.animeRepository.update(id, data);
  }

  static async getAll(searchParams: any) {
    return this.animeRepository.selectMany({}, undefined,  { ...searchParams });
  }

  static async delete(id: string) {
    const animeExists = await this.animeRepository.select({ id });

    if (!animeExists) {
      throw new Error("Anime not found");
    }

    this.animeRepository.softDeleteById(id, { deletedAt: new Date() });
  }
}
