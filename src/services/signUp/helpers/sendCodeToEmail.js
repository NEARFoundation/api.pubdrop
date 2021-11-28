import sendgrid from '@sendgrid/mail';

export const sendCodeToEmail = async (code, email) => {
  await sendgrid.send({
    to: email,
    from: 'Neardrop <neardrop@linkdrop.tech>',
    subject: 'Validation code',
    text: 'validation code code code code code code v',
    html: `<table>Your validation code: <strong>${code}</strong></table>`,
  });
};
