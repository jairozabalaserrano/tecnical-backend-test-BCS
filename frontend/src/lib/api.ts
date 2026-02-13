/**
 * lib/api.ts - CLIENTE API
 * 
 * Centraliza todas las llamadas al backend.
 * 
 * Ventajas de tener un cliente API:
 * - Un solo lugar para configurar la URL base
 * - Manejo consistente de errores
 * - Fácil de mockear para tests
 * - Headers comunes en un solo lugar
 */

import { decrypt } from './encryption';
import {
  LoginResponse,
  Product,
  OnboardingResponse,
  OnboardingData,
  HealthResponse,
} from '@/types/api';

// URL del backend - usa la variable de entorno o el fallback
const API_URL = `http://localhost:${process.env.NEXT_PUBLIC_API_URL_BACK}`;

/**
 * Función helper para hacer fetch con manejo de errores
 */
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    // Lanza el error para que el componente lo maneje
    throw data;
  }
  
  // Si la respuesta está encriptada, la desencripta
  if (data && data.encryptedData) {
    console.log('Encrypted data received:', data.encryptedData);
    const decryptedData = decrypt(data.encryptedData);
    console.log('Decrypted data:', decryptedData);
    return decryptedData;
  }

  // Si la respuesta viene envuelta por el TransformInterceptor del backend
  // (tiene formato { success: true, data: ..., timestamp: ... })
  if (data && typeof data === 'object' && 'data' in data && 'success' in data) {
    return data.data;
  }

  return data;
}

// ═══════════════════════════════════════════════════════════════
// HEALTH
// ═══════════════════════════════════════════════════════════════
export async function checkHealth(): Promise<HealthResponse> {
  return fetchApi<HealthResponse>('/health');
}

// ═══════════════════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════════════════
export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  return fetchApi<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

// ═══════════════════════════════════════════════════════════════
// PRODUCTS
// ═══════════════════════════════════════════════════════════════
export async function getProducts(): Promise<Product[]> {
  return fetchApi<Product[]>('/products');
}

export async function getProduct(id: number): Promise<Product> {
  return fetchApi<Product>(`/products/${id}`);
}

// ═══════════════════════════════════════════════════════════════
// ONBOARDING
// ═══════════════════════════════════════════════════════════════
export async function createOnboarding(
  data: OnboardingData,
  token: string
): Promise<OnboardingResponse> {
  return fetchApi<OnboardingResponse>('/onboarding', {
    method: 'POST',
    headers: {
      // El token JWT se envía en el header Authorization
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}
