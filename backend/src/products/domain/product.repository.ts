import { Product } from './product';

export interface ProductRepository {
  [x: string]: any;
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
}
export const ProductRepository = Symbol('ProductRepository');
