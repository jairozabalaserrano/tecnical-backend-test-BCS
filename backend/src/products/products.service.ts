import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from './domain/product.repository';
import { Product } from './domain/product';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }
}
