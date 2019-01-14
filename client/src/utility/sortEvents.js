export default function sortEvents(eventIndex) {
  let sortedEvents = eventIndex.data.sort((a, b) => {
    let timeA = new Date(a.event_start);
    let timeB = new Date(b.event_start);

    timeA = timeA.getTime();
    timeB = timeB.getTime();

    return timeA - timeB;
  });

  return sortedEvents;
}
