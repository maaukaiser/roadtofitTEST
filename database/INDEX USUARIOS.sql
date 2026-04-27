USE road_to_fit;

DROP INDEX idx_sesiones_usuario ON sesiones;

CREATE INDEX idx_sesiones_usuario ON sesiones (usuario_id, fecha);