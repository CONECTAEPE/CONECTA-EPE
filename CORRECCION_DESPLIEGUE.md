# Corrección del despliegue en Vercel

El registro mostraba que Vercel ejecutaba `npm run build` como comando de instalación y que no encontraba `api/epe.mjs` en la raíz clonada.

Este ZIP contiene `api/epe.mjs` en su raíz (sin carpeta contenedora). Copia **todo su contenido** a la raíz del repositorio, conservando `api/`, `netlify/functions/`, `public/`, `package.json` y `vercel.json`. Confirma en GitHub que se ve `api/epe.mjs` directamente.

En Vercel > Project Settings > Build and Deployment:
- Root Directory: `./` (o la carpeta real que contenga package.json y api).
- Framework Preset: Other.
- Install Command: `npm install` (no `npm run build`).
- Build Command: `npm run build`.
- Output Directory: `public`.
- Node.js: 22.x.

Configura UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN y PASSWORD_PEPPER como variables de entorno privadas antes de probar el servicio. No subas credenciales al repositorio.

Prueba tras el despliegue: interfaz, login, roles por Núcleo, aprobación de solicitudes, enlaces Google Sheets y PDFs con cintillo. La comprobación sintáctica local no valida estos flujos ni la persistencia real.
