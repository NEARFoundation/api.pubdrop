import { getContract } from '../../helpers/getContract.js';
import { getED25519KeyPair } from '../../helpers/getED25519KeyPair.js';

export const confirmAndCreateClaimKey = async (req, res, user) => {
  const { publicKey, secretKey } = getED25519KeyPair(user.email);

  const contract = getContract(req.near);
  await contract.add_claim_key({ args: { public_key: publicKey } });

  user.isConfirmed = true;
  user.confirmAttemptAt = Date.now();
  user.publicKey = publicKey;
  user.secretKey = secretKey;
  await user.save();

  res.send({ publicKey, secretKey });
};
