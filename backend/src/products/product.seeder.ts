import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

const INITIAL_PRODUCTS = [
  {
    name: 'Cuenta de Ahorro',
    description:
      'Cuenta de ahorro sin comisiones con tasa de interés del 2% anual',
    price: 0,
    category: 'Cuentas',
  },
  {
    name: 'Tarjeta de Crédito Clásica',
    description: 'Tarjeta de crédito con límite inicial de $5,000',
    price: 500,
    category: 'Tarjetas',
  },
  {
    name: 'Crédito Personal',
    description: 'Préstamo personal hasta $50,000 a 36 meses',
    price: 1000,
    category: 'Créditos',
  },
  {
    name: 'Cuenta Nómina',
    description: 'Cuenta para recibir tu salario con beneficios exclusivos',
    price: 0,
    category: 'Cuentas',
  },
  {
    name: 'Tarjeta de Crédito Oro',
    description: 'Tarjeta premium con límite de $20,000 y seguro de viaje',
    price: 1200,
    category: 'Tarjetas',
  },
];

@Injectable()
export class ProductSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async onModuleInit() {
    const count = await this.productRepository.count();
    if (count === 0) {
      console.log('Seeding initial products...');
      await this.productRepository.save(INITIAL_PRODUCTS);
    }
  }
}
