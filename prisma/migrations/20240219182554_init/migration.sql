-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTwitchTokenData" (
    "userId" INTEGER NOT NULL,
    "accessToken" TEXT NOT NULL,
    "expiresIn" INTEGER,
    "obtainmentTimestamp" BIGINT NOT NULL,
    "refreshToken" TEXT,
    "scope" TEXT[]
);

-- CreateTable
CREATE TABLE "TtsConfig" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "enabled" BOOLEAN NOT NULL,
    "channel" TEXT NOT NULL,
    "voice" JSONB NOT NULL,
    "engine" TEXT NOT NULL,

    CONSTRAINT "TtsConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Triggers" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "event" TEXT NOT NULL,
    "conditions" JSONB,

    CONSTRAINT "Triggers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TriggerActions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "triggerId" INTEGER NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "TriggerActions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserTwitchTokenData_userId_key" ON "UserTwitchTokenData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TtsConfig_userId_key" ON "TtsConfig"("userId");

-- AddForeignKey
ALTER TABLE "UserTwitchTokenData" ADD CONSTRAINT "UserTwitchTokenData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TtsConfig" ADD CONSTRAINT "TtsConfig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Triggers" ADD CONSTRAINT "Triggers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TriggerActions" ADD CONSTRAINT "TriggerActions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TriggerActions" ADD CONSTRAINT "TriggerActions_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "Triggers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
