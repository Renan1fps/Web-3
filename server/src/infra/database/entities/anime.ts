import { Column, Entity } from "typeorm";

import Base from "./base";

@Entity("animes")
export class AnimeEntity extends Base {

  @Column({ name: "str_name" })
  public name?: string;

  @Column({ name: "str_description" })
  public description?: string;

  @Column({ name: "str_url" })
  public url?: string;
}
