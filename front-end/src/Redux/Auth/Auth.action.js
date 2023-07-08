import { AUTH_USER_ERROR, AUTH_USER_LOGOUT, AUTH_USER_REQUEST, AUTH_USER_SUCCESS,AUTH_USER_SIGNUP_ERROR, AUTH_USER_SIGNUP_REQUEST, AUTH_USER_SIGNUP_SUCCESS  } from "./Auth.actionTypes";

import axios from "axios"




    // Existing code for login action
  
    // Add authSignup action
    export const authSignup = (signupData) => async (dispatch) => {
      dispatch({ type: AUTH_USER_SIGNUP_REQUEST });
  
      try {
        const response = await axios.post('http://localhost:8080/user/signup', signupData);
        const data = response.data;
        console.log(data);
  
        localStorage.setItem('authToken', JSON.stringify(data));
        dispatch({
          type: AUTH_USER_SIGNUP_SUCCESS,
          payload: {
            token: data.token,
            message: data.message,
          },
        });
      } catch (error) {
        const errorMessage = error.response.data.message;
        dispatch({ type: AUTH_USER_SIGNUP_ERROR, payload: { message: errorMessage } });
      }
    };
  
  



export const authlogin = (loginData) => async (dispatch) => {

    dispatch({ type: AUTH_USER_REQUEST });

    try {
      const response = await axios.post('http://localhost:8080/user/login', loginData);
      const data = response.data;
      console.log(data)
  
      localStorage.setItem('authToken', JSON.stringify(data));
      dispatch({
        type: AUTH_USER_SUCCESS,
        payload: {
          token: data.token,
          message: data.message,
        
        },
      });
    } catch (error) {
      const errorMessage = error.response.data.message;
      dispatch({ type:AUTH_USER_ERROR ,payload: { message: errorMessage } });
    }
  };



