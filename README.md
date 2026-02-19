# 🦁 Zoo App - Gestión de Animales

Aplicación web desarrollada con Angular 17+ para la gestión de animales de un zoológico. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) consumiendo una API REST real.

---

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Funcionalidades](#funcionalidades)
- [API Utilizada](#api-utilizada)
- [Instalación y Ejecución](#instalación-y-ejecución)

---

## 📖 Descripción

Zoo App es una aplicación de gestión de animales que permite a los usuarios visualizar, crear, editar y eliminar información sobre los animales de un zoológico. Cada animal tiene los siguientes datos:

- **Nombre**: Nombre del animal
- **Especie**: Especie a la que pertenece
- **Hábitat**: Entorno natural donde vive
- **Dieta**: Tipo de alimentación

---

## 🛠️ Tecnologías Utilizadas

- **Angular 17+**: Framework principal
- **TypeScript**: Lenguaje de programación
- **Reactive Forms**: Validación de formularios
- **MockAPI**: API REST simulada para persistencia de datos
- **CSS3**: Estilos y diseño responsive
- **Angular Router**: Navegación entre páginas
- **HttpClient**: Peticiones HTTP a la API

---

## 📁 Estructura del Proyecto
```
src/app/
├── components/              # Componentes reutilizables
│   ├── animal-card/        # Tarjeta individual de animal
│   └── navbar/             # Barra de navegación
│
├── pages/                  # Páginas principales (rutas)
│   ├── listado-animales/   # Listado de todos los animales
│   ├── detalle-animal/     # Detalle de un animal específico
│   ├── crear-animal/       # Formulario para crear animal
│   └── editar-animal/      # Formulario para editar animal
│
├── services/               # Servicios para lógica de negocio
│   └── animales.service.ts # Service para operaciones CRUD
│
├── models/                 # Interfaces y modelos de datos
│   └── animal.model.ts     # Interface del modelo Animal
│
├── app.routes.ts           # Configuración de rutas
├── app.component.ts        # Componente raíz
└── styles.css              # Estilos globales
```

---

## ✨ Funcionalidades

### 1. **Listado de Animales**
- Muestra todos los animales en formato de tarjetas (cards)
- Muestra información resumida: nombre, especie, hábitat y dieta
- Botones para ver detalle, editar y eliminar
- Mensaje cuando la lista está vacía
- Loading spinner mientras carga los datos

### 2. **Detalle de Animal**
- Muestra información completa de un animal específico
- Botones para editar o eliminar el animal
- Botón para volver al listado

### 3. **Crear Animal**
- Formulario con validaciones en tiempo real
- Campos obligatorios: nombre, especie, hábitat y dieta
- Validación de longitud mínima en campos de texto
- Selects desplegables para hábitat y dieta
- Mensajes de error descriptivos
- Confirmación antes de cancelar

### 4. **Editar Animal**
- Formulario precargado con los datos actuales del animal
- Mismas validaciones que el formulario de crear
- Indicadores visuales de campos válidos/inválidos
- Spinner de carga mientras obtiene los datos

### 5. **Eliminar Animal**
- Confirmación antes de eliminar
- Mensaje de éxito tras eliminar
- Actualización automática del listado

---

## 🌐 API Utilizada

**MockAPI**: https://698a05f7c04d974bc6a11fd5.mockapi.io/animales

### Endpoints:

- `GET /animales` - Obtener todos los animales
- `GET /animales/:id` - Obtener un animal por ID
- `POST /animales` - Crear un nuevo animal
- `PUT /animales/:id` - Actualizar un animal existente
- `DELETE /animales/:id` - Eliminar un animal

### Estructura de datos:
```json
{
  "id": "1",
  "nombre": "León Africano",
  "especie": "Panthera leo",
  "habitat": "Sabana",
  "dieta": "Carnívoro"
}
```

---

## 🚀 Instalación y Ejecución

### Prerrequisitos:
- Node.js (v18 o superior)
- npm (v9 o superior)
- Angular CLI (v17 o superior)

### Pasos:

1. **Clonar el repositorio:**
```bash
git clone <url-del-repositorio>
cd zoo-app
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Ejecutar la aplicación:**
```bash
ng serve
```

4. **Abrir en el navegador:**
```
http://localhost:4200
```
