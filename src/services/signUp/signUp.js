import { createUserAndSendCode } from './createUserAndSendCode.js';
import { User } from '../../mongoose/User.js';
import { resendCode } from './resendCode.js';
import { isAccessKey } from '../../helpers/isAccessKey.js';
import { checkReCaptcha } from "./helpers/checkReCaptcha.js";
import { checkCampaignStatus } from "../getCampaignStatus/checkCampaignStatus.js";

export const signUp = async (req, res) => {
  try {
    let { phone } = req.body;
    const { event } = req.query;
    const token = req.body["g-recaptcha-response"];

    if (!await checkCampaignStatus(event, req.near)) {
      return res
        .status(400)
        .send({ error: 'The company is not active' });
    }

    const isReCaptchaComplete = await checkReCaptcha(token);
    if (!isReCaptchaComplete) {
      return res
        .status(400)
        .send({ error: 'Didn\'t complete the reCAPTCHA' });
    }

    // TODO validate phone format
    phone = phone.replace(/[\s-()]/g, '');
    phone = (phone.substring(0, 1) !== '+' ? '+' : '') + phone;
    const user = await User.findOne({ phone });

    if (!user) return await createUserAndSendCode(res, phone, event);
    if (!user.isConfirmed) return await resendCode(res, user);

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
      .send({ error: 'An SMS with a confirmation code was not sent. Please try again later' });
  }
};
