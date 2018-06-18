import { createAction } from 'redux-actions'

import { API_BASE_PATH } from '../constants/api'

const PREFIX = '#ROUTE/'

// ------------------------------------
// Constants
// ------------------------------------
export const TOKEN_REQUEST = `${PREFIX}TOKEN_REQUEST`
export const TOKEN_SUCCESS = `${PREFIX}TOKEN_SUCCESS`
export const TOKEN_FAILURE = `${PREFIX}TOKEN_FAILURE`
export const SUBMIT_REQUEST = `${PREFIX}SUBMIT_REQUEST`
export const SUBMIT_SUCCESS = `${PREFIX}SUBMIT_SUCCESS`
export const SUBMIT_FAILURE = `${PREFIX}SUBMIT_FAILURE`

// ------------------------------------
// Actions
// ------------------------------------
const _token = {
  request: createAction(TOKEN_REQUEST),
  success: createAction(TOKEN_SUCCESS),
  failure: createAction(TOKEN_FAILURE),
}

const _submit = {
  request: createAction(SUBMIT_REQUEST),
  success: createAction(SUBMIT_SUCCESS),
  failure: createAction(SUBMIT_FAILURE),
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */

// ------------------------------------
// Actions (Thunks)
// ------------------------------------
export const getRoute = token => async dispatch => {
  dispatch(_token.request(token))
  try {
    const response = await fetch(`${API_BASE_PATH}route/${token}`)
    const data = await response.json()
    dispatch(_token.success(data))
    return data
  } catch (error) {
    dispatch(_token.failure(error))
    throw error
  }
}

export const submitRoute = routeList => async dispatch => {
  dispatch(_submit.request(routeList))
  try {
    const response = await fetch(`${API_BASE_PATH}route`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(routeList),
    })
    const data = await response.json()
    dispatch(_submit.success(data))
    return data
  } catch (error) {
    dispatch(_submit.failure(error))
    throw error
  }
}
