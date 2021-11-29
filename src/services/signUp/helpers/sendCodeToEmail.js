import sendgrid from '@sendgrid/mail';

export const sendCodeToEmail = async (code, email) => {
  await sendgrid.send({
    to: email,
    from: 'Neardrop <neardrop@linkdrop.tech>',
    templateId: process.env.SENDGRID_TEMPLATE_ID,
    dynamicTemplateData: { code },
  });
};
