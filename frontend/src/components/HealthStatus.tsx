'use client';

import { useState, useEffect } from 'react';
import { checkHealth } from '@/lib/api';

export default function HealthStatus() {
  // Estados del componente
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);

  // useEffect → Se ejecuta cuando el componente se monta y cada 1.5 segundos
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
    
    // Check inicial
    check();
    
    // Intervalo de 1.5 segundos
    const interval = setInterval(check, 1500);
    
    // Cleanup al desmontar
    return () => clearInterval(interval);
  }, []);

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
          isHealthy 
            ? 'bg-green-500 animate-pulse shadow-[0_0_8px_2px_rgba(34,197,94,0.6)]' 
            : 'bg-red-500'
        }`}
      ></div>
      <span className={isHealthy ? 'text-green-600' : 'text-red-600'}>
        Backend: {isHealthy ? 'Conectado' : 'Desconectado'}
      </span>
    </div>
  );
}
