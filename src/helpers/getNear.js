import { connect, keyStores } from 'near-api-js';
import { KeyPair } from 'near-api-js';
import { getED25519KeyPair } from './getED25519KeyPair.js';

export const getNear = async () => {
  const keyStore = new keyStores.InMemoryKeyStore();
  const keyPair = KeyPair.fromString(getED25519KeyPair().secretKey);
  await keyStore.setKey('testnet', process.env.CAMPAIGN_ID, keyPair);

  // TODO Change config to .env
  const config = {
    keyStore,
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    explorerUrl: 'https://explorer.testnet.near.org',
  };

  return connect(config);
};
