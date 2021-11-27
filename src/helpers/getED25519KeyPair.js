import { mnemonicToSeedHex } from 'bip39-light';
import bs58 from 'bs58';
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';

const toED25519 = (key) => `ed25519:${bs58.encode(Buffer.from(key))}`;

export const getED25519KeyPair = (password = '') => {
  const seed = mnemonicToSeedHex(process.env.SEED_PHRASE, password);
  const { key } = derivePath("m/44'/397'/0'", seed);
  const keyPair = nacl.sign.keyPair.fromSeed(key);

  return {
    publicKey: toED25519(keyPair.publicKey),
    secretKey: toED25519(keyPair.secretKey),
  };
};
