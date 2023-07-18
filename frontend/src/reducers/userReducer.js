import { USER_LOGIN_FAIL, USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_SIGNUP_FAIL, USER_SIGNUP_START, USER_SIGNUP_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_START, USER_UPDATE_SUCCESS } from "../actions/actionTypes"

const initialNoteState = {
    loading: false,
    error: null,
    userInfo: null,
    success: null
}

const userReducer = (state = initialNoteState, action) => {
    switch (action.type) {
        case USER_LOGIN_START: {
            return {
                ...state,
                loading: true
            }
        }
        case USER_LOGIN_SUCCESS: {
            return {
                ...state,
                loading: false,
                userInfo: action.payload,
                error: null
            }
        }
        case USER_LOGIN_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        case USER_SIGNUP_START: {
            return {
                ...state,
                loading: true
            }
        }
        case USER_SIGNUP_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: null,
                success: action.payload
            }
        }
        case USER_SIGNUP_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        case USER_UPDATE_START: {
            return {
                ...state,
                loading: true
            }
        }
        case USER_UPDATE_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: null,
                success: action.payload
            }
        }
        case USER_UPDATE_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        case USER_LOGOUT: {
            return {
                ...state,
                loading: false,
                error: null,
                userInfo: null,
                success: null
            }
        }
        default: return state;
    }
}

export default userReducer;