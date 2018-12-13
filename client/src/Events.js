import { database } from './firebase';

function processEvents(response) {
  let events = [];

  for (let key in response) {
    response[key].id = key;
    events.push(response[key]);
  }

  events.sort((a, b) => {
    return a.start - b.start;
  });

  return events;
}

export async function currentEvents() {
  const today = new Date();
  const todayUnixStamp = today.getTime();
  const eventsRef = database.ref('events').orderByChild('start').startAt(todayUnixStamp);

  let response = await new Promise((resolve, reject) => {
    eventsRef.on('value', (snapshot) => {
      resolve(snapshot.val());
    });
  });

  return processEvents(response);
}

export async function lastEvents(n) {
  const today = new Date();
  const todayUnixStamp = today.getTime();
  const eventsRef = database.ref('events').orderByChild('start').startAt(todayUnixStamp).limitToLast(n);

  let response = await new Promise((resolve, reject) => {
    eventsRef.on('value', (snapshot) => {
      resolve(snapshot.val());
    });
  });

  return processEvents(response);
}
