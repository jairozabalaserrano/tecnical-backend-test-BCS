'use client';

import { useState, useEffect, useCallback } from 'react';
import HealthStatus from '@/components/HealthStatus';
import LoginForm from '@/components/LoginForm';
import ProductList from '@/components/ProductList';
import OnboardingForm from '@/components/OnboardingForm';
import { cache } from '@/lib/cache';

function decodeJwtExp(token: string): number | null {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.exp ? decoded.exp * 1000 : null;
  } catch {
    return null;
  }
}

function formatTime(ms: number): string {
  if (ms <= 0) return '00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [sessionAlert, setSessionAlert] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  const handleSessionExpired = useCallback(() => {
    setToken(null);
    setTimeRemaining(null);
    cache.clear();
    setSessionAlert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
  }, []);

  useEffect(() => {
    window.handleSessionExpired = handleSessionExpired;
    return () => {
      delete window.handleSessionExpired;
    };
  }, [handleSessionExpired]);

  useEffect(() => {
    if (!token) {
      setTimeRemaining(null);
      return;
    }

    const expTime = decodeJwtExp(token);
    if (!expTime) return;

    const updateTimer = () => {
      const remaining = expTime - Date.now();
      if (remaining <= 0) {
        handleSessionExpired();
      } else {
        setTimeRemaining(remaining);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [token, handleSessionExpired]);

  function handleLogin(newToken: string) {
    setToken(newToken);
    setSessionAlert(null);
  }

  function handleLogout() {
    setToken(null);
    setTimeRemaining(null);
    cache.clear();
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

      {sessionAlert && (
        <div className="max-w-6xl mx-auto px-4 pt-4">
          <div className="p-4 bg-orange-50 border border-orange-300 rounded-lg flex justify-between items-center">
            <span className="text-orange-700">⚠️ {sessionAlert}</span>
            <button
              onClick={() => setSessionAlert(null)}
              className="text-orange-700 hover:text-orange-900 font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

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
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="flex justify-between items-center">
                      <p className="text-blue-700 font-medium">✅ Sesión activa</p>
                      {timeRemaining !== null && (
                        <div className={`px-3 py-1 rounded-full text-sm font-mono font-bold ${
                          timeRemaining < 60000 
                            ? 'bg-red-100 text-red-700 animate-pulse' 
                            : timeRemaining < 180000 
                              ? 'bg-yellow-100 text-yellow-700' 
                              : 'bg-green-100 text-green-700'
                        }`}>
                          ⏱️ {formatTime(timeRemaining)}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-blue-600 mt-2 break-all">
                      Token: {token.substring(0, 40)}...
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
            Backend: <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:3010</code>
            {' | '}
            Frontend: <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:3011</code>
          </p>
          <p className="mt-2">
            Prueba Técnica - NestJS + Next.js
          </p>
        </footer>
      </div>
    </main>
  );
}
