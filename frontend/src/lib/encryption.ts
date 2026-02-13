import CryptoJS from 'crypto-js';

// Hardcoded for debugging purposes. DO NOT USE IN PRODUCTION.
const keyHex = 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4';
const ivHex = 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4';

const key = CryptoJS.enc.Hex.parse(keyHex);
const iv = CryptoJS.enc.Hex.parse(ivHex);

export function decrypt(encryptedData: string): any {
  try {
    // CryptoJS.AES.decrypt espera un CipherParams object o un string Base64
    // Como el backend envía hex, necesitamos crear el objeto CipherParams
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Hex.parse(encryptedData)
    });

    const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
    
    if (!decryptedStr) {
      throw new Error('Decryption resulted in an empty string.');
    }

    return JSON.parse(decryptedStr);
  } catch (error) {
    console.error('Decryption failed:', error);
    throw new Error('Failed to decrypt or parse data.');
  }
}
