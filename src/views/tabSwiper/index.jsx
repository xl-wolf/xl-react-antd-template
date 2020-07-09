import React, { Component } from "react";
import TabSwiperUI from "./tabSwiperUI";
import { setStateSync } from "@/utils/index";
import { tabListOpts, subListOpts } from "./dataSouce";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state.tabListOpts = [...tabListOpts];
    this.state.subListOpts = [...subListOpts];
  }
  state = {
    tabListOpts: null,
    subListOpts: null,
    drawerVisible: false,
    drawerPlacement: "right",
  };
  handleTabItemClick = async (item) => {
    // 点击抽屉某一项，页面对应的tab跟随切换到视野内scrollIntoView()
    document.getElementById(item.id).scrollIntoView({ behavior: "smooth" });
    const subListOpts = [...item.subListOpts];
    await setStateSync(this, subListOpts);
    this.activeTabClass(item);
    this.subTabChange(item);
  };
  // 导航条动态类切换
  activeTabClass(item) {
    const tabListOpts = [...this.state.tabListOpts];
    tabListOpts.forEach((tab) => {
      tab.active = false;
    });
    item.active = true;
    this.setState({ tabListOpts });
  }
  // 一级菜单变化二级菜单跟着变化
  subTabChange(item) {
    const subListOpts = [...this.state.subListOpts];
    subListOpts.forEach((subtab) => {
      subtab.active = false;
      subtab.label = item.label + item.id + "subItem";
    });
    subListOpts[0].active = true;
    this.setState({ subListOpts });
  }
  handleSubItemClick = (subitem) => {
    this.activeSubTabClass(subitem);
  };
  // 二级菜单动态类切换
  activeSubTabClass(subitem) {
    const subListOpts = [...this.state.subListOpts];
    subListOpts.forEach((subtab) => {
      subtab.active = false;
    });
    subitem.active = true;
    this.setState({ subListOpts });
  }
  handleIconClick = () => {
    this.setState({ drawerVisible: true });
  };
  onClose = () => {
    this.setState({ drawerVisible: false });
  };
  render() {
    return (
      <TabSwiperUI
        tabListOpts={this.state.tabListOpts}
        subListOpts={this.state.subListOpts}
        drawerVisible={this.state.drawerVisible}
        drawerPlacement={this.state.drawerPlacement}
        handleTabItemClick={this.handleTabItemClick}
        handleIconClick={this.handleIconClick}
        handleSubItemClick={this.handleSubItemClick}
        onClose={this.onClose}
      />
    );
  }
}
