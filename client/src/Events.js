export function currentEvents() {
  const eventsURL = "https://www.bigneon.com/api/venues/35b31de5-dcd7-46b2-a657-8d3408748f75/events";

  return fetch(eventsURL)
    .then((raw) => {
      return raw.json(); // A promise
    });
}

export async function lastEvents(n) {

}
