import { getEvent } from '../config/events.js';

export const isAccessKey = async (near, publicKey, event) => {
  const { campaignId } = getEvent(event);

  try {
    await near.connection.provider.query({
      request_type: 'view_access_key',
      finality: 'final',
      account_id: campaignId,
      public_key: publicKey,
    });
    return true;
  } catch (e) {
    return false;
  }
};
