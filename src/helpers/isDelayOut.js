export const isDelayOut = (date, delay = 60) => Date.now() > date.getTime() + delay * 1000; // 1 min delay
