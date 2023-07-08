import { AUTH_USER_ERROR, AUTH_USER_LOGOUT, AUTH_USER_REQUEST, AUTH_USER_SUCCESS,AUTH_USER_SIGNUP_ERROR, AUTH_USER_SIGNUP_REQUEST, AUTH_USER_SIGNUP_SUCCESS } from "./Auth.actionTypes";

const token = JSON.parse(localStorage.getItem("authToken")) || false;

const initialState = {
    token: token.token || false,
    isAuth: token.token || false,
    isLoading: false,
    isError: false,
    message:null,
}



export const authReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {

        // Add signup action cases
    case AUTH_USER_SIGNUP_REQUEST:
        return { ...state, isLoading: true, isError: false };
  
      case AUTH_USER_SIGNUP_SUCCESS:
        return {
          ...state,
          isAuth: true,
          token: payload.token,
          message: payload.message,
          isLoading: false,
          isError: false,
        };
  
      case AUTH_USER_SIGNUP_ERROR:
        return {
          ...state,
          isAuth: false,
          token: false,
          message: payload.message,
          isLoading: false,
          isError: true,
        };





        // Login  

        case AUTH_USER_REQUEST:
            return { ...state, isLoading: true, isError: false }

        case AUTH_USER_SUCCESS:
            return {
                ...state,
                isAuth: true,
                token: payload.token,
               
                message: payload.message,
                isLoading: false,
                isError: false
            }

        case AUTH_USER_ERROR:
            return {
                ...state,
                isAuth: false,
                token: token,
               
                message: payload.message,
                isLoading: false,
                isError: true,
            }
        case AUTH_USER_LOGOUT:

            localStorage.clear("authToken");
            return {
                ...state,
                isAuth: false,
                token: false,
                message:null

            }

        default:
            return state;

    }


}