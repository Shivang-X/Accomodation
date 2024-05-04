export const adReducer = (state = { ads: [] }, action) => {
    switch (action.type) {

      case "POST_ADS_REQUEST":
        return {
          loading: true,
        };
  
      case "POST_ADS_SUCCESS":
        return {
            ...state,
            loading: false,
        }  
  
      case "POST_ADS_FAIL":
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
  
export const getAdsReducer = (state = { ads: [] }, action) => {
    switch (action.type) {
      case "GET_ADS_REQUEST":
      case "ALL_ADS_REQUEST":
      case "USER_ADS_REQUEST":
        return {
          loading: true,
          ads: []
        };
  
      case "GET_ADS_SUCCESS":
      case "ALL_ADS_SUCCESS":
      case "USER_ADS_SUCCESS":
        return {
            ...state,
            loading: false,
            ads: action.payload
        }
  
      case "GET_ADS_FAIL":
      case "ALL_ADS_FAIL":
      case "USER_ADS_FAIL":
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

  export const updateAdsReducer = (state = {ads : []}, action) => {
    switch(action.type){
      case "UPDATE_ADS_REQUEST":
        return{
          ...state,
          loading: true
        }
      case "UPDATE_ADS_SUCCESS":
        return{
          ...state,
          loading: false,
          isUpdated: true
        }
      case "UPDATE_ADS_FAIL":
        return {
          ...state,
          loading: false,
          isUpdated: false,
          error: action.payload
        }
      case "UPDATE_ADS_RESET":
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
        return {
          ...state
        }
    }
  }
  