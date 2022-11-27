// Make date
export const getCurrentDate = () => {
  const dateNow = new Date().toDateString().split(" ").slice(1, 4);
  const joinDateNow = dateNow[0] + " " + dateNow[1] + ", " + dateNow[2];
  return joinDateNow;
};
