export default function parseDate(UTCString) {
  const weekdays = [
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT'
  ];

  const months = [
    'JAN', 'FEB', 'MAR',
    'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP',
    'OCT', 'NOV', 'DEC'
  ];

  const jsDate = new Date(UTCString);

  let weekday = jsDate.getDay();
  weekday = weekdays[weekday];

  let month = Math.floor(UTCString.slice(5, 7));
  month = months[month];

  const date = Math.floor(UTCString.slice(8, 10));

  let hours = Math.floor(UTCString.slice(11, 13));
  let meridiam;


  if (hours >= 12) {
    hours -= 12;
    meridiam = 'AM';
  } else {
    meridiam = 'PM';
  }

  const minutes = UTCString.slice(14, 16);

  return {
    weekday: weekday,
    month: month,
    date: date,
    time: `${hours}:${minutes} ${meridiam}`
  }
}
