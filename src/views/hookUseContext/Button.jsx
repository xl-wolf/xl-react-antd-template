import React, {
  useState,
  //  useEffect,
  useContext
} from 'react'
import { UPDATE_COLOR } from './redux/action-types'
import { store } from './redux/store'
import { Button } from "antd";
export default function (props) {
  let [btns, setBtns] = useState([{ id: 1, actionType: UPDATE_COLOR, color: 'orange', type: 'primary' }])
  let [addTimes, setAddTimes] = useState(1)

  const { dispatch } = useContext(store)

  function changeColor(actionType, color) {
    dispatch({ actionType, color })
  }

  function addBtn() {
    const btnArray = [
      { id: 1, actionType: UPDATE_COLOR, color: 'orange', type: 'primary' },
      { id: 2, actionType: UPDATE_COLOR, color: 'red', type: 'danger' },
      { id: 3, actionType: UPDATE_COLOR, color: 'cyan', type: 'plain' },
      { id: 4, actionType: UPDATE_COLOR, color: 'skyblue', type: 'ghost' }
    ]
    if (addTimes < btnArray.length) {
      btns.push(btnArray[addTimes])
      const btnArr = [...btns]
      setBtns(btnArr)
      setAddTimes(++addTimes)
    }
  }

  function minusBtn() {
    console.log(addTimes, btns)
    if (addTimes > 1) {
      btns.pop()
      const btnArr = [...btns]
      setBtns(btnArr)
      setAddTimes(--addTimes)
    }
  }

  return (
    <div>
      {btns.map((btn, index) => {
        return <Button
          key={btn.id}
          size={props.size}
          type={btn.type}
          style={{ marginLeft: index && '12px' }}
          onClick={() => changeColor(btn.actionType, btn.color)}
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