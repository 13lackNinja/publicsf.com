export default function (snapshot) {
  let array = [];

  snapshot.forEach((childSnapshot) => {
    array.push(childSnapshot.val());
  });

  return array;
}
