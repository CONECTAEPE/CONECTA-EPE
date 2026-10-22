# Conecta EPE — Nuevas funciones (octubre 2026)

- Aviso de mensajes no leídos al iniciar sesión para Docente y Participante, con enlace al chat. Lectura registrada al abrir Mensajes.
- Calendario académico por rol: entregas de tareas/asignaciones/evaluaciones y fechas de inscripción de formaciones.
- Inscripciones de participantes restringidas por fechas cuando se configuran ambas fechas en una formación.
- Aprobación de solicitud con correo de bienvenida y credenciales temporales **solo cuando se configuran** RESEND_API_KEY e INSTITUTION_EMAIL_FROM (remitente verificado en Resend). Si no se configura, se conserva la clave elegida por el participante y se informa que el correo no fue enviado. Si el proveedor falla tras aprobar, se devuelve advertencia; se requiere intervención del administrador para la entrega de la clave temporal. No hay reintentos automáticos.
- Generación masiva por rol desde Usuarios: Plantel, Director, Docente, Supervisión, Coordinador de Núcleo y Director de Núcleo. Requiere fichas existentes con correo válido único. La lista de claves temporales se muestra una sola vez.
- Al crear Plantel, selector de cantidad de administrativos y formularios de nombre, correo y clave, con creación de cuentas vinculadas.

## Precauciones
- Las notificaciones de chat son dentro de la aplicación; no son push del navegador ni correo.
- El calendario muestra los eventos de las formaciones incluidas en la vista de datos del rol.
- Para correo, verifica dominio/remitente y variables de entorno en cada despliegue. No se puede garantizar la entrega hasta probarla en producción.
- Se recomienda reemplazar claves temporales por un enlace de establecimiento de clave de un solo uso en una siguiente iteración.
- Las pruebas realizadas son de sintaxis y empaquetado, no pruebas funcionales de extremo a extremo.
