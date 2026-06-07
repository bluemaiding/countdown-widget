# ⏳ Countdown Widget

轻量级桌面悬浮倒计时小组件，基于 Electron 构建。支持深色/浅色主题、迷你模式、进度条百分比显示。

![Node.js](https://img.shields.io/badge/Node.js-v16+-339933?logo=node.js&logoColor=fff)
![Electron](https://img.shields.io/badge/Electron-37-47848F?logo=electron&logoColor=fff)
![Platform](https://img.shields.io/badge/Platform-Windows-0078D6?logo=windows&logoColor=fff)

## 环境要求

- **Node.js** v16 或更高（[下载](https://nodejs.org/)）
- **Windows** 10/11
- npm（随 Node.js 一起安装）

## 安装与启动

```bash
# 克隆仓库
git clone https://github.com/bluemaiding/countdown-widget.git
cd countdown-widget

# 安装依赖
npm install

# 启动
npm start
```

## 功能

### 倒计时
- 时:分:秒 实时倒计时，数字渐变色高亮
- 进度条 + 百分比显示（整数）
- 到期后显示 🎉 提示

### 目标设置
- 滚轮选取时间（时/分），支持鼠标滚轮和点击 ▲▼
- 自定义事件名称
- 设定后自动保存，下次启动恢复

### 窗口控制
- **拖拽移动** — 按住标题栏任意位置拖动
- **迷你模式** — 收起为小条，右侧显示暂停/展开/关闭按钮
- **暂停/继续** — 暂停时数字变红，支持迷你模式
- **刷新** — 左上角 ↻ 按钮，清除当前任务重新开始
- **关闭** — 右上角 ✕ 按钮

### 主题
- 深色 / 浅色双主题
- 点击 ☀/☾ 按钮切换
- 自动保存主题偏好

## 文件结构

```
countdown-widget/
├── main.js           # Electron 主进程（窗口、IPC）
├── index.html        # 渲染进程（UI 和倒计时逻辑）
├── build.js          # electron-builder 打包配置
├── package.json      # 项目配置和依赖
├── package-lock.json # 依赖锁文件
└── .gitignore
```

## 打包

```bash
npm run build
```

生成的可执行文件在 `dist/` 目录下。

## 技术栈

- [Electron](https://www.electronjs.org/) — 桌面应用框架
- 原生 HTML / CSS / JS — 无前端框架依赖
- CSS 变量实现主题切换
- IPC 通信实现数据持久化
