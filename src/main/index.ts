import { app, shell, BrowserWindow, ipcMain, Menu, Tray } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/logo.png?asset'

let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null

function createTray(window: BrowserWindow): void {
  tray = new Tray(join(__dirname, '../logo.png'))
  tray.setToolTip('秋秋聊天系统')

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示窗口',
      click: () => window.show()
    },
    {
      label: '退出系统',
      click: () => app.quit()
    }
  ])

  tray.setContextMenu(contextMenu)
  tray.on('double-click', () => {
    if (!window) return
    const isVisible = window.isVisible()
    isVisible ? window.hide() : window.show()
    window.setSkipTaskbar(!isVisible)
  })
}

function setupWindowEvents(window: BrowserWindow): void {
  window.on('ready-to-show', () => {
    window.show()
  })

  window.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  ipcMain.on('window-min', () => {
    window.minimize()
  })

  ipcMain.on('window-max', () => {
    if (window.isMaximized()) {
      window.restore()
    } else {
      window.maximize()
    }
  })

  ipcMain.on('win-closed', () => {
    if (process.platform !== 'darwin') {
      window.hide()
    }
  })
}

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    minHeight: 500,
    minWidth: 800,
    icon: join(__dirname, '../logo.png'),
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  setupWindowEvents(mainWindow)

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  createTray(mainWindow)
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 清理资源
app.on('before-quit', () => {
  if (tray) {
    tray.destroy()
    tray = null
  }
  if (mainWindow) {
    mainWindow = null
  }
})
