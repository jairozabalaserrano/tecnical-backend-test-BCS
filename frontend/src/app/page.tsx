/**
 * page.tsx - PÁGINA PRINCIPAL
 * 
 * En Next.js App Router, cada carpeta en /app es una ruta.
 * page.tsx es el archivo que se renderiza para esa ruta.
 * 
 * Esta página:
 * 1. Muestra el estado del backend (health)
 * 2. Permite login para obtener token JWT
 * 3. Muestra productos del backend
 * 4. Permite crear solicitudes de onboarding (requiere login)
 */

'use client';

import { useState } from 'react';
import HealthStatus from '@/components/HealthStatus';
import LoginForm from '@/components/LoginForm';
import ProductList from '@/components/ProductList';
import OnboardingForm from '@/components/OnboardingForm';

export default function Home() {
  // Estado global: token JWT del usuario autenticado
  const [token, setToken] = useState<string | null>(null);

  // Callback cuando el usuario hace login exitoso
  function handleLogin(newToken: string) {
    setToken(newToken);
  }

  // Logout: simplemente elimina el token
  function handleLogout() {
    setToken(null);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            🏦 Banco Digital - Onboarding
          </h1>
          <HealthStatus />
        </div>
      </header>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Columna izquierda: Auth + Onboarding */}
          <div className="space-y-6">
            {/* Sección de Autenticación */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                🔐 Autenticación
              </h2>

              {token ? (
                // Usuario autenticado
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-blue-700 font-medium">✅ Sesión activa</p>
                    <p className="text-xs text-blue-600 mt-1 break-all">
                      Token: {token.substring(0, 50)}...
                    </p>
                    <p className="text-xs text-blue-500 mt-1">
                      ⏱️ El token expira en 5 minutos
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                // Formulario de login
                <LoginForm onLogin={handleLogin} />
              )}
            </section>

            {/* Sección de Onboarding */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                📝 Solicitud de Onboarding
              </h2>

              {token ? (
                <OnboardingForm token={token} />
              ) : (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-yellow-700">
                    ⚠️ Debes iniciar sesión para crear una solicitud de onboarding.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Columna derecha: Productos */}
          <div>
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                💳 Productos Disponibles
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Estos productos se obtienen del backend (con caché)
              </p>
              <ProductList />
            </section>
          </div>
        </div>

        {/* Footer con información */}
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>
            Backend: <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:3000</code>
            {' | '}
            Frontend: <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:3001</code>
          </p>
          <p className="mt-2">
            Prueba Técnica - NestJS + Next.js
          </p>
        </footer>
      </div>
    </main>
  );
}
