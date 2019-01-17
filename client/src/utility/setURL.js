// Returns either an external or native URL
export default function setURL(event) {
  return event.is_external ?
    event.external_url
    :
    `https://bigneon.com/events/${event.id}`;
}
