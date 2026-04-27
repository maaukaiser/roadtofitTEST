-- ============================================================
--  ROAD TO FIT DB  –  Versión corregida para MySQL 8.x
--  Archivo original: BoD SQL  |  Corregido para MySQL Workbench
-- ============================================================

-- ✅ CORRECCIÓN #1: Se unificó el nombre (el original creaba
--    "RoadToFit" pero luego hacía USE "Road_To_Fit" — dos nombres distintos)
DROP DATABASE IF EXISTS road_to_fit;
CREATE DATABASE road_to_fit
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE road_to_fit;

-- ============================================================
-- TABLA: planes
-- ============================================================
-- ✅ CORRECCIÓN #2: Quitado GO (es de SQL Server, no existe en MySQL)
-- ✅ CORRECCIÓN #3: IDENTITY(1,1) → AUTO_INCREMENT
-- ✅ CORRECCIÓN #4: NVARCHAR → VARCHAR
-- ✅ CORRECCIÓN #5: Quitados acentos en nombres de columnas (Descripción → descripcion)
CREATE TABLE planes (
  id          INT           NOT NULL AUTO_INCREMENT,
  nombre      VARCHAR(100)  NOT NULL,
  descripcion VARCHAR(255)  DEFAULT NULL,
  costo       DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id)
);

-- ============================================================
-- TABLA: roles
-- ============================================================
CREATE TABLE roles (
  id          INT          NOT NULL AUTO_INCREMENT,
  descripcion VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

-- ============================================================
-- TABLA: usuarios
-- ============================================================
-- ✅ CORRECCIÓN #6: La columna se llamaba "Planes" igual que la tabla,
--    renombrada a "plan_id" para evitar ambigüedad y errores
CREATE TABLE usuarios (
  id       INT           NOT NULL AUTO_INCREMENT,
  nombre   VARCHAR(100)  NOT NULL,
  apellidos VARCHAR(100) DEFAULT NULL,
  correo   VARCHAR(150)  UNIQUE,
  peso     DECIMAL(5,2)  DEFAULT NULL,
  plan_id  INT           DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_usuario_plan
    FOREIGN KEY (plan_id) REFERENCES planes(id)
    ON DELETE SET NULL
);

-- ============================================================
-- TABLA: usuario_rol  (muchos a muchos)
-- ============================================================
CREATE TABLE usuario_rol (
  usuario_id INT NOT NULL,
  rol_id     INT NOT NULL,
  PRIMARY KEY (usuario_id, rol_id),
  CONSTRAINT fk_ur_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  CONSTRAINT fk_ur_rol     FOREIGN KEY (rol_id)     REFERENCES roles(id)    ON DELETE CASCADE
);

-- ============================================================
-- TABLA: cuestionarios
-- ============================================================
CREATE TABLE cuestionarios (
  id          INT          NOT NULL AUTO_INCREMENT,
  descripcion VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ============================================================
-- TABLA: preguntas
-- ============================================================
CREATE TABLE preguntas (
  id          INT          NOT NULL AUTO_INCREMENT,
  descripcion VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ============================================================
-- TABLA: cuestionario_preguntas
-- ============================================================
-- ✅ CORRECCIÓN #7: No tenía PRIMARY KEY — se agrega id autoincremental
-- ✅ CORRECCIÓN #8: Nombre de columnas sin espacios ni caracteres especiales
CREATE TABLE cuestionario_preguntas (
  id                 INT           NOT NULL AUTO_INCREMENT,
  usuario_id         INT           NOT NULL,
  tipo_cuestionario  VARCHAR(50)   DEFAULT NULL,
  numero_sesion      INT           DEFAULT NULL,
  pregunta_id        INT           DEFAULT NULL,
  respuesta          VARCHAR(500)  DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_cp_usuario  FOREIGN KEY (usuario_id)  REFERENCES usuarios(id)  ON DELETE CASCADE,
  CONSTRAINT fk_cp_pregunta FOREIGN KEY (pregunta_id) REFERENCES preguntas(id) ON DELETE SET NULL
);

-- ============================================================
-- TABLA: ejercicios
-- ============================================================
-- ✅ CORRECCIÓN #9: BIT → TINYINT(1) (más explícito en MySQL, 0=false 1=true)
CREATE TABLE ejercicios (
  id          INT           NOT NULL AUTO_INCREMENT,
  nombre      VARCHAR(100)  NOT NULL,
  descripcion VARCHAR(255)  DEFAULT NULL,
  video       VARCHAR(255)  DEFAULT NULL,
  foto        VARCHAR(255)  DEFAULT NULL,
  doble       TINYINT(1)    NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

-- ============================================================
-- TABLA: musculos
-- ============================================================
-- ✅ CORRECCIÓN #10: Se eliminó "Musculos_1" que era un duplicado exacto
--    de "Musculos" sin ninguna diferencia ni relación explicada.
--    Si se necesita distinguir músculos primarios/secundarios,
--    eso se maneja en ejercicios_musculos (ver abajo).
CREATE TABLE musculos (
  id              INT          NOT NULL AUTO_INCREMENT,
  nombre          VARCHAR(100) NOT NULL,
  musculo_pequeno TINYINT(1)   NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

-- ============================================================
-- TABLA: ejercicios_musculos
-- ============================================================
-- ✅ CORRECCIÓN #11: MusculosSecundarios era un VARCHAR con IDs separados
--    por coma (anti-patrón). Se normaliza: una fila por músculo secundario.
CREATE TABLE ejercicios_musculos (
  id                  INT        NOT NULL AUTO_INCREMENT,
  ejercicio_id        INT        NOT NULL,
  musculo_id          INT        NOT NULL,
  es_principal        TINYINT(1) NOT NULL DEFAULT 1,   -- 1=principal, 0=secundario
  PRIMARY KEY (id),
  CONSTRAINT fk_em_ejercicio FOREIGN KEY (ejercicio_id) REFERENCES ejercicios(id) ON DELETE CASCADE,
  CONSTRAINT fk_em_musculo   FOREIGN KEY (musculo_id)   REFERENCES musculos(id)   ON DELETE RESTRICT
);

-- ============================================================
-- TABLA: sesiones
-- ============================================================
CREATE TABLE sesiones (
  id               INT           NOT NULL AUTO_INCREMENT,
  usuario_id       INT           NOT NULL,
  numero_sesion    INT           DEFAULT NULL,
  completado       TINYINT(1)    NOT NULL DEFAULT 0,
  fecha            DATE          DEFAULT NULL,
  peso_total       DECIMAL(6,2)  DEFAULT NULL,
  tiempo           TIME          DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_sesion_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- ============================================================
-- TABLA: maquinas
-- ============================================================
CREATE TABLE maquinas (
  id          INT          NOT NULL AUTO_INCREMENT,
  usuario_id  INT          DEFAULT NULL,
  numero      INT          DEFAULT NULL,
  descripcion VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_maquina_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- ============================================================
-- TABLA: series
-- ============================================================
CREATE TABLE series (
  id           INT           NOT NULL AUTO_INCREMENT,
  sesion_id    INT           DEFAULT NULL,
  ejercicio_id INT           DEFAULT NULL,
  ejercicio_nombre VARCHAR(100) DEFAULT NULL,
  numero       INT           DEFAULT NULL,
  medida       VARCHAR(50)   DEFAULT NULL,
  peso         DECIMAL(6,2)  DEFAULT NULL,
  repeticiones INT           DEFAULT NULL,
  rir          INT           DEFAULT NULL,   -- Reps In Reserve
  maquina_id   INT           DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_serie_sesion    FOREIGN KEY (sesion_id)    REFERENCES sesiones(id)    ON DELETE CASCADE,
  CONSTRAINT fk_serie_ejercicio FOREIGN KEY (ejercicio_id) REFERENCES ejercicios(id)  ON DELETE SET NULL,
  CONSTRAINT fk_serie_maquina   FOREIGN KEY (maquina_id)   REFERENCES maquinas(id)    ON DELETE SET NULL
);

-- ============================================================
-- TABLA: desempeno
-- ============================================================
-- ✅ CORRECCIÓN #12: "Desempeño" → "desempeno" (sin ñ ni acento)
--    GETDATE() → CURRENT_DATE  (GETDATE es de SQL Server)
CREATE TABLE desempeno (
  id          INT          NOT NULL AUTO_INCREMENT,
  usuario_id  INT          NOT NULL,
  fecha       DATE         NOT NULL DEFAULT (CURRENT_DATE),
  comentario  VARCHAR(300) DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_desemp_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- ============================================================
-- ÍNDICES recomendados para rendimiento
-- ============================================================
CREATE INDEX idx_sesiones_usuario  ON sesiones (usuario_id, fecha );
CREATE INDEX idx_series_sesion     ON series   (sesion_id);
CREATE INDEX idx_series_ejercicio  ON series   (ejercicio_id);
CREATE INDEX idx_em_ejercicio      ON ejercicios_musculos (ejercicio_id);
