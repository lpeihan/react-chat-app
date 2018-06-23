import axios from 'axios';
import cache from './cache';
import { logout } from '../store/actions/auth';
import store from '../store';
import { jsonWebToken } from '../services/config';
import { Toast } from 'antd-mobile';

axios.defaults.baseURL = 'api';

axios.interceptors.request.use(
  config => {
    Toast.loading('加载中...', 0);

    if (cache.getItem(jsonWebToken)) {
      config.headers['Authorization'] = `Bearer ${cache.getItem(jsonWebToken)}`;
    }

    return config;
  },
  err => Promise.reject(err)
);

axios.interceptors.response.use(
  res => {
    Toast.hide();
    return res;
  },
  err => {
    Toast.hide();

    if (err.response) {
      switch (err.response.status) {
        case 401:
          store.dispatch(logout());
      }
    }

    return Promise.reject(err.response.data);
  }
);

export default axios;
