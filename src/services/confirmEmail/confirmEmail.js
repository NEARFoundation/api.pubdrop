import { User } from '../../mongoose/User.js';
import { isDelayOut } from '../helpers/isDelayOut.js';

const confirmAndCreateClaimKey = async (res, user) => {
  // TODO create key and add it into contract state

  const publicKey = 'public-key';
  const secretKey = 'secret-key';

  user.isConfirmed = true;
  user.secretKey = secretKey;
  user.secretKey = secretKey;
  await user.save();

  res.send({ publicKey, secretKey });
};

export const confirmEmail = async (req, res) => {
  try {
    const { email, confirmationCode } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(400)
        .send({ error: 'Email has not registered in the system. Try to sign up first' });

    if (user.isConfirmed)
      return res.status(400).send({ error: 'This email has been already confirmed' });

    // If it is a second (or n) attempt and user trying to validate email often than 1 min
    if (user.confirmAttemptAt && !isDelayOut(user.confirmAttemptAt))
      return res
        .status(400)
        .send({ error: 'You trying to send too many requests. Please try again in a few minutes' });

    if (confirmationCode !== user.confirmationCode) {
      user.confirmAttemptAt = Date.now();
      await user.save();
      return res.status(400).send({ error: 'Code does not match to this email' });
    }

    await confirmAndCreateClaimKey(res, user);
  } catch (e) {
    res.status(500).send({ error: 'Your email was not confirmed. Please try again' });
  }
};
