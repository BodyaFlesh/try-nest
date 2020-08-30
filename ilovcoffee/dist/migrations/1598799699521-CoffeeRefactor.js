"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeeRefactor1598799699521 = void 0;
class CoffeeRefactor1598799699521 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`);
    }
}
exports.CoffeeRefactor1598799699521 = CoffeeRefactor1598799699521;
//# sourceMappingURL=1598799699521-CoffeeRefactor.js.map