-- CreateTable
CREATE TABLE `GoodSpus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(191) NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `operatorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GoodSkus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(191) NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `operatorId` INTEGER NOT NULL,
    `spuId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `department` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GoodSpus` ADD CONSTRAINT `GoodSpus_operatorId_fkey` FOREIGN KEY (`operatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GoodSkus` ADD CONSTRAINT `GoodSkus_spuId_fkey` FOREIGN KEY (`spuId`) REFERENCES `GoodSpus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
