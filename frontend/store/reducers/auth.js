import isEmpty from 'lodash/isEmpty';

import { SET_CURRENT_USER } from '../constants';

const initialState = {
  user: {},
  isAuth: false
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuth: !isEmpty(action.user),
        user: action.user
      };
    default:
      return state;
  }
};

export default auth;
