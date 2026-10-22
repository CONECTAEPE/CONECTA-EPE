# Notificaciones de aprobación por WhatsApp

Se retiró la integración de correo saliente (Resend, RESEND_API_KEY, INSTITUTION_EMAIL_FROM).

Cuando se aprueba una solicitud de participante, el sistema activa la cuenta conservando la contraseña que el participante escogió al registrarse. Muestra al personal autorizado una ventana con un enlace de WhatsApp al teléfono indicado en la solicitud, con un mensaje de bienvenida y el nombre de usuario. El operador debe pulsar **Enviar** dentro de WhatsApp. No hay envío automático.

No se incluyen contraseñas en enlaces de WhatsApp ni en los mensajes prellenados. Se valida el formato del número y se incluye opción para copiar el mensaje cuando el número no es válido.

Para notificaciones automáticas sin intervención humana se requiere una integración independiente con la API oficial de WhatsApp Business, consentimiento y plantillas aprobadas; no está configurada en esta versión.
