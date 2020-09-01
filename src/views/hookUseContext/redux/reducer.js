import { UPDATE_COLOR } from './action-types'
export default (state, action) => {
  switch (action.type) {
    case UPDATE_COLOR:
      return action.color;
    default:
      return state
  }
}