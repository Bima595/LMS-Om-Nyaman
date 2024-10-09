-- DropForeignKey
ALTER TABLE "Artikel" DROP CONSTRAINT "Artikel_userId_fkey";

-- CreateTable
CREATE TABLE "tugas" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "fileUrl" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "tugas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengumpulan" (
    "id" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ontime',
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tugasId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "pengumpulan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tugas" ADD CONSTRAINT "tugas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengumpulan" ADD CONSTRAINT "pengumpulan_tugasId_fkey" FOREIGN KEY ("tugasId") REFERENCES "tugas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengumpulan" ADD CONSTRAINT "pengumpulan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
