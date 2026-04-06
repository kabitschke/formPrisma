/*
  Warnings:

  - You are about to drop the column `sobrenome` on the `contato` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `Contato` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bairro` to the `Contato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `Contato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `Contato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `Contato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rua` to the `Contato` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contato` DROP COLUMN `sobrenome`,
    ADD COLUMN `bairro` VARCHAR(191) NOT NULL,
    ADD COLUMN `cep` VARCHAR(191) NOT NULL,
    ADD COLUMN `cpf` VARCHAR(191) NOT NULL,
    ADD COLUMN `numero` INTEGER NOT NULL,
    ADD COLUMN `rua` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Contato_cpf_key` ON `Contato`(`cpf`);
