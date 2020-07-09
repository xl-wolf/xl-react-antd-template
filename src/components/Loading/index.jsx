import React, { Component } from "react"
import { Spin } from "antd"
import NProgress from "nprogress" // progress bar
import "nprogress/nprogress.css" // progress bar style

NProgress.configure({ showSpinner: false, easing: 'ease', speed: 500, color: '#1DA57A' })// NProgress Configuration

class Loading extends Component {
  componentDidMount() {
    NProgress.start()
  }
  componentWillUnmount() {
    NProgress.done()
  }
  render() {
    return (
      <div className="app-container">
        <Spin />
      </div>
    )
  }
}

export default Loading
