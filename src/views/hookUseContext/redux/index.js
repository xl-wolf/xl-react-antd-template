import React, { useReducer } from 'react'
import reducer from './reducer'
import { store } from './store'
export default function (props) {
  const [color, dispatch] = useReducer(reducer, 'orange')
  const { Provider } = store
  return (
    <Provider value={{ color, dispatch }}>
      {props.children}
    </Provider>
  );
}