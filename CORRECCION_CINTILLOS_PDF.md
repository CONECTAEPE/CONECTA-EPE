# Corrección de identidad en PDF por plantel y núcleo

Los documentos generados desde cada plantel utilizan el cintillo cargado en su ficha (`encabezadoImagen`) y su pie de página (`piePagina`). Los documentos de un núcleo utilizan primero su identidad y, si no está configurada, la de su plantel rector. Los reportes generales sin plantel o núcleo identificado mantienen el cintillo general.

Se aplica a las descargas PDF de Datos, pensum, asistencia, inasistencia y planillas de inscripción. Los archivos Excel no contienen encabezado PDF.

La identidad se resuelve por ámbito de exportación o por el plantel/núcleo de la formación. No se modifica la sincronización de Google Sheets ni la notificación por WhatsApp.

Se requiere probar con planteles reales y sus imágenes cargadas en el sistema desplegado.
