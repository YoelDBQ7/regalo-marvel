import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

// Caja de regalo animada: se sacude, se abre sola y salen un globo y el martillo de Thor
export default function Regalo({ onAbierta }) {
  useEffect(() => {
    const t1 = setTimeout(() => {
      try { confetti({ particleCount: 90, spread: 90, origin: { y: 0.45 }, colors: ["#ff4d7d", "#ffd23f", "#ff9a3d", "#5ab0ff", "#fff"] }); } catch {}
    }, 1700);
    const t2 = setTimeout(() => onAbierta && onAbierta(), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <svg className="regalo" viewBox="0 0 300 360" role="img" aria-label="Caja de regalo que se abre sola">
      <defs>
        <linearGradient id="acero" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9eef5" /><stop offset=".5" stopColor="#9aa7b8" /><stop offset="1" stopColor="#5d6978" />
        </linearGradient>
        <radialGradient id="brillo" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ffd23f" stopOpacity=".55" /><stop offset="1" stopColor="#ffd23f" stopOpacity="0" />
        </radialGradient>
      </defs>

      <motion.circle cx="150" cy="170" r="140" fill="url(#brillo)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1.2 }} />

      {/* Globo */}
      <motion.g initial={{ y: 70, opacity: 0, scale: 0.4 }} animate={{ y: -78, opacity: 1, scale: 1 }} transition={{ delay: 2, duration: 1.3, type: "spring", damping: 12 }}>
        <motion.g animate={{ y: [0, -9, 0], rotate: [-3, 3, -3] }} transition={{ delay: 3.4, duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <path d="M104 236 C 96 270, 118 285, 108 330" stroke="#fff6ea" strokeWidth="2" fill="none" />
          <path d="M104 232 l-7 11 h14z" fill="#d6204f" />
          <ellipse cx="104" cy="190" rx="38" ry="46" fill="#ff4d7d" />
          <ellipse cx="91" cy="172" rx="9" ry="15" fill="#fff" opacity=".45" transform="rotate(25 91 172)" />
          <text x="104" y="198" textAnchor="middle" fontSize="30">♥</text>
        </motion.g>
      </motion.g>

      {/* Martillo de Thor (Mjolnir) */}
      <motion.g initial={{ y: 90, opacity: 0, rotate: 0 }} animate={{ y: -66, opacity: 1, rotate: 14 }} transition={{ delay: 2.3, duration: 1.2, type: "spring", damping: 11 }}>
        <rect x="196" y="204" width="11" height="74" rx="4" fill="#7a4a2b" />
        <rect x="196" y="224" width="11" height="5" fill="#4a2a14" /><rect x="196" y="240" width="11" height="5" fill="#4a2a14" /><rect x="196" y="256" width="11" height="5" fill="#4a2a14" />
        <path d="M201 278 q-10 8 0 14" stroke="#4a2a14" strokeWidth="3" fill="none" />
        <rect x="166" y="166" width="72" height="40" rx="6" fill="url(#acero)" stroke="#434d5a" strokeWidth="2" />
        <rect x="166" y="178" width="72" height="5" fill="#434d5a" opacity=".5" />
        <path d="M178 192 h48 M190 187 v10 M214 187 v10" stroke="#434d5a" strokeWidth="2" opacity=".8" />
        <motion.path d="M214 168 l-6 10 h8 l-6 10" stroke="#5ab0ff" strokeWidth="2.5" fill="none" strokeLinecap="round" animate={{ opacity: [0, 1, 0] }} transition={{ delay: 3.4, duration: 1.6, repeat: Infinity }} />
      </motion.g>

      {/* Caja */}
      <motion.g animate={{ rotate: [0, -4, 4, -4, 4, 0], y: [0, -8, 0, -8, 0, 0] }} transition={{ delay: 0.5, duration: 1.1 }} style={{ originX: "150px", originY: "325px" }}>
        <rect x="70" y="215" width="160" height="110" rx="8" fill="#e23a5a" />
        <rect x="140" y="215" width="20" height="110" fill="#ffd23f" />
        <rect x="70" y="215" width="160" height="12" fill="#000" opacity=".12" />
        <motion.g initial={{ y: 0, rotate: 0, opacity: 1 }} animate={{ y: -120, rotate: -22, opacity: 0 }} transition={{ delay: 1.6, duration: 0.9, ease: "easeOut" }}>
          <rect x="60" y="184" width="180" height="36" rx="8" fill="#ff5a7a" />
          <rect x="140" y="184" width="20" height="36" fill="#ffd23f" />
          <ellipse cx="124" cy="176" rx="24" ry="14" fill="#ffd23f" transform="rotate(-20 124 176)" />
          <ellipse cx="176" cy="176" rx="24" ry="14" fill="#ffd23f" transform="rotate(20 176 176)" />
          <circle cx="150" cy="180" r="9" fill="#ffb800" />
        </motion.g>
      </motion.g>
    </svg>
  );
}
