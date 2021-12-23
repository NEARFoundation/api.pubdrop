import { createUserAndSendCode } from './createUserAndSendCode.js';
import { User } from '../../mongoose/User.js';
import { resendCode } from './resendCode.js';
import { isAccessKey } from '../../helpers/isAccessKey.js';

export const signUp = async (req, res) => {
  try {
    const { email } = req.body;
    const { event } = req.query;

    // TODO validate email format
    const user = await User.findOne({ email });

    if (!user) return await createUserAndSendCode(res, email, event);
    if (!user.isConfirmed) return await resendCode(res, user, event);

    const isKeyActive = await isAccessKey(req.near, user.publicKey, event);

    if (isKeyActive) {
      res.send({
        publicKey: user.publicKey,
        secretKey: user.secretKey,
      });
    } else {
      res.status(400).send({ error: 'You have already claimed your drop' });
    }
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: 'An email with a confirmation code was not sent. Please try again later' });
  }
};
