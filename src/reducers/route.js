import { handleActions } from 'redux-actions'

import { TOKEN_REQUEST, TOKEN_SUCCESS, TOKEN_FAILURE } from '../actions/route'

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}

export default handleActions(
  {
    [TOKEN_REQUEST]: (state, { payload }) => {
      return {
        ...state,
        [payload]: {
          ...state[payload],
          status: 'loading',
        },
      }
    },
    [TOKEN_SUCCESS]: (state, { payload }) => {
      const { token, ...data } = payload
      return { ...state, [token]: data }
    },
    [TOKEN_FAILURE]: (state, { payload }) => {
      const { token } = payload
      return {
        ...state,
        [token]: {
          status: 'failure',
          error: 'Server Error',
        },
      }
    },
  },
  initialState
)
