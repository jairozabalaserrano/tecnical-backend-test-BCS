import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { EncryptionService } from 'src/encryption/encryption.service';

@Injectable()
export class EncryptionInterceptor implements NestInterceptor {
  constructor(private readonly encryptionService: EncryptionService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (request.body && request.body.encryptedData) {
      request.body = this.encryptionService.decrypt(request.body.encryptedData);
    }

    return next.handle().pipe(
      map((data: any) => {
        if (data) {
          return { encryptedData: this.encryptionService.encrypt(data) };
        }
        return data;
      }),
    );
  }
}
