import axios from 'axios';

export const setAxiosDefaultAuthToken = (token) => {
  axios.defaults.headers.common.Accept = 'application/json';
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeAxiosDefaultAuthToken = () => {
  delete axios.defaults.headers.common.Accept;
  delete axios.defaults.headers.common.Authorization;
};

const notify = (type, msg) => {
  toast[type](msg, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const ToastTopHelper = {
  success: (msg) => {
    notify('success', msg);
  },
  error: (msg) => {
    notify('error', msg);
  },
};
