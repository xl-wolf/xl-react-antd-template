import { UPDATE_COLOR } from './action-types'
export default (state, action) => {
  switch (action.actionType) {
    case UPDATE_COLOR:
      return action.color;
    default:
      return state
  }
}