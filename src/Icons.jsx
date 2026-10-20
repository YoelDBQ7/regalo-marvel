// Iconos SVG sencillos inspirados en cada personaje (se pueden reemplazar por imágenes propias)
const S = { fill: "none", stroke: "currentColor", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" };
const ICONS = {
  ironman: (<g {...S}><circle cx="50" cy="50" r="38"/><circle cx="50" cy="50" r="14" fill="currentColor"/><path d="M50 12v24M50 64v24M12 50h24M64 50h24M23 23l17 17M60 60l17 17M77 23L60 40M40 60L23 77"/></g>),
  strange: (<g {...S}><circle cx="50" cy="50" r="38" strokeDasharray="4 6"/><circle cx="50" cy="50" r="26"/><path d="M50 24v52M24 50h52M32 32l36 36M68 32L32 68"/></g>),
  deadpool: (<g {...S}><path d="M50 10c-22 0-34 16-34 36 0 22 14 44 34 44s34-22 34-44c0-20-12-36-34-36z" fill="currentColor" fillOpacity=".18"/><path d="M26 40c6-8 16-6 20 4-6 10-18 8-20-4zM74 40c-6-8-16-6-20 4 6 10 18 8 20-4z" fill="#fff" stroke="none"/><path d="M26 40c6-8 16-6 20 4M74 40c-6-8-16-6-20 4"/></g>),
  thor: (<g {...S}><rect x="22" y="14" width="56" height="26" rx="4" fill="currentColor" fillOpacity=".25"/><path d="M50 40v50M44 90h12"/><path d="M60 54l-8 12h10l-8 14" strokeWidth="2.5"/></g>),
  spiderman: (<g {...S}><circle cx="50" cy="50" r="38"/><path d="M50 12v76M12 50h76M23 23l54 54M77 23L23 77"/><circle cx="50" cy="50" r="12"/><circle cx="50" cy="50" r="26"/></g>),
  wanda: (<g {...S}><path d="M50 10l34 20v40L50 90 16 70V30z" fill="currentColor" fillOpacity=".18"/><path d="M50 28c-14 8-14 30 0 44 14-14 14-36 0-44z"/><path d="M36 50h28"/></g>),
  loki: (<g {...S}><path d="M30 78V48c0-14-4-24-10-34 14 2 24 14 30 30 6-16 16-28 30-30-6 10-10 20-10 34v30" fill="currentColor" fillOpacity=".18"/><path d="M30 78h40M50 44v34"/></g>),
};
export default function Icon({ name, size = 84 }) {
  return (<svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">{ICONS[name] || ICONS.ironman}</svg>);
}
