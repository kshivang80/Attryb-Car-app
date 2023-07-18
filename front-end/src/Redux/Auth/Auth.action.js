import { AUTH_USER_ERROR, AUTH_USER_LOGOUT, AUTH_USER_REQUEST, AUTH_USER_SUCCESS,AUTH_USER_SIGNUP_ERROR, AUTH_USER_SIGNUP_REQUEST, AUTH_USER_SIGNUP_SUCCESS, GET_SINGLE_USER  } from "./Auth.actionTypes";

import axios from "axios"

import jwtDecode from "jwt-decode";




    // Existing code for login action
  
    // Add authSignup action
    export const authSignup = (signupData) => async (dispatch) => {
      dispatch({ type: AUTH_USER_SIGNUP_REQUEST });
  
      try {
        const response = await axios.post('https://odd-lime-chicken-wrap.cyclic.app/user/signup', signupData);
        const data = response.data;
        console.log(data,'hello signup');
  
        //localStorage.setItem('authToken', JSON.stringify(data));
        dispatch({
          type: AUTH_USER_SIGNUP_SUCCESS,
          payload: data,
        });
      } catch (error) {
        const errorMessage = error.response.data.message;
        dispatch({ type: AUTH_USER_SIGNUP_ERROR, payload: { message: errorMessage } });
      }
    };
  
  



// export const authlogin = (loginData) => async (dispatch) => {

//     dispatch({ type: AUTH_USER_REQUEST });

//     try {
//       const response = await axios.post('https://odd-lime-chicken-wrap.cyclic.app/user/login', loginData);
//       const data = response.data;
//       console.log(data)
  
//       //localStorage.setItem('authToken', JSON.stringify(data));
//       dispatch({
//         type: AUTH_USER_SUCCESS,
//         // payload: {
//         //   token: data.token,
//         //   message: data.message,
        
//         // }
//         payload:data
//       });
//     } catch (error) {
//       const errorMessage = error.response.data.message;
//       dispatch({ type:AUTH_USER_ERROR ,payload: { message: errorMessage } });
//     }
//   };

export const authlogin = (loginData) => async (dispatch) => {

  dispatch({ type: AUTH_USER_REQUEST });

  try {
    const response = await axios.post('https://odd-lime-chicken-wrap.cyclic.app/user/login', loginData);
    const data = response.data;
    console.log(data,'hello chwck');

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

  export const getSingleUser= (token)=>async (dispatch)=>{

    // const token = localStorage.getItem('token');
    try{
      const decoded = jwtDecode(token);
      console.log(decoded,"decorded data")
  
     dispatch({type:GET_SINGLE_USER,payload:decoded.userID});

    }catch(err){
      console.log(err)

    }

   

  

}



