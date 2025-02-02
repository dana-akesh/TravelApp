import './styles/style.scss'
import './styles/nav_style.scss'
import { performAction } from './js/app'

// Event listener for the generate button
document.getElementById('generate').addEventListener('click', performAction);

//the service worker was added here instead of the end of the body in the html
// Check that service workers are supported
if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
    });
}

// Export the function to be used in the test file
export {
    performAction,
}
