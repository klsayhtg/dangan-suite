import axios from 'axios';

import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_GET_STATUS,
  AUTH_GET_STATUS_SUCCESS,
  AUTH_GET_STATUS_FAILURE,
  AUTH_LOGOUT
} from './ActionTypes';

/*============================================================================
    authentication
==============================================================================*/

// Login

export function loginRequest(username, password) {
  return (dispatch) => {
    // Inform Login API is starting
    dispatch(login());

    // API request
    return axios.post('/api/user/signin', {username: username, password: password})
      .then((res) => {
        // success
        dispatch(loginSuccess(username));
      }).catch((err) => {
        // failed
        dispatch(loginFailure());
      })
  }
}

export function login() {
  return {
    type: AUTH_LOGIN
  };
}

export function loginSuccess(username) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    username
  };
}

export function loginFailure() {
  return {
    type: AUTH_LOGIN_FAILURE
  };
}


// Register
export function registerRequest(username, password) {
  return (dispatch) => {
    // Inform Register API is starting
    dispatch(register());

    console.log('username', username);
    return axios.post('/api/user/signup', {username: username, password: password}).then((res) => {
      dispatch(registerSuccess());
    }).catch((err) => {
      dispatch(registerFailure(err.response.data.code));
    })
  };
}

export function register() {
  return {
    type: AUTH_REGISTER
  };
}

export function registerSuccess() {
  return {
    type: AUTH_REGISTER_SUCCESS,
  };
}

export function registerFailure(error) {
  return {
    type: AUTH_REGISTER_FAILURE,
    error
  };
}

// get status
export function getStatusRequest() {
  return (dispatch) => {
    // inform get status api is starting
    dispatch(getStatus());

    return axios.get('/api/user/get_info').then((res) => {
      dispatch(getStatusSuccess(res.data.info.username));
    }).catch((err) => {
      dispatch(getStatusFailure());
    })
  };
}

export function getStatus() {
  return {
    type: AUTH_GET_STATUS
  };
}

export function getStatusSuccess(username) {
  return {
    type: AUTH_GET_STATUS_SUCCESS,
    username
  };
}

export function getStatusFailure() {
  return {
    type: AUTH_GET_STATUS_FAILURE
  };
}

// Logout
export function logoutRequest() {
  return (dispatch) => {
    return axios.post('/api/user/logout').then((res) => {
      dispatch(logout());
    })
  }
}

export function logout() {
  return {
    type: AUTH_LOGOUT
  }
}