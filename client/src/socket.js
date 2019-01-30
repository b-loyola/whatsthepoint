import openSocket from 'socket.io-client';

let route = null;
if (process.env.NODE_ENV === 'production') {
  route = '/'
} else {
  route = 'http://localhost:4000'
}
const socket = openSocket(route);

export default socket;
