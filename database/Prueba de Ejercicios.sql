USE road_to_fit;

-- Planes
INSERT INTO planes (nombre, descripcion, costo) VALUES
('Gratis',   'Acceso básico a la app',         0.00),
('Premium',  'Acceso completo con estadísticas', 199.00),
('Pro',      'Todo Premium más asesoría',        399.00);

-- Roles
INSERT INTO roles (descripcion) VALUES
('Administrador'),
('Entrenador'),
('Usuario');

-- Usuarios
INSERT INTO usuarios (nombre, apellidos, correo, peso, plan_id) VALUES
('Carlos',  'López García',    'carlos@gmail.com',  75.50, 2),
('María',   'Martínez Ruiz',   'maria@gmail.com',   58.00, 1),
('Diego',   'Hernández Cruz',  'diego@gmail.com',   90.00, 3);

-- Usuario_Rol
INSERT INTO usuario_rol (usuario_id, rol_id) VALUES
(1, 3),
(2, 3),
(3, 2);

-- Ejercicios
INSERT INTO ejercicios (nombre, descripcion) VALUES
('Sentadilla',           'Pies al ancho de hombros, baja hasta paralelo'),
('Press de banca',       'Acostado en banca, empuja barra hacia arriba'),
('Peso muerto',          'Levanta barra desde el piso con espalda recta'),
('Dominadas',            'Colgado de barra, sube el mentón por encima'),
('Press militar',        'Empuja barra desde hombros hacia arriba'),
('Curl de bíceps',       'Flexión de codo con mancuerna o barra'),
('Plancha',              'Posición de plank, mantén la posición'),
('Zancadas',             'Pasos largos alternando piernas');

-- Músculos
INSERT INTO musculos (nombre, musculo_pequeno) VALUES
('Cuádriceps',  0),
('Pecho',       0),
('Espalda',     0),
('Hombros',     0),
('Bíceps',      1),
('Tríceps',     1),
('Core',        1),
('Glúteos',     0);

-- Ejercicios_Músculos
INSERT INTO ejercicios_musculos (ejercicio_id, musculo_id, es_principal) VALUES
(1, 1, 1), -- Sentadilla → Cuádriceps (principal)
(1, 8, 0), -- Sentadilla → Glúteos (secundario)
(2, 2, 1), -- Press banca → Pecho (principal)
(2, 6, 0), -- Press banca → Tríceps (secundario)
(3, 3, 1), -- Peso muerto → Espalda (principal)
(3, 8, 0), -- Peso muerto → Glúteos (secundario)
(4, 3, 1), -- Dominadas → Espalda (principal)
(4, 5, 0), -- Dominadas → Bíceps (secundario)
(5, 4, 1), -- Press militar → Hombros (principal)
(6, 5, 1), -- Curl bíceps → Bíceps (principal)
(7, 7, 1), -- Plancha → Core (principal)
(8, 1, 1); -- Zancadas → Cuádriceps (principal)

-- Sesiones
INSERT INTO sesiones (usuario_id, numero_sesion, completado, fecha, peso_total, tiempo) VALUES
(1, 1, 1, '2026-04-10', 150.00, '01:00:00'),
(1, 2, 1, '2026-04-12', 175.00, '01:15:00'),
(2, 1, 1, '2026-04-11', 80.00,  '00:45:00'),
(3, 1, 0, '2026-04-19', NULL,   NULL);

-- Maquinas
INSERT INTO maquinas (usuario_id, numero, descripcion) VALUES
(NULL, 1, 'Banca plana'),
(NULL, 2, 'Rack de sentadillas'),
(NULL, 3, 'Polea alta'),
(NULL, 4, 'Máquina de curl');

-- Series
INSERT INTO series (sesion_id, ejercicio_id, numero, medida, peso, repeticiones, rir, maquina_id) VALUES
(1, 1, 1, 'kg', 60.00, 10, 2, 2),
(1, 1, 2, 'kg', 60.00, 10, 1, 2),
(1, 1, 3, 'kg', 65.00,  8, 0, 2),
(1, 2, 1, 'kg', 80.00,  8, 2, 1),
(1, 2, 2, 'kg', 80.00,  8, 1, 1),
(2, 3, 1, 'kg', 100.00, 5, 2, NULL),
(2, 3, 2, 'kg', 100.00, 5, 1, NULL),
(3, 6, 1, 'kg', 15.00, 12, 2, 4),
(3, 6, 2, 'kg', 15.00, 12, 1, 4);

-- Desempeño
INSERT INTO desempeno (usuario_id, fecha, comentario) VALUES
(1, '2026-04-10', 'Buena sesión, aumenté peso en sentadilla'),
(1, '2026-04-12', 'Me costó más el peso muerto hoy'),
(2, '2026-04-11', 'Primera sesión completada con éxito');