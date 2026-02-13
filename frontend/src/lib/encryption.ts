import CryptoJS from 'crypto-js';

// Hardcoded for debugging purposes. DO NOT USE IN PRODUCTION.
const keyHex = 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4';
const ivHex = 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4';

const key = CryptoJS.enc.Hex.parse(keyHex);
const iv = CryptoJS.enc.Hex.parse(ivHex);

console.log('Frontend Key (hex) (hardcoded):', key.toString(CryptoJS.enc.Hex));
console.log('Frontend IV (hex) (hardcoded):', iv.toString(CryptoJS.enc.Hex));

export function decrypt(encryptedData: string): any {
  try {
    const ciphertext = CryptoJS.enc.Hex.parse(encryptedData); // Convert hex string to WordArray

    const decrypted = CryptoJS.AES.decrypt(ciphertext, key, { // Pass WordArray to decrypt
      iv: iv,
      mode: CryptoJS.mode.CBC,
      // padding: CryptoJS.pad.Pkcs7, // REMOVED FOR DEBUGGING
      formatter: CryptoJS.format.Raw, // Add this line
      blockSize: 128 / 32, // Explicitly set block size to 4 words
    });

    console.log('Decrypted WordArray:', decrypted); // Log the WordArray object

    // If the decryption failed, decrypted might be an empty WordArray
    if (decrypted.words.length === 0) {
        throw new Error('Decryption failed: returned empty data.');
    }

    const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
    
    // Handle cases where the decrypted string is empty
    if (!decryptedStr) {
      throw new Error('Decryption resulted in an empty string.');
    }

    console.log('Decrypted string:', decryptedStr);
    const parsed = JSON.parse(decryptedStr);
    console.log('Parsed data:', parsed);
    return parsed;
  } catch (error) {
    console.error('Decryption failed:', error);
    // It's better to return a sensible default or re-throw a more specific error
    // depending on how the calling code should handle this failure.
    throw new Error('Failed to decrypt or parse data.');
  }
}
