-- Tabla de mensajes para el chat entre usuarios. Ejecutar en MySQL si la tabla no existe.
CREATE TABLE IF NOT EXISTS `messages` (
  `uuid` varchar(36) NOT NULL,
  `userSend` varchar(36) NOT NULL,
  `userReceive` varchar(36) NOT NULL,
  `message` text NOT NULL,
  `date` varchar(64) NOT NULL,
  `status` varchar(32) DEFAULT 'sent',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `userSend` (`userSend`),
  KEY `userReceive` (`userReceive`),
  KEY `date` (`date`)
);
