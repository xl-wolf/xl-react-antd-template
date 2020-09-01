import React from 'react'
import Button from './Button'
import ColorArea from './ColorArea'
import Color from './redux/index'

export default function () {
  return (
    <div className="app-container">
      <Color>
        <Button></Button>
        <ColorArea></ColorArea>
      </Color>
    </div>
  )
}