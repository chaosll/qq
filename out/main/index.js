"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const icon = path.join(__dirname, "../../resources/logo.png");
let mainWindow = null;
let tray = null;
function createTray(window) {
  tray = new electron.Tray(path.join(__dirname, "../logo.png"));
  tray.setToolTip("秋秋聊天系统");
  const contextMenu = electron.Menu.buildFromTemplate([
    {
      label: "显示窗口",
      click: () => window.show()
    },
    {
      label: "退出系统",
      click: () => electron.app.quit()
    }
  ]);
  tray.setContextMenu(contextMenu);
  tray.on("double-click", () => {
    if (!window) return;
    const isVisible = window.isVisible();
    isVisible ? window.hide() : window.show();
    window.setSkipTaskbar(!isVisible);
  });
}
function setupWindowEvents(window) {
  window.on("ready-to-show", () => {
    window.show();
  });
  window.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  electron.ipcMain.on("window-min", () => {
    window.minimize();
  });
  electron.ipcMain.on("window-max", () => {
    if (window.isMaximized()) {
      window.restore();
    } else {
      window.maximize();
    }
  });
  electron.ipcMain.on("win-closed", () => {
    if (process.platform !== "darwin") {
      window.hide();
    }
  });
}
function createWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    minHeight: 500,
    minWidth: 800,
    icon: path.join(__dirname, "../logo.png"),
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  setupWindowEvents(mainWindow);
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
  createTray(mainWindow);
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.ipcMain.on("ping", () => console.log("pong"));
  createWindow();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.on("before-quit", () => {
  if (tray) {
    tray.destroy();
    tray = null;
  }
  if (mainWindow) {
    mainWindow = null;
  }
});
