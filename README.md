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
- [Decisiones Técnicas](#decisiones-técnicas)
- [Problemas Encontrados y Soluciones](#problemas-encontrados-y-soluciones)

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
- **RxJS**: Programación reactiva (Observables)
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

---

## 🎯 Decisiones Técnicas

### **1. Arquitectura de Componentes Standalone**
Se eligió usar componentes standalone (Angular 17+) en lugar de módulos tradicionales para:
- Mayor simplicidad y menos código boilerplate
- Imports más explícitos y claros
- Mejor tree-shaking y optimización del bundle

### **2. Reactive Forms vs Template-driven Forms**
Se optó por **Reactive Forms** porque:
- Mayor control sobre las validaciones
- Más fácil de testear
- Mejor para formularios complejos
- Validaciones sincrónas y asíncronas más simples

### **3. Separación de Responsabilidades**
- **Services**: Toda la lógica de comunicación con la API
- **Components**: Solo presentación y manejo de eventos
- **Models**: Interfaces TypeScript para type-safety

### **4. Comunicación Padre-Hijo**
Se implementó el componente `animal-card` como componente reutilizable con:
- `@Input()` para recibir datos del padre
- `@Output()` para emitir eventos al padre
- Esto permite reutilizar la tarjeta en múltiples lugares

### **5. Manejo de Errores**
- Control de errores HTTP con manejo de estados 404, 500, etc.
- Mensajes de error descriptivos para el usuario
- Validación de IDs antes de hacer peticiones

### **6. UX/UI**
- Loading spinners para indicar carga
- Mensajes de éxito/error con timeouts automáticos
- Confirmaciones antes de acciones destructivas (borrar)
- Estados visuales en formularios (válido/inválido)
- Diseño responsive adaptado a móviles

---

## 🐛 Problemas Encontrados y Soluciones

### **Problema 1: Tipo de ID (string vs number)**
**Error**: La API de MockAPI devuelve IDs como strings, pero inicialmente se definieron como numbers.

**Solución**: 
- Cambiar el modelo `Animal` para que `id` sea `string`
- Actualizar todos los métodos del service
- Eliminar conversiones con `+id` en los componentes
```typescript
// Antes
id?: number;

// Después
id?: string;
```

---

### **Problema 2: Estilos no se aplicaban en componentes**
**Error**: Los estilos CSS del componente no se cargaban.

**Solución**: 
- Cambiar `styleUrls: ['...']` por `styleUrl: '...'` (singular en Angular 17+)
- Usar `!important` en algunos estilos para sobrescribir estilos globales
- Reiniciar el servidor de desarrollo
```typescript
// Antes
styleUrls: ['./editar-animal.component.css']

// Después
styleUrl: './editar-animal.component.css'
```

---

### **Problema 3: Error 404 al obtener animales**
**Error**: No se encontraban los animales por ID.

**Solución**:
- Verificar que los IDs en la URL coincidan con los de la API
- No convertir el ID a número (mantenerlo como string)
- Verificar que la URL de la API sea correcta

---

### **Problema 4: Sintaxis antigua de directivas**
**Error**: Se usaba `*ngIf` y `*ngFor` (sintaxis antigua).

**Solución**:
- Migrar a la nueva sintaxis de control flow de Angular 17+
- `*ngIf` → `@if`
- `*ngFor` → `@for`
- Usar `track` obligatorio en `@for`
```html
<!-- Antes -->
<div *ngIf="animal">{{ animal.nombre }}</div>
<div *ngFor="let animal of animales">...</div>

<!-- Después -->
@if (animal) {
  <div>{{ animal.nombre }}</div>
}
@for (animal of animales; track animal.id) {
  <div>...</div>
}
```

---

### **Problema 5: Propiedades opcionales y errores de compilación**
**Error**: TypeScript se quejaba de propiedades que podían ser `undefined`.

**Solución**:
- Usar optional chaining (`?.`)
- Verificar existencia antes de usar propiedades opcionales
- Usar guardias de tipo (`if (animal?.id)`)
```typescript
// Antes
this.router.navigate(['/animales', this.animal.id]); // Error

// Después
if (this.animal?.id) {
  this.router.navigate(['/animales', this.animal.id]);
}
```
