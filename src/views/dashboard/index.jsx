import React, { Component } from "react"
import { Row, Col } from "antd"
import "./index.less"
import PanelGroup from "./components/PanelGroup"
import LineChart from "./components/LineChart"
import BarChart from "./components/BarChart"
import RaddarChart from "./components/RaddarChart"
import PieChart from "./components/PieChart"
import TransactionTable from "./components/TransactionTable"
import BoxCard from "./components/BoxCard"

const lineChartData = {
  "New Visits": {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  },
  Messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
  },
  Purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
  },
  Shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
}
class Home extends Component {
  state = {
    lineChartData: lineChartData["New Visits"],
  }

  handleSetLineChartData = (type) => {
    this.setState({ lineChartData: lineChartData[type] })
  }
  render() {
    return (
      <div id="dashboard" className="app-container">
        {/* <a
          href="https://github.com/xl-wolf/xl-react-antd-template.git"
          target="_blank"
          rel="noopener noreferrer"
          className="github-corner"
        > </a> */}
        <PanelGroup handleSetLineChartData={this.handleSetLineChartData} />

        <LineChart
          chartData={this.state.lineChartData}
          styles={{
            padding: 12,
            backgroundColor: "#fff",
            marginBottom: "25px",
          }}
        />

        <Row gutter={32}>
          <Col xs={24} sm={24} lg={8}>
            <div className="chart-wrapper">
              <RaddarChart />
            </div>
          </Col>
          <Col xs={24} sm={24} lg={8}>
            <div className="chart-wrapper">
              <PieChart />
            </div>
          </Col>
          <Col xs={24} sm={24} lg={8}>
            <div className="chart-wrapper">
              <BarChart />
            </div>
          </Col>
        </Row>

        <Row gutter={8}>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={12}
            style={{ paddingRight: "8px", marginBottom: "30px" }}
          >
            <TransactionTable />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={12}
            style={{ marginBottom: "30px" }}
          >
            <BoxCard />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home
