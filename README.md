```
# 简介

[xl-react-antd-template] 是一个基于 `React` 和 `Ant Design` 的后台管理系统模板。它内置了用户登录/登出，动态路由，权限校验，用户管理等典型的业务模型，可以帮助你快速搭建企业级中后台产品原型。

本系统的开发灵感源于 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin/) ，这是一个基于 `Vue` 和 `ElementUI` 的优秀的后台管理系统模板，在这里向大佬致敬！

其实我的主技术栈一直是 `Vue`，只是最近入坑了 `React` ，看了大半个月文档，就想牛刀小试一下，所以就做了这个项目练手。对于 `React` ，我还是个小白，项目中做的不够好的地方请指正！

# 功能

- 登录 / 注销

- 权限验证
  - 页面权限
  - 路由权限

- 全局功能
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 本地/后端 mock 数据
  - Screenfull全屏
  - 自适应收缩侧边栏

- AMap（高德地图）
- BMap（百度地图）

- Excel
  - 导出excel
  - 导入excel
  - 前端可视化excel

- Zip
  - 导出zip

- 错误页面
  - 404

- 组件
  - 富文本
  - Markdown

- 表格
- Dashboard
- 引导页
- ECharts 图表
- 剪贴板

# 目录结构

├─ public                     # 静态资源
│   ├─ favicon.ico            # favicon图标
│   └─ index.html             # html模板
├─ src                        # 项目源代码
│   ├─ api                    # 所有请求
│   ├─ assets                 # 图片 字体等静态资源
│   ├─ components             # 全局公用组件
│   ├─ config                 # 全局配置
│   │   ├─ menuConfig.js      # 导航菜单配置
│   │   └─ routeMap.js        # 路由配置
│   ├─ lib                    # 第三方库按需加载
│   ├─ mock                   # 项目mock 模拟数据
│   ├─ store                  # 全局 store管理
│   ├─ styles                 # 全局样式
│   ├─ utils                  # 全局公用方法
│   ├─ views                  # views 所有页面
│   ├─ App.js                 # 入口页面
│   ├─ defaultSettings.js     # 全局默认配置
│   └─index.js                # 源码入口
├── .env.development          # 开发环境变量配置
├── .env.production           # 生产环境变量配置
├── config-overrides.js       # 对cra的webpack自定义配置
├── deploy.sh                 # CI部署脚本
├── .travis.yml               # 自动化CI配置
└── package.json              # package.json

# 克隆项目
git clone https://github.com/xl-wolf/xl-react-antd-template.git

# 进入项目目录
cd xl-react-antd-template

# 安装依赖
npm install

# 启动服务
npm start

启动完成后会自动打开浏览器访问 [http://localhost:6099](http://localhost:6099)， 你看到下面的页面就代表操作成功了。

接下来你可以修改代码进行业务开发了
