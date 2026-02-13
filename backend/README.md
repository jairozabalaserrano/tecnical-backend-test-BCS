# 🏦 Backend - API NestJS

API REST construida con **NestJS 11** para el sistema bancario digital. Incluye autenticación JWT, encriptación de datos, métricas con Prometheus y documentación Swagger.

## 📋 Características

- 🔐 **Autenticación JWT** con Passport.js
- 🛡️ **Encriptación** de datos sensibles (AES-256)
- 📊 **Métricas** con Prometheus
- 📝 **Documentación** automática con Swagger
- 🗄️ **Base de datos** PostgreSQL con TypeORM
- ✅ **Validación** con class-validator
- 🧪 **Testing** con Jest

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── auth/           # Autenticación y autorización
│   │   ├── dto/        # Data Transfer Objects
│   │   ├── guards/     # Guards de autenticación
│   │   └── strategies/ # Estrategias Passport
│   ├── common/         # Utilidades compartidas
│   ├── encryption/     # Servicios de encriptación
│   ├── health/         # Health checks
│   ├── onboarding/     # Módulo de onboarding
│   │   ├── dto/
│   │   └── entities/
│   ├── products/       # Módulo de productos
│   │   ├── dto/
│   │   └── entities/
│   ├── app.module.ts   # Módulo principal
│   └── main.ts         # Punto de entrada
├── test/               # Tests E2E
├── package.json
└── tsconfig.json
```

## 🚀 Instalación

> **Nota**: Este proyecto es parte de un monorepo. Se recomienda instalar las dependencias desde la raíz del proyecto.

### Desde la raíz del monorepo (Recomendado)

```bash
# En la raíz del proyecto
npm install
```

### Instalación independiente

```bash
cd backend
npm install
```

## ▶️ Ejecución

### Prerrequisitos

⚠️ **Docker debe estar corriendo** con PostgreSQL antes de iniciar el backend:

```bash
# Desde la raíz del proyecto
docker compose up -d db
```

### Iniciar en modo desarrollo

```bash
# Desde la raíz del monorepo
npm run start:backend

# O desde el directorio backend
npm run start:dev
```

El servidor estará disponible en:
- **API**: `http://localhost:3010`
- **Swagger**: `http://localhost:3010/api`

### Otros comandos

```bash
# Modo producción
npm run start:prod

# Build
npm run build

# Modo debug
npm run start:debug
```

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests en modo watch
npm run test:watch

# Tests E2E
npm run test:e2e
```

## 📝 API Endpoints

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/health` | Estado del servidor | No |
| POST | `/auth/login` | Autenticación | No |
| GET | `/products` | Lista de productos | No |
| GET | `/products/:id` | Detalle de producto | No |
| POST | `/onboarding` | Crear solicitud | Sí (JWT) |

## 🔐 Credenciales de Prueba

```
Usuario: admin
Contraseña: password123
```

## ⚙️ Variables de Entorno

El backend utiliza las siguientes variables de entorno (definidas en `.env` en la raíz):

```env
# Puerto del servidor
NEXT_PUBLIC_API_URL_BACK=3010

# JWT
JWT_SECRET=<clave-secreta>
JWT_EXPIRES_IN=3600s

# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=adminpassword
DB_NAME=bank_db

# Encriptación
ENCRYPTION_KEY=<clave-32-bytes>
ENCRYPTION_IV=<iv-16-bytes>
```

## 📦 Dependencias Principales

- **@nestjs/core** - Framework principal
- **@nestjs/jwt** - Autenticación JWT
- **@nestjs/passport** - Integración Passport
- **@nestjs/typeorm** - ORM para PostgreSQL
- **@nestjs/swagger** - Documentación API
- **@willsoto/nestjs-prometheus** - Métricas
- **class-validator** - Validación de datos

## 📜 Scripts Disponibles

```bash
npm run build          # Compila TypeScript
npm run start          # Inicia el servidor
npm run start:dev      # Modo desarrollo (watch)
npm run start:debug    # Modo debug
npm run start:prod     # Modo producción
npm run format         # Formatea código con Prettier
npm run lint           # Revisa código con ESLint
npm run test           # Ejecuta tests
npm run test:watch     # Tests en modo watch
npm run test:cov       # Tests con coverage
npm run test:e2e       # Tests E2E
```

## ✍️ Autor

Jairo Andres Zabala Serrano
