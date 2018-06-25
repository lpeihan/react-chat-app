import io from 'socket.io-client';
import config from '../../config';

let socket;

if (process.env.NODE_ENV === 'production') {
  socket = io();
} else {
  socket = io(`ws://${config.host}:${config.port}`);
}

export default socket;
