-- AlterSequence
ALTER SEQUENCE "TtsConfig_id_seq" MAXVALUE 9223372036854775807;

-- AlterTable
ALTER TABLE "UserTwitchTokenData" ALTER COLUMN "expiresIn" DROP NOT NULL;
