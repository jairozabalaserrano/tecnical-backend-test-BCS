import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOnboardingDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'Juan Pérez',
    minLength: 2,
  })
  @IsNotEmpty({ message: 'This field cant be empty' })
  @IsString({ message: 'This field must be a string' })
  @MinLength(2, { message: 'This field must have at least 2 characters' })
  nombre: string;

  @ApiProperty({
    description: 'User document/ID number',
    example: '12345678',
    minLength: 5,
  })
  @IsNotEmpty({ message: 'This field cant be empty' })
  @IsString({ message: 'This field must be a string' })
  @MinLength(5, { message: 'This field must have at least 5 characters' })
  documento: string;

  @ApiProperty({
    description: 'User email address',
    example: 'usuario@example.com',
  })
  @IsNotEmpty({ message: 'This field cant be empty' })
  @IsEmail({}, { message: 'This field must be a valid email' })
  email: string;

  @ApiProperty({
    description: 'Initial deposit amount',
    example: 1000,
    minimum: 1,
  })
  @IsNotEmpty({ message: 'This field cant be empty' })
  @IsNumber({}, { message: 'This field must be a number' })
  @Min(1, { message: 'This field must be at least 1' })
  montoInicial: number;
}
