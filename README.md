# Regalo de cumpleaños (React + Vite)

## Correr
    npm install
    npm run dev

## Personalizar
- Todo el contenido está en `src/data.js` (frases, iconos, colores, rutas de foto y audio).
- Audios por frase: copia `01.mp3` ... `08.mp3` en `public/audio/`.
- Melodía romántica final: `public/audio/melodia.mp3` (si no existe, suena una melodía de ejemplo generada en el navegador).
- Fotos: ya están en `public/photos/` (la propuesta es la 08, la última).
- Caja de regalo animada: `src/Regalo.jsx`. Fondo de gerberas: `src/Fondo.jsx`.
- Iconos de personajes: SVG simples en `src/Icons.jsx`; cámbialos por PNG si quieres.

## Publicar y crear el QR
1. `npm run build` y sube la carpeta `dist` a Netlify, Vercel o GitHub Pages.
2. Abre `https://TU-SITIO/#/qr`, pega la dirección real, y descarga el PNG del QR.
