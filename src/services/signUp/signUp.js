import { createUserAndSendCode } from './createUserAndSendCode.js';
import { User } from '../../mongoose/User.js';
import { resendCode } from './resendCode.js';
import { isAccessKey } from '../../helpers/isAccessKey.js';
import { checkReCaptcha } from "./helpers/checkReCaptcha.js";
import { checkCampaignStatus } from "../getCampaignStatus/checkCampaignStatus.js";
import { isThisAnEmailCheck } from "../../config/verificationMethod.js";

export const signUp = async (req, res) => {
  try {
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

    let userId;
    if (isThisAnEmailCheck(event)) {
      let { email } = req.body;

      if (!email) {
        return res
          .status(400)
          .send({ error: 'Email address not specified' });
      }
      // TODO validate email format

      userId = email;
    } else {
      let { phone } = req.body;

      if (!phone) {
        return res
          .status(400)
          .send({ error: 'Phone number not specified' });
      }
      // TODO validate phone format

      phone = phone.replace(/[\s-()]/g, '');
      userId = (phone.substring(0, 1) !== '+' ? '+' : '') + phone;
    }
    const user = await User.findOne({ phone: userId });

    if (!user) return await createUserAndSendCode(res, userId, event);
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
      .send({ error: 'Verification code was not sent. Please try again later' });
  }
};
