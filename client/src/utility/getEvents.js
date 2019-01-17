
import parseDate from './parseDate';
import sortEvents from './sortEvents';

export default async function getEvents() {
  const eventRequest = {
    base: 'https://www.eventbriteapi.com/v3/events/search/?organizer.id=17405142071&expand=ticket_availability&include_unavailable_events=true&include_adult_events=true',
    headers: {
      headers: {
        'Authorization': `Bearer BWOB5MWVVQUGFDHOKMY4`
      }
    }
  }

  // Get all events
  const events = await fetch(eventRequest.base, eventRequest.headers)
    .then(res => res.json())
    .then((resJSON) => {
      let eventData = resJSON.events;

      // Sort events by their UTC Date string -> JS Date
      eventData = sortEvents(eventData);

      // Replace UTC Date with custom date object
      eventData.forEach((event) => {
        event.start = parseDate(event.start.local);
      });

      return eventData;
    });



  return events;
}
