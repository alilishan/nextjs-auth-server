
import _privateKey from './jwtRS256.key';
import _publicKey from './jwtRS256.key.pub';

export const PrivateKey = _privateKey;
export const PublicKey = _publicKey;
export const KeyConfig = {
    algorithm: 'RS256'
}