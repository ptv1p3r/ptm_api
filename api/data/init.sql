CREATE TABLE `users` (
                         `id` char(36) NOT NULL,
                         `name` varchar(255) NOT NULL,
                         `entity` varchar(255) NOT NULL,
                         `email` varchar(255) NOT NULL,
                         `password` TEXT NOT NULL,
                         `groupId` INT NOT NULL,
                         `activationToken` TEXT,
                         `dateBirth` varchar(50) NOT NULL,
                         `address` TEXT NOT NULL,
                         `codPost` varchar(10) NOT NULL,
                         `gender` varchar(50) NOT NULL,
                         `locality` varchar(255) NOT NULL,
                         `mobile` varchar(255) NOT NULL,
                         `nif` int(10) NOT NULL,
                         `country` varchar(255) NOT NULL,
                         `active` BOOLEAN NOT NULL,
                         `activationDate` DATETIME NOT NULL,
                         `dateCreated` DATETIME NOT NULL,
                         `dateModified` DATETIME NOT NULL,
                         `lastLogin` DATETIME NULL,
                         PRIMARY KEY (`id`)
);

CREATE TABLE `userGroups` (
                         `id` int NOT NULL AUTO_INCREMENT,
                         `name` varchar(255) NOT NULL,
                         `description` TEXT NOT NULL,
                         `securityId` int NOT NULL,
                         `active` BOOLEAN NOT NULL,
                         `dateCreated` DATETIME NOT NULL,
                         `dateModified` DATETIME NOT NULL,
                         PRIMARY KEY (`id`)
);

CREATE TABLE `treeType` (
                        `id` int NOT NULL AUTO_INCREMENT,
                        `name` varchar(255) NOT NULL,
                        `description` TEXT NOT NULL,
                        `active` BOOLEAN NOT NULL,
                        `dateCreated` DATETIME NOT NULL,
                        `dateModified` DATETIME NOT NULL,
                        PRIMARY KEY (`id`)
);

CREATE TABLE `trees` (
                        `id` char(36) NOT NULL,
                        `typeId` int NOT NULL,
                        `lat` double(9,6) NOT NULL,
                        `lng` double(9,6) NOT NULL,
                        `active` BOOLEAN NOT NULL,
                        `dateCreated` DATETIME NOT NULL,
                        `dateModified` DATETIME NOT NULL,
                        PRIMARY KEY (`id`)
);

CREATE TABLE `usersTrees` (
                        `userId` char(36) NOT NULL,
                        `treeId` char(36) NOT NULL
);

CREATE TABLE `security` (
                        `id` int NOT NULL AUTO_INCREMENT,
                        `homeLogin` BOOLEAN NOT NULL,
                        `admLogin` BOOLEAN NOT NULL,
                        `usersCreate` BOOLEAN NOT NULL,
                        `usersRead` BOOLEAN NOT NULL,
                        `usersUpdate` BOOLEAN NOT NULL,
                        `usersDelete` BOOLEAN NOT NULL,
                        `userGroupsCreate` BOOLEAN NOT NULL,
                        `userGroupsRead` BOOLEAN NOT NULL,
                        `userGroupsUpdate` BOOLEAN NOT NULL,
                        `userGroupsDelete` BOOLEAN NOT NULL,
                        `treesCreate` BOOLEAN NOT NULL,
                        `treesRead` BOOLEAN NOT NULL,
                        `treesUpdate` BOOLEAN NOT NULL,
                        `treesDelete` BOOLEAN NOT NULL,
                        `treeTypeCreate` BOOLEAN NOT NULL,
                        `treeTypeRead` BOOLEAN NOT NULL,
                        `treeTypeUpdate` BOOLEAN NOT NULL,
                        `treeTypeDelete` BOOLEAN NOT NULL,
                        `treeImagesCreate` BOOLEAN NOT NULL,
                        `treeImagesRead` BOOLEAN NOT NULL,
                        `treeImagesUpdate` BOOLEAN NOT NULL,
                        `treeImagesDelete` BOOLEAN NOT NULL,
                        PRIMARY KEY (`id`)
);

CREATE TABLE `transactions` (
                        `id` char(36) NOT NULL,
                        `transactionTypeId` int NOT NULL,
                        `transactionMethodId` int NOT NULL,
                        `value` DECIMAL NOT NULL,
                        `valid` BOOLEAN NOT NULL,
                        `dateCreated` DATETIME NOT NULL,
                        `dateModified` DATETIME NOT NULL,
                        `dateValidated` DATETIME NOT NULL,
                        PRIMARY KEY (`id`)
);

CREATE TABLE `transactionType` (
                        `id` int NOT NULL AUTO_INCREMENT,
                        `name` varchar(255) NOT NULL,
                        `description` TEXT NOT NULL,
                        `active` BOOLEAN NOT NULL,
                        `dateCreated` DATETIME NOT NULL,
                        `dateModified` DATETIME NOT NULL,
                        PRIMARY KEY (`id`)
);

CREATE TABLE `transactionMethod` (
                        `id` int NOT NULL AUTO_INCREMENT,
                        `name` varchar(255) NOT NULL,
                        `description` TEXT NOT NULL,
                        `active` BOOLEAN NOT NULL,
                        `dateCreated` DATETIME NOT NULL,
                        `dateModified` DATETIME NOT NULL,
                        PRIMARY KEY (`id`)
);

CREATE TABLE `treeImages` (
                        `id` char(36) NOT NULL,
                        `treeId` varchar(255) NOT NULL,
                        `path` varchar(255) NOT NULL,
                        `size` int NOT NULL,
                        `position` int NOT NULL,
                        `active` BOOLEAN NOT NULL,
                        `dateCreated` DATETIME NOT NULL,
                        `dateModified` DATETIME NOT NULL,
                        PRIMARY KEY (`id`)
);

ALTER TABLE `users` ADD CONSTRAINT `users_fk0` FOREIGN KEY (`groupId`) REFERENCES `userGroups`(`id`);

ALTER TABLE `userGroups` ADD CONSTRAINT `userGroups_fk0` FOREIGN KEY (`securityId`) REFERENCES `security`(`id`);

ALTER TABLE `trees` ADD CONSTRAINT `trees_fk0` FOREIGN KEY (`typeId`) REFERENCES `treeType`(`id`);

ALTER TABLE `usersTrees` ADD CONSTRAINT `usersTrees_fk0` FOREIGN KEY (`userId`) REFERENCES `users`(`id`);

ALTER TABLE `usersTrees` ADD CONSTRAINT `usersTrees_fk1` FOREIGN KEY (`treeId`) REFERENCES `trees`(`id`);

ALTER TABLE `transactions` ADD CONSTRAINT `transactions_fk0` FOREIGN KEY (`transactionTypeId`) REFERENCES `transactionType`(`id`);

ALTER TABLE `transactions` ADD CONSTRAINT `transactions_fk1` FOREIGN KEY (`transactionMethodId`) REFERENCES `transactionMethod`(`id`);

ALTER TABLE `treeImages` ADD CONSTRAINT `treeImages_fk0` FOREIGN KEY (`treeId`) REFERENCES `trees`(`id`);
