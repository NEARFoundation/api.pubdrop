import { User } from '../../mongoose/User.js';
import { generateConfirmationCode } from './helpers/generateConfirmationCode.js';
import { sendCodeToEmail } from './helpers/sendCodeToEmail.js';

export const createUserAndSendCode = async (res, email) => {
  const confirmationCode = generateConfirmationCode();
  await sendCodeToEmail(confirmationCode);

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
