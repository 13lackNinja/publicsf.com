export default function sortEvents(events) {
  events.sort((a, b) => {
    const dateA = new Date(a.event_start);
    const dateB = new Date(b.event_start);

    return dateA.getTime() - dateB.getTime();
  });

  return events;
}
