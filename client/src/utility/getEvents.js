import sortEvents from './sortEvents';
import parseDate from './parseDate';
import setURL from './setURL';

export default async function getEvents() {
  const baseUrl = "https://www.bigneon.com/api/venues/35b31de5-dcd7-46b2-a657-8d3408748f75/events";

  const events = await fetch(baseUrl)
    .then((raw) => {
      return raw.json(); // A promise
    })
    .then((eventIndex) => {

      // Parse dates and set urls
      const eventData = eventIndex.data.map((event) => {
        event.start = parseDate(event.event_start);
        event.ticket_url = setURL(event);
        return event;
      });

      return sortEvents(eventData); // An array
    });

  return events;
}
