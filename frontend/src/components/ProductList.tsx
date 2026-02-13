/**
 * ProductList.tsx - LISTA DE PRODUCTOS
 * 
 * Obtiene y muestra los productos del backend.
 * Demuestra:
 * - Fetching de datos con useEffect
 * - Manejo de estados de carga y error
 * - Renderizado de listas
 */

'use client';

import { useState, useEffect } from 'react';
import { getProducts } from '@/lib/api';
import { Product } from '@/types/api';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        setError('Error al cargar productos');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                {product.category}
              </span>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-green-600">
                {product.price === 0 ? 'Gratis' : `$${product.price}`}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
