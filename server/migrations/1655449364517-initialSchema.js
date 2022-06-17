const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialSchema1655449364517 {
    name = 'initialSchema1655449364517'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."deck_type_enum" AS ENUM('FULL', 'SHORT')`);
        await queryRunner.query(`CREATE TABLE "deck" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."deck_type_enum" NOT NULL DEFAULT 'FULL', "shuffled" boolean NOT NULL, CONSTRAINT "PK_99f8010303acab0edf8e1df24f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."card_suit_enum" AS ENUM('HEARTS', 'SPADES', 'CLUBS', 'DIAMONDS')`);
        await queryRunner.query(`CREATE TABLE "card" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "suit" "public"."card_suit_enum" NOT NULL DEFAULT 'HEARTS', "value" character varying NOT NULL, "deckId" uuid, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_673081effbabe22d74757339c60" FOREIGN KEY ("deckId") REFERENCES "deck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_673081effbabe22d74757339c60"`);
        await queryRunner.query(`DROP TABLE "card"`);
        await queryRunner.query(`DROP TYPE "public"."card_suit_enum"`);
        await queryRunner.query(`DROP TABLE "deck"`);
        await queryRunner.query(`DROP TYPE "public"."deck_type_enum"`);
    }
}
