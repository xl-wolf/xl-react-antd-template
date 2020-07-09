import React, { Component } from "react"
import { connect } from "react-redux"
import asyncAMapLoader from '@/utils/AsyncAMapLoader'
import {
  // style1, 
  style2,
  //  style3
} from './mapStyles'
import './index.less'

class Amap extends Component {
  constructor(props){
    super(props)
    console.log(this.props)
  }
  state = {
    mapRef: null, //地图引用
    currentPosition: [118.10388605, 24.48923061], //地图中心点
    currentMarkersArray: [], //当前地图上除定位点外的所有点
    circle: null//当前地图上的圆对象
  }

  componentDidMount() {
    asyncAMapLoader().then(res => {
      console.log(res)
      this.initMap()
    })
  }

  async initMap() {
    const vm = this
    // 实例化一个高德地图并取得引用
    /*global AMap*/
    vm.state.mapRef = new AMap.Map('amap-container', {
      resizeEnable: true,
      zoom: 12,
      center: vm.state.currentPosition,
      pitch: 45, // 地图俯仰角度，有效范围 0 度- 83 度
      viewMode: '3D', // 地图模式
      mapStyle: style2 //自定义地图样式，需要线上定制发布后使用
    })
    // 浏览器获取当前定位
    // const cur = await vm.getCurrentPosition()
    // console.log(cur)

    // 添加点标记
    const icon = new AMap.Icon({
      size: new AMap.Size(48, 48),
      image: require('./images/red.png'), //自定义icon
      imageSize: new AMap.Size(48, 48),
      imageOffset: new AMap.Pixel(0, 0)
    })
    const mk = vm.addAMapMarker(icon, vm.state.currentPosition, true)
    
    // 画圆
    const circleOpt = {
      map: vm.state.mapRef,
      center: vm.state.currentPosition,
      radius: 5000,
      strokeColor: '#0ff',
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: '#f2f',
      fillOpacity: 0.7,
      strokeStyle: 'dashed'
    }
    vm.drawCircle(circleOpt)

    mk.on('click', function (e) {
      const position = e.lnglat
      console.log(this, position, e)
      const contentInfo = `拖动当前点获取商机点信息`
      const content = `<div>${contentInfo}</div>`
      const infoWindowOpts = {
        // isCustom: true, //使用自定义窗体
        content: content,
        offset: new AMap.Pixel(0, -4)
      }
      const infoWinRef = vm.addAMapInfoWindow(infoWindowOpts)
      infoWinRef.open(vm.state.mapRef, position)
    })
    mk.on('dragend', function (e) {
      // console.log(e)
      // 移除信息窗口
      vm.removeAMapInfoWindow()
      // 对当前地图定位点重新赋值
      vm.setState({ currentPosition: [e['lnglat'].lng, e['lnglat'].lat] })
      // 移动定位点至当前地图中心
      vm.state.mapRef.panTo(vm.state.currentPosition)
      // 移除地图上除定位点外的其他点
      vm.removeAMapMarker(vm.state.currentMarkersArray)
      // 随机添加10个点标记
      vm.generateNearBy10Markers()
      // 移除圆
      vm.removeCircle()
      // 画圆
      const circleOpt = {
        map: vm.state.mapRef,
        center: vm.state.currentPosition,
        radius: 7000,
        strokeColor: '#0ff',
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: '#f2f',
        fillOpacity: 0.7,
        strokeStyle: 'dashed'
      }
      vm.drawCircle(circleOpt)
    })
    // 随机添加10个点标记
    vm.generateNearBy10Markers()
    // 添加点聚合
    // vm.addAMapMarkerClusterer()
    // 添加旋转、倾斜、复位、缩放在内的地图控件
    vm.addAMapCtrl()
  }
  // 添加点聚合
  addAMapMarkerClusterer() {
    let markers = [],
      mk = null
    for (let i = 0; i < 2000; i += 1) {
      const icon = new AMap.Icon({
        size: new AMap.Size(20, 20),
        image: require('./images/blue.png'), //自定义icon
        imageSize: new AMap.Size(20, 20),
        imageOffset: new AMap.Pixel(0, 0)
      })
      const position = [
        this.state.currentPosition[0] + (Math.random() - 0.5) * 0.08,
        this.state.currentPosition[1] + (Math.random() - 0.5) * 0.08
      ]
      mk = this.addAMapMarker(icon, position)
      markers.push(mk)
    }
    // es6 module 规范引入
    import('./clustererStylesES6').then(clustererStylesES6 => {
      const styles = clustererStylesES6.default
      new AMap.MarkerClusterer(this.state.mapRef, markers, { gridSize: 80, styles })
    })
    // commonjs规范引入
    // const styles = require('./clustererStylesCommonJS')
    // new AMap.MarkerClusterer(this.state.mapRef, markers, { gridSize: 80, styles })
  }
  // 浏览器获取当前定位
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 20000, //超过10秒后停止定位，默认：5s
        buttonPosition: 'RB', //定位按钮的停靠位置
        markerOptions: {
          //自定义定位点样式，同Marker的Options
          offset: new AMap.Pixel(-18, -36),
          content:
            '<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>'
        },
        buttonOffset: new AMap.Pixel(10, 10), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
      })
      this.state.mapRef.addControl(geolocation)
      geolocation.getCurrentPosition(function(status, result) {
        if (status === 'complete') {
          console.log(result, 'success')
          resolve(result, 'success')
        } else {
          console.log(result, 'fail')
          reject(result, 'fail')
        }
      })
    })
  }
  // 添加旋转、倾斜、复位、缩放在内的地图控件
  addAMapCtrl() {
    const CtrlBarOpt = {
      position: { top: '10px', right: '10px' }
    }
    const controlBar = new AMap.ControlBar(CtrlBarOpt)
    this.state.mapRef.addControl(controlBar)
  }
  // 随机生成当前位置旁边的10个点标记-->后期的ajax请求
  generateNearBy10Markers() {
    const vm = this
    for (let i = 0; i < 10; i++) {
      const icon = new AMap.Icon({
        size: new AMap.Size(20, 20),
        image: require('./images/blue.png'), //自定义icon
        imageSize: new AMap.Size(20, 20),
        imageOffset: new AMap.Pixel(0, 0)
      })
      const position = [
        vm.state.currentPosition[0] + (Math.random() - 0.5) * 0.08,
        vm.state.currentPosition[1] + (Math.random() - 0.5) * 0.08
      ]
      const marker = vm.addAMapMarker(icon, position)
      marker.dataId = i + 'dataId'
      vm.state.currentMarkersArray.push(marker)
      marker.on('click', function () {
        const { position } = this.B
        // console.log(this, position)
        this.contentInfo = `建行厦门科技支行${this.dataId}`
        const content = `<div style='cursor:pointer;' id=${this.dataId} onclick=${vm.infoWindowClick}>${this.contentInfo}</div>`
        const infoWindowOpts = {
          // isCustom: true, //使用自定义窗体
          content: content,
          offset: new AMap.Pixel(0, -24)
        }
        const infoWinRef = vm.addAMapInfoWindow(infoWindowOpts)
        infoWinRef.on('open', () => {
          // 需要等到 infoWinRef.open 方法执行后地图上已经存在该dom才可获取 否则获取不到报错 所以才需要异步操作
          setTimeout(() => {
            document.getElementById(this.dataId).addEventListener('click', () => {
              console.log('this.dataId', this.dataId, this)
            })
          }, 500)
        })
        infoWinRef.open(vm.state.mapRef, position)
      })
    }
  }
  // 添加点标记
  addAMapMarker(icon, position = this.state.currentPosition, draggable = false) {
    const marker = new AMap.Marker({
      position,
      map: this.state.mapRef,
      animation: 'AMAP_ANIMATION_DROP',
      icon: icon,
      draggable
    })
    this.state.mapRef.add(marker)
    return marker
  }
  // 移除指定点标记
  removeAMapMarker(mk) {
    this.state.mapRef.remove(mk)
  }
  // 画圆
  drawCircle(circleOpt) {
    const circle = new AMap.Circle(circleOpt)
    this.setState({ circle })
  }
  // 移除圆
  removeCircle() {
    this.state.circle && this.state.circle.setMap(null)
  }
  // 添加信息窗口
  addAMapInfoWindow(infoWindowOpts) {
    const infoWindow = new AMap.InfoWindow(infoWindowOpts)
    return infoWindow
  }
  // 移除信息窗口
  removeAMapInfoWindow() {
    this.state.mapRef.clearInfoWindow()
  }
  // 返回地图中心点（当前定位点）
  backToMapCenter = () => {
    const vm = this
    vm.state.mapRef.panTo(vm.state.currentPosition)
  }
  render() {
    return (
      <div className="app-container" style={{ position: 'relative' }}>
        <div id="amap-container"></div>
        <div title="点击聚焦当前点" className="backCenter-AMap" onClick={this.backToMapCenter} />
      </div>
    )
  }
}

export default connect((state) => state.settings)(Amap)