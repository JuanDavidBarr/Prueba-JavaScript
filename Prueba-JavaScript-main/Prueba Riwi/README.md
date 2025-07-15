
# 📚 SPA - Panel de Administración con Autenticación y Gestión de Cursos

## 📌 Objetivo
Desarrollar una **Single Page Application (SPA)** que permita la gestión de usuarios y cursos, con autenticación y control de acceso por roles:
- **Administrador:** puede crear, leer, actualizar y eliminar usuarios y cursos.
- **Visitante:** puede registrarse, iniciar sesión, visualizar los cursos disponibles y registrarse a ellos.

---

## 🚀 Tecnologías Utilizadas
- **HTML5**
- **CSS3** (Flexbox y Grid)
- **JavaScript Vanilla (ES6+)**
- **json-server** (para simular una API RESTful)

> ❌ **Restricciones:**  
No se utilizaron frameworks de JS (React, Vue, Angular), librerías CSS (Bootstrap, Tailwind) ni jQuery.

---

## 🎯 Funcionalidades

### 🔐 Módulo de Autenticación
- Registro de usuarios (visitantes y administradores)
- Inicio de sesión
- Validación de credenciales
- Almacenamiento de sesión con `localStorage`

### 👥 Gestión de Roles
- **Administrador**
  - Acceso exclusivo al panel administrativo
  - CRUD completo de **usuarios**
  - CRUD completo de **cursos**
- **Visitante**
  - Visualización de cursos disponibles
  - Inscripción a cursos

### 🎨 Interfaz de Usuario
- Pantallas de **login** y **registro**
- **Dashboard** para el administrador
- Vista pública para visitantes
- **Sidebar** de navegación
- **Header** con información del usuario logueado
- Tablas de usuarios y cursos
- Formulario de creación/edición de usuarios y cursos
- Modal de confirmación en acciones sensibles
- Diseño **responsive** y accesible


## ✅ Cómo Ejecutar el Proyecto

1. **Clona el repositorio:**
```bash
git clone <url-del-repositorio>
```

2. **Instala json-server:**
```bash
npm install -g json-server
```

3. **Ejecuta json-server:**
```bash
json-server --watch src/db.json --port 3000
```

4. **Abre el archivo HTML correspondiente en el navegador:**  
Por ejemplo, para empezar el login:
```
src/pages/login.html
```

---
