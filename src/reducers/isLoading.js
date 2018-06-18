import { handleActions } from 'redux-actions'

import {
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILURE,
  SUBMIT_REQUEST,
  SUBMIT_SUCCESS,
  SUBMIT_FAILURE,
} from '../actions/route'

// ------------------------------------
// Helper
// ------------------------------------
const replaceTrue = () => true
const replaceFalse = () => false

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = false

export default handleActions(
  {
    [TOKEN_REQUEST]: replaceTrue,
    [TOKEN_SUCCESS]: replaceFalse,
    [TOKEN_FAILURE]: replaceFalse,
    [SUBMIT_REQUEST]: replaceTrue,
    [SUBMIT_SUCCESS]: replaceFalse,
    [SUBMIT_FAILURE]: replaceFalse,
  },
  initialState
)
