import React, { useContext } from 'react'
import { store } from './redux/store'
export default function () {
  const { color } = useContext(store)
  return (
    <div style={{color:color}}>
      我是{color}
    </div>
  )

}