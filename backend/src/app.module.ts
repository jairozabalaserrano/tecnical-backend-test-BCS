import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  makeCounterProvider,
  makeHistogramProvider,
  PrometheusModule,
} from '@willsoto/nestjs-prometheus';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { MetricsInterceptor } from './common/interceptors/metric.interceptor';
import { EncryptionModule } from './encryption/encryption.module';
import { HealthModule } from './health/health.module';
import { Onboarding } from './onboarding/entities/onboarding.entity';
import { Product } from './products/entities/product.entity';
import { ProductModule } from './products/product.module';
import { OnboardingModule } from './onboarding/onboarding.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../.env'],
    }),
    PrometheusModule.register(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Product, Onboarding],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ProductModule,
    OnboardingModule,
    HealthModule,
    EncryptionModule,
  ],
  providers: [
    makeCounterProvider({
      name: 'http_request_total',
      help: 'Total of the http requests',
      labelNames: ['method', 'path'],
    }),
    makeHistogramProvider({
      name: 'http_request_duration_seconds',
      help: 'Duration fo the http requests on seconds',
      labelNames: ['method', 'path'],
    }),
    {
      provide: APP_INTERCEPTOR,
      useClass: MetricsInterceptor,
    },
  ],
})
export class AppModule {}
