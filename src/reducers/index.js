import { combineReducers } from 'redux'
import isLoading from './isLoading'
import route from './route'

export default combineReducers({
  isLoading,
  route,
})
