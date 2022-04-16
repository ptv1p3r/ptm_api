CREATE TABLE `users` (
                         `id` char(36) NOT NULL,
                         `name` varchar(255) NOT NULL,
                         `entity` varchar(255) NOT NULL,
                         `email` varchar(255) NOT NULL,
                         `password` TEXT NOT NULL,
                         `groupId` INT NOT NULL,
                         `activationToken` TEXT,
                         `dateBirth` DATE NOT NULL,
                         `address` TEXT NOT NULL,
                         `codPost` varchar(10) NOT NULL,
                         `genderId` INT NOT NULL,
                         `locality` varchar(255) NOT NULL,
                         `mobile` varchar(255) NOT NULL,
                         `nif` int(10) NOT NULL,
                         `countryId` INT NOT NULL,
                         `active` BOOLEAN NOT NULL,
                         `activationDate` DATETIME NOT NULL,
                         `dateCreated` DATETIME NOT NULL,
                         `dateModified` DATETIME NULL,
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

CREATE TABLE `countries` (
                              `id` INT NOT NULL AUTO_INCREMENT,
                              `name` varchar(255) NOT NULL,
                              `code` varchar(5) NOT NULL,
                              `active` BOOL NOT NULL,
                              `dateCreated` DATETIME NOT NULL,
                              `dateModified` DATETIME NULL,
                              PRIMARY KEY (`id`)
);

CREATE TABLE `gender` (
                             `id` INT NOT NULL AUTO_INCREMENT,
                             `name` varchar(255) NOT NULL,
                             `active` BOOL NOT NULL,
                             `dateCreated` DATETIME NOT NULL,
                             `dateModified` DATETIME NULL,
                             PRIMARY KEY (`id`)
);

ALTER TABLE `users` ADD CONSTRAINT `users_fk0` FOREIGN KEY (`groupId`) REFERENCES `userGroups`(`id`);

ALTER TABLE `users` ADD CONSTRAINT `users_fk1` FOREIGN KEY (`countryId`) REFERENCES `countries`(`id`);

ALTER TABLE `users` ADD CONSTRAINT `users_fk2` FOREIGN KEY (`genderId`) REFERENCES `gender`(`id`);

ALTER TABLE `userGroups` ADD CONSTRAINT `userGroups_fk0` FOREIGN KEY (`securityId`) REFERENCES `security`(`id`);

ALTER TABLE `trees` ADD CONSTRAINT `trees_fk0` FOREIGN KEY (`typeId`) REFERENCES `treeType`(`id`);

ALTER TABLE `usersTrees` ADD CONSTRAINT `usersTrees_fk0` FOREIGN KEY (`userId`) REFERENCES `users`(`id`);

ALTER TABLE `usersTrees` ADD CONSTRAINT `usersTrees_fk1` FOREIGN KEY (`treeId`) REFERENCES `trees`(`id`);

ALTER TABLE `transactions` ADD CONSTRAINT `transactions_fk0` FOREIGN KEY (`transactionTypeId`) REFERENCES `transactionType`(`id`);

ALTER TABLE `transactions` ADD CONSTRAINT `transactions_fk1` FOREIGN KEY (`transactionMethodId`) REFERENCES `transactionMethod`(`id`);

ALTER TABLE `treeImages` ADD CONSTRAINT `treeImages_fk0` FOREIGN KEY (`treeId`) REFERENCES `trees`(`id`);

INSERT INTO `security` (homeLogin, admLogin, usersCreate, usersRead, usersUpdate, usersDelete,
                        userGroupsCreate, userGroupsRead, userGroupsUpdate, userGroupsDelete,
                        treesCreate, treesRead, treesUpdate, treesDelete,
                        treeTypeCreate, treeTypeRead, treeTypeUpdate, treeTypeDelete,
                        treeImagesCreate, treeImagesRead, treeImagesUpdate, treeImagesDelete)
VALUES (true, false, false, true, true, false, false, true, false, false, false, true, false, false, false, true, false, false, true, false, false, false),
       (false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true);

INSERT INTO `userGroups` (name, description, securityId, active, dateCreated, dateModified)
VALUES ('Public Frontend','Generic Frontend Access', 1, true, NOW(), NOW()),
       ('Private Backoffice','Generic Backoffice Access', 2, true, NOW(), NOW());

INSERT INTO `gender` (name, active, dateCreated, dateModified)
VALUES ('Masculino', true, NOW(), NOW()),
       ('Feminino', true, NOW(), NOW()),
       ('Indefinido', true, NOW(), NOW());

INSERT INTO `countries` (name, code, active, dateCreated, dateModified)
VALUES ('Portugal', 'PT', true, NOW(), NOW()),
       ('Andorra', 'AD', true, NOW(), NOW()),
       ('United Arab Emirates', 'AE', true, NOW(), NOW()),
       ('Afghanistan', 'AF', true, NOW(), NOW()),
       ('Antigua and Barbuda', 'AG', true, NOW(), NOW()),
       ('Anguilla', 'AI', true, NOW(), NOW()),
       ('Albania', 'AL', true, NOW(), NOW()),
       ('Armenia', 'AM', true, NOW(), NOW()),
       ('Netherlands Antilles', 'AN', true, NOW(), NOW()),
       ('Angola', 'AO', true, NOW(), NOW()),
       ('Antarctica', 'AQ', true, NOW(), NOW()),
       ('Argentina', 'AR', true, NOW(), NOW()),
       ('American Samoa', 'AS', true, NOW(), NOW()),
       ('Austria', 'AT', true, NOW(), NOW()),
       ('Australia', 'AU', true, NOW(), NOW()),
       ('Aruba', 'AW', true, NOW(), NOW()),
       ('Azerbaijan', 'AZ', true, NOW(), NOW()),
       ('Bosnia and Herzegovina', 'BA', true, NOW(), NOW()),
       ('Barbados', 'BB', true, NOW(), NOW()),
       ('Bangladesh', 'BD', true, NOW(), NOW()),
       ('Belgium', 'BE', true, NOW(), NOW()),
       ('Burkina Faso', 'BF', true, NOW(), NOW()),
       ('Bulgaria', 'BG', true, NOW(), NOW()),
       ('Bahrain', 'BH', true, NOW(), NOW()),
       ('Burundi', 'BI', true, NOW(), NOW()),
       ('Benin', 'BJ', true, NOW(), NOW()),
       ('Bermuda', 'BM', true, NOW(), NOW()),
       ('Brunei', 'BN', true, NOW(), NOW()),
       ('Bolivia', 'BO', true, NOW(), NOW()),
       ('Brazil', 'BR', true, NOW(), NOW()),
       ('Bahamas', 'BS', true, NOW(), NOW()),
       ('Bhutan', 'BT', true, NOW(), NOW()),
       ('Bouvet Island', 'BV', true, NOW(), NOW()),
       ('Botswana', 'BW', true, NOW(), NOW()),
       ('Belarus', 'BY', true, NOW(), NOW()),
       ('Belize', 'BZ', true, NOW(), NOW()),
       ('Canada', 'CA', true, NOW(), NOW()),
       ('Cocos [Keeling] Islands', 'CC', true, NOW(), NOW()),
       ('Congo [DRC]', 'CD', true, NOW(), NOW()),
       ('Central African Republic', 'CF', true, NOW(), NOW()),
       ('Congo [Republic]', 'CG', true, NOW(), NOW()),
       ('Switzerland', 'CH', true, NOW(), NOW()),
       ('Côte d''Ivoire', 'CI', true, NOW(), NOW()),
       ('Cook Islands', 'CK', true, NOW(), NOW()),
       ('Chile', 'CL', true, NOW(), NOW()),
       ('Cameroon', 'CM', true, NOW(), NOW()),
       ('China', 'CN', true, NOW(), NOW()),
       ('Colombia', 'CO', true, NOW(), NOW()),
       ('Costa Rica', 'CR', true, NOW(), NOW()),
       ('Cuba', 'CU', true, NOW(), NOW()),
       ('Cape Verde', 'CV', true, NOW(), NOW()),
       ('Christmas Island', 'CX', true, NOW(), NOW()),
       ('Cyprus', 'CY', true, NOW(), NOW()),
       ('Czech Republic', 'CZ', true, NOW(), NOW()),
       ('Germany', 'DE', true, NOW(), NOW()),
       ('Djibouti', 'DJ', true, NOW(), NOW()),
       ('Denmark', 'DK', true, NOW(), NOW()),
       ('Dominica', 'DM', true, NOW(), NOW()),
       ('Dominican Republic', 'DO', true, NOW(), NOW()),
       ('Algeria', 'DZ', true, NOW(), NOW()),
       ('Ecuador', 'EC', true, NOW(), NOW());
