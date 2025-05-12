// Register the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./service-worker.js') // Ensure the path to the service worker is correct
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    });
  }
  
  // Handle form submission and store preferences in localStorage
  const form = document.getElementById('preferences-form');
  
  if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
      
        const preferences = {
          language: document.getElementById('language').value,
          theme: document.getElementById('theme').value,
          sortOption: document.getElementById('sortOption').value,
        };
      
        // Save preferences to the server or service worker
        fetch('/preferences', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(preferences),
        }).then(() => {
          alert('Preferences saved!');
        }).catch(() => {
          alert('Failed to save preferences!');
        });
      });
  }
  