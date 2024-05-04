import axios from "axios";
import { signIn } from 'next-auth/react'

const baseUrl = "http://localhost:8080/api/v1";

//Login
export const login = (user) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_USER_REQUEST" });

    console.log(user)

    const { data } = await axios.post(`${baseUrl}auth/login`, user);

    if (data.success) {
      dispatch({
        type: "LOGIN_USER_SUCCESS",
        payload: data.user,
      });
    } else {
      dispatch({
        type: "LOGIN_USER_FAIL",
        payload: data.error,
      });
    }
  } catch (error) {
    dispatch({
      type: "LOGIN_USER_FAIL",
      payload: error.response.data.error,
    });
  }
};

//Register
export const register = (user) => async (dispatch) => {
  try {
    dispatch({
      type: "REGISTER_USER_REQUEST",
    });

    console.log(user);

    const { data } = await axios.post(`${baseUrl}/auth/register`, user);

    

      dispatch({
        type: "REGISTER_USER_SUCCESS",
        payload: data.user,
      });


  } catch (error) {
    dispatch({
      type: "REGISTER_USER_FAIL",
      payload: error.response.data.error,
    });
  }
};

//Update Profile
export const updateProfile = (user, id) => async(dispatch) => {

  try {
    dispatch({
      type: "UPDATE_PROFILE_REQUEST",
    });

    const headers = {
      'Content-Type': 'application/json',
    }

    const { data } = await axios.post(`${basrUrl}profile/update`, {user, id}, { withCredentials: true});
    
    dispatch({
      type: "UPDATE_PROFILE_SUCCESS",
      payload: data.success,
    });

  } catch (error) {
    console.log(error)
    dispatch({
      type: "UPDATE_PROFILE_FAIL",
      payload: error.response.data.error,
    });
  }
}

//Load user
export const loadUser = () => async (dispatch) => {
  try{
    dispatch({
      type: "LOAD_USER_REQUEST"
    })

    const { data } = await axios.get("http://localhost:8000/me", { withCredentials: true})

    dispatch({
      type: "LOAD_USER_SUCCESS",
      payload: data.user
    })

  }catch(error){
    console.log(error)
    dispatch({
      type: "LOAD_USER_FAIL",
      payload: error.response.data.error
    })
  }
}

//Logout
export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOGOUT_REQUEST"
    })

    await axios.get("http://localhost:8000/logout", {withCredentials: true})

    dispatch({
      type: "LOGOUT_SUCCESS"
    })
  } catch (error) {
    dispatch({
      type: "LOGOUT_FAIL",
      payload: error.response.data.error
    })
  }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
      type: "CLEAR_ERRORS"
  })
}