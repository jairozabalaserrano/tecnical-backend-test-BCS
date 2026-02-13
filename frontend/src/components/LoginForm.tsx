'use client';

import { useState, FormEvent } from 'react';
import { login } from '@/lib/api';
import { ApiError } from '@/types/api';

interface Props {
  onLogin: (token: string) => void; // Callback cuando login exitoso
}

export default function LoginForm({ onLogin }: Props) {
  // Estados del formulario
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Maneja el envío del formulario
  async function handleSubmit(e: FormEvent) {
    e.preventDefault(); // Previene recarga de página
    setLoading(true);
    setError(null);

    try {
      const response = await login(username, password);
      onLogin(response.access_token); // Pasa el token al padre
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message?.toString() || 'Error de autenticación');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Usuario
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          placeholder="admin"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          placeholder="password123"
          required
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
      >
        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Credenciales de prueba: admin / password123
      </p>
    </form>
  );
}
