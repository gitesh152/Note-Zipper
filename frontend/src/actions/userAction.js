import { USER_LOGIN_FAIL, USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_START, USER_SIGNUP_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_START, USER_UPDATE_SUCCESS } from './actionTypes'
import axios from 'axios';

//Login User
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_START });
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };
        const { data } = await axios.post(`/api/user/login`, { email, password }, config);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user })
        localStorage.setItem('userInfo', JSON.stringify(data.user));

    }
    catch (e) {
        const error =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.response.data;
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error,
        });
        // console.log('error :', error);
    }
}

//Signup user
export const signup = (name, email, password, pic) => async (dispatch) => {
    try {
        dispatch({ type: USER_SIGNUP_START });
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };
        const { data } = await axios.post(`/api/user/signup`, { name, email, password, pic }, config);
        dispatch({ type: USER_SIGNUP_SUCCESS, payload: `${data.message}-${data.user.name}` })

    }
    catch (e) {
        const error =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.response.data;
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error,
        });
        // console.log('error :', error);
    }
}

//Update Profile
export const updateProfile = (user) => async (dispatch) => {
    try {
        dispatch({ type: USER_UPDATE_START });
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };
        const { data } = await axios.post(`/api/user/update`, user, config);
        dispatch({ type: USER_UPDATE_SUCCESS, payload: `${data.message} - ${data.user.name}` })
        localStorage.setItem('userInfo', JSON.stringify(data.user));

    }
    catch (e) {
        const error =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.response.data;
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error,
        });
        // console.log('error :', error);
    }
}