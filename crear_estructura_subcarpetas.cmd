@echo off
REM ===========================================
REM Script final: Crear proyecto "adoptaunmaestro"
REM Estructura avanzada con archivos iniciales
REM ===========================================

REM --------------------------
REM Carpeta raíz
REM --------------------------
mkdir adoptaunmaestro
cd adoptaunmaestro

REM Archivos raíz con contenido básico
echo # Adopta un Maestro > README.md
echo # Especificaciones del proyecto > especificaciones.md
echo *.log > .gitignore.txt
echo # Variables de entorno > .env.example

REM --------------------------
REM Public (frontend)
REM --------------------------
mkdir public
cd public

REM index.html con plantilla básica
(
echo ^<!DOCTYPE html^>
echo ^<html lang="es"^>
echo ^<head^>
echo     ^<meta charset="UTF-8"^>
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^>
echo     ^<title^>Adopta un Maestro^</title^>
echo     ^<link rel="stylesheet" href="css/style.css"^>
echo ^</head^>
echo ^<body^>
echo     ^<h1^>Bienvenido a Adopta un Maestro^</h1^>
echo     ^<script src="js/js.js"^>^</script^>
echo ^</body^>
echo ^</html^>
) > index.html

REM Subcarpetas frontend
mkdir css
echo /* Estilos base */ > css/style.css
mkdir js
echo // Código JavaScript inicial > js/js.js
mkdir img
mkdir libs
mkdir fonts
cd..

REM --------------------------
REM Backend
REM --------------------------
mkdir backend
cd backend

REM Archivos PHP iniciales
(
echo ^<?php
echo // Conexión base a la base de datos
echo \$conn = new mysqli('localhost', 'usuario', 'password', 'adoptaunmaestro');
echo if (\$conn->connect_error) {
echo     die("Conexión fallida: " . \$conn->connect_error);
echo }
echo ?^>
) > conexion.php

echo ^<?php // Autenticación básica ?> > auth.php
echo ^<?php // Publicaciones ?> > publicaciones.php
echo ^<?php // Ofertas ?> > ofertas.php

REM Subcarpetas backend
mkdir controllers
echo ^<?php // Ejemplo de controlador ?> > controllers/ControllerExample.php
mkdir models
echo ^<?php // Ejemplo de modelo ?> > models/ModelExample.php
mkdir routes
echo ^<?php // Ejemplo de rutas ?> > routes/RouteExample.php
mkdir services
echo ^<?php // Ejemplo de servicio ?> > services/ServiceExample.php
mkdir tests
echo ^<?php // Ejemplo de test ?> > tests/TestExample.php
cd..

REM --------------------------
REM Base de datos
REM --------------------------
mkdir db
cd db
echo -- Esquema inicial de la base de datos > db_schema.sql
mkdir backups
cd..

REM --------------------------
REM Diseño
REM --------------------------
mkdir disenio
cd disenio
mkdir diagramas
mkdir mockups
mkdir navegacion
mkdir usabilidad
cd..

REM --------------------------
REM Documentación
REM --------------------------
mkdir docs
mkdir docs/manuales
mkdir docs/tutoriales
mkdir docs/reportes

echo ===========================================
echo Estructura de proyecto completa creada correctamente.
pause
