import axios from 'axios';
import jwtDecode from 'jwt-decode';

import cache from '../../utils/cache';
import { getRandom } from '../../utils';
import { jsonWebToken, qiniu } from '../../services/config';

import { SET_CURRENT_USER } from '../constants';

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user
  };
};

export const signup = (user) => {
  return async dispatch => {
    user.avatar = `${qiniu}/avatar_${getRandom(1, 22)}.png`;

    const res = await axios.post('/users/signup', user);
    const token = res.data;

    cache.setItem(jsonWebToken, token);
    dispatch(setCurrentUser(jwtDecode(token)));
  };
};

export const login = (user) => {
  return async dispatch => {
    const res = await axios.post('/users/login', user);
    const token = res.data;

    cache.setItem(jsonWebToken, token);
    dispatch(setCurrentUser(jwtDecode(token)));
  };
};

export const logout = () => {
  return dispatch => {
    cache.removeItem(jsonWebToken);
    dispatch(setCurrentUser({}));
  };
};

export const modifyMyInfo = (info) => {
  return async dispatch => {
    const res = await axios.post('/users/my', info);
    const token = res.data;

    cache.setItem(jsonWebToken, token);
    dispatch(setCurrentUser(jwtDecode(token)));
  };
};
