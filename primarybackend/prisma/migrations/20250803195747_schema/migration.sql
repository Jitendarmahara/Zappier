-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Zap" (
    "id" TEXT NOT NULL,
    "trigerId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Zap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Triger" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,
    "trigerId" TEXT NOT NULL,

    CONSTRAINT "Triger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AvaliableTriger" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "AvaliableTriger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Actions" (
    "id" TEXT NOT NULL,
    "actionid" TEXT NOT NULL,
    "zapid" TEXT NOT NULL,
    "sortingorder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AvaliableActions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "AvaliableActions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ZapRun" (
    "id" TEXT NOT NULL,
    "zapid" TEXT NOT NULL,
    "metadat" JSONB NOT NULL,

    CONSTRAINT "ZapRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ZapRunOutBox" (
    "id" TEXT NOT NULL,
    "zaprunid" TEXT NOT NULL,

    CONSTRAINT "ZapRunOutBox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Triger_zapId_key" ON "public"."Triger"("zapId");

-- CreateIndex
CREATE UNIQUE INDEX "ZapRunOutBox_zaprunid_key" ON "public"."ZapRunOutBox"("zaprunid");

-- AddForeignKey
ALTER TABLE "public"."Zap" ADD CONSTRAINT "Zap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Triger" ADD CONSTRAINT "Triger_trigerId_fkey" FOREIGN KEY ("trigerId") REFERENCES "public"."AvaliableTriger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Triger" ADD CONSTRAINT "Triger_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "public"."Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Actions" ADD CONSTRAINT "Actions_actionid_fkey" FOREIGN KEY ("actionid") REFERENCES "public"."AvaliableActions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Actions" ADD CONSTRAINT "Actions_zapid_fkey" FOREIGN KEY ("zapid") REFERENCES "public"."Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ZapRun" ADD CONSTRAINT "ZapRun_zapid_fkey" FOREIGN KEY ("zapid") REFERENCES "public"."Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ZapRunOutBox" ADD CONSTRAINT "ZapRunOutBox_zaprunid_fkey" FOREIGN KEY ("zaprunid") REFERENCES "public"."ZapRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
