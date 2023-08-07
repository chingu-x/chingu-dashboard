-- CreateTable
CREATE TABLE "User" (
    "uuid" UUID NOT NULL,
    "username" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);
