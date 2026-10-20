import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import confetti from "canvas-confetti";
import { QRCodeCanvas } from "qrcode.react";
import Icon from "./Icons.jsx";
import Fondo from "./Fondo.jsx";
import Regalo from "./Regalo.jsx";
import { crearMusica } from "./musica.js";
import { MOMENTOS, TEXTO_INICIO, TEXTO_FINAL, AUDIO_FINAL } from "./data.js";

// Audio por frase (01.mp3 ... 08.mp3). Si el archivo aún no existe, no suena nada.
function useAudio() {
  const ref = useRef(null);
  const stop = () => { if (ref.current) { ref.current.pause(); ref.current = null; } };
  const play = (src) => { stop(); if (!src) return; const a = new Audio(src); ref.current = a; a.play().catch(() => {}); };
  useEffect(() => stop, []);
  return { play, stop };
}

const explosion = (color) => {
  try {
    const corazon = confetti.shapeFromText({ text: "💖", scalar: 2 });
    confetti({ particleCount: 14, spread: 80, origin: { y: 0.75 }, shapes: [corazon], scalar: 2 });
    confetti({ particleCount: 40, spread: 100, startVelocity: 38, origin: { y: 0.75 }, colors: [color, "#ffd23f", "#ffffff"] });
  } catch {}
};

/* Texto que aparece palabra por palabra */
function Palabras({ texto, retraso = 0.3, className }) {
  return (
    <span className={className} aria-label={texto}>
      {texto.split(" ").map((w, k) => (
        <motion.span key={k} aria-hidden="true" style={{ display: "inline-block", marginRight: "0.28em" }}
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: retraso + k * 0.09, duration: 0.5 }}>{w}</motion.span>
      ))}
    </span>
  );
}

/* Inclinación 3D siguiendo el dedo / el mouse */
function Tilt({ children }) {
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 140, damping: 14 }), sry = useSpring(ry, { stiffness: 140, damping: 14 });
  const mover = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 18);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 18);
  };
  const soltar = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }} onPointerMove={mover} onPointerLeave={soltar} onPointerUp={soltar}
      animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
      {children}
    </motion.div>
  );
}

/* ---------- Pantalla 1: caja de regalo ---------- */
function Inicio({ onStart }) {
  const [lista, setLista] = useState(false);
  return (
    <main className="screen inicio">
      <Regalo onAbierta={() => setLista(true)} />
      <div className="inicio-txt">
        <AnimatePresence>
          {lista && (
            <motion.div key="t" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", damping: 14 }}>
              <h1>{TEXTO_INICIO}</h1>
              <button className="btn btn-grande" onClick={onStart}>Desbloquear la sorpresa</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

/* ---------- Pantalla 2: frases + fotos ---------- */
const VAR = {
  in: (d) => ({ opacity: 0, x: d * 110, rotate: d * 8, scale: 0.88 }),
  on: { opacity: 1, x: 0, rotate: 0, scale: 1, transition: { type: "spring", stiffness: 110, damping: 15 } },
  out: (d) => ({ opacity: 0, x: -d * 110, rotate: -d * 8, scale: 0.88, transition: { duration: 0.25 } }),
};

function Historia({ onFin, audio }) {
  const [i, setI] = useState(-1);
  const [max, setMax] = useState(-1);
  const [dir, setDir] = useState(1);
  const m = MOMENTOS[i];
  const ultimo = i === MOMENTOS.length - 1;

  const ir = (k) => {
    if (k < 0 || k >= MOMENTOS.length || k > max + 1) return;
    setDir(k >= i ? 1 : -1);
    setI(k);
    if (k > max) { setMax(k); explosion(MOMENTOS[k].color); }
    audio.play(MOMENTOS[k].audio);
  };
  const siguiente = () => { if (ultimo) { audio.stop(); onFin(); } else ir(i + 1); };

  useEffect(() => {
    const h = (e) => { if (e.key === "ArrowRight") siguiente(); if (e.key === "ArrowLeft") ir(i - 1); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  return (
    <main className="screen historia" style={m ? { "--acento": m.color } : undefined}>
      <div className="escena">
        <AnimatePresence mode="wait" custom={dir}>
          {m ? (
            <motion.article className="momento" key={i} custom={dir} variants={VAR} initial="in" animate="on" exit="out">
              <Tilt>
                <figure className="polaroid">
                  <span className="cinta" />
                  <img src={m.foto} alt={`Recuerdo ${i + 1}`} draggable="false" />
                  <figcaption className="num">{i + 1} / {MOMENTOS.length}</figcaption>
                </figure>
              </Tilt>
              <div className="texto">
                <motion.span className="icono" initial={{ scale: 0, rotate: -120 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", delay: 0.25, stiffness: 160, damping: 10 }}>
                  <motion.span animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ display: "inline-flex" }}><Icon name={m.icono} /></motion.span>
                </motion.span>
                <p className="frase"><Palabras texto={`“${m.frase}”`} /></p>
              </div>
            </motion.article>
          ) : (
            <motion.p key="pista" className="pista" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Tengo 8 sorpresas para ti. Toca el botón para ver la primera.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <nav className="hud" aria-label="Línea de recuerdos">
        {MOMENTOS.map((mm, k) => (
          <motion.button key={k} style={{ "--c": mm.color }} disabled={k > max + 1 || k > max} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
            className={(k <= max ? "vista " : "") + (k === i ? "act" : "")} onClick={() => ir(k)} aria-label={`Ir al recuerdo ${k + 1}`}>
            <Icon name={mm.icono} size={26} />
          </motion.button>
        ))}
      </nav>

      <div className="controles">
        {i > 0 && <button className="btn btn-suave" onClick={() => ir(i - 1)}>Anterior</button>}
        <motion.button className="btn" key={ultimo ? "fin" : "sig"} whileTap={{ scale: 0.94 }} onClick={siguiente}
          style={{ background: m ? m.color : undefined }}>
          {i < 0 ? "Revelar" : ultimo ? "Ver el recap final" : "Siguiente"}
        </motion.button>
      </div>
    </main>
  );
}

/* ---------- Pantalla 3: recap con cartas que se voltean + melodía ---------- */
function Final() {
  const musica = useRef(null);
  const [suena, setSuena] = useState(true);
  const [volt, setVolt] = useState({});

  useEffect(() => {
    musica.current = crearMusica(AUDIO_FINAL);
    musica.current.iniciar();
    let activo = true;
    const fin = Date.now() + 6000;
    const colores = ["#ff4d7d", "#ffd23f", "#ff9a3d", "#e8318c", "#ffffff"];
    (function frame() {
      if (!activo) return;
      try {
        confetti({ particleCount: 2, angle: 60, spread: 60, origin: { x: 0 }, colors: colores });
        confetti({ particleCount: 2, angle: 120, spread: 60, origin: { x: 1 }, colors: colores });
      } catch {}
      if (Date.now() < fin) requestAnimationFrame(frame);
    })();
    return () => { activo = false; musica.current.detener(); };
  }, []);

  const alternarMusica = () => {
    if (suena) musica.current.detener(); else musica.current.iniciar();
    setSuena(!suena);
  };

  return (
    <main className="screen final">
      <button className="btn btn-suave musica" onClick={alternarMusica}>{suena ? "Pausar música" : "Poner música"}</button>
      {/* Separamos el título en dos componentes independientes */}
  <h2>
    <div style={{ display: "block", marginBottom: "0.2em" }}>
      <Palabras texto="Feliz cumpleaños" retraso={0.2} />
    </div>
    <div style={{ display: "block" }}>
      <Palabras texto="amor de mi vida" retraso={1.2} /> 
    </div>
  </h2>
      <div className="mosaico">
        {MOMENTOS.map((m, k) => (
          <motion.button key={k} className="carta" style={{ "--acento": m.color }}
            initial={{ opacity: 0, scale: 0.2, y: -260, rotate: -25 }} animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 13, delay: 1.4 + k * 0.9 }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => setVolt((v) => ({ ...v, [k]: !v[k] }))} aria-label={`Voltear recuerdo ${k + 1}`}>
            <motion.div className="carta-int" animate={{ rotateY: volt[k] ? 180 : 0 }} transition={{ duration: 0.8, type: "spring", damping: 16 }}>
              <div className="cara frente"><img src={m.foto} alt={`Recuerdo ${k + 1}`} draggable="false" /></div>
              <div className="cara dorso">
                <span className="icono"><Icon name={m.icono} size={54} /></span>
                <p>“{m.frase}”</p>
              </div>
            </motion.div>
          </motion.button>
        ))}
      </div>
      <motion.p className="pista-final" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>
        Toca cada foto para voltearla y volver a leer su frase
      </motion.p>
    </main>
  );
}

/* ---------- Página para generar el QR: abre /#/qr ---------- */
function PaginaQR() {
  const [url, setUrl] = useState(window.location.origin + "/");
  const ref = useRef(null);
  const descargar = () => {
    const a = document.createElement("a");
    a.href = ref.current.querySelector("canvas").toDataURL("image/png");
    a.download = "qr-sorpresa.png";
    a.click();
  };
  return (
    <main className="screen qr">
      <h2>Código QR de la sorpresa</h2>
      <p>Escribe la dirección donde publicaste la página (por ejemplo la de Netlify o Vercel).</p>
      <input value={url} onChange={(e) => setUrl(e.target.value)} aria-label="Dirección de la página" />
      <div className="qr-caja" ref={ref}>
        <QRCodeCanvas value={url} size={280} level="H" marginSize={2} fgColor="#1a0a2e" bgColor="#ffffff" />
      </div>
      <button className="btn" onClick={descargar}>Descargar QR (PNG)</button>
    </main>
  );
}

export default function App() {
  const [fase, setFase] = useState("inicio");
  const [ruta, setRuta] = useState(window.location.hash);
  const audio = useAudio();
  useEffect(() => {
    const h = () => setRuta(window.location.hash);
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);
  return (
    <>
      <Fondo />
      {ruta === "#/qr" ? <PaginaQR /> :
        fase === "inicio" ? <Inicio onStart={() => setFase("historia")} /> :
        fase === "historia" ? <Historia audio={audio} onFin={() => setFase("final")} /> :
        <Final />}
    </>
  );
}
