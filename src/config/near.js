const testnet = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
};

const mainnet = {
  networkId: 'mainnet',
  nodeUrl: 'https://rpc.mainnet.near.org',
};

export const getNearConfig = () => (process.env.NETWORK === 'mainnet' ? mainnet : testnet);
