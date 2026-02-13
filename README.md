# Prueba Backend - Proyecto Full Stack

Un proyecto full stack que combina un backend NestJS con un frontend Next.js, incluyendo monitoreo con Prometheus y Grafana, y una base de datos PostgreSQL.

## 📋 Descripción del Proyecto

Este es un proyecto monorepo que contiene:
- **Backend**: API REST construida con NestJS
- **Frontend**: Aplicación web moderna con Next.js
- **Monitoreo**: Stack de Prometheus, Grafana y Blackbox Exporter
- **Base de Datos**: PostgreSQL 15

## 📁 Estructura del Proyecto

```
prueba-backend/
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── auth/           # Módulo de autenticación
│   │   ├── common/         # Utilidades compartidas
│   │   ├── encryption/     # Servicios de encriptación
│   │   ├── health/         # Health checks
│   │   ├── onboarding/     # Módulo de onboarding
│   │   ├── products/       # Módulo de productos
│   │   └── main.ts         # Punto de entrada
│   ├── test/               # Tests E2E
│   ├── dist/               # Compilación
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                # Aplicación Next.js
│   ├── src/
│   │   ├── app/            # Rutas y layouts
│   │   ├── components/     # Componentes React
│   │   ├── lib/            # Librerías y utilidades
│   │   └── types/          # Tipos TypeScript
│   ├── public/             # Archivos estáticos
│   ├── package.json
│   └── tsconfig.json
│
├── prometheus/             # Configuración de Prometheus
│   └── prometheus.yml
│
├── docker-compose.yml      # Configuración de servicios
├── .env                    # Variables de entorno
├── package.json            # Configuración del monorepo
└── README.md              # Este archivo
```

## 🚀 Quick Start

### Requisitos Previos
- **Node.js**: v16.0.0 o superior
- **npm**: v8.0.0 o superior
- **Docker**: (Opcional, para PostgreSQL y herramientas de monitoreo)

### Instalación

1. **Clonar y navegar al proyecto**:
```bash
cd prueba-backend
```

2. **Instalar dependencias**:
```bash
npm install
```

Este comando instala las dependencias para el monorepo y ambos workspaces (backend y frontend).

### Iniciando el Proyecto

#### Opción 1: Iniciar Backend y Frontend por separado

**Terminal 1 - Backend**:
```bash
npm run start:backend
```

El backend estará disponible en `http://localhost:3010`
- API: `http://localhost:3010/api`
- Swagger: `http://localhost:3010/api` (documentación interactiva)

**Terminal 2 - Frontend**:
```bash
npm run start:frontend
```

El frontend estará disponible en `http://localhost:3011`

#### Opción 2: Usar Docker Compose (Recomendado)

```bash
docker-compose up -d
```

Esto levanta todos los servicios:
- **PostgreSQL**: `localhost:5432`
- **Backend**: `http://localhost:3010`
- **Frontend**: `http://localhost:3011`
- **Prometheus**: `http://localhost:9090`
- **Grafana**: `http://localhost:3012`
- **Blackbox Exporter**: `localhost:9115`

## 🔧 Configuración

### Variables de Entorno (`.env`)

```env
# Puertos
NEXT_PUBLIC_API_URL_BACK=3010
NEXT_PUBLIC_API_URL_FRONT=3011
PORT=3011
NEXT_PUBLIC_API_PROMETHEUS=9090
NEXT_PUBLIC_GRAFANA=3012
BLACKBOX_EXPORTER_PORT=9115

# Autenticación JWT
JWT_SECRET=old9GQZLos//e3gWTSXa+1SikeMRGs+mEac1/HpZYkk=
JWT_EXPIRES_IN=3600s

# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=adminpassword
DB_NAME=bank_db

# Encriptación
ENCRYPTION_KEY=a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
ENCRYPTION_IV=a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
```

## 📊 Servicios y URLs

| Servicio | URL | Usuario | Contraseña |
|----------|-----|---------|-----------|
| Backend | http://localhost:3010 | - | - |
| Swagger API | http://localhost:3010/api | - | - |
| Frontend | http://localhost:3011 | - | - |
| PostgreSQL | localhost:5432 | admin | adminpassword |
| Prometheus | http://localhost:9090 | - | - |
| Grafana | http://localhost:3012 | admin | admin |
| Blackbox | localhost:9115 | - | - |

## 🧪 Testing

### Backend

```bash
# Ejecutar tests unitarios
npm run test -w backend

# Ejecutar tests con coverage
npm run test:cov -w backend

# Ejecutar tests E2E
npm run test:e2e -w backend

# Ejecutar tests en modo watch
npm run test:watch -w backend
```

### Frontend

```bash
# Lint del código
npm run lint -w frontend
```

## 🏗️ Build y Producción

### Backend

```bash
# Build
npm run build -w backend

# Iniciar en producción
npm run start:prod -w backend
```

### Frontend

```bash
# Build
npm run build -w frontend

# Iniciar en producción
npm run start -w frontend
```

## 📦 Dependencias Principales

### Backend (NestJS)
- `@nestjs/common` - Framework principal
- `@nestjs/config` - Gestión de configuración
- `@nestjs/jwt` - Autenticación JWT
- `@nestjs/passport` - Integración Passport
- `@nestjs/typeorm` - ORM para PostgreSQL
- `@nestjs/swagger` - Documentación API
- `@willsoto/nestjs-prometheus` - Métricas Prometheus
- `passport-jwt` - Estrategia JWT
- `class-validator` - Validación de datos

### Frontend (Next.js)
- `next` - Framework React
- `react` - Librería UI
- `tailwindcss` - Utilidades CSS
- `crypto-js` - Encriptación cliente

## 🛠️ Scripts Disponibles

### Monorepo (Root)
```bash
npm run start:backend   # Inicia backend en modo watch
npm run start:frontend  # Inicia frontend en modo desarrollo
```

### Backend
```bash
npm run build           # Compila TypeScript
npm run start:dev       # Inicia en modo watch
npm run start:prod      # Inicia en producción
npm run format          # Formatea código
npm run lint            # Revisa código con ESLint
npm run test            # Ejecuta tests
npm run test:watch      # Tests en modo watch
npm run test:cov        # Tests con coverage
```

### Frontend
```bash
npm run dev             # Inicia servidor de desarrollo
npm run build           # Genera build para producción
npm run start           # Inicia servidor de producción
npm run lint            # Revisa código
```

## 📝 Módulos del Backend

### Auth
- Autenticación con JWT
- Passport.js integrado
- Manejo seguro de credenciales

### Encryption
- Servicios de encriptación/desencriptación
- Configuración con keys de entorno

### Products
- Gestión de productos
- Operaciones CRUD

### Onboarding
- Flujo de registro y onboarding

### Health
- Health checks de la aplicación
- Monitoreo de disponibilidad

### Common
- Utilidades compartidas
- Helpers y decoradores

## 📈 Monitoreo

El proyecto incluye un stack completo de monitoreo:

1. **Prometheus**: Recopila métricas de la aplicación
2. **Grafana**: Visualización de métricas
3. **Blackbox Exporter**: Monitoreo de disponibilidad de endpoints

Accede a Grafana en `http://localhost:3012` (admin/admin) para crear dashboards.

## 🔐 Seguridad

- Autenticación JWT
- Encriptación de datos sensibles
- Validación de entrada con class-validator
- Headers de seguridad configurados

## 📄 Licencia

ISC

## ✍️ Autor

Jairo Andres Zabala Serrano

---

**Última actualización**: 2026-02-13
