-- Agregar match_visible a users_fair (1 = visible en Explorar, 0 = oculto)
ALTER TABLE `users_fair` ADD COLUMN `match_visible` TINYINT(1) NOT NULL DEFAULT 1;
