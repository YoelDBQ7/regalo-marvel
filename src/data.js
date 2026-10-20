// ============ CONFIGURACION ============
export const TEXTO_INICIO = "Haz clic en este botón para desbloquear la sorpresa";
export const TEXTO_FINAL = "Feliz cumpleaños\namor de mi vida";


// 👉 MELODÍA ROMÁNTICA del final (suena en bucle desde el recap).
//    Pon tu archivo en /public/audio/melodia.mp3. Si no existe todavía, la página
//    toca automáticamente una melodía romántica de ejemplo generada en el navegador.
export const AUDIO_FINAL = "/audio/melodia.mp3";

// 👉 Cada momento: frase, foto, audio, icono y color.
//    Las fotos están en /public/photos y los audios van en /public/audio (01.mp3 ... 08.mp3).
export const MOMENTOS = [
  { frase: "Te amo tres millones",                                         icono: "ironman",  color: "#ff4d3d", foto: "/photos/01.jpg", audio: "/audio/01.mp3" },
  { frase: "Te amo en todos los universos",                                icono: "strange",  color: "#ff9a2e", foto: "/photos/02.jpg", audio: "/audio/02.mp3" },
  { frase: "Tus locuras van con mis locuras",                              icono: "deadpool", color: "#e0243a", foto: "/photos/03.jpg", audio: "/audio/03.mp3" },
  { frase: "Tú me volviste digno",                                         icono: "thor",     color: "#5ab0ff", foto: "/photos/04.jpg", audio: "/audio/04.mp3" },
  { frase: "Tú eres mi camino y siempre vas a ser mi camino",              icono: "spiderman",color: "#ff3b5c", foto: "/photos/05.jpg", audio: "/audio/05.mp3" },
  { frase: "Eres mi tristeza y mi esperanza pero sobre todo eres mi amor", icono: "wanda",    color: "#d6204f", foto: "/photos/06.jpg", audio: "/audio/06.mp3" },
  { frase: "Solo quiero que estés bien y ya",                              icono: "loki",     color: "#3fd08a", foto: "/photos/07.jpg", audio: "/audio/07.mp3" },
  { frase: "Tengo que proteger lo único que le da sentido a mi vida, esa eres tú", icono: "ironman", color: "#f2b632", foto: "/photos/08.jpg", audio: "/audio/08.mp3" },
];
