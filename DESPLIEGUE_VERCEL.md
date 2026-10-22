# CONECTA EPE — Migración técnica a Vercel

## Estructura
- `public/`: interfaz y cintillos, sin recompilación.
- `api/epe.mjs`: función Vercel que reutiliza la lógica existente `core.mjs`.
- `api/storage.mjs`: adaptador persistente Redis REST, sustituye Netlify Blobs.
- `vercel.json`: configuración de rutas y encabezados.

## Publicación
1. Crea un proyecto Vercel desde GitHub con **Framework Preset: Other**.
2. Usa la raíz del repositorio como Root Directory. **No** establezcas `public` como Root Directory.
3. Build Command: `npm run build`. Output Directory: `public` (si Vercel lo solicita).
4. Crea una base Upstash Redis y añade `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN` en Vercel > Settings > Environment Variables. No introduzcas credenciales en el código.
5. Añade `PASSWORD_PEPPER` con una clave aleatoria segura. Si vienes de otra instancia con contraseñas peppered, conserva su valor original para mantener los accesos.
6. Publica y verifica `/api/epe` (GET debe devolver 405), login, usuarios, Núcleos, Google Sheets y PDF.
7. **Migración de datos**: usa respaldo/exportación del sistema anterior y restauración desde el administrador del nuevo sistema. Revisa que los adjuntos se hayan migrado. Haz copia antes de cualquier restauración.

## Advertencias y tareas pendientes
- El código de negocio actual guarda `db` y `users` como objetos JSON completos. Redis persiste datos, pero no impide pérdidas de actualización bajo escrituras concurrentes. Antes de producción multiusuario se necesita almacenamiento transaccional (Postgres) o bloqueo atómico de operaciones.
- Las imágenes/archivos almacenados como base64 en Redis pueden superar los límites de tamaño y consumo del proveedor. Para producción se recomienda Blob Storage dedicado.
- No se ha activado cron: `netlify/functions/sync.mts` referencia `syncAll`, que **no está exportado** por `core.mjs`. Es necesario implementar y probar el trabajo programado de sincronización antes de habilitarlo.
- La importación Google Sheets depende de las reglas y permisos de las hojas de origen; no basta con registrar un enlace privado.
- La creación de roles de Núcleo usa fichas `nucleoPersonal`; verificar que los selectores de la interfaz muestren esos registros.
- Los PDF se generan en el navegador; comprobar cintillo de Virginia de Andrade y los de Núcleos con pruebas de descarga.
- El sistema anterior tiene credenciales y configuración de administrador heredadas: revisa y rota accesos antes de abrirlo públicamente.
- **No** se han realizado pruebas de integración en Vercel ni migrado los datos de producción. Este ZIP es un paquete de despliegue y validación, no una certificación de producción.
