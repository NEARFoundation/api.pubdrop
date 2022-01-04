import { getCampaignContract } from '../../helpers/getCampaignContract.js';
import { getED25519KeyPair } from '../../helpers/getED25519KeyPair.js';

export const confirmAndCreateClaimKey = async (req, res, user, event) => {
  const { publicKey, secretKey } = getED25519KeyPair(user.email);

  user.isConfirmed = true;
  user.confirmAttemptAt = Date.now();
  user.publicKey = publicKey;
  user.secretKey = secretKey;
  await user.save();

  // TODO: This is temporarily disabled
  //const campaign = getCampaignContract(req.near, event);
  //await campaign.add_claim_key({ args: { public_key: publicKey } });

  //res.send({ publicKey, secretKey });
  res.send({ publicKey: null, secretKey: null });
};
