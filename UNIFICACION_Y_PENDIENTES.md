# CONECTA EPE — paquete consolidado (21-10-2026)

Base: Conecta_EPE_Ultimo.zip (preserva funciones avanzadas de Núcleos). Se incorporan únicamente recursos ausentes de epe-netlify(1).zip. **No se han fusionado bases de datos de producción**, ya que los ZIP contienen código y semillas, no los almacenes remotos Netlify Blobs.

## Ajuste aplicado
- Solicitudes: la lectura, consulta de documentos, aprobación y rechazo verifican el Núcleo asignado al Coordinador o Director en el servidor; no se acepta un ámbito declarado por el navegador.

## Pendientes de implementación y pruebas antes de publicar
- Alta de usuarios: verificar y completar selector de Núcleo desde registros activos, guardando vínculo al responsable; no confundir el rol de usuario con la entidad Núcleo.
- PDF: sustituir el cintillo global de exportaciones por el encabezado institucional de la ficha seleccionada, con fallback explícito y prueba para epe.virginiadeandrade. Los ZIP no incluyen el cintillo particular identificado como adjunto.
- Sheets: verificar enlaces, permisos, pestañas, mapeo de todos los campos, deduplicación, vista previa, confirmación y registro de errores por Plantel/Núcleo; no importar silenciosamente.
- Revisar compatibilidad de adapter.mts y sync.mts con el core vigente antes de habilitarlos en Netlify.
- Pruebas de seguridad de ámbitos, migración, persistencia, regresión de PDF y sincronización con datos reales.

## Seguridad de despliegue
El archivo LEEME original documenta credenciales iniciales conocidas: cambiarlas inmediatamente y rotar secretos; configurar variables seguras en el hosting. Hacer copia de seguridad de Netlify Blobs o DATA_DIR antes de cualquier despliegue. No sustituir datos persistentes por seed.json.

**Estado: paquete de trabajo consolidado, NO certificado para producción.**
