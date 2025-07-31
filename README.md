# Quick Notes API - Backend

Este es el backend para una aplicación sencilla de gestión de notas rápidas. Permite crear, listar, actualizar y eliminar notas mediante una API RESTful.

## Tecnologías utilizadas

- Node.js
- Express.js
- TypeScript
- SQLite (almacenamiento en archivo)
- Sequelize (ORM)
- CORS
- Dotenv

## Estructura del proyecto

```
quick-notes-api/
├── src/
│   ├── controllers/
│   ├── interfaces/
│   ├── models/
│   ├── routes/
│   ├── db/
│   ├── index.ts
├── .env
├── .gitignore
├── tsconfig.json
├── package.json
└── README.md
```

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/quick-notes-api.git
cd quick-notes-api
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` con el siguiente contenido:

```
PORT=3000
```

4. Ejecuta el servidor:

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:3000`.

## Endpoints

| Método | Ruta         | Descripción               |
|--------|--------------|---------------------------|
| GET    | /notes       | Obtener todas las notas   |
| POST   | /notes       | Crear una nueva nota      |
| PUT    | /notes/:id   | Editar una nota existente |
| DELETE | /notes/:id   | Eliminar una nota         |

## Ejemplo de JSON para crear o editar una nota

```json
{
  "title": "Mi nota",
  "description": "Esta es una nota de ejemplo"
}
```

## Scripts útiles

```bash
npm run dev       # Ejecuta el servidor en modo desarrollo
npm run build     # Transpila TypeScript a JavaScript
npm start         # Ejecuta el servidor desde /dist
```

## Validaciones

- El campo `title` es obligatorio y debe ser una cadena.
- El campo `description` es opcional, pero se puede ajustar a obligatorio si se requiere.

