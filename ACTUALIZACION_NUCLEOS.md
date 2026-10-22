# Conecta EPE — Cuentas y ficha de núcleos

- Administrador: en Usuarios puede crear cuentas de «Coordinador de Núcleo» o «Director de Núcleo» y vincularlas a un núcleo registrado. La selección del núcleo es obligatoria en el servidor.
- Núcleos: el formulario permite adjuntar logo y cintillo institucional JPG/PNG/WEBP; las imágenes se convierten a JPEG de tamaño limitado y se almacenan en el registro. El plantel también permite adjuntar logo y cintillo sin enlaces externos.
- Perfil: fotografía circular con recorte centrado.
- Ver núcleo: pestañas de Formaciones, Participantes, Solicitudes, Docentes, Planificación, Asistencia y Estadísticas, filtradas por identificador de núcleo cuando los registros lo incluyen.
- Estadísticas de núcleo: indicadores, barras por formación y tabla demográfica. No sustituye la estadística integral del plantel.

## Limitaciones y seguridad
- Los registros históricos sin `nucleoId` no pueden asignarse automáticamente a un núcleo. Requieren clasificación o migración controlada.
- La sección Solicitudes informa que la gestión permanece en el plantel rector hasta implementar asociación explícita de solicitudes a núcleo con filtrado seguro en el servidor.
- No se han realizado pruebas end-to-end ni despliegue. Validar permisos por rol y persistencia de imágenes antes de producción.
- La variante PHP continúa siendo híbrida y requiere Node.js.
