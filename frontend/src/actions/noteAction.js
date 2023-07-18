import axios from 'axios';
import { NOTE_CREATE_FAIL, NOTE_CREATE_START, NOTE_CREATE_SUCCESS, NOTE_DELETE_FAIL, NOTE_DELETE_START, NOTE_DELETE_SUCCESS, NOTE_LIST_FAIL, NOTE_LIST_START, NOTE_LIST_SUCCESS, NOTE_UPDATE_FAIL, NOTE_UPDATE_START, NOTE_UPDATE_SUCCESS } from './actionTypes';

//Fetch list of notes
export const listNotes = () => async (dispatch, getState) => {
    dispatch({ type: NOTE_LIST_START })
    try {
        const { userInfo } = getState().userState;
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get('/api/notes', config);

        dispatch({ type: NOTE_LIST_SUCCESS, payload: data.notes });
    }
    catch (e) {
        const error = e.response && e.response.data.message ? e.response.data.message : e.response;
        dispatch({
            type: NOTE_LIST_FAIL,
            payload: error,
        });
    }
}

//Create note
export const createNote = (title, content, category) => async (dispatch, getState) => {
    dispatch({ type: NOTE_CREATE_START });
    try {
        const { userInfo } = getState().userState;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post('/api/notes/createnote', { title, content, category }, config);

        dispatch({ type: NOTE_CREATE_SUCCESS, payload: data.message, note: data.note })
    }
    catch (e) {
        const error = e.response && e.response.data.message ? e.response.data.message : e.response;
        dispatch({
            type: NOTE_CREATE_FAIL,
            payload: error,
        });
    }
}

//Update a note
export const updateNote = (id, title, content, category) => async (dispatch, getState) => {
    dispatch({ type: NOTE_UPDATE_START });
    try {
        const { userInfo } = getState().userState;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/notes/${id}`, { title, content, category }, config);

        dispatch({ type: NOTE_UPDATE_SUCCESS, payload: data.message, note: data.note })
    }
    catch (e) {
        const error = e.response && e.response.data.message ? e.response.data.message : e.response;
        dispatch({
            type: NOTE_UPDATE_FAIL,
            payload: error,
        });
    }
}

//Delete a note
export const deleteNote = (id) => async (dispatch, getState) => {
    dispatch({ type: NOTE_DELETE_START });
    try {
        const { userInfo } = getState().userState;
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(`/api/notes/${id}`, config);
        console.log(data)
        dispatch({ type: NOTE_DELETE_SUCCESS, payload: data.message })
    }
    catch (e) {
        const error = e.response && e.response.data.message ? e.response.data.message : e.response;
        dispatch({
            type: NOTE_DELETE_FAIL,
            payload: error,
        });
    }
}
