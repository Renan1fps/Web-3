import { AnimeEntity } from "../repository-protocols";


export interface AnimeRepositoryInterface {
  create: (data: AnimeEntity) => Promise<AnimeEntity>;
  select: (where: WhereAnime, relations?: string[]) => Promise<AnimeEntity | null>;
  selectById: (id: string, relations?: string[]) => Promise<AnimeEntity | null>;
  update: (id: string, data: AnimeEntity) => Promise<AnimeEntity>;
  selectMany: (where: WhereAnime, relations?: string[]) => Promise<AnimeEntity[]>;
  softDeleteById: (id: string, user: AnimeEntity) => Promise<void>;
}

export type WhereAnime = {
  createdAt?: Date;
  createdBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  id?: string;
  name?: string;
  description?: string;
}

export type SelectOptions = {
  [key: string]: { [key: string]: boolean | { [key: string]: boolean } } | boolean,
}