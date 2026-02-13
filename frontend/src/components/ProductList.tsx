'use client';

import { useState, useEffect, useMemo } from 'react';
import { getProducts } from '@/lib/api';
import { Product } from '@/types/api';
import { cache, CACHE_KEYS } from '@/lib/cache';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const cached = cache.get<Product[]>(CACHE_KEYS.PRODUCTS);
        if (cached) {
          setProducts(cached);
          setLoading(false);
          return;
        }

        const data = await getProducts();
        setProducts(data);
        cache.set(CACHE_KEYS.PRODUCTS, data);
      } catch {
        setError('Error al cargar productos');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    const term = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term) ||
        p.category?.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

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
      <input
        type="text"
        placeholder="Buscar un producto"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
      />
      
      {filteredProducts.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No se encontraron productos</p>
      ) : (
        filteredProducts.map((product) => (
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
        ))
      )}
    </div>
  );
}
