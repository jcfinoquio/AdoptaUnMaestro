-- --------------------------------------------------------
-- Base de datos: `empleo_docente`
-- --------------------------------------------------------

CREATE DATABASE IF NOT EXISTS `empleo_docente` 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `empleo_docente`;

-- --------------------------------------------------------
-- Tabla: usuarios (para docentes y centros)
-- --------------------------------------------------------

CREATE TABLE `usuarios` (
  `usuario_id` INT PRIMARY KEY AUTO_INCREMENT,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `tipo_usuario` ENUM('docente', 'centro') NOT NULL,
  `fecha_registro` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `ultimo_login` DATETIME NULL,
  `activo` BOOLEAN DEFAULT TRUE,
  `token_reset` VARCHAR(100) NULL,
  `token_expira` DATETIME NULL,
  INDEX `idx_email` (`email`),
  INDEX `idx_tipo_usuario` (`tipo_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla: perfiles_docentes
-- --------------------------------------------------------

CREATE TABLE `perfiles_docentes` (
  `perfil_id` INT PRIMARY KEY AUTO_INCREMENT,
  `usuario_id` INT UNIQUE NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `apellidos` VARCHAR(200) NOT NULL,
  `fecha_nacimiento` DATE NULL,
  `telefono` VARCHAR(20) NULL,
  `pais` VARCHAR(100) NULL,
  `ciudad` VARCHAR(100) NULL,
  `direccion` TEXT NULL,
  `foto_perfil` VARCHAR(255) NULL,
  `titulacion` VARCHAR(255) NULL,
  `especialidad` VARCHAR(150) NULL,
  `experiencia_anos` INT DEFAULT 0,
  `biografia` TEXT NULL,
  `disponibilidad` ENUM('disponible', 'trabajando', 'buscando') DEFAULT 'disponible',
  `visibilidad_cv` ENUM('publico', 'privado', 'solo_centros') DEFAULT 'publico',
  `fecha_actualizacion` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`usuario_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla: centros_educativos
-- --------------------------------------------------------

CREATE TABLE `centros_educativos` (
  `centro_id` INT PRIMARY KEY AUTO_INCREMENT,
  `usuario_id` INT UNIQUE NOT NULL,
  `nombre_centro` VARCHAR(255) NOT NULL,
  `cif` VARCHAR(20) UNIQUE NOT NULL,
  `telefono` VARCHAR(20) NULL,
  `direccion` TEXT NOT NULL,
  `ciudad` VARCHAR(100) NOT NULL,
  `provincia` VARCHAR(100) NULL,
  `codigo_postal` VARCHAR(10) NULL,
  `pais` VARCHAR(100) DEFAULT 'España',
  `tipo_centro` ENUM('publico', 'privado', 'concertado', 'universidad') NOT NULL,
  `etapas_educativas` SET('infantil', 'primaria', 'secundaria', 'bachillerato', 'fp', 'universidad') NULL,
  `descripcion` TEXT NULL,
  `logo` VARCHAR(255) NULL,
  `web` VARCHAR(255) NULL,
  `fecha_actualizacion` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`usuario_id`) ON DELETE CASCADE,
  INDEX `idx_ciudad` (`ciudad`),
  INDEX `idx_tipo_centro` (`tipo_centro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla: ofertas_empleo
-- --------------------------------------------------------

CREATE TABLE `ofertas_empleo` (
  `oferta_id` INT PRIMARY KEY AUTO_INCREMENT,
  `centro_id` INT NOT NULL,
  `titulo` VARCHAR(255) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `requisitos` TEXT NOT NULL,
  `especialidad` VARCHAR(150) NOT NULL,
  `etapa_educativa` ENUM('infantil', 'primaria', 'secundaria', 'bachillerato', 'fp', 'universidad') NOT NULL,
  `tipo_contrato` ENUM('indefinido', 'temporal', 'sustitucion', 'practicas') NOT NULL,
  `jornada` ENUM('completa', 'parcial', 'horas') NOT NULL,
  `horas_semanales` INT NULL,
  `salario_min` DECIMAL(10,2) NULL,
  `salario_max` DECIMAL(10,2) NULL,
  `fecha_inicio` DATE NOT NULL,
  `fecha_fin` DATE NULL,
  `plazas` INT DEFAULT 1,
  `estado` ENUM('activa', 'pausada', 'finalizada', 'cancelada') DEFAULT 'activa',
  `fecha_publicacion` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`centro_id`) REFERENCES `centros_educativos`(`centro_id`) ON DELETE CASCADE,
  INDEX `idx_especialidad` (`especialidad`),
  INDEX `idx_estado` (`estado`),
  INDEX `idx_fecha_publicacion` (`fecha_publicacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla: documentos_cv
-- --------------------------------------------------------

CREATE TABLE `documentos_cv` (
  `documento_id` INT PRIMARY KEY AUTO_INCREMENT,
  `perfil_id` INT NOT NULL,
  `nombre_archivo` VARCHAR(255) NOT NULL,
  `tipo_documento` ENUM('cv', 'certificado', 'titulo', 'otro') DEFAULT 'cv',
  `ruta_archivo` VARCHAR(500) NOT NULL,
  `tamano` INT NOT NULL COMMENT 'Tamaño en bytes',
  `visibilidad` ENUM('publico', 'privado', 'solo_centros') DEFAULT 'solo_centros',
  `fecha_subida` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `version` INT DEFAULT 1,
  `es_actual` BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (`perfil_id`) REFERENCES `perfiles_docentes`(`perfil_id`) ON DELETE CASCADE,
  INDEX `idx_perfil_tipo` (`perfil_id`, `tipo_documento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla: publicaciones
-- --------------------------------------------------------

CREATE TABLE `publicaciones` (
  `publicacion_id` INT PRIMARY KEY AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `tipo` ENUM('post', 'articulo', 'noticia', 'logro') DEFAULT 'post',
  `titulo` VARCHAR(255) NULL,
  `contenido` TEXT NOT NULL,
  `imagen` VARCHAR(255) NULL,
  `visibilidad` ENUM('publico', 'solo_seguidores', 'privado') DEFAULT 'publico',
  `likes` INT DEFAULT 0,
  `comentarios` INT DEFAULT 0,
  `fecha_publicacion` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`usuario_id`) ON DELETE CASCADE,
  INDEX `idx_usuario_fecha` (`usuario_id`, `fecha_publicacion`),
  FULLTEXT `idx_busqueda_contenido` (`titulo`, `contenido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla: aplicaciones_ofertas
-- --------------------------------------------------------

CREATE TABLE `aplicaciones_ofertas` (
  `aplicacion_id` INT PRIMARY KEY AUTO_INCREMENT,
  `oferta_id` INT NOT NULL,
  `perfil_id` INT NOT NULL,
  `documento_cv_id` INT NULL,
  `mensaje` TEXT NULL,
  `estado` ENUM('pendiente', 'revisada', 'seleccionada', 'rechazada', 'contratado') DEFAULT 'pendiente',
  `fecha_aplicacion` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `fecha_cambio_estado` DATETIME NULL,
  `notas_centro` TEXT NULL,
  UNIQUE KEY `unique_aplicacion` (`oferta_id`, `perfil_id`),
  FOREIGN KEY (`oferta_id`) REFERENCES `ofertas_empleo`(`oferta_id`) ON DELETE CASCADE,
  FOREIGN KEY (`perfil_id`) REFERENCES `perfiles_docentes`(`perfil_id`) ON DELETE CASCADE,
  FOREIGN KEY (`documento_cv_id`) REFERENCES `documentos_cv`(`documento_id`) ON DELETE SET NULL,
  INDEX `idx_estado` (`estado`),
  INDEX `idx_fecha_aplicacion` (`fecha_aplicacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla: seguidores
-- --------------------------------------------------------

CREATE TABLE `seguidores` (
  `seguidor_id` INT PRIMARY KEY AUTO_INCREMENT,
  `usuario_id` INT NOT NULL COMMENT 'Usuario que sigue',
  `sigue_a_usuario_id` INT NOT NULL COMMENT 'Usuario seguido',
  `fecha_seguimiento` DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `unique_seguimiento` (`usuario_id`, `sigue_a_usuario_id`),
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`usuario_id`) ON DELETE CASCADE,
  FOREIGN KEY (`sigue_a_usuario_id`) REFERENCES `usuarios`(`usuario_id`) ON DELETE CASCADE,
  INDEX `idx_sigue_a` (`sigue_a_usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla: mensajes
-- --------------------------------------------------------

CREATE TABLE `mensajes` (
  `mensaje_id` INT PRIMARY KEY AUTO_INCREMENT,
  `remitente_id` INT NOT NULL,
  `destinatario_id` INT NOT NULL,
  `asunto` VARCHAR(255) NULL,
  `contenido` TEXT NOT NULL,
  `leido` BOOLEAN DEFAULT FALSE,
  `fecha_envio` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `fecha_leido` DATETIME NULL,
  FOREIGN KEY (`remitente_id`) REFERENCES `usuarios`(`usuario_id`) ON DELETE CASCADE,
  FOREIGN KEY (`destinatario_id`) REFERENCES `usuarios`(`usuario_id`) ON DELETE CASCADE,
  INDEX `idx_destinatario` (`destinatario_id`, `leido`),
  INDEX `idx_conversacion` (`remitente_id`, `destinatario_id`, `fecha_envio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla: notificaciones
-- --------------------------------------------------------

CREATE TABLE `notificaciones` (
  `notificacion_id` INT PRIMARY KEY AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `tipo` ENUM('aplicacion', 'mensaje', 'oferta', 'seguidor', 'sistema') NOT NULL,
  `titulo` VARCHAR(255) NOT NULL,
  `contenido` TEXT NOT NULL,
  `enlace` VARCHAR(500) NULL,
  `leida` BOOLEAN DEFAULT FALSE,
  `fecha_creacion` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`usuario_id`) ON DELETE CASCADE,
  INDEX `idx_usuario_leida` (`usuario_id`, `leida`),
  INDEX `idx_fecha` (`fecha_creacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- VISTAS
-- --------------------------------------------------------

-- Vista: ofertas_activas_completas
CREATE VIEW `v_ofertas_activas_completas` AS
SELECT 
  o.oferta_id,
  o.titulo,
  o.descripcion,
  o.requisitos,
  o.especialidad,
  o.etapa_educativa,
  o.tipo_contrato,
  o.jornada,
  o.horas_semanales,
  o.salario_min,
  o.salario_max,
  o.fecha_inicio,
  o.fecha_fin,
  o.plazas,
  o.estado,
  o.fecha_publicacion,
  c.centro_id,
  c.nombre_centro,
  c.ciudad,
  c.provincia,
  c.tipo_centro,
  c.logo,
  COUNT(a.aplicacion_id) as total_aplicaciones
FROM ofertas_empleo o
JOIN centros_educativos c ON o.centro_id = c.centro_id
LEFT JOIN aplicaciones_ofertas a ON o.oferta_id = a.oferta_id
WHERE o.estado = 'activa'
GROUP BY o.oferta_id;

-- Vista: docentes_completos
CREATE VIEW `v_docentes_completos` AS
SELECT 
  p.perfil_id,
  p.usuario_id,
  p.nombre,
  p.apellidos,
  p.fecha_nacimiento,
  p.telefono,
  p.ciudad,
  p.pais,
  p.titulacion,
  p.especialidad,
  p.experiencia_anos,
  p.biografia,
  p.disponibilidad,
  p.visibilidad_cv,
  u.email,
  u.fecha_registro,
  (SELECT COUNT(*) FROM seguidores s WHERE s.sigue_a_usuario_id = u.usuario_id) as seguidores,
  (SELECT ruta_archivo FROM documentos_cv d WHERE d.perfil_id = p.perfil_id AND d.tipo_documento = 'cv' AND d.es_actual = TRUE LIMIT 1) as cv_actual
FROM perfiles_docentes p
JOIN usuarios u ON p.usuario_id = u.usuario_id
WHERE u.activo = TRUE;

-- Vista: centros_completos
CREATE VIEW `v_centros_completos` AS
SELECT 
  c.centro_id,
  c.usuario_id,
  c.nombre_centro,
  c.cif,
  c.telefono,
  c.direccion,
  c.ciudad,
  c.provincia,
  c.codigo_postal,
  c.pais,
  c.tipo_centro,
  c.etapas_educativas,
  c.descripcion,
  c.logo,
  c.web,
  u.email,
  u.fecha_registro,
  (SELECT COUNT(*) FROM ofertas_empleo o WHERE o.centro_id = c.centro_id AND o.estado = 'activa') as ofertas_activas,
  (SELECT COUNT(*) FROM seguidores s WHERE s.sigue_a_usuario_id = u.usuario_id) as seguidores
FROM centros_educativos c
JOIN usuarios u ON c.usuario_id = u.usuario_id
WHERE u.activo = TRUE;

-- Vista: aplicaciones_detalladas
CREATE VIEW `v_aplicaciones_detalladas` AS
SELECT 
  a.aplicacion_id,
  a.oferta_id,
  a.perfil_id,
  a.estado,
  a.mensaje,
  a.fecha_aplicacion,
  o.titulo as titulo_oferta,
  c.nombre_centro,
  p.nombre,
  p.apellidos,
  p.especialidad as especialidad_docente,
  d.nombre_archivo as cv_nombre,
  d.ruta_archivo as cv_ruta
FROM aplicaciones_ofertas a
JOIN ofertas_empleo o ON a.oferta_id = o.oferta_id
JOIN centros_educativos c ON o.centro_id = c.centro_id
JOIN perfiles_docentes p ON a.perfil_id = p.perfil_id
LEFT JOIN documentos_cv d ON a.documento_cv_id = d.documento_id;

-- --------------------------------------------------------
-- ÍNDICES ADICIONALES para optimización
-- --------------------------------------------------------

CREATE INDEX `idx_ofertas_centro_estado` ON `ofertas_empleo` (`centro_id`, `estado`);
CREATE INDEX `idx_aplicaciones_perfil_estado` ON `aplicaciones_ofertas` (`perfil_id`, `estado`);
CREATE INDEX `idx_publicaciones_fecha` ON `publicaciones` (`fecha_publicacion` DESC);
CREATE INDEX `idx_usuarios_activo` ON `usuarios` (`activo`, `tipo_usuario`);

-- --------------------------------------------------------
-- USUARIO para la aplicación PHP
-- --------------------------------------------------------

-- Nota: Ejecutar estas líneas separadamente con privilegios de administrador
-- CREATE USER 'app_empleo_docente'@'localhost' IDENTIFIED BY 'una_password_segura';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON empleo_docente.* TO 'app_empleo_docente'@'localhost';
-- FLUSH PRIVILEGES;

-- --------------------------------------------------------
-- INSERTS de ejemplo (opcional)
-- --------------------------------------------------------

INSERT INTO `usuarios` (`email`, `password_hash`, `tipo_usuario`) VALUES
('admin@ejemplo.com', '$2y$10$TuHashSeguroAqui1234567890', 'centro'),
('docente@ejemplo.com', '$2y$10$TuHashSeguroAqui1234567890', 'docente');

-- La contraseña hash debe generarse con password_hash() de PHP

SET @admin_id = LAST_INSERT_ID() - 1;
SET @docente_id = LAST_INSERT_ID();

INSERT INTO `centros_educativos` (`usuario_id`, `nombre_centro`, `cif`, `direccion`, `ciudad`, `tipo_centro`) VALUES
(@admin_id, 'Colegio Ejemplo S.L.', 'B12345678', 'Calle Falsa 123', 'Madrid', 'privado');

INSERT INTO `perfiles_docentes` (`usuario_id`, `nombre`, `apellidos`, `especialidad`) VALUES
(@docente_id, 'Juan', 'Pérez García', 'Matemáticas');
