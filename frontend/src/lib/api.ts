import { decrypt } from './encryption';
import {
  LoginResponse,
  Product,
  OnboardingResponse,
  OnboardingData,
  HealthResponse,
} from '@/types/api';

declare global {
  interface Window {
    handleSessionExpired?: () => void;
  }
}

const API_URL = `http://localhost:${process.env.NEXT_PUBLIC_API_URL_BACK}`;

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

  if (response.status === 401) {
    if (window.handleSessionExpired) {
      window.handleSessionExpired();
    }
    throw { message: 'Sesión expirada', statusCode: 401 };
  }

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }
  
  if (data && data.encryptedData) {
    const decryptedData = decrypt(data.encryptedData);
    return decryptedData;
  }

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
