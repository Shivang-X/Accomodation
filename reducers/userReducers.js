export const authReducer = (state = { user: {}, isAuthenticated: false }, action) => {
  switch (action.type) {
    case "LOGIN_USER_REQUEST":
    case "REGISTER_USER_REQUEST":
    case "LOAD_USER_REQUEST":
      return {
        loading: true,
        isAuthenticated: false,
      };

    case "LOGIN_USER_SUCCESS":
    case "REGISTER_USER_SUCCESS":
    case "LOAD_USER_SUCCESS":
        return {
            ...state,
            loading: false,
            isAuthenticated: true,
            user: action.payload
        }  

    case "LOGIN_USER_FAIL":
    case "REGISTER_USER_FAIL":
    case "LOAD_USER_FAIL":
        return {
            ...state,
            loading: false,
            isAuthenticated: false,
            user: null,
            error: action.payload
        }
    case "LOGOUT_SUCCESS":
      return{
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null
      }
    case "LOGOUT_FAIL":
      return{
        ...state,
        error: action.payload
      }
      case "CLEAR_ERRORS":
        return {
            ...state,
            error: null
        }
    default:
        return state
  }
};

export const userReducer = (state = {}, action) => {
  switch(action.type) {
    case "UPDATE_PROFILE_REQUEST":
      return{
        ...state,
        loading: true
      }

    case "UPDATE_PROFILE_SUCCESS":
      return{
        ...state,
        loading: false,
        isUpdated: action.payload 
      }

    case "UPDATE_PROFILE_FAIL":
      return{
        ...state,
        loading: false,
        error: action.payload
      }

    case "UPDATE_PROFILE_RESET":
      return{
        ...state,
        isUpdated: false
      }
      case "CLEAR_ERRORS":
        return {
            ...state,
            error: null
        }
    default:
      return state
  }
}