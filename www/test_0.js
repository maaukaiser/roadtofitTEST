
    /* ================================================
       ROAD TO FIT v3 — MediaPipe Pure JS
       Todos los requisitos del Acta Constitutiva
       ================================================ */

    // ======= EXERCISE DATABASE =======
    const MUSCLE_GROUPS = [
      { id: 'biceps', label: 'Bíceps', icon: '💪' },
      { id: 'triceps', label: 'Tríceps', icon: '🦾' },
      { id: 'hombros', label: 'Hombros', icon: '🤸' },
      { id: 'pecho', label: 'Pecho', icon: '🫀' },
      { id: 'espalda', label: 'Espalda', icon: '🏗️' },
      { id: 'core', label: 'Core/Abdomen', icon: '🔥' },
      { id: 'cuadriceps', label: 'Cuádriceps', icon: '🦵' },
      { id: 'isquios', label: 'Isquiotibiales', icon: '🦵' },
      { id: 'gluteos', label: 'Glúteos', icon: '🍑' },
      { id: 'pantorrillas', label: 'Pantorrillas', icon: '🦶' },
      { id: 'cardio', label: 'Cardio', icon: '❤️' },
    ];
    const EXERCISES = [
      { id: 'curl_bicep', name: 'Curl de Bíceps', muscle: 'biceps', icon: '💪', ai: true, desc: 'Curl clásico, bícep braquial', videoId: 'in7PaeYlhrM' },
      { id: 'curl_martillo', name: 'Curl Martillo', muscle: 'biceps', icon: '💪', desc: 'Agarre neutro' },
      { id: 'curl_concentrado', name: 'Curl Concentrado', muscle: 'biceps', icon: '💪', desc: 'Apoyo en rodilla' },
      { id: 'curl_polea', name: 'Curl en Polea', muscle: 'biceps', icon: '💪', desc: 'Tensión constante' },
      { id: 'curl_barra', name: 'Curl con Barra', muscle: 'biceps', icon: '🏋️', desc: 'Movimiento bilateral' },
      { id: 'tricep_polea', name: 'Extensión en Polea', muscle: 'triceps', icon: '🦾', desc: 'Empuje hacia abajo' },
      { id: 'fondos', name: 'Fondos (Dips)', muscle: 'triceps', icon: '🦾', desc: 'Peso corporal' },
      { id: 'press_frances', name: 'Press Francés', muscle: 'triceps', icon: '🦾', desc: 'Barra EZ tumbado' },
      { id: 'tricep_copa', name: 'Extensión sobre cabeza', muscle: 'triceps', icon: '🦾', desc: 'Estiramiento completo' },
      { id: 'kickback', name: 'Patada de Tríceps', muscle: 'triceps', icon: '🦾', desc: 'Con mancuerna inclinado' },
      { id: 'press_hombro', name: 'Press de Hombro', muscle: 'hombros', icon: '🏋️', ai: true, desc: 'Barra o mancuerna, sentado o de pie', videoId: 'B-aVpuGxEks' },
      { id: 'elev_lateral', name: 'Elevación Lateral', muscle: 'hombros', icon: '🤸', desc: 'Deltoides medial' },
      { id: 'elev_frontal', name: 'Elevación Frontal', muscle: 'hombros', icon: '🤸', desc: 'Deltoides anterior' },
      { id: 'facepull', name: 'Face Pull', muscle: 'hombros', icon: '🤸', desc: 'Deltoides posterior' },
      { id: 'press_banca', name: 'Press de Banca', muscle: 'pecho', icon: '🏋️', ai: true, desc: 'Pecho completo', videoId: 'rT7DgCr-3pg' },
      { id: 'press_inclinado', name: 'Press Inclinado', muscle: 'pecho', icon: '🏋️', desc: 'Pecho superior' },
      { id: 'aperturas', name: 'Aperturas (Flyes)', muscle: 'pecho', icon: '🤸', desc: 'Estiramiento pectoral' },
      { id: 'flexiones', name: 'Flexiones', muscle: 'pecho', icon: '🤸', desc: 'Empuje con peso corporal' },
      { id: 'press_mancuerna', name: 'Press Mancuerna', muscle: 'pecho', icon: '🏋️', desc: 'Mayor rango de movimiento' },
      { id: 'dominadas', name: 'Dominadas', muscle: 'espalda', icon: '🧗', desc: 'Jalón al pecho, dorsal', videoId: 'eGo4IYPNgEM' },
      { id: 'jalon_polea', name: 'Jalón en Polea', muscle: 'espalda', icon: '🏗️', desc: 'Alternativa a dominadas' },
      { id: 'remo_barra', name: 'Remo con Barra', muscle: 'espalda', icon: '🏗️', desc: 'Dorsal y romboides' },
      { id: 'peso_muerto', name: 'Peso Muerto', muscle: 'espalda', icon: '🏋️', desc: 'Movimiento compuesto', videoId: 'wYREQkVtvEc' },
      { id: 'plancha', name: 'Plancha Estática', muscle: 'core', icon: '🔥', ai: true, desc: 'Core completo, postura', videoId: 'ASdvN_XEl_c' },
      { id: 'plancha_tiempo', name: 'Plancha con IA', muscle: 'core', icon: '🔥', ai: true, desc: 'Temporizador + forma correcta', videoId: 'ASdvN_XEl_c' },
      { id: 'crunch', name: 'Crunch Abdominal', muscle: 'core', icon: '🔥', desc: 'Recto abdominal' },
      { id: 'russian_twist', name: 'Russian Twist', muscle: 'core', icon: '🔥', desc: 'Oblicuos' },
      { id: 'leg_raise', name: 'Elevación de piernas', muscle: 'core', icon: '🔥', desc: 'Abdomen inferior' },
      { id: 'sentadilla', name: 'Sentadilla', muscle: 'cuadriceps', icon: '🦵', ai: true, desc: 'Movimiento rey del tren inferior', videoId: 'U3H3OoaJ8xI' },
      { id: 'sentadilla_frontal', name: 'Sentadilla Frontal', muscle: 'cuadriceps', icon: '🦵', desc: 'Mayor foco cuádriceps' },
      { id: 'prensa', name: 'Prensa de Piernas', muscle: 'cuadriceps', icon: '🦵', desc: 'Máquina' },
      { id: 'zancadas', name: 'Zancadas (Lunges)', muscle: 'cuadriceps', icon: '🦵', desc: 'Con o sin peso' },
      { id: 'sentadilla_bulgara', name: 'Sentadilla Búlgara', muscle: 'cuadriceps', icon: '🦵', desc: 'Un pie elevado' },
      { id: 'curl_pierna', name: 'Curl de Pierna', muscle: 'isquios', icon: '🦵', desc: 'Isquiotibiales' },
      { id: 'rdl', name: 'Peso Muerto Rumano', muscle: 'isquios', icon: '🦵', desc: 'Cadena posterior' },
      { id: 'hip_thrust', name: 'Hip Thrust', muscle: 'gluteos', icon: '🍑', desc: 'Glúteo máximo' },
      { id: 'glute_kick', name: 'Patada Glúteo', muscle: 'gluteos', icon: '🍑', desc: 'Cuadrupedia' },
      { id: 'calf_raise', name: 'Elevación de Talones', muscle: 'pantorrillas', icon: '🦶', desc: 'Gemelos' },
      { id: 'correr', name: 'Correr/Trotear', muscle: 'cardio', icon: '🏃', desc: 'Cinta o exterior' },
      { id: 'burpees', name: 'Burpees', muscle: 'cardio', icon: '🔥', desc: 'Cuerpo completo + cardio' },
    ];

    // AI exercise configs
    const AI_CONFIG = {
      curl_bicep: {
        name: 'Curl de Bíceps', emoji: '💪',
        joints: { RIGHT: [12, 14, 16], LEFT: [11, 13, 15] }, // shoulder,elbow,wrist
        angleDown: 145, angleUp: 60,   // más tolerante: start zone > 145°, target zone < 60°
        downFrames: 2, upFrames: 2,    // respuesta rápida
        feedDown: '⬇️ Baja el brazo completamente',
        feedUp: '⬆️ ¡Sube y aprieta el bíceps!',
        feedGood: '✅ ¡Buena contracción!',
        feedWarn: '⚠️ Estabiliza el codo',
        checkSway: true,
        mode: 'rep',
      },
      sentadilla: {
        name: 'Sentadilla', emoji: '🦵',
        joints: { RIGHT: [24, 26, 28], LEFT: [23, 25, 27] }, // hip,knee,ankle
        angleDown: 120, angleUp: 150,
        downFrames: 2, upFrames: 2,
        feedDown: '⬇️ Baja más — rodillas a 90°',
        feedUp: '⬆️ Sube y aprieta glúteos',
        feedGood: '✅ ¡Rango completo!',
        feedWarn: '⚠️ Mantén la espalda recta',
        checkSway: false,
        mode: 'rep',
      },
      press_banca: {
        name: 'Press de Banca', emoji: '🏋️',
        joints: { RIGHT: [12, 14, 16], LEFT: [11, 13, 15] }, // shoulder,elbow,wrist
        angleDown: 80, angleUp: 150,
        downFrames: 3, upFrames: 3,
        feedDown: '⬇️ Baja la barra al pecho',
        feedUp: '⬆️ ¡Empuja explosivo!',
        feedGood: '✅ ¡Rango completo!',
        feedWarn: '⚠️ No rebotes la barra',
        checkSway: false,
        mode: 'rep',
      },
      press_hombro: {
        name: 'Press de Hombro', emoji: '🏋️',
        joints: { RIGHT: [12, 14, 16], LEFT: [11, 13, 15] },
        angleDown: 125, angleUp: 140,
        downFrames: 2, upFrames: 2,
        feedDown: '⬇️ Baja a nivel de hombro',
        feedUp: '⬆️ ¡Extiende completamente!',
        feedGood: '✅ ¡Buen rango!',
        feedWarn: '⚠️ Controla el movimiento',
        checkSway: false,
        mode: 'rep',
      },
      plancha_tiempo: {
        name: 'Plancha con IA', emoji: '🔥',
        joints: { RIGHT: [12, 24, 26], LEFT: [11, 23, 25] }, // shoulder,hip,knee for alignment
        angleDown: 155, angleUp: 175, // hip angle (should stay ~180° = straight)
        downFrames: 0, upFrames: 0,
        feedGood: '🔥 ¡Posición correcta! Mantén',
        feedWarn: '⚠️ Sube las caderas — cuerpo recto',
        checkSway: false,
        mode: 'time', // timed exercise
      },
    };

    // ======= API & AUDIO =======
    const API_URL = 'http://localhost:3001/api';

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    function playBeep() {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine'; osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(); osc.stop(audioCtx.currentTime + 0.3);
    }

    let lastBuzz = 0;
    function playBuzz() {
      const now = Date.now();
      if (now - lastBuzz < 2000) return;
      lastBuzz = now;
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth'; osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(); osc.stop(audioCtx.currentTime + 0.4);
    }

    // ======= APP STATE =======
    let S = {
      user: null,
      token: null,
      workouts: [],
      customEx: [],
      activeWo: null,
      wSec: 0, wTimer: null,
      selMuscle: null,
      // AI
      aiEx: 'curl_bicep',
      aiArm: 'RIGHT',
      aiRunning: false,
      aiReps: 0,
      aiAngle: null,
      aiQual: '--',
      aiFeed: 'Presiona Iniciar',
      aiFeedType: '',
      aiPhase: 'down',
      aiConfDown: 0,
      aiConfUp: 0,
      aiRepConfirmed: false,
      aiAngleHistory: [],
      aiPlanchaTime: 0,
      aiPlanchaTimer: null,
      // MediaPipe
      mpPose: null,
      mpCamera: null,
      mpCanvas: null,
      mpCtx: null,
      mpVideo: null,
    };

    // ======= BOOT =======
    window.addEventListener('DOMContentLoaded', async () => {
      setLoader('Cargando MediaPipe...');
      await loadMPPromise();
      setLoader('Listo 💪');
      setTimeout(() => {
        document.getElementById('mp-loader').classList.add('hide');
      }, 600);
      loadStorage();
      renderMPGrid();
    });

    function setLoader(msg) { document.getElementById('loader-msg').textContent = msg; }

    function loadMPPromise() {
      return new Promise(resolve => {
        // Give scripts time to load
        let attempts = 0;
        const check = setInterval(() => {
          attempts++;
          if (typeof Pose !== 'undefined' && typeof Camera !== 'undefined') {
            clearInterval(check);
            resolve();
          } else if (attempts > 40) {
            clearInterval(check);
            resolve(); // Continue anyway
          }
        }, 150);
      });
    }

    // ======= STORAGE =======
    function save() {
      try {
        localStorage.setItem('rtf_user', JSON.stringify(S.user));
        // S.workouts should now be populated dynamically from the backend
        localStorage.setItem('rtf_custom_ex', JSON.stringify(S.customEx));
      } catch (e) { }
    }

    async function fetchBackendData() {
      if (!S.token || !S.user) return;
      try {
        const res = await fetch(API_URL + `/historial/usuario/${S.user.id}`, {
          headers: { 'Authorization': `Bearer ${S.token}` }
        });
        if (!res.ok) return;
        const sesiones = await res.json();
        S.workouts = sesiones.map(s => {
          let totalReps = 0; let totalSets = 0;
          const exs = [];
          const exMap = {};
          s.series?.forEach(sr => {
            totalSets++; totalReps += sr.repeticiones || 0;
            const eName = sr.ejercicio || 'Desconocido';
            if (!exMap[eName]) {
              exMap[eName] = { name: eName, icon: '🏋️', sets: [] };
              exs.push(exMap[eName]);
            }
            exMap[eName].sets.push({ reps: sr.repeticiones, weight: sr.peso });
          });
          return {
            id: s.id,
            title: `Sesión #${s.numero_sesion || s.id}`,
            date: s.fecha,
            duration: s.tiempo || 0,
            exercises: exs,
            totalReps, totalSets
          };
        });
        // Trigger re-renders if app is active
        if (document.getElementById('screen-app')?.classList.contains('active')) {
          updateHomeUI(); renderHistory(); renderProgress(); updateProfileUI();
        }
      } catch (e) {
        console.error('Error fetching historial:', e);
      }
    }

    async function loadStorage() {
      try {
        const u = localStorage.getItem('rtf_user');
        const token = localStorage.getItem('rtf_token');
        const cx = localStorage.getItem('rtf_custom_ex');
        if (u && token) {
          S.user = JSON.parse(u);
          S.token = token;
          // Fetch workouts initially
          await fetchBackendData();
        }
        if (cx) S.customEx = JSON.parse(cx);
      } catch (e) { }

      if (S.user) showApp();
      else switchScreen('auth');
    }

    // ======= AUTH =======
    function switchAuthTab(t) {
      const isLogin = t === 'login';
      document.getElementById('at-login').classList.toggle('active', isLogin);
      document.getElementById('at-reg').classList.toggle('active', !isLogin);
      document.getElementById('af-login').classList.toggle('active', isLogin);
      document.getElementById('af-reg').classList.toggle('active', !isLogin);
      document.getElementById('at-pill').style.transform = isLogin ? '' : 'translateX(100%)';
    }
    function pickLevel(btn) {
      document.querySelectorAll('.lvl').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }

    async function handleLogin() {
      const correo = v('l-email'), password = v('l-pass');
      if (!correo || !password) { toast('Completa todos los campos'); return; }

      try {
        const res = await fetch(API_URL + '/login', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ correo, password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error al iniciar sesión');

        S.user = { id: data.id, name: data.nombre, email: data.correo, weight: data.peso };
        S.token = data.token;
        localStorage.setItem('rtf_token', data.token);
        localStorage.setItem('rtf_user', JSON.stringify(S.user));
        toast('Cargando entrenamientos...');
        await fetchBackendData();
        showApp();
        toast('¡Bienvenido de vuelta! 💪');
      } catch (e) {
        // === MODO OFFLINE/DEMO: Si falla el backend, usar local ===
        console.warn("Backend falló, usando modo Offline");
        const saved = JSON.parse(localStorage.getItem('rtf_all_users') || '[]');
        const found = saved.find(u => u.email === correo && u._pass === password);
        if (!found) { toast('❌ Error de red o credenciales incorrectas'); return; }

        S.user = { ...found }; delete S.user._pass;
        S.token = "demo_token_offline";
        localStorage.setItem('rtf_token', S.token);
        localStorage.setItem('rtf_user', JSON.stringify(S.user));
        showApp();
        toast('Iniciaste en Modo Offline 🔌');
      }
    }

    async function handleRegister() {
      const nombre = v('r-name'), correo = v('r-email'), password = v('r-pass');
      if (!nombre || !correo || !password) { toast('Completa los campos obligatorios'); return; }
      const peso_kg = v('r-weight') || null;
      const apellidos = ''; // Backend requiere apellidos pero puede ser null/vació

      try {
        const res = await fetch(API_URL + '/usuarios', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, apellidos, correo, peso_kg, password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error al registrar usuario');

        S.user = { id: data.id, name: nombre, email: correo, weight: peso_kg };
        S.token = data.token;
        localStorage.setItem('rtf_token', data.token);
        localStorage.setItem('rtf_user', JSON.stringify(S.user));
        S.workouts = []; // Usuario nuevo
        save();
        showApp();
        toast(`¡Listo, ${nombre}! Comencemos 🔥`);
      } catch (e) {
        // === MODO OFFLINE/DEMO: Guardar localmente ===
        console.warn("Backend falló, registrando en Modo Offline");
        const all = JSON.parse(localStorage.getItem('rtf_all_users') || '[]');
        if (all.find(u => u.email === correo)) { toast('❌ Ese correo ya está registrado localmente'); return; }

        const newUser = { id: Date.now(), name: nombre, email: correo, _pass: password, weight: peso_kg };
        all.push(newUser);
        localStorage.setItem('rtf_all_users', JSON.stringify(all));

        S.user = { ...newUser }; delete S.user._pass;
        S.token = "demo_token_offline";
        S.workouts = [];
        localStorage.setItem('rtf_token', S.token);
        localStorage.setItem('rtf_user', JSON.stringify(S.user));
        showApp();
        toast(`¡Demo Offline lista, ${nombre}! 🔥`);
      }
    }

    function handleLogout() {
      S.user = null;
      S.token = null;
      localStorage.removeItem('rtf_token');
      localStorage.removeItem('rtf_user');
      switchScreen('auth');
      toast('Sesión cerrada');
    }

    async function editProfile() {
      // Simple inline edit: allow updating weight
      const w = prompt('Actualiza tu peso (kg):', S.user?.weight || '');
      if (w !== null && w.trim()) {
        const newWeight = w.trim();
        try {
          if (S.token && S.token !== "demo_token_offline") {
            await fetch(API_URL + `/usuarios/${S.user.id}/peso`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${S.token}` },
              body: JSON.stringify({ peso: newWeight })
            });
          }
          S.user.weight = newWeight;
          updateProfileUI();
          save();
          toast('✅ Perfil actualizado en la nube');
        } catch (e) {
          console.error(e);
          toast('❌ Error al actualizar peso');
        }
      }
    }

    // ======= SCREENS =======
    function switchScreen(s) {
      document.querySelectorAll('.screen').forEach(e => e.classList.remove('active'));
      document.getElementById(`screen-${s}`).classList.add('active');
    }
    function showApp() {
      switchScreen('app');
      updateHomeUI();
      updateProfileUI();
      renderExTab();
      renderHistory();
      renderProgress();
    }

    // ======= HOME UI =======
    function updateHomeUI() {
      if (!S.user) return;
      const h = new Date().getHours();
      setText('home-greet', h < 12 ? 'Buenos días 👋' : h < 18 ? 'Buenas tardes 👋' : 'Buenas noches 👋');
      setText('home-name', S.user.name);
      const init = (S.user.name || 'A').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
      setText('av-chip', init);
      const totalReps = S.workouts.reduce((s, w) => s + (w.totalReps || 0), 0);
      const totalSets = S.workouts.reduce((s, w) => s + (w.totalSets || 0), 0);
      const streak = calcStreak();
      setText('tri-wo', S.workouts.length);
      setText('tri-reps', totalReps);
      setText('tri-sets', totalSets);
      setText('sp-num', streak);
      setText('sp-msg', streak === 0 ? '¡Empieza hoy!' : streak >= 7 ? '¡Racha brutal! 🏆' : '¡Sigue así!');
      renderWeekChart();
      renderLastWo();
    }
    function renderWeekChart() {
      const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
      const today = new Date();
      const todayIdx = today.getDay() === 0 ? 6 : today.getDay() - 1;
      const counts = Array(7).fill(0);
      S.workouts.forEach(w => {
        const d = new Date(w.date);
        const diff = Math.round((today - d) / 86400000);
        if (diff >= 0 && diff < 7) counts[(todayIdx - diff + 7) % 7]++;
      });
      const max = Math.max(...counts, 1);
      const el = document.getElementById('week-chart');
      if (!el) return;
      el.innerHTML = counts.map((c, i) => {
        const pct = Math.max(8, Math.round((c / max) * 64));
        const isToday = i === todayIdx;
        return `<div class="wbar-wrap">
      <div class="wbar ${isToday ? 'today' : c > 0 ? 'active' : ''}" style="height:${pct}px"></div>
      <div class="wday ${isToday ? 'today' : ''}">${days[i]}</div>
    </div>`;
      }).join('');
    }
    function renderLastWo() {
      const el = document.getElementById('last-wo');
      if (!S.workouts.length) {
        el.innerHTML = `<div class="empty-card">💪 Sin entrenamientos aún. ¡Comienza hoy!</div>`;
        return;
      }
      const w = S.workouts[S.workouts.length - 1];
      const d = new Date(w.date).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'short' });
      el.innerHTML = `<div class="wo-card">
    <div class="wo-card-hd"><h3>${w.title || 'Entrenamiento'}</h3><span>${fmtDur(w.duration || 0)}</span></div>
    <div class="wo-card-date">${d}</div>
    <div class="wo-tags">
      <span class="wo-tag">💪 ${w.exercises?.length || 0} ejercicios</span>
      <span class="wo-tag">🔁 ${w.totalReps || 0} reps</span>
      <span class="wo-tag">📊 ${w.totalSets || 0} series</span>
    </div>
  </div>`;
    }

    // ======= EXERCISES TAB =======
    function renderExTab(query = '') {
      const q = query.toLowerCase().trim();
      const all = [...EXERCISES, ...S.customEx];
      const filtered = q ? all.filter(e => e.name.toLowerCase().includes(q) || e.muscle.toLowerCase().includes(q) || (MUSCLE_GROUPS.find(m => m.id === e.muscle)?.label || '').toLowerCase().includes(q)) : all;
      const grouped = {};
      filtered.forEach(e => { if (!grouped[e.muscle]) grouped[e.muscle] = []; grouped[e.muscle].push(e); });
      const container = document.getElementById('ex-by-muscle');
      if (!container) return;
      if (!Object.keys(grouped).length) { container.innerHTML = `<div style="padding:30px;text-align:center;color:var(--fg3)">Sin resultados</div>`; return; }
      let html = '';
      MUSCLE_GROUPS.forEach(mg => {
        const exs = grouped[mg.id];
        if (!exs) return;
        html += `<div class="muscle-section">
      <div class="ms-head"><span class="ms-title">${mg.icon} ${mg.label}</span><span class="ms-count">${exs.length}</span></div>
      ${exs.map(ex => `<div class="ex-row" onclick="openExDetail('${ex.id}')">
        <div class="ex-icon">${ex.icon}</div>
        <div class="ex-info">
          <div class="ex-name">${ex.name}${ex.ai ? ' ⚡' : ''}</div>
          <div class="ex-desc">${ex.desc || ''}</div>
          ${ex.videoId ? `<button class="btn-tutorial" onclick="event.stopPropagation(); openTutorial('${ex.videoId}', '${ex.name.replace(/'/g, "\\'")}')">🎥 Ver Tutorial</button>` : ''}
        </div>
        ${ex.ai ? '<div class="ex-ai-dot"></div>' : ''}
      </div>`).join('')}
    </div>`;
      });
      container.innerHTML = html;
    }
    function openExDetail(id) {
      const ex = [...EXERCISES, ...S.customEx].find(e => e.id === id);
      if (!ex) return;
      if (ex.ai) launchAI(ex.id);
      else toast(`${ex.icon} ${ex.name} — ${ex.desc || ex.muscle}`);
    }

    function openTutorial(videoId, title) {
      const iframe = document.getElementById('tut-iframe');
      if (iframe) iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      setText('tut-title', title + ' - Tutorial');
      openMod('mod-tutorial');
    }

    function closeTutorial() {
      const iframe = document.getElementById('tut-iframe');
      if (iframe) iframe.src = '';
      closeMod('mod-tutorial');
    }

    // ======= ADD CUSTOM EXERCISE =======
    function openAddExercise() {
      document.getElementById('new-ex-name').value = '';
      document.getElementById('new-ex-note').value = '';
      S.selMuscle = null;
      document.querySelectorAll('.mpg-btn').forEach(b => b.classList.remove('sel'));
      openMod('mod-new-ex');
    }
    function renderMPGrid() {
      const grid = document.getElementById('muscle-picker');
      if (!grid) return;
      grid.innerHTML = MUSCLE_GROUPS.map(mg =>
        `<button class="mpg-btn" onclick="selMuscle(this,'${mg.id}')">${mg.icon} ${mg.label}</button>`
      ).join('');
    }
    function selMuscle(btn, id) {
      document.querySelectorAll('.mpg-btn').forEach(b => b.classList.remove('sel'));
      btn.classList.add('sel');
      S.selMuscle = id;
    }
    function saveNewExercise() {
      const name = document.getElementById('new-ex-name').value.trim();
      if (!name) { toast('Escribe un nombre'); return; }
      if (!S.selMuscle) { toast('Selecciona el músculo'); return; }
      const mg = MUSCLE_GROUPS.find(m => m.id === S.selMuscle);
      S.customEx.push({ id: 'custom_' + Date.now(), name, muscle: S.selMuscle, icon: mg?.icon || '💪', desc: document.getElementById('new-ex-note').value.trim(), custom: true });
      save();
      closeMod('mod-new-ex');
      renderExTab();
      toast('✅ Ejercicio añadido');
    }

    // ======= ACTIVE WORKOUT =======
    function openNewWorkout() {
      S.activeWo = { id: Date.now(), title: 'Nuevo Entrenamiento', date: new Date().toISOString(), exercises: [] };
      S.wSec = 0;
      document.getElementById('wo-ex-list').innerHTML = '';
      document.getElementById('wo-title').value = 'Nuevo Entrenamiento';
      openOverlay('ov-workout');
      clearInterval(S.wTimer);
      S.wTimer = setInterval(() => {
        S.wSec++;
        const m = String(Math.floor(S.wSec / 60)).padStart(2, '0');
        const sec = String(S.wSec % 60).padStart(2, '0');
        setText('ov-timer', `${m}:${sec}`);
      }, 1000);
    }
    function startTemplate(type) {
      const tpls = {
        upper: { title: 'Tren Superior', ids: ['press_banca', 'dominadas', 'curl_bicep', 'press_hombro', 'tricep_polea'] },
        lower: { title: 'Tren Inferior', ids: ['sentadilla', 'peso_muerto', 'zancadas', 'calf_raise', 'hip_thrust'] },
        fullbody: { title: 'Full Body', ids: ['sentadilla', 'press_banca', 'peso_muerto', 'curl_bicep', 'fondos'] },
      };
      const tpl = tpls[type];
      openNewWorkout();
      document.getElementById('wo-title').value = tpl.title;
      S.activeWo.title = tpl.title;
      tpl.ids.forEach(id => { const e = [...EXERCISES, ...S.customEx].find(e => e.id === id); if (e) pushExToWo(e); });
    }
    function openPickEx() {
      filterPick('');
      document.getElementById('pick-srch').value = '';
      openMod('mod-pick');
    }
    function filterPick(q) {
      const query = q.toLowerCase();
      const all = [...EXERCISES, ...S.customEx];
      const filtered = query ? all.filter(e => e.name.toLowerCase().includes(query) || (MUSCLE_GROUPS.find(m => m.id === e.muscle)?.label || '').toLowerCase().includes(query)) : all;
      const grouped = {};
      filtered.forEach(e => { if (!grouped[e.muscle]) grouped[e.muscle] = []; grouped[e.muscle].push(e); });
      let html = '';
      MUSCLE_GROUPS.forEach(mg => {
        const exs = grouped[mg.id];
        if (!exs) return;
        html += `<div class="pick-grp">${mg.icon} ${mg.label}</div>`;
        html += exs.map(ex => `<div class="pick-item" onclick="addExToWo('${ex.id}')">
      <span class="pi-em">${ex.icon}</span>
      <div class="pi-info"><h5>${ex.name}</h5><span>${ex.desc || mg.label}</span></div>
    </div>`).join('');
      });
      document.getElementById('pick-list').innerHTML = html || `<div style="padding:20px;text-align:center;color:var(--fg3)">Sin resultados</div>`;
    }
    function addExToWo(id) {
      const ex = [...EXERCISES, ...S.customEx].find(e => e.id === id);
      if (!ex || !S.activeWo) return;
      pushExToWo(ex);
      closeMod('mod-pick');
    }
    function pushExToWo(ex) {
      S.activeWo.exercises.push({ ...ex, sets: [{ reps: '', weight: '' }] });
      renderWoEx();
    }
    function renderWoEx() {
      const list = document.getElementById('wo-ex-list');
      if (!list || !S.activeWo) return;
      const total = S.activeWo.exercises.length;
      list.innerHTML = S.activeWo.exercises.map((ex, ei) => `
    <div class="wo-ex-card">
      <div class="wo-ex-hd">
        <div class="wo-ex-nm">${ex.icon} ${ex.name}</div>
        <div class="wo-ex-actions">
          <button class="ex-ord-btn" onclick="moveEx(${ei},-1)" title="Mover arriba" ${ei === 0 ? 'disabled' : ''}>↑</button>
          <button class="ex-ord-btn" onclick="moveEx(${ei},1)" title="Mover abajo" ${ei === total - 1 ? 'disabled' : ''}>↓</button>
          <button class="add-set" onclick="addSet(${ei})">+ Serie</button>
          <button class="ex-del-btn" onclick="removeEx(${ei})" title="Eliminar ejercicio">✕</button>
        </div>
      </div>
      <table class="sets-tbl">
        <tr><th>#</th><th>Reps</th><th>Peso kg</th></tr>
        ${ex.sets.map((s, si) => `<tr>
          <td>${si + 1}</td>
          <td><input type="number" value="${s.reps}" placeholder="12" inputmode="numeric" oninput="updSet(${ei},${si},'reps',this.value)"></td>
          <td><input type="number" value="${s.weight}" placeholder="0" inputmode="decimal" oninput="updSet(${ei},${si},'weight',this.value)"></td>
        </tr>`).join('')}
      </table>
    </div>`).join('');
    }
    function addSet(ei) { S.activeWo.exercises[ei].sets.push({ reps: '', weight: '' }); renderWoEx(); }
    function updSet(ei, si, field, val) { if (S.activeWo) S.activeWo.exercises[ei].sets[si][field] = val; }
    function moveEx(ei, dir) {
      const exs = S.activeWo.exercises;
      const newIdx = ei + dir;
      if (newIdx < 0 || newIdx >= exs.length) return;
      [exs[ei], exs[newIdx]] = [exs[newIdx], exs[ei]];
      renderWoEx();
    }
    function removeEx(ei) {
      const ex = S.activeWo.exercises[ei];
      if (!confirm(`¿Eliminar "${ex.name}" de la rutina?`)) return;
      S.activeWo.exercises.splice(ei, 1);
      renderWoEx();
      toast(`🗑️ ${ex.name} eliminado`);
    }
    async function finishWorkout() {
      clearInterval(S.wTimer);
      if (!S.activeWo) return;

      const titulo = document.getElementById('wo-title').value || 'Entrenamiento';
      let repsTotal = 0, setsTotal = 0;
      S.activeWo.exercises.forEach(ex => ex.sets.forEach(s => { setsTotal++; repsTotal += parseInt(s.reps) || 0; }));

      const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

      // Local optimistic save
      S.activeWo.title = titulo;
      S.activeWo.duration = S.wSec;
      S.activeWo.totalReps = repsTotal;
      S.activeWo.totalSets = setsTotal;
      S.activeWo.date = now;
      S.workouts.push(S.activeWo);
      save();

      closeOverlay('ov-workout');
      showApp();
      toast(`Guardando en la nube... ⌛`);

      if (!S.token) return;

      try {
        // 1. Crear Sesion
        const resS = await fetch(API_URL + '/sesiones', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${S.token}` },
          body: JSON.stringify({ usuario_id: S.user.id, numero_sesion: S.workouts.length, fecha: now, completado: 1 })
        });
        const ses = await resS.json();
        if (!resS.ok) throw new Error(ses.error);

        // 2. Agregar Series
        for (const ex of S.activeWo.exercises) {
          for (let i = 0; i < ex.sets.length; i++) {
            const s = ex.sets[i];
            await fetch(API_URL + '/series', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${S.token}` },
              body: JSON.stringify({
                sesion_id: ses.id,
                ejercicio_id: null,
                ejercicio_nombre: ex.name,
                numero: i + 1, peso: s.weight || 0, repeticiones: s.reps || 0
              })
            });
          }
        }

        // 3. Completar
        await fetch(API_URL + `/sesiones/${ses.id}/completar`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${S.token}` },
          body: JSON.stringify({ completado: 1, peso_total: 0, tiempo: S.wSec })
        });

        toast(`🎉 ¡Rutina Sincronizada! ${repsTotal} reps`);
        await fetchBackendData();
        showApp();
      } catch (e) {
        console.error(e);
        toast('Error sincronizando con servidor (rutina guardada localmente)');
      }
    }
    function cancelWorkout() { clearInterval(S.wTimer); closeOverlay('ov-workout'); }

    // ======= HISTORY =======
    function renderHistory() {
      const el = document.getElementById('history-list');
      if (!el) return;
      if (!S.workouts.length) { el.innerHTML = `<div class="empty-card">📋 Sin entrenamientos aún</div>`; return; }
      el.innerHTML = [...S.workouts].reverse().map(w => {
        const d = new Date(w.date).toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
        return `<div class="hist-card">
      <div class="hc-date">${d}</div>
      <div class="hc-title">${w.title || 'Entrenamiento'}</div>
      <div class="hc-stats">
        <div class="hc-stat">⏱ <b>${fmtDur(w.duration || 0)}</b></div>
        <div class="hc-stat">💪 <b>${w.exercises?.length || 0}</b> ejercicios</div>
        <div class="hc-stat">🔁 <b>${w.totalReps || 0}</b> reps</div>
      </div>
    </div>`;
      }).join('');
    }

    // ======= PROGRESS =======
    function renderProgress() {
      const totalReps = S.workouts.reduce((s, w) => s + (w.totalReps || 0), 0);
      const streak = calcStreak();
      setText('pg-weight', S.user?.weight ? S.user.weight + ' kg' : '-- kg');
      setText('pg-reps', totalReps);
      setText('pg-wo', S.workouts.length);
      setText('pg-streak', streak + ' 🔥');
      drawVolChart();
      renderMuscleBars();
    }
    function drawVolChart() {
      const canvas = document.getElementById('vol-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const W = canvas.offsetWidth;
      const H = 120;
      canvas.width = W * window.devicePixelRatio;
      canvas.height = H * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
      const today = new Date();
      const todayIdx = today.getDay() === 0 ? 6 : today.getDay() - 1;
      const counts = Array(7).fill(0);
      S.workouts.forEach(w => {
        const d = new Date(w.date);
        const diff = Math.round((today - d) / 86400000);
        if (diff >= 0 && diff < 7) counts[(todayIdx - diff + 7) % 7] += (w.totalReps || 0);
      });
      const max = Math.max(...counts, 1);
      ctx.clearRect(0, 0, W, H);
      const barW = (W - 32) / 7;
      counts.forEach((c, i) => {
        const barH = Math.max(4, (c / max) * 70);
        const x = 16 + i * barW;
        const y = 80 - barH;
        ctx.fillStyle = i === todayIdx ? '#34d399' : (c > 0 ? 'rgba(52,211,153,.4)' : '#2a2a2a');
        ctx.beginPath();
        ctx.roundRect(x + 2, y, barW - 8, barH, 4);
        ctx.fill();
        ctx.fillStyle = i === todayIdx ? '#f0f0f0' : '#555';
        ctx.font = '10px Space Grotesk, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(days[i], x + barW / 2 - 2, 96);
        if (c > 0) {
          ctx.fillStyle = '#999';
          ctx.font = '9px DM Mono, monospace';
          ctx.fillText(c, x + barW / 2 - 2, y - 4);
        }
      });
    }
    function renderMuscleBars() {
      const counts = {};
      S.workouts.forEach(w => {
        (w.exercises || []).forEach(ex => {
          const key = ex.muscle || 'core';
          counts[key] = (counts[key] || 0) + (ex.sets?.length || 1);
        });
      });
      const max = Math.max(...Object.values(counts), 1);
      const el = document.getElementById('muscle-bars');
      if (!el) return;
      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 7);
      if (!sorted.length) { el.innerHTML = `<div class="empty-card" style="margin:0 0 12px">Sin datos aún</div>`; return; }
      el.innerHTML = sorted.map(([id, cnt]) => {
        const mg = MUSCLE_GROUPS.find(m => m.id === id);
        const pct = Math.round((cnt / max) * 100);
        return `<div class="mb-row">
      <div class="mb-hd"><span class="mb-nm">${mg?.icon || '💪'} ${mg?.label || id}</span><span class="mb-pct">${cnt} series</span></div>
      <div class="mb-track"><div class="mb-fill" style="width:${pct}%"></div></div>
    </div>`;
      }).join('');
    }
    function updateProfileUI() {
      if (!S.user) return;
      const init = (S.user.name || 'A').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
      setText('prof-av', init);
      setText('prof-name', S.user.name);
      const lvlMap = { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado' };
      setText('prof-badge', lvlMap[S.user.level] || 'Principiante');
      setText('ps-wo', S.workouts.length);
      setText('ps-reps', S.workouts.reduce((s, w) => s + (w.totalReps || 0), 0));
      setText('ps-streak', calcStreak());
      setText('pr-h', S.user.height ? S.user.height + ' cm' : '--');
      setText('pr-w', S.user.weight ? S.user.weight + ' kg' : '--');
      setText('pr-a', S.user.age ? S.user.age + ' años' : '--');
      setText('pr-e', S.user.email || '--');
      setText('pr-lvl', lvlMap[S.user.level] || 'Principiante');
    }

    // ======= AI / MEDIAPIPE =======

    function launchAI(exId) {
      S.aiEx = exId || 'curl_bicep';
      // Update selector
      document.querySelectorAll('.exsel-btn').forEach(b => {
        const ex = b.getAttribute('onclick').match(/'([^']+)'/)?.[1];
        b.classList.toggle('active', ex === S.aiEx);
      });
      // Update title
      const cfg = AI_CONFIG[S.aiEx];
      setText('ai-title', cfg?.name || 'Análisis IA');
      resetAIState();
      openOverlay('ov-ai');
    }
    function switchAIExercise(exId, btn) {
      document.querySelectorAll('.exsel-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const wasRunning = S.aiRunning;
      if (wasRunning) stopAI();
      S.aiEx = exId;
      const cfg = AI_CONFIG[exId];
      setText('ai-title', cfg?.name || exId);
      resetAIState();
      if (wasRunning) setTimeout(startAI, 500);
    }
    function resetAIState() {
      S.aiReps = 0; S.aiAngle = null; S.aiQual = '--';
      S.aiFeed = 'Selecciona un ejercicio e inicia'; S.aiFeedType = '';
      S.aiPhase = 'down'; S.aiConfDown = 0; S.aiConfUp = 0;
      S.aiRepConfirmed = false; S.aiAngleHistory = [];
      S.aiPlanchaTime = 0; clearInterval(S.aiPlanchaTimer);
      S.sqInitTorsoAngle = null; S.sqInitHeelY = null;
      updateAIUI();
    }
    function toggleAI() {
      if (S.aiRunning) stopAI();
      else startAI();
    }
    if (!S.hasOwnProperty('cameraFacing')) S.cameraFacing = 'environment'; // 'user'=frontal, 'environment'=trasera

    async function startAI() {
      if (typeof Pose === 'undefined') {
        toast('MediaPipe no cargado. Verifica tu conexión.');
        return;
      }
      const canvas = document.getElementById('ai-canvas');
      const camWrap = canvas.parentElement;
      canvas.width = camWrap.offsetWidth;
      canvas.height = camWrap.offsetHeight;
      S.mpCanvas = canvas;
      S.mpCtx = canvas.getContext('2d');

      // Crear video element (solo 1 vez)
      if (!S.mpVideo) {
        S.mpVideo = document.createElement('video');
        S.mpVideo.setAttribute('playsinline', '');
        S.mpVideo.setAttribute('autoplay', '');
        S.mpVideo.setAttribute('muted', '');
        S.mpVideo.muted = true;
        S.mpVideo.style.display = 'none';
        document.body.appendChild(S.mpVideo);
      }

      // Init Pose (solo 1 vez)
      if (!S.mpPose) {
        S.mpPose = new Pose({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
        });
        S.mpPose.setOptions({
          modelComplexity: 2,          // Máximo: detecta mejor en cualquier ángulo
          smoothLandmarks: true,
          enableSegmentation: false,
          minDetectionConfidence: 0.35, // Más permisivo: detecta más rápido
          minTrackingConfidence: 0.35,  // No pierde el tracking tan fácil
        });
        S.mpPose.onResults(onPoseResults);
      }

      // Detener cámara anterior si hay una activa
      if (S.mpCamera) { S.mpCamera.stop(); S.mpCamera = null; }

      // Usar la clase Camera de MediaPipe con facingMode
      S.mpCamera = new Camera(S.mpVideo, {
        onFrame: async () => {
          if (S.mpPose && S.aiRunning) await S.mpPose.send({ image: S.mpVideo });
        },
        width: 640, height: 480,
        facingMode: S.cameraFacing   // 'environment' = trasera | 'user' = frontal
      });

      S.aiRunning = true;
      S.mpCamera.start();

      document.getElementById('cam-ph').style.opacity = '0';
      document.getElementById('ai-dot').classList.add('on');
      document.getElementById('ai-start-btn').textContent = '⏹ Detener';
      document.getElementById('ai-start-btn').classList.add('running');
      document.getElementById('cam-hud').style.display = 'flex';

      // Plancha timer
      if (AI_CONFIG[S.aiEx]?.mode === 'time') {
        S.aiPlanchaTime = 0;
        clearInterval(S.aiPlanchaTimer);
        S.aiPlanchaTimer = setInterval(() => {
          if (S.aiRunning && S.aiPhase === 'hold') {
            S.aiPlanchaTime++;
            setText('ai-reps', fmtDur(S.aiPlanchaTime));
            setText('hud-reps', fmtDur(S.aiPlanchaTime));
          }
        }, 1000);
      }
      toast('🤖 IA activa — ¡Colócate frente a la cámara!');
    }
    function stopAI() {
      S.aiRunning = false;
      clearInterval(S.aiPlanchaTimer);
      if (S.mpCamera) { S.mpCamera.stop(); S.mpCamera = null; }
      document.getElementById('cam-ph').style.opacity = '1';
      document.getElementById('ai-dot').classList.remove('on');
      document.getElementById('ai-start-btn').textContent = '▶ Iniciar';
      document.getElementById('ai-start-btn').classList.remove('running');
      document.getElementById('cam-hud').style.display = 'none';
    }

    async function flipCamera() {
      S.cameraFacing = (S.cameraFacing === 'environment') ? 'user' : 'environment';
      const label = S.cameraFacing === 'environment' ? '📷 Trasera' : '🤳 Frontal';
      const btn = document.getElementById('flip-cam-btn');
      if (btn) btn.textContent = `🔄 ${label}`;

      if (S.aiRunning) {
        // Guardar reps antes de reiniciar
        const savedReps = S.aiReps;
        // Parar la cámara y reiniciarla con la nueva orientación (preservar Pose)
        if (S.mpCamera) { S.mpCamera.stop(); S.mpCamera = null; }
        S.mpCamera = new Camera(S.mpVideo, {
          onFrame: async () => {
            if (S.mpPose && S.aiRunning) await S.mpPose.send({ image: S.mpVideo });
          },
          width: 640, height: 480,
          facingMode: S.cameraFacing
        });
        S.mpCamera.start();
        S.aiReps = savedReps;
        toast(`Cámara ${S.cameraFacing === 'environment' ? 'trasera' : 'frontal'} activa`);
      }
    }


    function closeAI() {
      stopAI();
      closeOverlay('ov-ai');
      // Clear canvas
      if (S.mpCtx && S.mpCanvas) S.mpCtx.clearRect(0, 0, S.mpCanvas.width, S.mpCanvas.height);
    }
    function resetAI() {
      const wasRunning = S.aiRunning;
      if (wasRunning) stopAI();
      resetAIState();
      if (wasRunning) setTimeout(startAI, 300);
      toast('↺ Conteo reiniciado');
    }
    function toggleArm() {
      S.aiArm = S.aiArm === 'RIGHT' ? 'LEFT' : 'RIGHT';
      const btn = document.getElementById('arm-btn');
      btn.textContent = S.aiArm === 'RIGHT' ? '💪 Brazo Derecho' : '💪 Brazo Izquierdo';
      btn.classList.toggle('active', S.aiArm === 'RIGHT');
    }

    function onPoseResults(results) {
      if (!S.mpCtx || !S.mpCanvas) return;
      const ctx = S.mpCtx;
      const W = S.mpCanvas.width, H = S.mpCanvas.height;
      ctx.clearRect(0, 0, W, H);

      if (results.image) {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(results.image, -W, 0, W, H);
        ctx.restore();
      }

      if (!results.poseLandmarks) {
        S.aiFeed = '🔍 Reposiciónate frente a la cámara';
        S.aiFeedType = 'warn';
        updateAIUI();
        return;
      }
      const lm = results.poseLandmarks;
      const cfg = AI_CONFIG[S.aiEx];
      if (!cfg) return;

      const joints = cfg.joints[S.aiArm] || cfg.joints['RIGHT'];
      const [idxA, idxB, idxC] = joints;
      const pA = lm[idxA], pB = lm[idxB], pC = lm[idxC];

      if (!pA || !pB || !pC || pA.visibility < 0.4 || pB.visibility < 0.4 || pC.visibility < 0.4) {
        S.aiFeed = '🔍 Asegúrate de ser visible en cámara';
        S.aiFeedType = 'warn';
        updateAIUI();
        drawSkeleton(ctx, lm, W, H, '#555', joints);
        return;
      }

      // Draw full skeleton
      drawSkeleton(ctx, lm, W, H, 'rgba(52,211,153,.3)', joints);

      // Calculate angle
      const rawAngle = calcAngle(
        [pA.x, pA.y], [pB.x, pB.y], [pC.x, pC.y]
      );
      S.aiAngleHistory.push(rawAngle);
      if (S.aiAngleHistory.length > 8) S.aiAngleHistory.shift();
      const angle = S.aiAngleHistory.reduce((a, b) => a + b, 0) / S.aiAngleHistory.length;
      S.aiAngle = Math.round(angle);

      // Pose state machine
      if (cfg.mode === 'rep') {
        processRepMode(cfg, angle, lm);
      } else if (cfg.mode === 'time') {
        processTimeMode(cfg, angle, lm);
      }

      // Draw highlighted joints
      const color = { good: '#34d399', warn: '#fbbf24', error: '#f87171' }[S.aiFeedType] || '#34d399';
      [[pA, idxA], [pB, idxB], [pC, idxC]].forEach(([p]) => {
        ctx.beginPath();
        ctx.arc(W - p.x * W, p.y * H, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(W - p.x * W, p.y * H, 6, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });
      // Draw connecting lines
      ctx.beginPath();
      ctx.moveTo(W - pA.x * W, pA.y * H);
      ctx.lineTo(W - pB.x * W, pB.y * H);
      ctx.lineTo(W - pC.x * W, pC.y * H);
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.lineJoin = 'round';
      ctx.stroke();
      // Angle label
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 18px DM Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${S.aiAngle}°`, (W - pB.x * W) + 18, pB.y * H - 12);

      updateAIUI();
    }

    function processRepMode(cfg, angle, lm) {
      const isInverted = cfg.angleDown < cfg.angleUp;
      const inBottomZone = isInverted ? (angle <= cfg.angleDown) : (angle >= cfg.angleDown);
      const inTopZone = isInverted ? (angle >= cfg.angleUp) : (angle <= cfg.angleUp);

      const inStartZone = isInverted ? inTopZone : inBottomZone;
      const inTargetZone = isInverted ? inBottomZone : inTopZone;

      if (inStartZone) {
        S.aiConfDown = (S.aiConfDown || 0) + 1;
        S.aiConfUp = 0;
      } else if (inTargetZone) {
        S.aiConfUp = (S.aiConfUp || 0) + 1;
        S.aiConfDown = 0;
      } else {
        S.aiConfDown = 0;
        S.aiConfUp = 0;
      }

      // Compatibilidad con estado inicial en resetAIState
      if (S.aiPhase === 'down') S.aiPhase = 'start';
      if (S.aiPhase === 'up') S.aiPhase = 'target';

      // Lógica infalible de ciclo completo
      if (S.aiPhase === 'start' && S.aiConfUp >= (cfg.upFrames || 3)) {
        // LLega a la mitad del movimiento (inflexión)
        S.aiPhase = 'target';
      } else if (S.aiPhase === 'target' && S.aiConfDown >= (cfg.downFrames || 3)) {
        // Regresa a la postura inicial -> ¡Repetición completa!
        S.aiPhase = 'start';
        S.aiReps++;
        if (window.playBeep) window.playBeep();
      }

      let badFormMsg = null;
      if (lm) {
        const isRight = S.aiArm === 'RIGHT';
        const sh = lm[isRight ? 12 : 11];
        const el = lm[isRight ? 14 : 13];
        const wr = lm[isRight ? 16 : 15];
        const hp = lm[isRight ? 24 : 23];
        const kn = lm[isRight ? 26 : 25];
        const hl = lm[isRight ? 30 : 29];

        if (S.aiEx === 'sentadilla' && sh && hp && kn && hl) {
          // Ángulo del torso vs vertical
          const dx = hp.x - sh.x;
          const dy = hp.y - sh.y;
          const torsoAngle = Math.abs(Math.atan2(dx, dy) * 180 / Math.PI);

          // Actualizar la postura base continuamente MIENTRAS el usuario esté de pie
          if (inStartZone && S.aiPhase === 'start') {
            S.sqInitTorsoAngle = torsoAngle;
            S.sqInitHeelY = hl.y;
          }

          // Solo evaluar técnica si el usuario ya bajó (fuera de la zona inicial)
          if (!inStartZone) {
            // Valgo (colapso de rodillas)
            const rKn = lm[26], lKn = lm[25];
            const rHp = lm[24], lHp = lm[23];
            if (rKn && lKn && rHp && lHp) {
              const knDist = Math.abs(rKn.x - lKn.x);
              const hpDist = Math.abs(rHp.x - lHp.x);
              if (hpDist > 0.04 && knDist < 0.85 * hpDist) { // Relajado a 85%
                 badFormMsg = '⚠️ Valgo: separa un poco más las rodillas';
              }
            }

            // Butt Wink (Bajó demasiado la lumbar / redondeo)
            // Se aumentó el límite a 25° para ser más permisivo
            if (S.sqInitTorsoAngle && Math.abs(torsoAngle - S.sqInitTorsoAngle) > 25) {
               badFormMsg = '⚠️ Butt Wink: bajaste mucho la lumbar, saca pecho';
            } 
            // Inclinación excesiva
            else if (torsoAngle > 55) { // Relajado a 55°
               badFormMsg = '⚠️ Inclinación: torso muy hacia adelante';
            }

            // Talones levantados (ΔY > 0.03 para evitar falsos positivos por ruido de cámara)
            if (S.sqInitHeelY && (S.sqInitHeelY - hl.y) > 0.03) {
               badFormMsg = '⚠️ Talones: empuja con la planta completa';
            }
          }
        } else if (S.aiEx === 'curl_bicep' && sh && el && hp) {
          if (Math.abs(sh.x - el.x) > 0.15) badFormMsg = '⚠️ No balancees el codo, mantenlo pegado';
        } else if (S.aiEx === 'press_banca' && el && wr) {
          if (Math.abs(el.x - wr.x) > 0.25) badFormMsg = '⚠️ Alinea las muñecas con tus codos';
        } else if (S.aiEx === 'press_hombro' && sh && el && wr && hp) {
          // Solo evaluar durante el movimiento, no cuando están descansando
          if (!inStartZone) {
            // 1. Trayectoria (Muñeca sobre codo)
            const forearmAngle = Math.abs(Math.atan2(wr.x - el.x, el.y - wr.y)) * 180 / Math.PI;
            if (forearmAngle > 40) { // Súper relajado a 40° para evitar falsos positivos por perspectiva
              badFormMsg = '⚠️ Trayectoria: mantén las muñecas más rectas sobre los codos';
            }
            // NOTA: Se eliminó cualquier alerta por abrir los codos ("flare"). 
            // Abrir los codos a ~45°-60° es lo más anatómicamente seguro para el press militar.
          }
        }
      }

      if (badFormMsg) {
        S.aiQual = 'MALA'; S.aiFeed = badFormMsg; S.aiFeedType = 'error';
        if (window.playBuzz) window.playBuzz();
      } else if (inTopZone) {
        S.aiQual = 'EXCELENTE'; S.aiFeed = cfg.feedGood; S.aiFeedType = 'good';
      } else if (inBottomZone && S.aiPhase === 'down') {
        S.aiQual = 'BIEN'; S.aiFeed = cfg.feedUp; S.aiFeedType = '';
      } else if (S.aiPhase === 'up') {
        S.aiQual = 'BIEN'; S.aiFeed = cfg.feedDown; S.aiFeedType = '';
      } else {
        S.aiQual = 'BIEN'; S.aiFeed = '¡Sigue así, buen ritmo!'; S.aiFeedType = '';
      }
    }

    function processTimeMode(cfg, angle, lm) {
      const isRight = S.aiArm === 'RIGHT';
      const shoulder = lm[isRight ? 12 : 11], hip = lm[isRight ? 24 : 23], knee = lm[isRight ? 26 : 25];
      if (!shoulder || !hip || !knee) return;
      const hipAngle = calcAngle([shoulder.x, shoulder.y], [hip.x, hip.y], [knee.x, knee.y]);

      if (hipAngle > 165) {
        S.aiPhase = 'hold';
        S.aiFeed = cfg.feedGood;
        S.aiFeedType = 'good';
        S.aiQual = 'EXCELENTE';
      } else {
        S.aiPhase = 'bad';
        S.aiFeed = '⚠️ Alinea espalda y piernas (caderas altas/bajas)';
        S.aiFeedType = 'error';
        S.aiQual = 'MALA';
      }
    }

    function drawSkeleton(ctx, lm, W, H, color, highlightJoints) {
      const CONNECTIONS = [
        [11, 12], [11, 13], [13, 15], [12, 14], [14, 16], // arms
        [11, 23], [12, 24], [23, 24], // torso
        [23, 25], [25, 27], [24, 26], [26, 28], // legs
      ];
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      CONNECTIONS.forEach(([a, b]) => {
        const pA = lm[a], pB = lm[b];
        if (!pA || !pB || pA.visibility < 0.3 || pB.visibility < 0.3) return;
        ctx.beginPath();
        ctx.moveTo(W - pA.x * W, pA.y * H);
        ctx.lineTo(W - pB.x * W, pB.y * H);
        ctx.stroke();
      });
    }

    function calcAngle(a, b, c) {
      const ba = [a[0] - b[0], a[1] - b[1]];
      const bc = [c[0] - b[0], c[1] - b[1]];
      const dot = ba[0] * bc[0] + ba[1] * bc[1];
      const magBA = Math.sqrt(ba[0] ** 2 + ba[1] ** 2);
      const magBC = Math.sqrt(bc[0] ** 2 + bc[1] ** 2);
      const cos = Math.max(-1, Math.min(1, dot / (magBA * magBC + 1e-8)));
      return (Math.acos(cos) * 180) / Math.PI;
    }

    function updateAIUI() {
      setText('ai-reps', AI_CONFIG[S.aiEx]?.mode === 'time' ? fmtDur(S.aiPlanchaTime) : S.aiReps);
      setText('ai-angle', S.aiAngle ? `${S.aiAngle}°` : '--°');
      setText('ai-qual', S.aiQual);
      setText('hud-reps', AI_CONFIG[S.aiEx]?.mode === 'time' ? fmtDur(S.aiPlanchaTime) : S.aiReps);
      setText('hud-angle', S.aiAngle ? `${S.aiAngle}°` : '--°');
      const feedEl = document.getElementById('ai-feed');
      if (feedEl) {
        feedEl.textContent = S.aiFeed;
        feedEl.className = 'ai-feedback ' + (S.aiFeedType || '');
      }
    }

    // ======= TAB NAV =======
    function switchTab(tab) {
      document.querySelectorAll('.tab').forEach(e => e.classList.remove('active'));
      document.querySelectorAll('.bn').forEach(e => e.classList.remove('active'));
      document.getElementById(`tab-${tab}`)?.classList.add('active');
      document.getElementById(`bn-${tab}`)?.classList.add('active');
      if (tab === 'progress') { renderProgress(); setTimeout(drawVolChart, 50); }
      if (tab === 'workout') renderHistory();
      if (tab === 'exercises') renderExTab(document.getElementById('ex-search')?.value || '');
    }

    // ======= OVERLAY / MODAL HELPERS =======
    function openOverlay(id) { document.getElementById(id)?.classList.add('open'); }
    function closeOverlay(id) { document.getElementById(id)?.classList.remove('open'); }
    function openMod(id) { document.getElementById(id)?.classList.add('open'); }
    function closeMod(id) { document.getElementById(id)?.classList.remove('open'); }

    // ======= TOAST =======
    let _tt;
    function toast(msg) {
      const el = document.getElementById('toast');
      el.textContent = msg;
      el.classList.add('show');
      clearTimeout(_tt);
      _tt = setTimeout(() => el.classList.remove('show'), 2600);
    }

    // ======= HELPERS =======
    function v(id) { return document.getElementById(id)?.value?.trim() || ''; }
    function setText(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
    function fmtDur(s) {
      const m = Math.floor(s / 60), sec = s % 60;
      return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
    }
    function calcStreak() {
      if (!S.workouts.length) return 0;
      const days = new Set(S.workouts.map(w => w.date?.split('T')[0]));
      let streak = 0;
      const now = new Date();
      for (let i = 0; i < 365; i++) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        if (days.has(d.toISOString().split('T')[0])) streak++;
        else if (i > 0) break;
      }
      return streak;
    }
  