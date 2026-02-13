import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async onModuleInit() {
    const count = await this.userRepository.count();
    if (count === 0) {
      console.log('adding basic users');
      await this.userRepository.save([
        { username: 'admin', password: 'password123' },
        { username: 'user', password: 'user123' },
      ]);
    }
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { username, password },
    });

    if (!user) {
      throw new UnauthorizedException(' Credentials invalid');
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
      token_type: 'Bearer',
      expires_in: 300,
    };
  }
}
