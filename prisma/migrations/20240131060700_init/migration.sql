-- CreateTable
CREATE TABLE `User` (
    `userMail` VARCHAR(191) NOT NULL,
    `passWord` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_userMail_key`(`userMail`),
    PRIMARY KEY (`userMail`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `StudentID` INTEGER NOT NULL AUTO_INCREMENT,
    `FirstName` VARCHAR(191) NOT NULL,
    `LastName` VARCHAR(191) NOT NULL,
    `Birthday` VARCHAR(191) NOT NULL,
    `Phone` VARCHAR(191) NOT NULL,
    `Address` VARCHAR(191) NOT NULL,
    `Code` INTEGER NOT NULL,

    UNIQUE INDEX `Student_StudentID_key`(`StudentID`),
    PRIMARY KEY (`StudentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Teacher` (
    `teacherID` INTEGER NOT NULL AUTO_INCREMENT,
    `FirstName` VARCHAR(191) NOT NULL,
    `LastName` VARCHAR(191) NOT NULL,
    `Birthday` VARCHAR(191) NOT NULL,
    `Phone` VARCHAR(191) NOT NULL,
    `Address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`teacherID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Class` (
    `ClassCode` INTEGER NOT NULL AUTO_INCREMENT,
    `ClassName` VARCHAR(191) NOT NULL,
    `LectureHall` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ClassCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Teacher` ADD CONSTRAINT `Teacher_teacherID_fkey` FOREIGN KEY (`teacherID`) REFERENCES `Student`(`StudentID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_ClassCode_fkey` FOREIGN KEY (`ClassCode`) REFERENCES `Student`(`StudentID`) ON DELETE RESTRICT ON UPDATE CASCADE;
