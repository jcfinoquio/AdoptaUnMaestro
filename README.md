# 🍎 AdoptaUnMaestro

![Version](https://img.shields.io/badge/version-Final-blue.svg?cacheSeconds=2592000) 
![PHP](https://img.shields.io/badge/PHP-8.x-777BB4?logo=php) 
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql) 
![License](https://img.shields.io/badge/license-MIT-green)

> **AdoptaUnMaestro** es una plataforma web para conectar maestros y centros educativos, facilitando la gestión de publicaciones, ofertas y recursos educativos.  
> Proyecto Final del ciclo formativo **DAW (Desarrollo de Aplicaciones Web)**.

---

## ✨ Características Principales

| Icono | Funcionalidad | Descripción |
|-------|---------------|-------------|
| 🔐 | Autenticación de usuarios | Registro e inicio de sesión seguro |
| 📝 | Gestión de publicaciones | Crear y administrar anuncios educativos |
| 🤝 | Sistema de ofertas | Interacción entre maestros e instituciones |
| 📊 | Panel de administración | Gestión completa de usuarios y contenido |
| 📱 | Diseño responsivo | Compatible con móviles y escritorio |
| 🧪 | Suite de pruebas | Tests para garantizar la calidad del código |

---

## 📁 Estructura del Proyecto

AdoptaUnMaestro/
├── public/                   # Frontend - Archivos públicos
│   ├── css/
│   ├── js/
│   ├── img/
│   ├── libs/
│   ├── fonts/
│   └── index.html
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── tests/
│   ├── auth.php
│   ├── publicaciones.php
│   ├── ofertas.php
│   └── conexion.php
├── db/
│   ├── db_schema.sql
│   └── backups/
├── disenio/
│   ├── diagramas/
│   ├── mockups/
│   ├── navegacion/
│   └── usabilidad/
├── docs/
│   ├── manuales/
│   ├── tutoriales/
│   └── reportes/
└── archivos de configuración
├── README.md
├── .gitignore
├── especificaciones.md
└── .env.example

---

## 🚀 Instalación y Configuración

### Prerrequisitos

- Servidor web (Apache, Nginx o similar)
- PHP 8.0 o superior
- MySQL 8.0 o superior (o MariaDB equivalente)
- Composer
- Git

### Pasos de Instalación

# Clonar el repositorio
git clone https://github.com/jcfinoquio/AdoptaUnMaestro.git
cd AdoptaUnMaestro

# Configurar el entorno
cp .env.example .env
# Editar .env con tus credenciales
DB_HOST=localhost
DB_NAME=adoptaunmaestro
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña

# Configurar la base de datos
mysql -u root -p
CREATE DATABASE adoptaunmaestro;
USE adoptaunmaestro;
SOURCE db/db_schema.sql;

# Configurar el servidor web apuntando a public/
 

Abrir en navegador: [http://localhost/adoptaunmaestro/public/](http://localhost/adoptaunmaestro/public/)

---

## 🛠️ Tecnologías Utilizadas

**Backend:** PHP 8+, MySQL 8+, Apache
**Frontend:** HTML5, CSS3, JavaScript (ES6+), Bootstrap 5, jQuery (opcional)
**Herramientas:** Git, PHPUnit, MySQL Workbench

---

## 📖 Cómo Usar la Plataforma

### Para Maestros

* Registrarse y completar perfil
* Publicar necesidades o recursos
* Explorar ofertas de centros educativos
* Gestionar propuestas recibidas

### Para Centros Educativos

* Crear cuenta institucional
* Publicar necesidades específicas
* Buscar maestros disponibles
* Enviar ofertas de colaboración
* Gestionar historial de conexiones

### Para Administradores

* Acceder al panel de administración
* Gestionar usuarios y permisos
* Modera publicaciones y ofertas
* Generar reportes y estadísticas
* Mantenimiento del sistema

---

## 🤝 Cómo Contribuir

1. Hacer fork del repositorio
2. Crear rama: `git checkout -b feature/NuevaFuncionalidad`
3. Realizar cambios y commit: `git commit -m 'Añadir alguna funcionalidad'`
4. Subir cambios: `git push origin feature/NuevaFuncionalidad`
5. Abrir Pull Request

> Seguir estándares PSR, comentar código y mantener documentación actualizada.

---

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**. Consulta el archivo LICENSE para más detalles.

---
