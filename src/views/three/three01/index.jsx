import React, { Component } from "react";
import * as Three from 'three'
import { setStateSync } from '@/utils/index'

class Three01 extends Component {
  state = {
    camera: null,
    scene: null,
    renderer: null,
    mesh: null,
    WIDTH: null,
    HEIGHT: null
  }
  async componentDidMount() {
    this.init()
    window.onresize = () => {
      this.onWindowResize()
    }
  }
  async init() {
    const container = document.getElementById('three01-container')
    const camera = new Three.PerspectiveCamera(
      70,
      container.clientWidth / container.clientHeight,
      0.01,
      10
    )
    camera.position.z = 0.6
    await setStateSync(this, { camera })
    await setStateSync(this, { scene: new Three.Scene() })
    const geometry = new Three.BoxGeometry(0.2, 0.2, 0.2)
    const material = new Three.MeshNormalMaterial()
    await setStateSync(this, { mesh: new Three.Mesh(geometry, material) })
    this.state.scene.add(this.state.mesh)
    await setStateSync(this, { renderer: new Three.WebGLRenderer({ antialias: true }) })
    this.state.renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(this.state.renderer.domElement)
    this.animate()
  }
  animate = async () => {
    requestAnimationFrame(this.animate)
    let dataMesh = this.state.mesh
    dataMesh.rotation.x += 0.01
    dataMesh.rotation.y += 0.02
    await setStateSync(this, { mesh: dataMesh })
    this.state.renderer.render(this.state.scene, this.state.camera)
  }
  onWindowResize() {
    const VRcontainer = document.getElementById('three01-container')
    // 加if判断防止事件监听在离开本页面后因获取不到VRcontainer而报错
    if (VRcontainer) {
      this.setState({ WIDTH: VRcontainer.clientWidth, HEIGHT: VRcontainer.clientHeight })
      this.state.renderer.setSize(this.state.WIDTH, this.state.HEIGHT)
    }
  }
  render() {
    return (
      <div className="app-container">
        <div id="three01-container" style={{ height: '600px' }}></div>
      </div>
    )
  }
}

export default Three01