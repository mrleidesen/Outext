export const getRandomNumber = (min = 0, max = 10): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
