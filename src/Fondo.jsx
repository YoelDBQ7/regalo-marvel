// Fondo "flor gerbera": gerberas SVG que giran muy despacio alrededor de la pantalla
function Gerbera({ c1, c2 }) {
  return (
    <svg viewBox="-100 -100 200 200" aria-hidden="true">
      {Array.from({ length: 21 }).map((_, i) => (
        <ellipse key={"o" + i} cy="-62" rx="9" ry="36" fill={c1} transform={`rotate(${(i * 360) / 21})`} />
      ))}
      {Array.from({ length: 14 }).map((_, i) => (
        <ellipse key={"i" + i} cy="-46" rx="8" ry="26" fill={c2} transform={`rotate(${(i * 360) / 14 + 6})`} />
      ))}
      <circle r="24" fill="#3b1d12" />
      <circle r="16" fill="#5a2c14" />
      {Array.from({ length: 10 }).map((_, i) => (
        <circle key={"d" + i} cy="-20" r="2.4" fill="#ffd23f" transform={`rotate(${i * 36})`} />
      ))}
      <circle r="7" fill="#2a1409" />
    </svg>
  );
}
const FLORES = [
  { x: "-9%", y: "-10%", s: 36, c: ["#ff4d7d", "#ff8fab"], d: 90 },
  { x: "76%", y: "-12%", s: 32, c: ["#ff9a3d", "#ffd23f"], d: 110, r: 1 },
  { x: "86%", y: "44%", s: 28, c: ["#e8318c", "#ff6fb1"], d: 80 },
  { x: "-10%", y: "56%", s: 30, c: ["#ffd23f", "#ff9a3d"], d: 100, r: 1 },
  { x: "38%", y: "84%", s: 30, c: ["#ff4d3d", "#ff8a5c"], d: 120 },
  { x: "62%", y: "70%", s: 14, c: ["#ff8fab", "#ffd1dc"], d: 70, r: 1 },
  { x: "8%", y: "26%", s: 13, c: ["#ffb347", "#ffe08a"], d: 75 },
];
export default function Fondo() {
  return (
    <div className="fondo" aria-hidden="true">
      {FLORES.map((f, k) => (
        <div key={k} className="flor" style={{ "--x": f.x, "--y": f.y, "--s": f.s, "--d": `${f.d}s`, "--dir": f.r ? "reverse" : "normal" }}>
          <Gerbera c1={f.c[0]} c2={f.c[1]} />
        </div>
      ))}
    </div>
  );
}
