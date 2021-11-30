import { connect, keyStores } from 'near-api-js';
import { KeyPair } from 'near-api-js';
import { getED25519KeyPair } from './getED25519KeyPair.js';
import { getNearConfig } from '../config/near.js';

export const getNear = async () => {
  const { networkId, nodeUrl } = getNearConfig();

  const keyStore = new keyStores.InMemoryKeyStore();
  const keyPair = KeyPair.fromString(getED25519KeyPair().secretKey);
  await keyStore.setKey(networkId, process.env.CAMPAIGN_ID, keyPair);

  return connect({
    networkId,
    nodeUrl,
    keyStore,
  });
};
