import { isDelayOut } from '../../helpers/isDelayOut.js';
import { generateConfirmationCode } from './helpers/generateConfirmationCode.js';
import { sendCodeToEmail } from './helpers/sendCodeToEmail.js';

export const resendCode = async (res, user, event) => {
  // If user tries to resend code too often / try to spam - throw an error
  if (!isDelayOut(user.sentAt)) {
    return res
      .status(400)
      .send({ error: 'You trying to send too many requests. Please try again in a few minutes' });
  }

  const confirmationCode = generateConfirmationCode();
  await sendCodeToEmail(confirmationCode, user.email, event);

  user.confirmationCode = confirmationCode;
  user.sentAt = Date.now();
  await user.save();

  res.send({});
};
