import { User } from '../../mongoose/User.js';
import { isDelayOut } from '../../helpers/isDelayOut.js';
import { confirmAndCreateClaimKey } from '../confirmPhoneNumber/confirmAndCreateClaimKey.js';
import { isThisAnEmailCheck } from "../../config/verificationMethod.js";
import { checkCampaignStatus } from "../getCampaignStatus/checkCampaignStatus.js";

export const confirmEmail = async (req, res) => {
  try {
    // TODO validate email / code format
    const { email, confirmationCode } = req.body;
    const { event } = req.query;

    if (!isThisAnEmailCheck(event)) {
      return res
        .status(400)
        .send({ error: 'Email verification is not available for this event' });
    }

    if (!await checkCampaignStatus(event, req.near)) {
      return res
        .status(400)
        .send({ error: 'The company is not active' });
    }

    const user = await User.findOne({ phone: email });

    if (!user)
      return res
        .status(400)
        .send({ error: 'Email has not registered in the system. Try to sign up first' });

    if (user.isConfirmed)
      return res.status(400).send({ error: 'This email has been already confirmed' });

    // If it is a second (or n) attempt and user trying to validate email often than 1 min
    if (user.confirmAttemptAt && !isDelayOut(user.confirmAttemptAt))
      return res
        .status(400)
        .send({ error: 'You trying to send too many requests. Please try again in a few minutes' });

    if (confirmationCode !== user.confirmationCode) {
      user.confirmAttemptAt = Date.now();
      await user.save();
      return res.status(400).send({ error: 'Code does not match to this email' });
    }

    await confirmAndCreateClaimKey(req, res, user, event);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Your email was not confirmed. Please try again' });
  }
};
