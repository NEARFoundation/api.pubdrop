import { sendCodeByEmail } from './sendCodeByEmail.js';
import { User } from '../../mongoose/User.js';
import { generateCode, isDelayOut, validateEmail, checkDropStatus } from './utils.js';

const createUserAndSendCode = async (res, email) => {
  const confirmationCode = generateCode();
  await sendCodeByEmail(confirmationCode);

  await User.create({
    email,
    confirmationCode,
    isConfirmed: false,
    confirmAttemptAt: null,
    publicKey: null,
    secretKey: null,
  });

  res.send({});
};

const resendCode = async (res, user) => {
  // If user tries to resend code too often / try to spam - throw an error
  if (!isDelayOut(user.sentAt)) {
    return res
      .status(400)
      .send({ error: 'You trying to send too many requests. Please try again in a few minutes' });
  }

  const confirmationCode = generateCode();
  await sendCodeByEmail(confirmationCode, user.email);

  user.confirmationCode = confirmationCode;
  user.sentAt = Date.now();
  await user.save();

  res.send({});
};

export const signUp = async (req, res) => {
  try {
    const { email } = req.body;
    // TODO validate email format
    const user = await User.findOne({ email });

    if (!user) return await createUserAndSendCode(res, email);
    if (!user.isConfirmed) return await resendCode(res, user);

    // If email has been confirmed but user trying to get a new code
    const isDropClaimed = await checkDropStatus(user);

    if (isDropClaimed) {
      res.status(400).send({ error: 'You have already claimed your drop' });
    } else {
      res.send({
        publicKey: user.publicKey,
        secretKey: user.secretKey,
      });
    }
  } catch (e) {
    res
      .status(500)
      .send({ error: 'An email with a confirmation code was not sent. Please try again later' });
  }
};
