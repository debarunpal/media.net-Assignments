// Offline Data Behaviour
db.enablePersistence()
    .catch(err => {
        if (err.code == 'failed-precondition') {
            console.log('Persistence Failed!'); // Maybe multiple tabs are open at once
        } else if (err.code == 'unimplemented') {
            console.log('Persistence is not available'); // Browser does not support the feature
        }
    });

// Adding a Real Time Listener
db.collection('recipes').onSnapshot((snapshot) => {
    // console.log(snapshot.docChanges());
    snapshot.docChanges().forEach((change) => {
        // console.log(change, change.doc.data(), change.doc.id);
        if (change.type === 'added') {
            // Add the Document Data to the Web Page
            renderRecipe(change.doc.data(), change.doc.id);
        }
        if (change.type === 'removed') {
            removeRecipe(change.doc.id);
        }
    });
});

// Add New Recipe
const form = document.querySelector('form');
form.addEventListener('submit', e => {
    e.preventDefault();

    const recipe = {
        title: form.title.value,
        ingredients: form.ingredients.value
    };

    db.collection('recipes').add(recipe)
        .catch(err => console.log(err));

    form.reset();
});

// Delete a Recipe
const recipeContainer = document.querySelector('.recipes');
recipeContainer.addEventListener('click', event => {
    //console.log(event);
    if (event.target.tagName === 'I'){
        const id = event.target.getAttribute('data-id');
        db.collection('recipes').doc(id).delete();
    }
})