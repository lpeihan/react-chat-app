import axios from 'axios';
import { SET_MESSAGE_LIST, ADD_MESSAGE } from '../constants';
import socket from '../../utils/socket';

export function getMessageList() {
  return async dispatch => {
    const res = await axios.get('/messages');
    dispatch({ type: SET_MESSAGE_LIST, messages: res.data });
  };
}

export function sendMessage(message) {
  return async dispatch => {
    socket.emit('send-message', message);
  };
}

export function receiveMessage() {
  return async dispatch => {
    socket.on('receive-message', function(message) {
      dispatch({ type: ADD_MESSAGE, message });
    });
  };
}
