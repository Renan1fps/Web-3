import { UserEntity } from "../repository-protocols";


export interface UserRepositoryInterface {
  create: (data: UserEntity) => Promise<UserEntity>;
  select: (where: WhereUser, relations?: string[]) => Promise<UserEntity | null>;
  selectById: (id: string, relations?: string[]) => Promise<UserEntity | null>;
  update: (id: string, data: UserEntity) => Promise<UserEntity>;
  selectMany: (where: WhereUser, relations?: string[]) => Promise<UserEntity[]>;
  softDeleteById: (id: string, user: UserEntity) => Promise<void>;
}

export type WhereUser = {
  createdAt?: Date;
  createdBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  admission?: Date | string;
  birthdate?: Date | string;
  cellphone?: string;
  email?: string;
  id?: string;
  idCompany?: string;
  lastAccess?: Date | string;
  seniority?: number;
  name?: string;
  profilePictureUrl?: string;
  profileType?: number;
  isActive?: boolean;
  occupation?: number;
  idPosition?: string;
  idQuarter?: string;
  year?: number;
}

export type SelectOptions = {
  [key: string]: { [key: string]: boolean | { [key: string]: boolean } } | boolean,
}