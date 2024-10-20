# QQ 即时通讯客户端

基于 Electron + React + TypeScript 开发的现代化即时通讯应用

## 项目简介

这是一个使用现代化技术栈开发的即时通讯客户端，具有以下特点：

- 🚀 使用 Electron 构建跨平台桌面应用
- ⚛️ 基于 React 和 TypeScript 开发
- 🎨 使用 Ant Design 组件库
- 📦 支持热重载的开发环境
- 🔒 安全的通信机制

## 功能特性

- 📱 支持私聊和群聊
- 🔍 智能搜索功能
- 👥 好友管理系统
- 🌈 自定义主题
- 💾 消息历史记录
- 🔔 消息通知

## 开发环境配置

### 推荐的 IDE 配置

- [VSCode](https://code.visualstudio.com/) + 以下插件：
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### 环境要求

- Node.js >= 16
- npm >= 8

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 打包构建

Windows 平台：
```bash
npm run build:win
```

macOS 平台：
```bash
npm run build:mac
```

Linux 平台：
```bash
npm run build:linux
```

## 项目结构

```
src/
├── main/              # Electron 主进程
├── preload/          # 预加载脚本
└── renderer/         # 渲染进程（React 应用）
    ├── src/
    │   ├── assets/   # 静态资源
    │   ├── components/# 组件
    │   ├── views/    # 页面
    │   ├── router/   # 路由配置
    │   └── store/    # 状态管理
    └── index.html
```

## TODO 列表

- [ ] 添加端到端加密
- [ ] 实现文件传输功能
- [ ] 添加视频通话功能
- [ ] 优化离线消息同步
- [ ] 实现消息撤回功能

## 贡献指南

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/xxx`
3. 提交改动：`git commit -am 'Add some feature'`
4. 推送分支：`git push origin feature/xxx`
5. 提交 Pull Request

## 开发规范

- 遵循 TypeScript 规范
- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 组件采用函数式编程
- 提交信息遵循 Angular 规范

## 常见问题

### 如何处理依赖安装失败？

尝试以下方法：
1. 清除 npm 缓存：`npm cache clean --force`
2. 删除 node_modules 文件夹后重新安装
3. 使用 cnpm 或配置淘宝镜像

### 开发模式下报错如何处理？

1. 检查 Node.js 版本是否符合要求
2. 确认所有依赖都已正确安装
3. 查看控制台错误信息进行针对性解决

## 许可证

[MIT](LICENSE)

## 联系方式

如有问题或建议，欢迎提交 Issue 或 Pull Request。