export default function sortEvents(events) {
  events.sort((a, b) => {
    const dateA = new Date(a.start.local);
    const dateB = new Date(b.start.local);

    return dateA.getTime() - dateB.getTime();
  });

  return events;
}
