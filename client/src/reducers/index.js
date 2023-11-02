import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from "./userReducer";


const rootReducer = combineReducers({
    user: userReducer,

})

export default store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))