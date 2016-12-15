import Crypto from 'crypto';

export const checkSignature = app => ({signature, timestamp, nonce} = {}) => {
  const sorted = [ app.token, timestamp, nonce ].sort().join('');
  const result = Crypto.createHash('sha1').update(sorted).digest('hex');
  return result === signature;
}
