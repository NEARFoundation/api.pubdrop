export const events = {
  'miami-testnet': {
    campaignId: 'dev-1637570167698-74050947045323',
    emailTemplateId: 'd-71ce9ef104a346168522f42abd3e4999',
  },
  'miami-mainnet': {
    campaignId: 'miami-neardrop.near',
    emailTemplateId: 'd-71ce9ef104a346168522f42abd3e4999',
  },
  'newYork-testnet': {
    campaignId: 'dev-1637570167698-74050947045323', // TODO Replace
    emailTemplateId: 'd-71ce9ef104a346168522f42abd3e4999', // TODO Replace
  },
  'newYork-mainnet': {
    campaignId: 'miami-neardrop.near', // TODO Replace
    emailTemplateId: 'd-71ce9ef104a346168522f42abd3e4999', // TODO Replace
  },
};

export const getEvent = (event) => {
  const data = events[`${event}-${process.env.NETWORK}`];
  if (data) return data;
  throw new Error(`No event with such name: ${event}`);
};
