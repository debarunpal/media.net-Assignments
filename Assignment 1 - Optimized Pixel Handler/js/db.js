// Adding a Real Time Listener
db.collection('recipes').onSnapshot((snapshot) => {
    // console.log(snapshot.docChanges());
    snapshot.docChanges().forEach((change) => {
        // console.log(change, change.doc.data(), change.doc.id);
        if(change.type === 'added') {
            //To-do
        }
        if(change.type === 'removed') {
            //To-do
        }
    })
})