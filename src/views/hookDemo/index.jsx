import React, { useState } from 'react';
import { Button } from "antd";
export default function Example() {
  // 声明一个叫 "count" 的 state 变量
  let [count, setCount] = useState(0);

  return (
    <div className="app-container">
      <p>You clicked {count} times</p>
      <Button
        type="primary"
        onClick={() =>{ setCount(++count)}}
      >Click me</Button>
    </div>
  );
}