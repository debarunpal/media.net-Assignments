if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log("Service Worker successfully registered!", reg))
        .catch((err) => console.log("Failed to register Service Worker", err))
}