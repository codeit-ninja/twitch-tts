/*
  Warnings:

  - Added the required column `channel` to the `TtsConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enabled` to the `TtsConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `engine` to the `TtsConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voice` to the `TtsConfig` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TtsConfig" ADD COLUMN     "channel" STRING NOT NULL;
ALTER TABLE "TtsConfig" ADD COLUMN     "enabled" BOOL NOT NULL;
ALTER TABLE "TtsConfig" ADD COLUMN     "engine" STRING NOT NULL;
ALTER TABLE "TtsConfig" ADD COLUMN     "voice" JSONB NOT NULL;
