import sendgrid from '@sendgrid/mail';

export const sendCodeByEmail = async (code, email) => {
  return;
  await sendgrid.send({
    to: 'volodymyr@near.foundation',
    from: 'Neardrop <neardrop@linkdrop.tech>',
    subject: 'Validation code',
    text: 'validation code code code code code code v',
    html: `<table>Your validation code: <strong>${code}</strong></table>`,
  });
}
