# Vinculaciones múltiples y selección de Núcleo

- Docentes: un solo perfil y cuenta puede estar asociado a múltiples formaciones de distintos Planteles Rectores o Núcleos. Se registran las asignaciones por identificador de formación (no por nombre), evitando confundir formaciones homónimas.
- Participantes: sus inscripciones en formaciones de diferentes sedes se conservan bajo la misma cédula, sin crear cuentas duplicadas. El servicio `vinculaciones` devuelve los enlaces derivados de inscripciones o asignaciones.
- En Docentes aparece «Vincular docente existente a varias sedes», que agrega asignaciones sin crear otra cuenta.
- En Usuarios > Generación masiva se incluyen Plantel y Núcleo; en Docentes > Generación masiva también.
- El backend valida el Plantel y Núcleo indicados y las autorizaciones institucionales antes de operar.
- El docente ve las formaciones por identificador único y las asignadas a su ficha.

## Advertencias operativas

Los registros antiguos se mantienen; no se ejecuta migración destructiva. Las vinculaciones de participantes se calculan desde sus inscripciones. La vinculación de docentes se almacena en las formaciones (`docenteId`/`docenteIds`) y en las cuentas (`formacionIds`), sin modificar su ficha principal. Antes de actualizar producción, realice respaldo de la base de datos. La integridad ZIP y la sintaxis JavaScript se verificaron; falta validación funcional con cuentas y datos reales en despliegue.
