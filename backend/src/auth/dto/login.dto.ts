import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'User username',
    example: 'admin',
  })
  @IsString()
  @IsNotEmpty({ message: 'Username should not be empty' })
  username: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;
}
