import React, { Component } from "react";
import { connect } from "react-redux";
import * as THREE from "three";
import {
  RollerCoasterGeometry,
  RollerCoasterShadowGeometry,
  RollerCoasterLiftersGeometry,
  TreesGeometry,
  SkyGeometry,
} from "three/examples/jsm/misc/RollerCoaster.js";
// import { VRButton } from 'three/examples/jsm/webxr/VRButton.js'
import { setStateSync } from "@/utils/index";

class VR extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  state = {
    renderer: null,
    scene: null,
    camera: null,
    train: null,
    prevTime: null,
    velocity: null,
    position: null,
    tangent: null,
    lookAt: null,
    progress: null,
    funfairs: [],
    curve: null,
    WIDTH: null,
    HEIGHT: null,
  };
  componentDidMount() {
    this.init();
  }
  async init() {
    const VRcontainer = document.getElementById("vr-container");
    const WIDTH = VRcontainer.clientWidth;
    const HEIGHT = VRcontainer.clientHeight;
    await setStateSync(this, { WIDTH, HEIGHT });
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(this.state.WIDTH, this.state.HEIGHT);
    renderer.xr.enabled = true;
    renderer.xr.setReferenceSpaceType("local");
    await setStateSync(this, { renderer });
    VRcontainer.appendChild(this.state.renderer.domElement);

    // VRcontainer.appendChild(VRButton.createButton(this.state.renderer))

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0ff);
    await setStateSync(this, { scene });

    const light = new THREE.HemisphereLight(0xfff0f0, 0x606066);
    light.position.set(1, 1, 1);
    this.state.scene.add(light);

    const train = new THREE.Object3D();
    await setStateSync(this, { train });
    this.state.scene.add(this.state.train);

    const camera = new THREE.PerspectiveCamera(
      50,
      this.state.WIDTH / this.state.HEIGHT,
      0.1,
      500
    );
    await setStateSync(this, { camera });
    this.state.train.add(this.state.camera);

    // environment

    const geometry1 = new THREE.PlaneBufferGeometry(500, 500, 15, 15);
    geometry1.rotateX(-Math.PI / 2);

    const positions = geometry1.attributes.position.array;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < positions.length; i += 3) {
      vertex.fromArray(positions, i);

      vertex.x += Math.random() * 10 - 5;
      vertex.z += Math.random() * 10 - 5;

      const distance = vertex.distanceTo(this.state.scene.position) / 5 - 25;
      vertex.y = Math.random() * Math.max(0, distance);

      vertex.toArray(positions, i);
    }

    geometry1.computeVertexNormals();

    const material1 = new THREE.MeshLambertMaterial({
      color: 0x407000,
    });

    const mesh1 = new THREE.Mesh(geometry1, material1);
    this.state.scene.add(mesh1);

    const geometry2 = new TreesGeometry(mesh1);
    const material2 = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      vertexColors: true,
    });
    const mesh2 = new THREE.Mesh(geometry2, material2);
    this.state.scene.add(mesh2);

    const geometry3 = new SkyGeometry();
    const material3 = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const mesh3 = new THREE.Mesh(geometry3, material3);
    this.state.scene.add(mesh3);

    const PI2 = Math.PI * 2;

    const curve = (function () {
      const vector = new THREE.Vector3();
      const vector2 = new THREE.Vector3();

      return {
        getPointAt: function (t) {
          t = t * PI2;

          const x = Math.sin(t * 3) * Math.cos(t * 4) * 50;
          const y = Math.sin(t * 10) * 2 + Math.cos(t * 17) * 2 + 5;
          const z = Math.sin(t) * Math.sin(t * 4) * 50;

          return vector.set(x, y, z).multiplyScalar(2);
        },

        getTangentAt: function (t) {
          const delta = 0.0001;
          const t1 = Math.max(0, t - delta);
          const t2 = Math.min(1, t + delta);

          return vector2
            .copy(this.getPointAt(t2))
            .sub(this.getPointAt(t1))
            .normalize();
        },
      };
    })();

    await setStateSync(this, { curve });

    const geometry4 = new RollerCoasterGeometry(this.state.curve, 1500);
    const material4 = new THREE.MeshPhongMaterial({
      vertexColors: true,
    });
    const mesh4 = new THREE.Mesh(geometry4, material4);
    this.state.scene.add(mesh4);

    const geometry5 = new RollerCoasterLiftersGeometry(this.state.curve, 100);
    const material5 = new THREE.MeshPhongMaterial();
    const mesh5 = new THREE.Mesh(geometry5, material5);
    mesh5.position.y = 0.1;
    this.state.scene.add(mesh5);

    const geometry6 = new RollerCoasterShadowGeometry(this.state.curve, 500);
    const material6 = new THREE.MeshBasicMaterial({
      color: 0x305000,
      depthWrite: false,
      transparent: true,
    });
    const mesh6 = new THREE.Mesh(geometry6, material6);
    mesh6.position.y = 0.1;
    this.state.scene.add(mesh6);

    const geometry7 = new THREE.CylinderBufferGeometry(10, 10, 5, 15);
    const material7 = new THREE.MeshLambertMaterial({
      color: 0xff8080,
    });
    const mesh7 = new THREE.Mesh(geometry7, material7);
    mesh7.position.set(-80, 10, -70);
    mesh7.rotation.x = Math.PI / 2;
    this.state.scene.add(mesh7);

    let funfairs = [];

    funfairs.push(mesh7);

    const geometry8 = new THREE.CylinderBufferGeometry(5, 6, 4, 10);
    const material8 = new THREE.MeshLambertMaterial({
      color: 0x8080ff,
    });
    const mesh8 = new THREE.Mesh(geometry8, material8);
    mesh8.position.set(50, 2, 30);
    this.state.scene.add(mesh8);

    funfairs.push(mesh8);
    await setStateSync(this, { funfairs });
    window.addEventListener("resize", this.onWindowResize, false);

    const position = new THREE.Vector3();
    const tangent = new THREE.Vector3();
    const lookAt = new THREE.Vector3();

    const velocity = 0;
    const progress = 0;
    const prevTime = performance.now();
    await setStateSync(this, {
      position,
      tangent,
      lookAt,
      velocity,
      prevTime,
      progress,
    });
    this.state.renderer.setAnimationLoop(this.renderVR);
  }
  renderVR = async () => {
    const time = performance.now();
    const delta = time - this.state.prevTime;
    for (let i = 0; i < this.state.funfairs.length; i++) {
      const funfair = this.state.funfairs[i];
      funfair.rotation.y = time * 0.0004;
      await setStateSync(this, { funfairs: this.state.funfairs });
    }

    let progress = this.state.progress;
    progress += this.state.velocity;
    progress = progress % 1;
    await setStateSync(this, { progress });

    this.state.position.copy(this.state.curve.getPointAt(this.state.progress));
    let position = this.state.position;
    position.y += 0.3;
    await setStateSync(this, { position });
    this.state.train.position.copy(this.state.position);
    this.state.tangent.copy(this.state.curve.getTangentAt(this.state.progress));

    let velocity = this.state.velocity;
    velocity -= this.state.tangent.y * 0.0000001 * delta;
    velocity = Math.max(0.00004, Math.min(0.0002, velocity));
    await setStateSync(this, { velocity });

    this.state.train.lookAt(
      this.state.lookAt.copy(this.state.position).sub(this.state.tangent)
    );
    this.state.renderer.render(this.state.scene, this.state.camera);

    const prevTime = time;
    await setStateSync(this, { prevTime });
  };

  onWindowResize = async () => {
    const VRcontainer = document.getElementById("vr-container");
    // 加if判断防止事件监听在离开本页面后因获取不到VRcontainer而报错
    if (VRcontainer) {
      await setStateSync(this, {
        WIDTH: VRcontainer.clientWidth,
        HEIGHT: VRcontainer.clientHeight,
      });
      const camera = this.state.camera;
      camera.aspect = this.state.WIDTH / this.state.HEIGHT;
      await setStateSync(this, { camera });
      this.state.camera.updateProjectionMatrix();
      this.state.renderer.setSize(this.state.WIDTH, this.state.HEIGHT);
    }
  };

  render() {
    return (
      <div className="app-container">
        <div id="vr-container" style={{ height: "600px" }}></div>
      </div>
    );
  }
}

export default connect((state) => state)(VR);
