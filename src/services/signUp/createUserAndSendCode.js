import { User } from '../../mongoose/User.js';
import { generateConfirmationCode } from './helpers/generateConfirmationCode.js';
import { sendSmsWithCode } from './helpers/sendSmsWithCode.js';

export const createUserAndSendCode = async (res, phone, event) => {
  const confirmationCode = generateConfirmationCode();
  await sendSmsWithCode(confirmationCode, phone);

  await User.create({
    phone,
    event,
    confirmationCode,
    isConfirmed: false,
    confirmAttemptAt: null,
    publicKey: null,
    secretKey: null,
  });

  res.send({});
};
