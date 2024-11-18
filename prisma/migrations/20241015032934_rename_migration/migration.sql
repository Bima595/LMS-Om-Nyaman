/*
  Warnings:

  - Added the required column `classId` to the `pengumpulan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classId` to the `tugas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pengumpulan" ADD COLUMN     "classId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tugas" ADD COLUMN     "classId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "classes" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_classes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "isJoined" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "user_classes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_classes_userId_classId_key" ON "user_classes"("userId", "classId");

-- AddForeignKey
ALTER TABLE "user_classes" ADD CONSTRAINT "user_classes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_classes" ADD CONSTRAINT "user_classes_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tugas" ADD CONSTRAINT "tugas_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengumpulan" ADD CONSTRAINT "pengumpulan_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
