import { connect, keyStores } from 'near-api-js';
import { KeyPair } from 'near-api-js';
import { getED25519KeyPair } from './getED25519KeyPair.js';
import { getNearConfig } from '../config/near.js';
import { events } from '../config/events.js';

export const getNear = async () => {
  const { networkId, nodeUrl } = getNearConfig();

  const keyStore = new keyStores.InMemoryKeyStore();
  const keyPair = KeyPair.fromString(getED25519KeyPair().secretKey);

  await Promise.all(
    Object.values(events)
      .filter(({ network }) => network === networkId)
      .map(({ network, campaignId }) => keyStore.setKey(network, campaignId, keyPair)),
  );

  return connect({
    networkId,
    nodeUrl,
    keyStore,
  });
};
