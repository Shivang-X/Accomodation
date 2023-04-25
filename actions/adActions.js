import axios from "axios";

//Get all Ads
export const getAds = () => async (dispatch) => {
    try {
        dispatch({
            type: "GET_ADS_REQUEST"
        })
    
        const res = await axios.get("http://localhost:8000/getads", {withCredentials: true});
        // const res = await axios.get("http://localhost:3000/api/getads", {withCredentials: true});
    
        dispatch({
            type: "GET_ADS_SUCCESS",
            data: res.data
        })

    } catch (error) {
        dispatch({
            type: "GET_ADS_FAIL",
            error: error.response.data.error
        })
    }
}

//Get Specific ads
export const getAd = ( _country, state , city ) => async (dispatch) => {
    // console.log(_country)
    try{
        dispatch({
            type: "ALL_ADS_REQUEST"
        })
        // const res = await axios.get(`http://localhost:8000/ads?country=${_country}&state=${state}&city=${city}`, { withCredentials: true })
        const res = await axios.get(`http://localhost:3000/api/ads?country=${_country}&state=${state}&city=${city}`, { withCredentials: true })

        dispatch({
            type: "ALL_ADS_SUCCESS",
            payload: res.data.ads
        })

    }catch(error){
        dispatch({
            type: "ALL_ADS_FAIL",
            error: error.response.data.error
        })
    }
}

//Get Specific ads
export const getAdbyId = ( id ) => async (dispatch) => {
    try{
        dispatch({
            type: "ALL_ADS_REQUEST"
        })

        const res = await axios.get(`http://localhost:8000/ads?id=${id}`, { withCredentials: true })

        dispatch({
            type: "ALL_ADS_SUCCESS",
            payload: res.data.ads
        })

    }catch(error){
        dispatch({
            type: "ALL_ADS_FAIL",
            error: error.response.data.error
        })
    }
}

//Get user posted ads
export const getUserAd = (id) => async (dispatch) => {
    try{
        dispatch({
            type: "USER_ADS_REQUEST"
        })

        // const res = await axios.get(`http://localhost:8000/user/ads?id=${id}`, { withCredentials: true })
        const res = await axios.get(`http://localhost:3000/api/user/ads?id=${id}`, { withCredentials: true })

        dispatch({
            type: "USER_ADS_SUCCESS",
            payload: res.data.ads
        })

        return res

    }catch(error){
        dispatch({
            type: "USER_ADS_FAIL",
            payload: error.response.data.error
        })
    }
}

//Update user posted ads
export const updateAd = (data) => async (dispatch) => {
    try{
        dispatch({
            type: "UPDATE_ADS_REQUEST"
        })

        const res = await axios.post(`http://localhost:8000/user/ads/update`, data, { withCredentials: true })
        console.log(res)
        dispatch({
            type: "UPDATE_ADS_SUCCESS",
            payload: res.data.ads
        })

    }catch(error){
        console.log(error.response.data.error)
        dispatch({
            type: "UPDATE_ADS_FAIL",
            payload: error.response.data.error
        })
    }
}

//Post Ad
export const postAd = (data, id) => async (dispatch) => {
    try {
        dispatch({
            type: "POST_ADS_REQUEST"
        })
        // const res = await axios.post("http://localhost:8000/postad", data, { withCredentials: true });
        const res = await axios.post("http://localhost:3000/api/postad", {data, id} , { withCredentials: true });
        // const res = await axios.post("http://localhost:3000/api/hello", {data, session}, { withCredentials: true });

        dispatch({
            type: "POST_ADS_SUCCESS" 
        })
        
    } catch (error) {
        dispatch({
            type: "POST_ADS_FAIL",
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