import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
broadcaster: 'pusher',
key: '88332584f3e9f1d0fadc', // Make sure this matches your .env file
cluster: 'mt1', // Make sure this matches your .env file
forceTLS: true,
encrypted: true,
authEndpoint: 'http://localhost:8000/broadcasting/auth',
auth: {
headers: {
Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Ensure you are sending the correct token
},
},
});

console.log('Echo instance:', window.Echo);

// Echo.connector.pusher.connection.bind('connected', () => {
//     console.log('Pusher connected');
// });

// Echo.connector.pusher.connection.bind('error', (err) => {
//     console.error('Pusher error:', err);
// });

// Echo.connector.pusher.connection.bind('state_change', (states) => {
//     console.log('Pusher state change:', states);
// });

export default window.Echo;