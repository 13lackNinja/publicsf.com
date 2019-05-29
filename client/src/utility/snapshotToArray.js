function snapshotToArray(snapshot) {
  let array = [];

  snapshot.forEach((snapshotChild) => {
    const item = snapshotChild.val();
    array.push(item);
  });

  return array;
}

export default snapshotToArray
