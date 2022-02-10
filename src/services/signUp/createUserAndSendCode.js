import { User } from '../../mongoose/User.js';
import { generateConfirmationCode } from './helpers/generateConfirmationCode.js';
import { sendSmsWithCode } from './helpers/sendSmsWithCode.js';
import { sendCodeToEmail } from "./helpers/sendCodeToEmail.js";
import { isThisAnEmailCheck } from "../../config/verificationMethod.js";

export const createUserAndSendCode = async (res, userId, event) => {
  const confirmationCode = generateConfirmationCode();
  if (isThisAnEmailCheck(event)) {
    await sendCodeToEmail(confirmationCode, userId, event)
  } else {
    await sendSmsWithCode(confirmationCode, userId);
  }

  await User.create({
    phone: userId,
    event,
    confirmationCode,
    isConfirmed: false,
    confirmAttemptAt: null,
    publicKey: null,
    secretKey: null,
  });

  res.send({});
};
