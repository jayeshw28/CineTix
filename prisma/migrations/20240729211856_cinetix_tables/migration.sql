-- CreateEnum
CREATE TYPE "ProjectionType" AS ENUM ('STANDARD', 'IMAX', 'DOLBY_ATMOS', 'REALD_3D', 'IMAX_70MM');

-- CreateEnum
CREATE TYPE "SoundSystemType" AS ENUM ('STEREO', 'DOLBY_ATMOS', 'DOLBY_DIGITAL', 'DTS', 'DTS_x', 'SDDS', 'IMAX_ENHANCED');

-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('ACTION', 'ADVENTURE', 'ANIMATION', 'BIOGRAPHY', 'COMEDY', 'CRIME', 'DOCUMENTARY', 'DRAMA', 'FAMILY', 'FANTASY', 'FILM_NOIR', 'HISTORY', 'HORROR', 'MUSIC', 'MUSICAL', 'MYSTERY', 'ROMANCE', 'SCI_FI', 'SHORT', 'SPORT', 'SUPERHERO', 'THRILLER', 'WAR', 'WESTERN');

-- CreateEnum
CREATE TYPE "ShowtimeStatus" AS ENUM ('POSTPONED', 'CANCELLED', 'ONGOING', 'ENDED');

-- CreateTable
CREATE TABLE "Cinema" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "managerId" TEXT NOT NULL,

    CONSTRAINT "Cinema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cinemaId" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Screen" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "number" INTEGER NOT NULL,
    "cinemaId" INTEGER NOT NULL,
    "projectionType" "ProjectionType" NOT NULL DEFAULT 'STANDARD',
    "soundSystemType" "SoundSystemType" NOT NULL DEFAULT 'DOLBY_ATMOS',
    "price" DOUBLE PRECISION NOT NULL DEFAULT 180,

    CONSTRAINT "Screen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seat" (
    "row" INTEGER NOT NULL,
    "column" INTEGER NOT NULL,
    "screenId" INTEGER NOT NULL,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("screenId","row","column")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "cast" TEXT[],
    "genre" "Genre" NOT NULL,
    "duration" INTEGER NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "posterUrl" TEXT,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShowTime" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "movieId" INTEGER NOT NULL,
    "screenId" INTEGER NOT NULL,
    "status" "ShowtimeStatus",

    CONSTRAINT "ShowTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "showtimeId" INTEGER NOT NULL,
    "row" INTEGER NOT NULL,
    "column" INTEGER NOT NULL,
    "screenId" INTEGER NOT NULL,
    "ticketId" INTEGER NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "qrCode" TEXT,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CinemaToManager" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_cinemaId_key" ON "Address"("cinemaId");

-- CreateIndex
CREATE UNIQUE INDEX "Screen_cinemaId_number_key" ON "Screen"("cinemaId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "ShowTime_startTime_screenId_key" ON "ShowTime"("startTime", "screenId");

-- CreateIndex
CREATE INDEX "seatIndex" ON "Booking"("screenId", "row", "column");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_screenId_row_column_showtimeId_key" ON "Booking"("screenId", "row", "column", "showtimeId");

-- CreateIndex
CREATE UNIQUE INDEX "_CinemaToManager_AB_unique" ON "_CinemaToManager"("A", "B");

-- CreateIndex
CREATE INDEX "_CinemaToManager_B_index" ON "_CinemaToManager"("B");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "Cinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Screen" ADD CONSTRAINT "Screen_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "Cinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_screenId_fkey" FOREIGN KEY ("screenId") REFERENCES "Screen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowTime" ADD CONSTRAINT "ShowTime_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowTime" ADD CONSTRAINT "ShowTime_screenId_fkey" FOREIGN KEY ("screenId") REFERENCES "Screen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_showtimeId_fkey" FOREIGN KEY ("showtimeId") REFERENCES "ShowTime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_screenId_row_column_fkey" FOREIGN KEY ("screenId", "row", "column") REFERENCES "Seat"("row", "column", "screenId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CinemaToManager" ADD CONSTRAINT "_CinemaToManager_A_fkey" FOREIGN KEY ("A") REFERENCES "Cinema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CinemaToManager" ADD CONSTRAINT "_CinemaToManager_B_fkey" FOREIGN KEY ("B") REFERENCES "Manager"("id") ON DELETE CASCADE ON UPDATE CASCADE;
