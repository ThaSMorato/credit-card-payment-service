-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "card_token" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);
