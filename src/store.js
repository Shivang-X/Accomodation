import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import { authReducer, userReducer } from './reducers/userReducers';
// import { authReducer, userReducer } from './../';
import { getAdsReducer, updateAdsReducer } from './reducers/adReducers';

const reducer = combineReducers({
    auth: authReducer,
    getads: getAdsReducer,
    user: userReducer,
    // postad: adReducer,
    updateads: updateAdsReducer
})


const middlware = [thunk];
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middlware)))

export default store;