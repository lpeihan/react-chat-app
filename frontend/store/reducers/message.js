import { SET_MESSAGE_LIST, ADD_MESSAGE } from '../constants';

const auth = (state = [], action) => {
  switch (action.type) {
    case SET_MESSAGE_LIST:
      return action.messages;
    case ADD_MESSAGE:
      return [
        ...state, action.message
      ];
    default:
      return state;
  }
};

export default auth;
