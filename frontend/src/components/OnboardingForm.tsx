/**
 * OnboardingForm.tsx - FORMULARIO DE ONBOARDING
 * 
 * Permite crear una solicitud de onboarding.
 * Requiere token JWT para funcionar (ruta protegida en backend).
 * 
 * Demuestra:
 * - Formularios controlados en React
 * - Validación en el cliente (adicional a la del backend)
 * - Envío de token JWT en headers
 * - Manejo de respuestas exitosas y errores
 */

'use client';

import { useState, FormEvent } from 'react';
import { createOnboarding } from '@/lib/api';
import { OnboardingResponse, ApiError } from '@/types/api';

interface Props {
  token: string; // Token JWT requerido
}

export default function OnboardingForm({ token }: Props) {
  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    documento: '',
    email: '',
    montoInicial: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<OnboardingResponse | null>(null);

  // Actualiza el estado cuando cambia un campo
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Envía el formulario
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await createOnboarding(
        {
          nombre: formData.nombre,
          documento: formData.documento,
          email: formData.email,
          montoInicial: parseFloat(formData.montoInicial),
        },
        token
      );
      setSuccess(response);
      // Limpia el formulario después del éxito
      setFormData({ nombre: '', documento: '', email: '', montoInicial: '' });
    } catch (err) {
      const apiError = err as ApiError;
      // El backend puede devolver un array de errores de validación
      const message = Array.isArray(apiError.message)
        ? apiError.message.join(', ')
        : apiError.message || 'Error al crear onboarding';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre completo
        </label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          placeholder="Juan Pérez"
          required
          minLength={2}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Documento de identidad
        </label>
        <input
          type="text"
          name="documento"
          value={formData.documento}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          placeholder="12345678"
          required
          minLength={5}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Correo electrónico
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          placeholder="juan@email.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Monto inicial ($)
        </label>
        <input
          type="number"
          name="montoInicial"
          value={formData.montoInicial}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          placeholder="1000"
          required
          min="1"
          step="0.01"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-700 font-medium">¡Solicitud creada exitosamente!</p>
          <p className="text-sm text-green-600 mt-1">
            ID: <code className="bg-green-100 px-1 rounded">{success.onboardingId}</code>
          </p>
          <p className="text-sm text-green-600">
            Estado: <span className="font-medium">{success.status}</span>
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-300 transition-colors"
      >
        {loading ? 'Enviando...' : 'Enviar Solicitud'}
      </button>
    </form>
  );
}
