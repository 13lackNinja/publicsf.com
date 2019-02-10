// Recieves a local time string and converts it into a readable date object.

export default function parseDate(timeString) {

  const weekday = timeString.slice(0, 4);

  let month = timeString.slice(8, 11);

  const date = timeString.slice(5, 7);

  let hours = Math.floor(timeString.slice(17, 19));

  let meridiam;

  // Convert 24-hour UTC hours to 12-hour with meridiam.
  if (hours >= 12) {
    hours -= 12;
    meridiam = 'PM';
  } else {
    meridiam = 'AM';
  }

  const minutes = timeString.slice(20, 22);

  return {
    weekday: weekday,
    month: month,
    date: date,
    time: `${hours}:${minutes} ${meridiam}`
  }
}
