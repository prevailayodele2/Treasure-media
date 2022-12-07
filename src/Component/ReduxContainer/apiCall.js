import axios from 'axios';
import { loginStart, loginSuccess, loginFailure } from './userReducer';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post('https://treasure-media-api.onrender.com/api/user/login', user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const VerifyEmail = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      'https://treasure-media-api.onrender.com/api/user/verify/email',
      user
    );
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const signup = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      'https://treasure-media-api.onrender.com/api/user/create/user',
      user
    );
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};
