import { NOTE_CREATE_FAIL, NOTE_CREATE_START, NOTE_CREATE_SUCCESS, NOTE_DELETE_FAIL, NOTE_DELETE_START, NOTE_DELETE_SUCCESS, NOTE_LIST_FAIL, NOTE_LIST_START, NOTE_LIST_SUCCESS, NOTE_UPDATE_FAIL, NOTE_UPDATE_START, NOTE_UPDATE_SUCCESS } from "../actions/actionTypes"

const initialNoteState = {
    notes: [],
    loading: false,
    error: null,
    success: null
}

const noteReducer = (state = initialNoteState, action) => {
    switch (action.type) {
        case NOTE_LIST_START: {
            return {
                ...state,
                loading: true
            }
        }
        case NOTE_LIST_SUCCESS: {
            return {
                ...state,
                notes: action.payload,
                loading: false
            }
        }
        case NOTE_LIST_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: null,
                //If no notes were returned by API
                notes: action.payload === 'Notes not found ...' ? [] : state.notes
            }
        }
        case NOTE_CREATE_START: {
            return {
                ...state,
                loading: true,
            }
        }
        case NOTE_CREATE_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: action.payload,
                error: null
            }
        }
        case NOTE_CREATE_FAIL: {
            return {
                ...state,
                loading: false,
                success: null,
                error: action.payload
            }
        }
        case NOTE_UPDATE_START: {
            return {
                ...state,
                loading: true,
            }
        }
        case NOTE_UPDATE_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: action.payload,
                error: null
            }
        }
        case NOTE_UPDATE_FAIL: {
            return {
                ...state,
                loading: false,
                success: null,
                error: action.payload
            }
        }
        case NOTE_DELETE_START: {
            return {
                ...state,
                loading: true,
            }
        }
        case NOTE_DELETE_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: action.payload,
                error: null
            }
        }
        case NOTE_DELETE_FAIL: {
            return {
                ...state,
                loading: false,
                success: null,
                error: action.payload
            }
        }
        default: return state;
    }
}

export default noteReducer;