import React, { Component } from "react";
import ReactDOM from 'react-dom'
let parentProxy = null
export default class Parent extends Component {
  constructor(props){
    super(props)
    console.log('parent constructor()')
    parentProxy = this
  }
  componentWillMount(){
    console.log("parent componentWillMount()")
  }
  render() {
    console.log("parent render()")
    return (
      <div className="app-container">
        <Child ref="child" />
      </div>
    );
  }
  componentDidMount(){
    console.log("parent componentDidMount()")
    console.log(this.refs.child.refs.test)
    console.log(this.refs.child)
    console.log("parent componentDidMount()")
  }

  componentWillReceiveProps(){
    console.log('parent componentDidMount()')
  }

}

class Child extends Component {
  constructor(){
    super()
    console.log('child constructor()')
  }
  componentWillMount(){
    console.log("child componentWillMount()")
  }
  render() {
    console.log("child render()")
    return (
      <div ref="test">
        <span ref={(el) => (this.el = el)}>更新</span>
      </div>
    );
  }
  componentDidMount(){
    console.log("child componentDidMount()")
    console.log(ReactDOM.findDOMNode(this.el))
  }

  componentWillReceiveProps(){
    console.log('child componentDidMount()')
  }
  
  update(){
    console.log(this===parentProxy.refs.child)
  }
}
