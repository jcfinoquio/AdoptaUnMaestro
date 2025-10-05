\# Adopta un Maestro



Proyecto web para conectar maestros y centros educativos.



\## 📂 Estructura del proyecto



\- \*\*public/\*\*: Archivos públicos (frontend)

&nbsp; - `index.html`: Página principal

&nbsp; - `css/`: Estilos

&nbsp; - `js/`: Scripts

&nbsp; - `img/`: Imágenes

&nbsp; - `libs/`: Librerías externas

&nbsp; - `fonts/`: Tipografías



\- \*\*backend/\*\*: Lógica del servidor

&nbsp; - Archivos PHP: `auth.php`, `publicaciones.php`, `ofertas.php`, `conexion.php`

&nbsp; - Subcarpetas:

&nbsp;   - `controllers/`

&nbsp;   - `models/`

&nbsp;   - `routes/`

&nbsp;   - `services/`

&nbsp;   - `tests/`



\- \*\*db/\*\*: Base de datos

&nbsp; - `db\_schema.sql`: Esquema inicial

&nbsp; - `backups/`: Copias de seguridad



\- \*\*disenio/\*\*: Diseño y UX/UI

&nbsp; - `diagramas/`

&nbsp; - `mockups/`

&nbsp; - `navegacion/`

&nbsp; - `usabilidad/`



\- \*\*docs/\*\*: Documentación

&nbsp; - `manuales/`

&nbsp; - `tutoriales/`

&nbsp; - `reportes/`



\- Archivos raíz:

&nbsp; - `README.md`

&nbsp; - `.gitignore.txt`

&nbsp; - `especificaciones.md`

&nbsp; - `.env.example`



\## ⚙️ Instalación



1\. Clonar el repositorio:

```bash

git clone <URL\_DEL\_REPOSITORIO>



2\. Configurar las variables de entorno
```bash
cp .env.example .env
3. Importar la base de datos
```bash
mysql -u usuario -p adoptaunmaestro < db/db\_schema.sql





