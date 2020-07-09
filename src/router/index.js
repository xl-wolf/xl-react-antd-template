import React from "react"
// HashRouter和BrowserRouter区别：HashRouter的url中带有# BrowserRouter的url中不带有#
import { HashRouter, Route, Switch, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { getUserInfo } from "@/store/actions"
import App from "@/App"
import Layout from "@/views/layout"
import Login from "@/views/login"
class Router extends React.Component {
  render() {
    const { token, role, getUserInfo } = this.props
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route
              path="/"
              render={() => {
                if (!token) {
                  return <Redirect to="/login" />
                } else {
                  if (role) {
                    return <Layout />
                  } else {
                    getUserInfo(token).then(() => <Layout />)
                  }
                }
              }}
            />
          </Switch>
        </App>
      </HashRouter>
    )
  }
}

export default connect((state) => state.user, { getUserInfo })(Router)
