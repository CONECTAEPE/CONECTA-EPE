# CONECTA EPE — Despliegue en Render

## Cambios
- Se reutiliza el servidor Node `server.mjs` y el motor `netlify/functions/core.mjs` como módulo interno, sin ejecutar Netlify.
- `/api/epe` sirve la API; `/healthz` devuelve estado HTTP.
- El servidor selecciona Redis REST de Upstash si existen ambas variables `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN`; en otro caso usa archivos locales.
- `render.yaml` configura un servicio web Starter con disco persistente `/var/data`. **El disco es de pago**; verifica el precio antes de desplegar.

## Despliegue
1. Descomprime el ZIP y sube **el contenido** a la raíz del repositorio GitHub (no la carpeta contenedora).
2. Render > New > Blueprint > conecta el repositorio. Render detectará `render.yaml`.
3. Revisa los cargos del plan y disco. Si prefieres Redis externo, crea manualmente un Web Service sin disco, con `npm install && npm run build`, `npm start` y las dos variables UPSTASH.
4. Configura las variables de Google Sheets y otras credenciales necesarias según tu instalación. `PASSWORD_PEPPER` debe conservar su valor tras el primer despliegue.
5. Prueba `/healthz`, `/api/epe`, login, altas, permisos de Núcleos, sincronización Sheets y PDFs antes de usar datos reales.

## Advertencias
- Los datos guardados en Netlify Blobs, Vercel/Upstash o una instancia previa NO se migran automáticamente. Hay que exportar/importar con validación y copia de seguridad.
- Si se usa disco local, Render debe ejecutar una sola instancia; múltiples instancias no comparten ese disco.
- La sincronización programada no se ha verificado ni corregido.
- El código de gestión de roles y PDF se conserva, pero no está probado de extremo a extremo.
- La compilación solo verifica sintaxis; no equivale a pruebas funcionales ni auditoría de seguridad.
