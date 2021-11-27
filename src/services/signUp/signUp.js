import { createUserAndSendCode } from './createUserAndSendCode.js';
import { User } from '../../mongoose/User.js';
import { resendCode } from './resendCode.js';
import { isAccessKey } from '../../helpers/isAccessKey.js';

export const signUp = async (req, res) => {
  try {
    const { email } = req.body;
    // TODO validate email format
    const user = await User.findOne({ email });

    if (!user) return await createUserAndSendCode(res, email);
    if (!user.isConfirmed) return await resendCode(res, user);

    // If email has been confirmed but user trying to get a new code
    const isKeyActive = await isAccessKey(req.near, user.publicKey);

    if (isKeyActive) {
      res.send({
        publicKey: user.publicKey,
        secretKey: user.secretKey,
      });
    } else {
      res.status(400).send({ error: 'You have already claimed your drop' });
    }
  } catch (e) {
    res
      .status(500)
      .send({ error: 'An email with a confirmation code was not sent. Please try again later' });
  }
};
