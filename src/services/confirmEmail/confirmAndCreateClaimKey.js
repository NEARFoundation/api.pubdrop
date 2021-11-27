import { getCampaignContract } from '../../helpers/getCampaignContract.js';
import { getED25519KeyPair } from '../../helpers/getED25519KeyPair.js';

export const confirmAndCreateClaimKey = async (req, res, user) => {
  const { publicKey, secretKey } = getED25519KeyPair(user.email);

  const campaign = getCampaignContract(req.near);
  await campaign.add_claim_key({ args: { public_key: publicKey } });

  user.isConfirmed = true;
  user.confirmAttemptAt = Date.now();
  user.publicKey = publicKey;
  user.secretKey = secretKey;
  await user.save();

  res.send({ publicKey, secretKey });
};
