-- Corrige el tamaño de las columnas UUID (36 caracteres con guiones).
-- Ejecutar en MySQL si aparece "Data truncated for column 'uuid'".
ALTER TABLE `messages` MODIFY COLUMN `uuid` varchar(36) NOT NULL;
ALTER TABLE `messages` MODIFY COLUMN `userSend` varchar(36) NOT NULL;
ALTER TABLE `messages` MODIFY COLUMN `userReceive` varchar(36) NOT NULL;
