import { Router } from 'express';
import { pool } from './db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'roadtofit_secret_2024';

// ─────────────────────────────────────────
//  MIDDLEWARE — verificar token JWT
// ─────────────────────────────────────────
function verificarToken(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ error: 'Token requerido' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

// ─────────────────────────────────────────
//  AUTH — REGISTRO
// ─────────────────────────────────────────
router.post('/usuarios', async (req, res) => {
  try {
    const { nombre, apellidos, correo, peso_kg, password } = req.body;

    if (!nombre || !correo || !password) {
      return res.status(400).json({ error: 'Nombre, correo y contraseña son requeridos' });
    }

    // Verificar si el correo ya existe
    const [existe] = await pool.query(
      'SELECT id FROM usuarios WHERE correo = ?', [correo]
    );
    if (existe.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Encriptar contraseña
    const password_hash = await bcrypt.hash(password, 10);

    // ✅ CORRECCIÓN: password_hash incluido en el INSERT
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, apellidos, correo, peso, password_hash) VALUES (?, ?, ?, ?, ?)',
      [nombre, apellidos ?? null, correo, peso_kg ?? null, password_hash]
    );

    // Generar token JWT
    const token = jwt.sign(
      { id: result.insertId, nombre, correo },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ id: result.insertId, token });
  } catch (err) {
    console.error('ERROR /usuarios POST:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────
//  AUTH — LOGIN
// ─────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ error: 'Correo y contraseña requeridos' });
    }

    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE correo = ?', [correo]
    );

    if (!rows.length) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }

    const usuario = rows[0];

    const passwordValida = await bcrypt.compare(password, usuario.password_hash || '');
    if (!passwordValida) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      id:      usuario.id,
      nombre:  usuario.nombre,
      correo:  usuario.correo,
      peso:    usuario.peso,
      token,
    });
  } catch (err) {
    console.error('ERROR /login POST:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────
//  USUARIOS
// ─────────────────────────────────────────
router.get('/usuarios/:id', verificarToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, nombre, apellidos, correo, peso FROM usuarios WHERE id = ?',
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error('ERROR /usuarios/:id GET:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────
//  EJERCICIOS
// ─────────────────────────────────────────
router.get('/ejercicios', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ejercicios ORDER BY nombre');
    res.json(rows);
  } catch (err) {
    console.error('ERROR /ejercicios GET:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────
//  SESIONES
// ─────────────────────────────────────────
router.post('/sesiones', verificarToken, async (req, res) => {
  try {
    const { usuario_id, numero_sesion, fecha, completado } = req.body;
    const [result] = await pool.query(
      'INSERT INTO sesiones (usuario_id, numero_sesion, fecha, completado) VALUES (?, ?, ?, ?)',
      [usuario_id, numero_sesion ?? null, fecha ?? null, completado ?? 0]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('ERROR /sesiones POST:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.patch('/sesiones/:id/completar', verificarToken, async (req, res) => {
  try {
    const { completado, peso_total, tiempo } = req.body;
    const [result] = await pool.query(
      'UPDATE sesiones SET completado = ?, peso_total = ?, tiempo = ? WHERE id = ?',
      [completado ?? 1, peso_total ?? null, tiempo ?? null, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Sesion no encontrada' });
    res.json({ ok: true });
  } catch (err) {
    console.error('ERROR /sesiones/:id/completar PATCH:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.get('/sesiones/usuario/:usuario_id', verificarToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM sesiones WHERE usuario_id = ? ORDER BY fecha DESC',
      [req.params.usuario_id]
    );
    res.json(rows);
  } catch (err) {
    console.error('ERROR /sesiones/usuario/:id GET:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────
//  SERIES
// ─────────────────────────────────────────
router.post('/series', verificarToken, async (req, res) => {
  try {
    const { sesion_id, ejercicio_id, numero, medida, peso, repeticiones, rir } = req.body;
    const [result] = await pool.query(
      'INSERT INTO series (sesion_id, ejercicio_id, numero, medida, peso, repeticiones, rir) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [sesion_id, ejercicio_id ?? null, numero ?? 1, medida ?? 'kg', peso ?? null, repeticiones ?? null, rir ?? 0]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('ERROR /series POST:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.get('/series/sesion/:sesion_id', verificarToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM series WHERE sesion_id = ? ORDER BY numero',
      [req.params.sesion_id]
    );
    res.json(rows);
  } catch (err) {
    console.error('ERROR /series/sesion/:id GET:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────
//  HISTORIAL
// ─────────────────────────────────────────
router.get('/historial/usuario/:usuario_id', verificarToken, async (req, res) => {
  try {
    const [sesiones] = await pool.query(
      `SELECT s.id, s.fecha, s.numero_sesion, s.completado, s.tiempo
       FROM sesiones s
       WHERE s.usuario_id = ?
       ORDER BY s.fecha DESC, s.id DESC`,
      [req.params.usuario_id]
    );

    for (const sesion of sesiones) {
      const [series] = await pool.query(
        `SELECT sr.numero, sr.peso, sr.repeticiones, sr.rir,
                COALESCE(e.nombre, sr.ejercicio_id) AS ejercicio
         FROM series sr
         LEFT JOIN ejercicios e ON sr.ejercicio_id = e.id
         WHERE sr.sesion_id = ?
         ORDER BY sr.numero`,
        [sesion.id]
      );
      sesion.series = series;
    }

    res.json(sesiones);
  } catch (err) {
    console.error('ERROR /historial:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────
//  PROGRESO
// ─────────────────────────────────────────
router.get('/progreso/usuario/:usuario_id', verificarToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT s.fecha, e.nombre AS ejercicio, sr.numero, sr.peso, sr.repeticiones, sr.rir
       FROM series sr
       JOIN sesiones s   ON sr.sesion_id    = s.id
       JOIN ejercicios e ON sr.ejercicio_id = e.id
       WHERE s.usuario_id = ?
       ORDER BY s.fecha DESC`,
      [req.params.usuario_id]
    );
    res.json(rows);
  } catch (err) {
    console.error('ERROR /progreso/usuario/:id GET:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────
//  DESEMPENO
// ─────────────────────────────────────────
router.post('/desempeno', verificarToken, async (req, res) => {
  try {
    const { usuario_id, comentario } = req.body;
    const [result] = await pool.query(
      'INSERT INTO desempeno (usuario_id, comentario) VALUES (?, ?)',
      [usuario_id, comentario ?? null]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('ERROR /desempeno POST:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.get('/desempeno/usuario/:usuario_id', verificarToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM desempeno WHERE usuario_id = ? ORDER BY fecha DESC',
      [req.params.usuario_id]
    );
    res.json(rows);
  } catch (err) {
    console.error('ERROR /desempeno/usuario/:id GET:', err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;