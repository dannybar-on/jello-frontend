
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'


import { toyReducer } from "./toy.reducer.js";
import { userReducer } from "./user.reducer.js";
import { reviewReducer } from "./review.reducer";

const rootReducer = combineReducers({
    toyModule : toyReducer,
    userModule : userReducer,
    reviewModule: reviewReducer
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

