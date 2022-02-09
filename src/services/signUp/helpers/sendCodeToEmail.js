import sendgrid from '@sendgrid/mail';

export const sendCodeToEmail = async (code, email) => {
  let emailTemplateId = process.env.SENDGRID_TEMPLATE_ID;
  let sender = process.env.SENDGRID_SENDER;

  await sendgrid.send({
    to: email,
    from: sender,
    templateId: emailTemplateId,
    dynamicTemplateData: { code },
  });
};
