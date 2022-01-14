import twilio from "twilio";

export const sendSmsWithCode = async (code, phone) => {
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  const message = `${process.env.TWILIO_SMS_BODY_TEMPLATE}: ${code}`;

  await client.messages
    .create({
      body: message,
      from: process.env.TWILIO_CALLER_PHONE_NUMBER,
      to: phone
    })
    .then(message => console.log(message.sid));
};
