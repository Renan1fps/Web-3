import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export default class Base {
  @PrimaryGeneratedColumn("uuid")
	public id?: string;

  @Column({ name: "str_create_by" })
  	createdBy?: string;

  @Column({ name: "str_deleted_by" })
  	deletedBy?: string;

  @CreateDateColumn({ name: "dt_created_at" })
  	createdAt?: Date;

  @Column({ name: "str_update_by", default: null })
  	updatedBy?: string;

  @UpdateDateColumn({ type: "timestamptz", name: "dt_updated_at" })
  	updatedAt?: Date;

  @DeleteDateColumn({ type: "timestamptz", name: "dt_deleted_at", default: null })
  	deletedAt?: Date;
}
