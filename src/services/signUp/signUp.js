import { sendCodeByEmail } from './sendCodeByEmail.js';
import { User } from '../../mongoose/User.js';

const generateCode = () => 1234;

const validateEmail = (email) => {
  // check format
};

const delayOut = (sentAt) => true;

const sendCode = async (res, email) => {
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
  const confirmationCode = generateCode();
  await sendCodeByEmail(confirmationCode, user.email);

  user.confirmationCode = confirmationCode;
  user.sentAt = Date.now();
  await user.save();

  res.send({});
};

export const signUp = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  try {
    const user = await User.findOne({ email });
    // User doesn't exist - happy way
    if (!user) return await sendCode(res);
    // If code was sent more than 1 min ago but is not confirmed yet - generate a new one and resend
    if (!user.isConfirmed && delayOut(user.sentAt)) return await resendCode(res);

  } catch (e) {
    res
      .status(500)
      .send({ error: 'An email with a confirmation code was not sent. Please try again later' });
  }
};
