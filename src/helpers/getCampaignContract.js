import { Account, Contract } from 'near-api-js';
import { getEvent } from '../config/events.js';

export const getCampaignContract = (near, event) => {
  const { campaignId } = getEvent(event);

  return new Contract(new Account(near.connection, campaignId), campaignId, {
    viewMethods: ['get_metadata'],
    changeMethods: ['add_claim_key'],
  });
};
