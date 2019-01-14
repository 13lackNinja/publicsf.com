export default function parseISOString(ISOString) {
  
  const months = [
    'JAN', 'FEB', 'MAR',
    'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP',
    'OCT', 'NOV', 'DEC'
  ];

  const days = [
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT'
  ];

  const date = new Date(ISOString);
  let weekday = date.getDay();
  let month = ISOString.slice(5, 7);
  const day = Math.floor(ISOString.slice(8, 10))
  let hours = Math.floor(ISOString.slice(11, 13));
  const minutes = ISOString.slice(14, 16);
  let meridiam = 'AM';

  weekday = days[weekday];
  month = months[Math.floor(month)];

  if (hours >= 12) {
    meridiam = 'PM';
    hours -= 12;
  }

  const time = `${hours}:${minutes} ${meridiam}`;

  return `${weekday} ${month} ${day} ${time}`;
}
