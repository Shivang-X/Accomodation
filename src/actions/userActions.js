import request from "@/src/utils/axios-config";
import axios from "axios";

  
//Login
export const login = (user) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_USER_REQUEST" });

    console.log(user)

    const { data } = await request.post(`auth/login`, user);

      dispatch({
        type: "LOGIN_USER_SUCCESS",
        payload: data.user,
      });

      localStorage.setItem("accessToken", data.accessToken);


  } catch (error) {
    dispatch({
      type: "LOGIN_USER_FAIL",
      payload: error.response.data.message,
    });
  }
};

//Register
export const register = (user) => async (dispatch) => {
  try {
    dispatch({
      type: "REGISTER_USER_REQUEST",
    });

    const { data } = await request.post(`auth/register`, user);

      dispatch({
        type: "REGISTER_USER_SUCCESS",
        payload: data.user,
      });
      
      localStorage.setItem("accessToken", data.accessToken);

  } catch (error) {
    dispatch({
      type: "REGISTER_USER_FAIL",
      payload: error.response.data.message,
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

    // const { data } = await axios.get(`${baseUrl}/me`);

    const {data} = await request.get(`/me`);

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

    localStorage.removeItem("accessToken")

    dispatch({
      type: "LOGOUT_SUCCESS"
    })
    
  } catch (error) {
    dispatch({
      type: "LOGOUT_FAIL",
      payload: "Logout request failed"
    })
  }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
      type: "CLEAR_ERRORS"
  })
}