import React from "react";
import { Icon, Drawer } from "antd";
import "./index.less";

export default (props) => {
  return (
    <div className="app-container" id="tab-swiper-module">
      <div className="tabbar-area">
        <div className="swiper-bar">
          {props.tabListOpts.map((item) => {
            return (
              <div
                className={`tab-item ${item.active ? "active" : null}`}
                key={item.id}
                id={item.id}
                onClick={props.handleTabItemClick.bind(null, item)}
              >
                {item.label + item.id}
              </div>
            );
          })}
        </div>
        <div className="icon-show-all" onClick={props.handleIconClick}>
          <Icon type="unordered-list" />
        </div>
        <div className="sub-tab-list">
          {props.subListOpts.map((subitem) => {
            return (
              <div
                className={`sub-tab-item ${subitem.active ? "active" : null}`}
                key={subitem.id}
                onClick={props.handleSubItemClick.bind(null, subitem)}
              >
                {subitem.label}
              </div>
            );
          })}
        </div>
      </div>
      <Drawer
        title="请选择"
        placement={props.drawerPlacement}
        closable
        onClose={props.onClose}
        visible={props.drawerVisible}
        className="drawer-in-tab-swiper"
      >
        {props.tabListOpts.map((tab) => {
          return (
            <p
              key={tab.id}
              id={tab.id}
              title={tab.label + tab.id}
              onClick={props.handleTabItemClick.bind(null, tab)}
              className={`tab-item ${tab.active ? "active" : null}`}
            >
              {tab.label + tab.id}
            </p>
          );
        })}
      </Drawer>
    </div>
  );
};
