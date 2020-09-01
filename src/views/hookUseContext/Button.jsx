import React, {
  useState,
  //  useEffect,
  useContext
} from 'react'
import { UPDATE_COLOR } from './redux/action-types'
import { store } from './redux/store'
import { Button } from "antd";
export default function () {
  let [btns, setBtns] = useState([])
  let [addTimes, setAddTimes] = useState(0)

  const { dispatch } = useContext(store)

  function changeColor(type, color) {
    dispatch({ type, color })
  }

  function addBtn() {
    const btnArray = [
      { id: 1, type: UPDATE_COLOR, color: 'orange' },
      { id: 2, type: UPDATE_COLOR, color: 'red' },
      { id: 3, type: UPDATE_COLOR, color: 'cyan' }
    ]
    if (addTimes < 3) {
      btns.push(btnArray[addTimes])
      const btnArr = [...btns]
      setBtns(btnArr)
      setAddTimes(addTimes+1)
      console.log(addTimes, btns)
    }
  }

  function minusBtn() {
    if (addTimes > 0) {
      btns.pop()
      const btnArr = [...btns]
      setBtns(btnArr)
      setAddTimes(addTimes-1)
    }
  }
  
  return (
    <div>
      {btns.map((btn, index) => {
        return <Button
          key={btn.id}
          type="plain"
          style={{ marginLeft: index && '12px' }}
          onClick={() => changeColor(btn.type, btn.color)}
        >{btn.color}</Button>
      })}

      <div style={{ marginTop: '8px' }}>

        <Button
          type="primary"
          onClick={() => addBtn()}
        >add</Button>

        <Button
          type="primary"
          style={{ marginLeft: '12px' }}
          onClick={() => minusBtn()}
        >minus</Button>

      </div>
    </div>
  )

}