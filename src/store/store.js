import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'


import { boardReducer } from "./board.reducer.js";
import { userReducer } from "./user.reducer.js";
// import { reviewReducer } from "./review.reducer";

const rootReducer = combineReducers({
    boardModule : boardReducer,
    userModule : userReducer,
    // reviewModule: reviewReducer
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

