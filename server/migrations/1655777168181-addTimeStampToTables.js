const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class addTimeStampToTables1655777168181 {
    name = 'addTimeStampToTables1655777168181'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "deck" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "deck" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "card" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "card" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "deck" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "deck" DROP COLUMN "created_at"`);
    }
}
