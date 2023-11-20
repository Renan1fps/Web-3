import { Column, Entity } from "typeorm";

import Base from "./base";

@Entity("users")
export class UserEntity extends Base {

  @Column({ name: "str_name" })
  public name?: string;

  @Column({ name: "str_email" })
  public email?: string;

  @Column({ name: "str_cellphone" })
  public cellphone?: string;

  @Column({ name: "str_password" })
  public password?: string;

  @Column({ name: "int_profile_type" })
  public profileType?: number;
}
