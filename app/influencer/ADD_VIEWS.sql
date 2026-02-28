-- Agregar columna views al influencer
ALTER TABLE `influencer` ADD COLUMN `views` INT NOT NULL DEFAULT 0;

-- Tabla para vistas diarias (gráfica)
CREATE TABLE IF NOT EXISTS `influencer_views_daily` (
  `influencer_uuid` VARCHAR(36) NOT NULL,
  `view_date` DATE NOT NULL,
  `count` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`influencer_uuid`, `view_date`)
);
