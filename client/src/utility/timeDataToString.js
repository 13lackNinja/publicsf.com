// Convert input into readable time format HH:MM AM/PM
export default function (hours, minutes, meridiam) {
  let hour = hours;

  if (hour.length > 1) {
    hour = hour.slice(1);
  }

  return `${hour}:${minutes} ${meridiam}`;
}
