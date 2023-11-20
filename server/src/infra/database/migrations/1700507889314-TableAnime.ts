import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class TableAnime1700507889314 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "animes",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
						generationStrategy: "uuid",
						default: "uuid_generate_v4()",
					},
					{
						name: "str_name",
						type: "varchar",
					},
					{
						name: "str_description",
						type: "varchar",
					},
					{
						name: "str_url",
						type: "varchar",
						isNullable: true,
					},
					{
						name: "str_create_by",
						type: "varchar",
						isNullable: true,
					},
					{
						name: "str_deleted_by",
						type: "varchar",
						isNullable: true,
					},
					{
						name: "dt_created_at",
						type: "timestamptz",
						default: "now()",
					},
					{
						name: "str_update_by",
						type: "varchar",
						isNullable: true,
					},
					{
						name: "dt_updated_at",
						type: "timestamptz",
						default: "now()",
					},
					{
						name: "dt_deleted_at",
						type: "timestamptz",
						isNullable: true,
					},
				],
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("animes", true);
	}

}
