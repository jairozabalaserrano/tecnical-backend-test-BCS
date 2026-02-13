/**
 * types/api.ts - TIPOS PARA LA API
 * 
 * Definimos interfaces que coinciden con las respuestas del backend.
 * Esto nos da autocompletado y detección de errores en tiempo de compilación.
 */

// Respuesta del login
export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

// Producto
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

// Respuesta del onboarding
export interface OnboardingResponse {
  onboardingId: string;
  status: string;
}

// Datos para crear onboarding
export interface OnboardingData {
  nombre: string;
  documento: string;
  email: string;
  montoInicial: number;
}

// Respuesta de health
export interface HealthResponse {
  ok: boolean;
}

// Error de la API
export interface ApiError {
  message: string | string[];
  error: string;
  statusCode: number;
}
