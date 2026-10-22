# Conecta EPE — Actualización acumulativa

Esta versión conserva el proyecto Netlify/Node.js y añade:
- Formularios institucionales con cintillo PDF, logo, dirección y contacto por plantel y núcleo.
- Fichas de núcleos y selección de identidad documental por núcleo durante la sesión.
- Solicitud de participante con fotografías de cédula y partida de nacimiento, consultables solo desde Solicitudes por perfiles autorizados.
- Mensajería interna de docente a participante y viceversa, restringida a formaciones compartidas.
- Código de formación automático por prefijo del nombre, tipo (CUR/TAL/SEM/DIP) y secuencia de cinco dígitos.
- Cintillo web de altura máxima 1 cm.

## Limitaciones y consideraciones

- Repositorio de referencia de Google Drive: https://drive.google.com/drive/folders/12YAwg3rGR8FKpHvvLqLM-9_82nJg6Bka?usp=sharing . **No se ha activado subida a Drive**: requiere configurar OAuth o una cuenta de servicio autorizada con permisos de escritura. Las imágenes de solicitudes se guardan de forma privada en el almacenamiento del servidor (Netlify Blobs), no en la carpeta de Drive. No compartir públicamente la carpeta si contiene documentos personales.
- Las imágenes de documentos se comprimen en el navegador; el tamaño máximo de la imagen codificada es 650 KB. Los documentos de solicitudes rechazadas o aprobadas se borran del almacenamiento temporal al resolver la solicitud.
- Los cintillos subidos se guardan como JPEG codificado en la configuración institucional. Los enlaces HTTPS sirven para mostrar logotipos, pero para que un cintillo aparezca en el PDF es necesario cargar el archivo mediante el campo «Subir cintillo».
- Los PDF generados por la función común `frame` toman la identidad del plantel activo o del núcleo elegido en la sección Núcleos. Otros generadores de PDF personalizados (por ejemplo informes de Supervisión) requieren homogeneizar el encabezado y pie.
- Los códigos de formación usan secuencias de cinco dígitos por combinación prefijo-tipo, no un contador único de todas las formaciones. La concurrencia entre altas simultáneas necesita una operación transaccional para evitar duplicados.
- La mensajería guarda mensajes en la base institucional y limita destinatarios a usuarios de la misma formación; no incluye adjuntos ni notificaciones push.
- Las operaciones de creación, registro y mensajería requieren pruebas funcionales, de seguridad, control de acceso, carga y despliegue antes de producción.
