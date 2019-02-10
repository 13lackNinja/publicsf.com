// This module exports a function which returns the Big Neon events as an array
// of event objects.

import sortEvents from './sortEvents';
import parseDate from './parseDate';
import setURL from './setURL';

export default async function getEvents() {
  const baseUrl = "https://www.bigneon.com/api/events?venue_id=35b31de5-dcd7-46b2-a657-8d3408748f75";

  const events = await fetch(baseUrl)
    .then((raw) => {
      return raw.json(); // A promise
    })
    .then((eventIndex) => {

      // Parse dates and set urls
      const eventData = eventIndex.data.map((event) => {


        event.start = parseDate(event.localized_times.event_start);
        event.ticket_url = setURL(event);

        // Convert prices from cents to dollars, show blank if external
        let price;

        if (event.is_external) {
          price = '';
        } else if (event.min_ticket_price === event.max_ticket_price) {
          price = `$${event.max_ticket_price / 100}`;
        } else {
          price = `$${event.min_ticket_price / 100} - $${event.max_ticket_price / 100}`;
        }

        event.price = price;

        return event;

      }).filter((event) => {
        const eventDate = new Date(event.localized_times.event_start);
        const today = new Date();

        return eventDate > today;
      });


      return sortEvents(eventData); // An array
    });

  return events;
}
