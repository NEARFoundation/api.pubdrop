export const events = {
  'miami-mainnet': {
    network: 'mainnet',
    campaignId: 'miami-neardrop.near',
    emailTemplateId: 'd-71ce9ef104a346168522f42abd3e4999',
  },
  'miami-testnet': {
    network: 'testnet',
    campaignId: 'dev-1637570167698-74050947045323',
    emailTemplateId: 'd-71ce9ef104a346168522f42abd3e4999',
  },
  'newYork-mainnet': {
    network: 'mainnet',
    campaignId: 'nyc-neardrop.near',
    emailTemplateId: 'd-673454262c2a43ae8cd2779c55bf8318',
  },
};

export const getEvent = (event) => {
  const data = events[`${event}-${process.env.NETWORK}`];
  if (data) return data;
  throw new Error(`No event with such name: ${event}`);
};
