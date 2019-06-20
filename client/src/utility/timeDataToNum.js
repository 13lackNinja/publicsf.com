// Takes hours, minutes and meridiam strings and returns number representing
// hours since midnight

export default function timeDataToNum(hours, minutes, meridiam) {
  if (hours.charAt(0) === '0') {
    hours = hours.slice(1);
  }

  if (minutes.charAt(0) === '0') {
    minutes = minutes.slice(1);
  }

  hours = parseInt(hours, 10);
  minutes = parseInt(minutes, 10);

  if (meridiam === 'PM' && hours !== 12) {
    hours += 12;
  }

  const minutesSinceMidnight = (hours * 60) + minutes;

  return minutesSinceMidnight;
}
