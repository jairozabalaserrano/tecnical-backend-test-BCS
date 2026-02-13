/**
 * HealthStatus.tsx - INDICADOR DE ESTADO DEL BACKEND
 * 
 * Muestra si el backend está disponible o no.
 * Útil para verificar la conexión antes de hacer otras operaciones.
 * 
 * 'use client' → Indica que este componente se ejecuta en el navegador
 * (necesario en Next.js 13+ App Router para componentes con estado/efectos)
 */

'use client';

import { useState, useEffect } from 'react';
import { checkHealth } from '@/lib/api';

export default function HealthStatus() {
  // Estados del componente
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);

  // useEffect → Se ejecuta cuando el componente se monta
  useEffect(() => {
    async function check() {
      try {
        const response = await checkHealth();
        setIsHealthy(response.ok);
      } catch {
        setIsHealthy(false);
      } finally {
        setChecking(false);
      }
    }
    check();
  }, []); // [] = solo se ejecuta una vez al montar

  if (checking) {
    return (
      <div className="flex items-center gap-2 text-gray-500">
        <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
        <span>Verificando backend...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-3 h-3 rounded-full ${
          isHealthy ? 'bg-green-500' : 'bg-red-500'
        }`}
      ></div>
      <span className={isHealthy ? 'text-green-600' : 'text-red-600'}>
        Backend: {isHealthy ? 'Conectado' : 'Desconectado'}
      </span>
    </div>
  );
}
