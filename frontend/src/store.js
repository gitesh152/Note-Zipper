import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'
import noteReducer from './reducers/noteReducer.js'
import userReducer from './reducers/userReducer.js'

const reducers = combineReducers({ noteState: noteReducer, userState: userReducer });

//Getting userSession from localStorage, so that If user shutdown pc or go away, it still logged in.
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

//Define initial state of store.
const initialState = {
    userState: { userInfo: userInfoFromStorage }
}

const store = createStore(reducers, initialState, applyMiddleware(logger, thunk))

export default store;