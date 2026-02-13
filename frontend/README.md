# 🏦 Banco Digital - Frontend Onboarding

Frontend desarrollado con **Next.js 16** y **React 19** para el sistema de onboarding bancario. Esta aplicación se conecta a un backend NestJS para gestionar autenticación, productos y solicitudes de onboarding.

## 📋 Características

- ✅ **Health Check**: Verificación en tiempo real del estado del backend
- 🔐 **Autenticación JWT**: Login con tokens de acceso (expiración 5 min)
- 💳 **Catálogo de Productos**: Listado de productos bancarios disponibles
- 📝 **Formulario de Onboarding**: Creación de solicitudes (requiere autenticación)
- 🎨 **UI Moderna**: Diseño responsive con Tailwind CSS 4

## 🛠️ Tecnologías

- **Next.js** 16.1.6 (App Router)
- **React** 19.2.3
- **TypeScript** 5.x
- **Tailwind CSS** 4.x
- **ESLint** 9.x

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── layout.tsx      # Layout principal
│   └── page.tsx        # Página principal
├── components/
│   ├── HealthStatus.tsx    # Indicador de estado del backend
│   ├── LoginForm.tsx       # Formulario de autenticación
│   ├── ProductList.tsx     # Lista de productos
│   └── OnboardingForm.tsx  # Formulario de onboarding
├── lib/
│   └── api.ts          # Cliente API centralizado
└── types/
    └── api.ts          # Interfaces TypeScript
```

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Backend NestJS corriendo en `http://localhost:3000`

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/jairozabalaserrano/tecnical-nest-backend-test.git
cd tecnical-nest-backend-test
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:3001
```

## 📡 API Endpoints

El frontend consume los siguientes endpoints del backend:

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/health` | Estado del servidor | No |
| POST | `/auth/login` | Autenticación | No |
| GET | `/products` | Lista de productos | No |
| GET | `/products/:id` | Detalle de producto | No |
| POST | `/onboarding` | Crear solicitud | Sí (JWT) |

## 🔑 Credenciales de Prueba

```
Usuario: admin
Contraseña: password123
```

## 📜 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo (puerto 3001)
npm run build    # Compilar para producción
npm run start    # Iniciar servidor de producción
npm run lint     # Ejecutar ESLint
```

## ⚙️ Configuración

La URL del backend se configura en `src/lib/api.ts`:

```typescript
const API_URL = 'http://localhost:3000';
```

Para producción, usar variables de entorno:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
```

## 🧪 Flujo de Uso

1. Verificar que el indicador de backend muestre "Conectado"
2. Iniciar sesión con las credenciales de prueba
3. Completar el formulario de onboarding con datos válidos
4. Enviar la solicitud y obtener el ID de confirmación

## 📝 Validaciones del Formulario

- **Nombre**: Mínimo 2 caracteres
- **Documento**: Mínimo 5 caracteres
- **Email**: Formato válido de correo
- **Monto inicial**: Número positivo mayor a 0

## 🤝 Autor

Jairo Zabala Serrano

---

*Prueba Técnica - NestJS + Next.js*
