import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EncryptionService } from '../../encryption/encryption.service';

@Injectable()
export class EncryptionInterceptor implements NestInterceptor {
  constructor(private readonly encryptionService: EncryptionService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.body && request.body.encryptedData) {
      request.body = this.encryptionService.decrypt(request.body.encryptedData);
    }

    return next.handle().pipe(
      map((data) => {
        if (data) {
          return { encryptedData: this.encryptionService.encrypt(data) };
        }
        return data;
      }),
    );
  }
}
