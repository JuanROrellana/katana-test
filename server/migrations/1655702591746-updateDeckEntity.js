const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateDeckEntity1655702591746 {
    name = 'updateDeckEntity1655702591746'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "deck" ADD "remaining" integer NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "deck" DROP COLUMN "remaining"`);
    }
}
