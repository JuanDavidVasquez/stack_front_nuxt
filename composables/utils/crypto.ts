import * as cryptoJs from 'crypto-js'
export const useEncrypt = (str: string) => {
  const config = useRuntimeConfig()
  const secretKey = cryptoJs.enc.Utf8.parse(config.public.secret)
  const iv = cryptoJs.lib.WordArray.random(16).toString(cryptoJs.Utf8)
  const ivBytes = cryptoJs.enc.Hex.parse(iv)
  return {
    iv,
    password: cryptoJs.AES.encrypt(str, secretKey, {
      iv: ivBytes,
      mode: cryptoJs.mode.CBC,
    }).toString(),
  }
}
