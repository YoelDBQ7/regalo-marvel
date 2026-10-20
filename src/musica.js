// Reproduce la melodía del archivo; si no existe, genera una melodía romántica con Web Audio.
const m2f = (m) => 440 * Math.pow(2, (m - 69) / 12);
const ACORDES = [
  { bajo: 36, arp: [60, 64, 67, 71] }, // Cmaj7
  { bajo: 33, arp: [57, 60, 64, 67] }, // Am7
  { bajo: 29, arp: [57, 60, 64, 69] }, // Fmaj7
  { bajo: 31, arp: [59, 62, 67, 71] }, // G
];
const PATRON = [0, 1, 2, 3, 2, 1, 3, 2];
const CICLO = 12.8;

function sintetizador() {
  let ctx, master, timer, t0;
  const nota = (t, midi, dur, vol, tipo) => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = tipo; o.frequency.value = m2f(midi);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.05);
  };
  const ciclo = () => {
    ACORDES.forEach((a, c) => {
      const base = t0 + c * 3.2;
      nota(base, a.bajo, 3.1, 0.16, "sine");
      PATRON.forEach((p, n) => nota(base + n * 0.4, a.arp[p], 1.1, 0.1, "triangle"));
      nota(base, a.arp[3] + 12, 2.6, 0.04, "sine");
    });
    t0 += CICLO;
    timer = setTimeout(ciclo, (CICLO - 1) * 1000);
  };
  return {
    iniciar() {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
      master = ctx.createGain(); master.gain.value = 0.9;
      const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1800;
      master.connect(lp); lp.connect(ctx.destination);
      ctx.resume(); t0 = ctx.currentTime + 0.1; ciclo();
    },
    detener() {
      clearTimeout(timer);
      if (ctx) { try { master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4); const c = ctx; setTimeout(() => c.close(), 500); } catch {} ctx = null; }
    },
  };
}

export function crearMusica(src) {
  let audio = null, synth = null, activo = false;
  const usarSynth = () => { if (!activo) return; synth = sintetizador(); synth.iniciar(); };
  return {
    iniciar() {
      activo = true;
      audio = new Audio(src); audio.loop = true; audio.volume = 0.8;
      audio.addEventListener("error", usarSynth, { once: true });
      audio.play().catch((e) => { if (e && e.name !== "NotAllowedError") usarSynth(); });
    },
    detener() {
      activo = false;
      if (audio) { audio.pause(); audio = null; }
      if (synth) { synth.detener(); synth = null; }
    },
  };
}
