// Recieves a UTC date string and converts it into a readable date object.

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
    // Null in array position 0 accounts for shifted index when converting array
    // position to month number (no zero value, starts at 1).
    null,
    'JAN', 'FEB', 'MAR',
    'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP',
    'OCT', 'NOV', 'DEC'
  ];

  // Javascript date object created to get day of the week from UTC string.
  const jsDate = new Date(UTCString);

  // Extract day, month, date, and time values from the UTC string.
  let weekday = jsDate.getDay();
  weekday = weekdays[weekday];

  let month = Math.floor(UTCString.slice(5, 7));
  month = months[month];

  const date = Math.floor(UTCString.slice(8, 10));

  let hours = Math.floor(UTCString.slice(11, 13));
  let meridiam;

  // Convert 24-hour UTC hours to 12-hour with meridiam.
  if (hours >= 12) {
    hours -= 12;
    meridiam = 'PM';
  } else {
    meridiam = 'AM';
  }

  const minutes = UTCString.slice(14, 16);

  return {
    weekday: weekday,
    month: month,
    date: date,
    time: `${hours}:${minutes} ${meridiam}`
  }
}
