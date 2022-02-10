import sendgrid from '@sendgrid/mail';

export const sendCodeToEmail = async (code, email, event = '') => {
  let emailTemplateId = process.env['SENDGRID_' + event.toUpperCase() + '_TEMPLATE_ID'];
  let sender = process.env.SENDGRID_SENDER;

  await sendgrid.send({
    to: email,
    from: sender,
    templateId: emailTemplateId,
    dynamicTemplateData: { code },
  });
};
