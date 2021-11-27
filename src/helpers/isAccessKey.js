export const isAccessKey = async (near, publicKey) => {
  try {
    await near.connection.provider.query({
      request_type: 'view_access_key',
      finality: 'final',
      account_id: process.env.CAMPAIGN_ID,
      public_key: publicKey,
    });
    return true;
  } catch (e) {
    return false;
  }
};
