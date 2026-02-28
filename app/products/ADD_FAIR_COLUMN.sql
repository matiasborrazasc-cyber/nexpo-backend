-- Agregar columna fair a products si no existe
ALTER TABLE `products` ADD COLUMN `fair` VARCHAR(36) DEFAULT NULL AFTER `store`;
