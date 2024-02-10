/*
  Warnings:

  - Changed the type of `obtainmentTimestamp` on the `UserTwitchTokenData` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "UserTwitchTokenData" DROP COLUMN "obtainmentTimestamp";
ALTER TABLE "UserTwitchTokenData" ADD COLUMN     "obtainmentTimestamp" INT8 NOT NULL;
