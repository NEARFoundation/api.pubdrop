import { isDelayOut } from '../../helpers/isDelayOut.js';
import { generateConfirmationCode } from './helpers/generateConfirmationCode.js';
import { sendSmsWithCode } from './helpers/sendSmsWithCode.js';

export const resendCode = async (res, user) => {
  // If user tries to resend code too often / try to spam - throw an error
  if (!isDelayOut(user.sentAt)) {
    return res
      .status(400)
      .send({ error: 'You trying to send too many requests. Please try again in a few minutes' });
  }

  const confirmationCode = generateConfirmationCode();
  await sendSmsWithCode(confirmationCode, user.phone);

  user.confirmationCode = confirmationCode;
  user.sentAt = Date.now();
  await user.save();

  res.send({});
};
