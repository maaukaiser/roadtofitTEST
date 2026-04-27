# 🏋️ Road To Fit v3
**Entrenamiento con IA — sin servidor, sin costo en la nube**

> Proyecto: Administración de Proyectos de Software — Grupo 008  
> Matrícula: Diego Cantú (PM), Fátima Bocanegra, Emilio Estrada, Mauricio González, David Hernández, Monserrat Ceja, Diego López

---

## 🚀 Cómo usar (3 opciones)

### Opción A — Abrir directo en navegador (más rápido)
```
Doble click en index.html → Abre en Chrome/Safari
```
> ⚠️ Para la cámara necesitas servir desde localhost o HTTPS.

### Opción B — Servir localmente (recomendado para cámara)
```bash
# Requiere Node.js
npm install
npm run serve
# Abre: http://localhost:3000
```

### Opción C — Convertir a APK / iOS (producción)
```bash
npm install
npm run build-android   # Abre Android Studio → Build → APK
npm run build-ios       # Abre Xcode → Archive → Distribute
```

---

## ⚡ Arquitectura v3 (sin Python)

```
Antes (v2):           Ahora (v3):
┌────────────┐        ┌────────────────────────────┐
│  Celular   │◄──────►│  index.html (todo aquí)    │
└────────────┘  HTTP  │  ├── MediaPipe JS (IA)     │
       │              │  ├── Lógica de ángulos      │
       ▼              │  ├── UI + Auth              │
┌────────────┐        │  └── localStorage (datos)   │
│ Python/    │        └────────────────────────────┘
│ Flask +    │
│ YOLOv8     │   ← ELIMINADO ✓ Ya no necesario
└────────────┘
```

**Ventajas:**
- ✅ Cero costo de servidor
- ✅ Funciona sin internet (PWA offline)
- ✅ Instalable como app nativa (CapacitorJS)
- ✅ La IA corre en el celular del usuario (~30fps)

---

## 📋 Ejercicios con análisis IA (MediaPipe Pose)

| Ejercicio | Articulaciones | Métrica |
|---|---|---|
| Curl de Bíceps | Hombro → Codo → Muñeca | Ángulo + Reps |
| Sentadilla | Cadera → Rodilla → Tobillo | Ángulo + Reps |
| Flexiones | Hombro → Codo → Muñeca | Ángulo + Reps |
| Press de Hombro | Hombro → Codo → Muñeca | Ángulo + Reps |
| Plancha | Hombro → Cadera → Rodilla | Alineación + Tiempo |

---

## 🗄️ Configuración de Base de Datos (MySQL + XAMPP)

Para habilitar la persistencia de datos en la nube local y el historial avanzado, sigue estos pasos:

### 1. Servidor de Base de Datos (XAMPP)
1. Instala y abre **XAMPP Control Panel**.
2. Inicia los módulos **Apache** y **MySQL**.
3. Ve a `http://localhost/phpmyadmin` en tu navegador.
4. Crea una base de datos llamada `road_to_fit`.
5. Importa el archivo `database/BoD.sql` (esto creará las tablas necesarias, incluyendo la nueva columna `ejercicio_nombre`).

### 2. Configuración del Backend (Node.js)
1. Ve a la carpeta `server-backend/`.
2. Crea un archivo `.env` basado en `.env.example`:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=road_to_fit
   PORT=3001
   JWT_SECRET=tu_clave_secreta
   ```
3. Instala dependencias e inicia el servidor:
   ```bash
   npm install
   node index.js
   ```

### 3. Conexión del Frontend
Una vez que el servidor esté corriendo en el puerto `3001`, abre `index.html`. La app detectará automáticamente el backend. Al registrarte o iniciar sesión, tus datos se guardarán en MySQL en lugar de solo en el navegador.

---

## 📱 Requisitos del Acta Constitutiva ✅

| Requisito | Estado |
|---|---|
| Análisis biomecánico en tiempo real | ✅ MediaPipe Pose JS |
| Retroalimentación técnica + alertas | ✅ Feedback visual en tiempo real |
| Rutinas personalizadas (principiante/intermedio/avanzado) | ✅ Plantillas + nivel de usuario |
| Registro de rutinas, series y peso | ✅ localStorage + historial |
| Gráficas de progreso semanal | ✅ Canvas chart semanal |
| Biblioteca de ejercicios por grupos musculares | ✅ +40 ejercicios clasificados |
| Interfaz móvil (User-Centered Design) | ✅ PWA dark mode responsive |
| Tiempos de carga < 2 segundos | ✅ Single file, sin servidor |
| Seguridad de datos | ✅ Todo local, sin datos en la nube |

---

## 🧠 Cómo funciona la IA

1. **MediaPipe Pose** detecta 33 puntos del cuerpo en tiempo real
2. Se calculan ángulos usando la **ley del coseno** entre 3 puntos articulares
3. Una **máquina de estados** (down/up con historial suavizado) cuenta reps
4. Se da retroalimentación instantánea según el ángulo y la postura

```js
// Ejemplo: ángulo del codo para Curl Bíceps
const angle = calcAngle(
  [shoulder.x, shoulder.y],   // Punto A: hombro
  [elbow.x,    elbow.y],      // Punto B: codo (vértice)
  [wrist.x,    wrist.y]       // Punto C: muñeca
);
// Si angle > 155° → posición baja (rep completada hacia abajo)
// Si angle < 55°  → posición alta (rep completada hacia arriba)
```
