-- Agregar columna fair a products_categories si no existe
ALTER TABLE `products_categories` ADD COLUMN `fair` VARCHAR(36) DEFAULT NULL AFTER `store`;
