export function parseDate(date) {
  const year = date.slice(0, 3);
  const month = date.slice(5, 6);
  const day = date.slice(8, 9);
  const hour = date.slice(11, 12);
  const minute = date.slice(14, 15);

  const newDate = new Date(year, month, day, hour, minute);
  return newDate;
};
