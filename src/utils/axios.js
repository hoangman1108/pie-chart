/* eslint-disable no-console */
import axios from 'axios';

axios.interceptors.request.use((request) => {
  console.log(`[${request.method}] ${request.url}`);
  return request;
});

axios.interceptors.response.use((response) => {
  console.log(`[${response.status}] ${response.config.url}`);
  console.log(response.data);
  return response;
});

const parseErrorResponse = (error) => {
  let message;
  let data = {};
  if (
    error.response &&
    error.response.data &&
    error.response.data instanceof Object
  ) {
    data = error.response.data;
    message = data.message;
  } else {
    message = error.message;
  }

  return {
    success: false,
    error,
    message,
    data,
  };
};

async function axiosCall(method, ...args) {
  let response;
  try {
    response = await axios[method](...args);
  } catch (error) {
    return parseErrorResponse(error);
  }

  const { data } = response;

  if (response.status >= 200 && response.status < 300) {
    return {
      success: true,
      data,
    };
  }

  return {
    success: false,
    resp_status: response.status,
    data,
  };
}

export async function axiosPost(...options) {
  return await axiosCall('post', ...options);
}

export async function axiosGet(...options) {
  return await axiosCall('get', ...options);
}

export async function axiosPut(...options) {
  return await axiosCall('put', ...options);
}

export async function axiosPatch(...options) {
  return await axiosCall('patch', ...options);
}

export async function axiosDelete(...options) {
  return await axiosCall('delete', ...options);
}
