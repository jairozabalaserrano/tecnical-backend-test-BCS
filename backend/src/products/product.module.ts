import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { Product as ProductEntity } from './entities/product.entity';
import { ProductRepository } from './domain/product.repository';
import { ProductSeeder } from './product.seeder';
import { EncryptionModule } from '../encryption/encryption.module';
import { ProductController } from './product.controller';
import { ProductTypeORMRepository } from './infraestructure/product.typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), EncryptionModule],
  controllers: [ProductController],
  providers: [
    ProductsService,
    ProductSeeder,
    {
      provide: ProductRepository,
      useClass: ProductTypeORMRepository,
    },
  ],
})
export class ProductModule {}
