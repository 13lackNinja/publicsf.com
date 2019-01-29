// Returns either an external or BigNeon URL for a given event.
export default function setURL(event) {
  return event.is_external ?
    event.external_url
    :
    `https://bigneon.com/events/${event.id}`;
}
