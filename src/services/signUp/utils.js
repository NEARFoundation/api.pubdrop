export const validateEmail = (email) => {
  // check format
};

export const generateCode = () => {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min)) + min;
};

export const checkDropStatus = async (user) => {
  // TODO Finish this
  return true;
};
