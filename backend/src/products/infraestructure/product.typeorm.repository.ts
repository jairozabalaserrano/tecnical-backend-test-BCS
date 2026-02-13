import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product as ProductEntity } from '../entities/product.entity';
import { Product } from '../domain/product';
import { ProductRepository } from '../domain/product.repository';

@Injectable()
export class ProductTypeORMRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();
    return products.map((p) => this.toDomain(p));
  }

  async findById(id: number): Promise<Product | null> {
    const product = await this.productRepository.findOneBy({ id });
    return product ? this.toDomain(product) : null;
  }

  private toDomain(productEntity: ProductEntity): Product {
    const product = new Product();
    product.id = productEntity.id;
    product.name = productEntity.name;
    product.description = productEntity.description;
    product.price = productEntity.price;
    return product;
  }
}
