/**
 * icon:菜单项图标
 * roles:标明当前菜单项在何种角色下可以显示，如果不写此选项，表示该菜单项完全公开，在任何角色下都显示
 */
export default [
  {
    title: "首页",
    path: "/dashboard",
    icon: "home",
    roles: ["admin", "editor", "guest"]
  },
  {
    title: "引导页",
    path: "/guide",
    icon: "key",
    roles: ["admin", "editor"]
  },
  {
    title: "高德地图",
    path: "/amap",
    icon: null,
    iconBeyondAntd: 'icon-gaodeditu',
    roles: ["admin", "editor", "guest"]
  },
  {
    title: "百度地图",
    path: "/bmap",
    icon: null,
    iconBeyondAntd: 'icon-baidudituqibiaodianjishijian',
    roles: ["admin", "editor", "guest"]
  },
  {
    title: "3D",
    path: "/three",
    icon: null,
    iconBeyondAntd: 'icon-D',
    roles: ["admin", "editor", "guest"],
    children: [
      {
        title: "three01",
        path: "/three/three01",
        icon: null,
        iconBeyondAntd: 'icon-D1',
        roles: ["admin", "editor", "guest"],
      },
      {
        title: "three02",
        path: "/three/three02",
        icon: null,
        iconBeyondAntd: 'icon-3d',
        roles: ["admin", "editor", "guest"],
      },
      {
        title: "VR",
        path: "/three/VR",
        icon: null,
        iconBeyondAntd: 'icon-vr',
        roles: ["admin", "editor", "guest"],
      }
    ],
  },
  {
    title: "权限测试",
    path: "/permission",
    icon: "lock",
    children: [
      {
        title: "权限说明",
        path: "/permission/explanation",
        roles: ["admin"]
      },
      {
        title: "admin页面",
        path: "/permission/adminPage",
        roles: ["admin"]
      },
      {
        title: "guest页面",
        path: "/permission/guestPage",
        roles: ["guest"]
      },
      {
        title: "editor页面",
        path: "/permission/editorPage",
        roles: ["editor"]
      },
    ],
  },
  {
    title: "组件",
    path: "/components",
    icon: "appstore",
    roles: ["admin", "editor"],
    children: [
      {
        title: "富文本",
        path: "/components/richTextEditor",
        roles: ["admin", "editor"],
      },
      {
        title: "Markdown",
        path: "/components/Markdown",
        roles: ["admin", "editor"],
      }
    ],
  },
  {
    title: "图表",
    path: "/charts",
    icon: "area-chart",
    roles: ["admin", "editor"],
    children: [
      {
        title: "键盘图表",
        icon: null,
        iconBeyondAntd: 'icon-gangqin',
        path: "/charts/keyboard",
        roles: ["admin", "editor"],
      },
      {
        title: "折线图",
        icon: null,
        iconBeyondAntd: 'icon-zhexiantu',
        path: "/charts/line",
        roles: ["admin", "editor"],
      },
      {
        title: "混合图表",
        icon: null,
        iconBeyondAntd: 'icon-hunhe',
        path: "/charts/mix-chart",
        roles: ["admin", "editor"],
      },
      {
        title: "echarts--地图",
        icon: null,
        iconBeyondAntd: 'icon-ditumap29',
        path: "/charts/echartsMap",
        roles: ["admin", "editor"],
      }
    ],
  },
  {
    title: "表格",
    path: "/table",
    icon: "table",
    roles: ["admin", "editor"]
  },
  {
    title: "Excel",
    path: "/excel",
    icon: "file-excel",
    roles: ["admin", "editor"],
    children: [
      {
        title: "导出Excel",
        path: "/excel/export",
        roles: ["admin", "editor"]
      },
      {
        title: "上传Excel",
        path: "/excel/upload",
        roles: ["admin", "editor"]
      }
    ],
  },
  {
    title: "Zip",
    path: "/zip",
    icon: "file-zip",
    roles: ["admin", "editor"]
  },
  {
    title: "剪贴板",
    path: "/clipboard",
    icon: "copy",
    roles: ["admin", "editor"]
  },
  {
    title: "用户管理",
    path: "/user",
    icon: "usergroup-add",
    roles: ["admin"]
  },
  {
    title: "tab-swiper",
    path: "/tabSwiper",
    icon: null,
    iconBeyondAntd: 'icon-gesture_swipe-right-h',
    roles: ["admin"]
  },
  {
    title: "demo-test",
    path: "/demoTest",
    icon: null,
    iconBeyondAntd: 'icon-wodemoban',
    roles: ["admin"]
  }
]
