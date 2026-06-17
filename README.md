# AstroDistri

AstroDistri 

## Arquitectura

El proyecto consta de dos partes principales:

1.  **Backend (Django):**
    *   Framework: Django + Django REST Framework.
    *   Base de datos: SQLite.
    *   Autenticación: JWT (JSON Web Tokens) mediante `dj-rest-auth` y `simplejwt`.
    *   Documentación API: Implementada con `drf-spectacular` (Swagger/Redoc).
2.  **Frontend (React):**
    *   Framework: React + Vite.
    *   Estilos: Tailwind CSS.
    *   Gestión de estado: Context API (para autenticación).
    *   Enrutamiento: React Router.

## Requisitos Previos

*   Python 3.x
*   Node.js (LTS recomendado)
*   npm

## Instalación y Ejecución

### Backend
1.  Navegar a la raíz del proyecto.
2.  Crear y activar un entorno virtual: `python -m venv venv && source venv/bin/activate` (o `venv\Scripts\activate` en Windows).
3.  Instalar dependencias: `pip install -r requirements.txt`.
4.  Ejecutar migraciones: `python manage.py migrate`.
5.  Iniciar servidor: `python manage.py runserver`.

### Frontend
1.  Navegar a la carpeta `client`.
2.  Instalar dependencias: `npm install`.
3.  Iniciar servidor de desarrollo: `npm run dev`.

## Endpoints Principales (API)

*   **Auth:** `/api/auth/` (Login, Register, etc.)
*   **Productos:** `/products/api/v1/products/` (CRUD)
*   **Estados:** `/products/api/v1/statuses/` (CRUD)
*   **Documentación API:** `/products/api/docs/` (Swagger UI)
