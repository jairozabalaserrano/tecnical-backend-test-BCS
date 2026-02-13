import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly logger = new Logger(EncryptionService.name);
  private readonly algorithm = 'aes-256-cbc';
  private readonly key: Buffer;
  private readonly iv: Buffer;

  constructor(private readonly configService: ConfigService) {
    const keyHex = this.configService.get<string>('ENCRYPTION_KEY');
    const ivHex = this.configService.get<string>('ENCRYPTION_IV');

    if (!keyHex || !ivHex) {
      throw new Error(' key and iv werent defined on the env');
    }

    this.key = Buffer.from(keyHex, 'hex');
    this.iv = Buffer.from(ivHex, 'hex');

    this.logger.debug(`Backend Key (hex): ${this.key.toString('hex')}`);
    this.logger.debug(`Backend IV (hex): ${this.iv.toString('hex')}`);
  }

  encrypt(data: any): string {
    const text = JSON.stringify(data);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encryped = cipher.update(text, 'utf8', 'hex');
    encryped += cipher.final('hex');
    return encryped;
  }

  decrypt(encryptedData: string): any {
    try {
      const decipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
      const decrypted = decipher.update(encryptedData, 'utf8', 'hex');
      return JSON.parse(decrypted);
    } catch (error) {
      this.logger.error('decrypt failed ', (error as Error).stack);
      throw new Error('Decrypt failed');
    }
  }
}
