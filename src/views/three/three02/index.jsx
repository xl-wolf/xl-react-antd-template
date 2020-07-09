import React, { Component } from "react";
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Reflector } from 'three/examples/jsm/objects/Reflector.js'
import { setStateSync } from '@/utils/index'

class Three02 extends Component {
  state = {
    WIDTH: null,
    HEIGHT: null,
    VIEW_ANGLE: 45,
    NEAR: 1,
    FAR: 500,
    camera: null,
    scene: null,
    renderer: null,
    cameraControls: null,
    sphereGroup: null,
    smallSphere1: null,
    smallSphere2: null,
  }
  componentDidMount() {
    this.init()
  }
  async init() {
    const container = document.getElementById('three02-container')

    const WIDTH = container.clientWidth
    const HEIGHT = container.clientHeight
    await setStateSync(this, { WIDTH, HEIGHT, renderer: new THREE.WebGLRenderer({ antialias: true }) })
    // renderer
    this.state.renderer.setPixelRatio(window.devicePixelRatio)
    this.state.renderer.setSize(this.state.WIDTH, this.state.HEIGHT)
    container.appendChild(this.state.renderer.domElement)
    // scene
    // camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      this.state.VIEW_ANGLE,
      this.state.WIDTH / this.state.HEIGHT,
      this.state.NEAR,
      this.state.FAR
    )
    await setStateSync(this, { scene, camera })
    this.state.camera.position.set(0, 75, 160)
    const cameraControls = new OrbitControls(this.state.camera, this.state.renderer.domElement)
    await setStateSync(this, { cameraControls })
    this.state.cameraControls.target.set(0, 40, 0)
    this.state.cameraControls.maxDistance = 400
    this.state.cameraControls.minDistance = 10
    this.state.cameraControls.update()

    const planeGeo = new THREE.PlaneBufferGeometry(100.1, 100.1)
    // reflectors/mirrors
    const geometry1 = new THREE.CircleBufferGeometry(40, 64)
    const groundMirror = new Reflector(geometry1, {
      clipBias: 0.003,
      textureWidth: this.state.WIDTH * window.devicePixelRatio,
      textureHeight: this.state.HEIGHT * window.devicePixelRatio,
      color: 0x777777
    })
    groundMirror.position.y = 0.5
    groundMirror.rotateX(-Math.PI / 2)
    this.state.scene.add(groundMirror)

    const geometry2 = new THREE.PlaneBufferGeometry(100, 100)
    const verticalMirror = new Reflector(geometry2, {
      clipBias: 0.003,
      textureWidth: this.state.WIDTH * window.devicePixelRatio,
      textureHeight: this.state.HEIGHT * window.devicePixelRatio,
      color: 0x889999
    })
    verticalMirror.position.y = 50
    verticalMirror.position.z = -50
    this.state.scene.add(verticalMirror)

    const sphereGroup = new THREE.Object3D()
    await setStateSync(this,{ sphereGroup })
    this.state.scene.add(this.state.sphereGroup)

    const geometry3 = new THREE.CylinderBufferGeometry(
      0.1,
      15 * Math.cos((Math.PI / 180) * 30),
      0.1,
      24,
      1
    )
    const material1 = new THREE.MeshPhongMaterial({ color: 0x00ffff, emissive: 0x444444 })
    const sphereCap = new THREE.Mesh(geometry3, material1)
    sphereCap.position.y = -15 * Math.sin((Math.PI / 180) * 30) - 0.05
    sphereCap.rotateX(-Math.PI)

    const geometry4 = new THREE.SphereBufferGeometry(
      15,
      24,
      24,
      Math.PI / 2,
      Math.PI * 2,
      0,
      (Math.PI / 180) * 120
    )
    const halfSphere = new THREE.Mesh(geometry4, material1)
    halfSphere.add(sphereCap)
    halfSphere.rotateX((-Math.PI / 180) * 135)
    halfSphere.rotateZ((-Math.PI / 180) * 20)
    halfSphere.position.y = 7.5 + 15 * Math.sin((Math.PI / 180) * 30)

    this.state.sphereGroup.add(halfSphere)

    // 跳动的球体
    const geometry5 = new THREE.IcosahedronBufferGeometry(5, 0)
    const material2 = new THREE.MeshPhongMaterial({
      color: 0xff00ff,
      emissive: 0x333333,
      flatShading: true
    })
    const smallSphere1 = new THREE.Mesh(geometry5, material2)
    const smallSphere2 = new THREE.Mesh(geometry5, material2)
    await setStateSync(this,{ smallSphere1, smallSphere2 })
    this.state.scene.add(this.state.smallSphere1)
    // this.state.scene.add(this.state.smallSphere2)

    // walls
    const planeTop = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({ color: 0xff0000 }))
    planeTop.position.y = 100
    planeTop.rotateX(Math.PI / 2)
    this.state.scene.add(planeTop)

    const planeBottom = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({ color: 0xffffff }))
    planeBottom.rotateX(-Math.PI / 2)
    this.state.scene.add(planeBottom)

    const planeFront = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({ color: 0x7f7fff }))
    planeFront.position.z = 50
    planeFront.position.y = 50
    planeFront.rotateY(Math.PI)
    this.state.scene.add(planeFront)

    const planeRight = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({ color: 0x00ff00 }))
    planeRight.position.x = 50
    planeRight.position.y = 50
    planeRight.rotateY(-Math.PI / 2)
    this.state.scene.add(planeRight)

    const planeLeft = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({ color: 0x00ffff }))
    planeLeft.position.x = -50
    planeLeft.position.y = 50
    planeLeft.rotateY(Math.PI / 2)
    this.state.scene.add(planeLeft)

    // lights
    const mainLight = new THREE.PointLight(0xcccccc, 1.5, 250)
    mainLight.position.y = 60
    this.state.scene.add(mainLight)

    const greenLight = new THREE.PointLight(0x00ff00, 0.25, 1000)
    greenLight.position.set(550, 50, 0)
    this.state.scene.add(greenLight)

    const redLight = new THREE.PointLight(0xff0000, 0.25, 1000)
    redLight.position.set(-550, 50, 0)
    this.state.scene.add(redLight)

    const blueLight = new THREE.PointLight(0x7f7fff, 0.25, 1000)
    blueLight.position.set(0, 50, 550)
    this.state.scene.add(blueLight)
    
    this.animate()
  }

  animate = async () => {
    requestAnimationFrame(this.animate)
    const timer = Date.now() * 0.01
    const sphereGroup = this.state.sphereGroup
    sphereGroup.rotation.y -= 0.002
    await setStateSync(this,{sphereGroup})
    this.state.smallSphere1.position.set(
      Math.cos(timer * 0.1) * 36,
      Math.abs(Math.cos(timer * 0.2)) * 20 + 5,
      Math.sin(timer * 0.1) * 36
    )

    const smallSphere1 = this.state.smallSphere1
    smallSphere1.rotation.y -= Math.PI / 2 - timer * 0.1
    smallSphere1.rotation.z = timer * 0.8
    await setStateSync(this,{sphereGroup})

    this.state.smallSphere2.position.set(
      Math.cos(timer * 0.1) * 20,
      Math.abs(Math.cos(timer * 0.2)) * 20 + 5,
      Math.sin(timer * 0.1) * 20
    )

    const smallSphere2 = this.state.smallSphere2
    smallSphere2.rotation.y = Math.PI / 2 - timer * 0.2
    smallSphere2.rotation.z = timer * 0.8
    await setStateSync(this,{smallSphere2})

    this.state.renderer.render(this.state.scene, this.state.camera)
  }
  render() {
    return (
      <div className="app-container">
        <div id="three02-container" style={{ height: '600px' }}></div>
      </div>
    )
  }
}

export default Three02