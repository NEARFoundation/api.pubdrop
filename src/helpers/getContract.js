import { Account, Contract } from 'near-api-js';

export const getContract = (near) =>
  new Contract(
    new Account(near.connection, process.env.CAMPAIGN_ID),
    process.env.CAMPAIGN_ID,
    {
      viewMethods: ['get_metadata'],
      changeMethods: ['add_claim_key'],
    },
  );
