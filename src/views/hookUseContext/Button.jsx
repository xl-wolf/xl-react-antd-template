import React, { useContext } from 'react'
import { UPDATE_COLOR } from './redux/action-types'
import { store } from './redux/store'
import { Button } from "antd";
export default function () {
  const { dispatch } = useContext(store)
  function changeColor(type, color) {
    dispatch({ type, color })
  }
  return (
    <div>
      <Button
        type="primary"
        onClick={() => changeColor(UPDATE_COLOR, "orange")}
      >Orange</Button>
      <Button
        type="plain"
        style={{ marginLeft: '12px' }}
        onClick={() => changeColor(UPDATE_COLOR, "red")}
      >Green</Button>
    </div>
  )

}