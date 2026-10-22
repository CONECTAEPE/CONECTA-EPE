# Seguridad y recuperación de Conecta EPE

## Encabezado
Se restauró la altura máxima del cintillo a 160 px (su proporción se conserva).

## Recuperación administrativa sin puerta trasera
La recuperación NO habilita un usuario oculto ni una URL secreta. En la versión Node privada, el administrador del servidor puede detener el servicio, respaldar DATA_DIR y ejecutar `tools/recuperar-admin.mjs` con las variables `RECOVERY_USER`, `RECOVERY_NEW_PASSWORD` y `DATA_DIR`. Si se usa PASSWORD_PEPPER en producción, debe suministrarse la misma variable durante la recuperación. Reinicie el servicio e ingrese con la nueva contraseña; el sistema pedirá cambiarla. El script exige acceso al disco del servidor, conserva una copia de usuarios y no recupera un servidor caído: eso requiere restaurar infraestructura y respaldos.

Ejemplo (sin incluir la contraseña en comandos guardados en el historial): exporte las variables mediante un gestor seguro de secretos y ejecute `node tools/recuperar-admin.mjs`.

Para Netlify Blobs no existe acceso directo al almacenamiento local de este script. Se necesita un procedimiento separado de recuperación mediante la cuenta propietaria de Netlify y una copia de seguridad verificable.

## Auditoría
Configuración > Auditoría integral. Solo Administrador. Devuelve recuentos por módulo y rol, vínculos huérfanos y actividad reciente; se descarga JSON. No expone hashes ni documentos de identidad. El historial existente conserva 300 eventos como máximo y no equivale a un registro inmutable.

## Seguridad nivel 3
«Nivel 3» no es una certificación universal. Se implementan comprobaciones de integridad y auditoría administrativa sobre la autenticación existente (scrypt, bloqueos y tokens). No se certifica un nivel de seguridad. Antes de producción deben completarse MFA, controles de sesión y revocación global, respaldo cifrado, monitoreo externo, almacenamiento seguro de documentos, pruebas de autorización por plantel y pruebas de penetración. Importante: revisar y retirar credenciales administrativas preconfiguradas, claves temporales conocidas y rutas de configuración inseguras.
