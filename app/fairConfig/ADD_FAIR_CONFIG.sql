-- Tabla para configuración de la feria (color, etc.)
CREATE TABLE IF NOT EXISTS `fair_config` (
  `fair_uuid` VARCHAR(36) NOT NULL PRIMARY KEY,
  `primary_color` VARCHAR(9) NOT NULL DEFAULT '#6840FF',
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
