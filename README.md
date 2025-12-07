🍎 AdoptaUnMaestro
<p align="center"> <img alt="Version" src="https://img.shields.io/badge/version-Final-blue.svg?cacheSeconds=2592000" /> <img alt="PHP" src="https://img.shields.io/badge/PHP-8.x-777BB4?logo=php" /> <img alt="MySQL" src="https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql" /> <img alt="License" src="https://img.shields.io/badge/license-MIT-green" /> </p>
AdoptaUnMaestro es una plataforma web diseñada para conectar maestros y centros educativos, facilitando la gestión de publicaciones, ofertas y recursos educativos. Este proyecto fue desarrollado como Proyecto Final del ciclo formativo de DAW (Desarrollo de Aplicaciones Web).

✨ Características Principales
🔐 Autenticación de usuarios - Sistema seguro de registro e inicio de sesión

📝 Gestión de publicaciones - Creación y administración de anuncios educativos

🤝 Sistema de ofertas - Interacción entre maestros e instituciones

📊 Panel de administración - Gestión completa de usuarios y contenido

📱 Diseño responsivo - Compatible con dispositivos móviles y de escritorio

🧪 Suite de pruebas - Tests para garantizar la calidad del código

📁 Estructura del Proyecto
text
AdoptaUnMaestro/
├── public/                   # Frontend - Archivos públicos
│   ├── css/                 # Hojas de estilo
│   ├── js/                  # Scripts JavaScript
│   ├── img/                 # Imágenes y recursos visuales
│   ├── libs/                # Librerías externas (Bootstrap, jQuery, etc.)
│   ├── fonts/               # Tipografías personalizadas
│   └── index.html           # Página principal de la aplicación
├── backend/                 # Lógica del servidor (PHP)
│   ├── controllers/         # Controladores de la aplicación
│   ├── models/              # Modelos de datos
│   ├── routes/              # Definición de rutas API
│   ├── services/            # Lógica de negocio y servicios
│   ├── tests/               # Pruebas unitarias y de integración
│   ├── auth.php             # Autenticación de usuarios
│   ├── publicaciones.php    # Gestión de publicaciones
│   ├── ofertas.php          # Gestión de ofertas
│   └── conexion.php         # Conexión a base de datos
├── db/                      # Base de datos
│   ├── db_schema.sql        # Esquema inicial de la base de datos
│   └── backups/             # Copias de seguridad de la base de datos
├── disenio/                 # Diseño y experiencia de usuario
│   ├── diagramas/           # Diagramas de flujo y arquitectura
│   ├── mockups/             # Diseños visuales y prototipos
│   ├── navegacion/          # Mapas de navegación
│   └── usabilidad/          # Pruebas y análisis de usabilidad
├── docs/                    # Documentación del proyecto
│   ├── manuales/            # Manuales de usuario y técnico
│   ├── tutoriales/          # Guías paso a paso
│   └── reportes/            # Reportes de desarrollo y pruebas
└── archivos de configuración
    ├── README.md            # Este archivo
    ├── .gitignore           # Archivos ignorados por Git
    ├── especificaciones.md  # Especificaciones técnicas
    └── .env.example         # Plantilla de variables de entorno
🚀 Instalación y Configuración
Prerrequisitos
Servidor web (Apache, Nginx o similar)

PHP 8.0 o superior

MySQL 8.0 o superior (o MariaDB equivalente)

Composer (para gestión de dependencias PHP, si las hay)

Git

Pasos de Instalación
Clonar el repositorio

bash
git clone https://github.com/jcfinoquio/AdoptaUnMaestro.git
cd AdoptaUnMaestro
Configurar el entorno

bash
cp .env.example .env
Editar el archivo .env con tus credenciales de base de datos:

env
DB_HOST=localhost
DB_NAME=adoptaunmaestro
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
Configurar la base de datos

bash
mysql -u root -p
sql
CREATE DATABASE adoptaunmaestro;
USE adoptaunmaestro;
SOURCE db/db_schema.sql;
Configurar el servidor web

Apuntar el directorio raíz del servidor web a la carpeta public/

Asegurarse de que las carpetas public/ y backend/ tienen los permisos adecuados

Acceder a la aplicación

Abrir el navegador y visitar http://localhost/adoptaunmaestro/public/

🛠️ Tecnologías Utilizadas
Backend
PHP 8+ - Lenguaje principal del servidor

MySQL 8+ - Sistema de gestión de base de datos

Apache - Servidor web (configurable para otros)

Frontend
HTML5 - Estructura de páginas web

CSS3 - Estilos y diseño responsivo

JavaScript (ES6+) - Interactividad del cliente

Bootstrap 5 - Framework CSS (según contenido de public/libs/)

jQuery - Biblioteca JavaScript (si se incluye)

Herramientas de Desarrollo
Git - Control de versiones

PHPUnit - Framework de pruebas (si está configurado)

MySQL Workbench - Diseño y gestión de base de datos

📖 Cómo Usar la Plataforma
Para Maestros
Registrarse en la plataforma

Completar el perfil profesional

Publicar necesidades o recursos disponibles

Explorar ofertas de centros educativos

Gestionar propuestas recibidas

Para Centros Educativos
Crear una cuenta institucional

Publicar necesidades específicas

Buscar maestros disponibles

Enviar ofertas de colaboración

Gestionar el historial de conexiones

Para Administradores
Acceder al panel de administración

Gestionar usuarios y permisos

Moderar publicaciones y ofertas

Generar reportes y estadísticas

Realizar mantenimiento del sistema

🧪 Ejecutar Pruebas
bash
# Navegar al directorio de pruebas
cd backend/tests/

# Ejecutar pruebas (si están configuradas con PHPUnit)
phpunit
🤝 Cómo Contribuir
Las contribuciones son bienvenidas. Para contribuir al proyecto:

Fork el repositorio

Crear una rama para tu feature (git checkout -b feature/NuevaFuncionalidad)

Realizar los cambios y hacer commit (git commit -m 'Añadir alguna funcionalidad')

Subir los cambios (git push origin feature/NuevaFuncionalidad)

Abrir un Pull Request

Guías de Estilo
Seguir los estándares PSR para código PHP

Comentar el código adecuadamente

Actualizar la documentación correspondiente

📄 Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

👥 Autores y Agradecimientos
Juan Carlos Finoquio - @jcfinoquio - Desarrollo principal

DAW - Proyecto Final del ciclo formativo de Desarrollo de Aplicaciones Web

Agradecimientos Especiales
Tutores y profesores del ciclo formativo

Compañeros de clase por su feedback y apoyo

Comunidades de desarrollo open source
