import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  //swagger
  const config = new DocumentBuilder()
    .setTitle('Prueba tecnica - swagger')
    .setDescription('Api documentation for BCS')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // para el frontend CORS
  const frontUrl = configService.get<number>('NEXT_PUBLIC_API_URL_FRONT', 3011);
  app.enableCors({
    origin: `http://localhost:${frontUrl}`,
    credentials: true,
  });

  //filtrado de datos hacía el servidor
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //filtrado de excepciones
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  await app.listen(configService.get<number>('NEXT_PUBLIC_API_URL_BACK', 3010));
  console.log(`El Backend esta corriendo en http://localhost:${process.env.NEXT_PUBLIC_API_URL_BACK} \n
    Swagger esta corriendo en la ruta http://localhost:${process.env.NEXT_PUBLIC_API_URL_BACK}/api`);
}

void bootstrap();
