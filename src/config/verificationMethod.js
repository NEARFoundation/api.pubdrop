export const isThisAnEmailCheck = (event = '') => {
  return `${process.env['USER_VERIFICATION_METHOD_' + event.toUpperCase()]}`.toLowerCase() === "email";
}
