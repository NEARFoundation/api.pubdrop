import sendgrid from '@sendgrid/mail';
import { getEvent } from '../../../config/events.js';

export const sendCodeToEmail = async (code, email, event) => {
  const { emailTemplateId } = getEvent(event);

  await sendgrid.send({
    to: email,
    from: 'Neardrop <hello@neardrop.io>',
    templateId: emailTemplateId,
    dynamicTemplateData: { code },
  });
};
