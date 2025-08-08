import { app, BrowserWindow, Menu, ipcMain, screen } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createWindow() {
  // iPhone 14 Pro dimensions (390 x 844 points, but use pixels for desktop)
  const { width: screenWidth } = screen.getPrimaryDisplay().workAreaSize;
  const winWidth = 390;
  const winHeight = 750;
  const win = new BrowserWindow({
    width: winWidth,
    height: winHeight,
    x: Math.round((screenWidth - winWidth) / 2),
    y: 100,
    resizable: true,
    fullscreenable: false,
    frame: true, // No native OS window controls
    alwaysOnTop: true, // Keep above all other windows
    skipTaskbar: true, // Behave like an overlay (no dock/taskbar icon)
    visibleOnAllWorkspaces: true, // Show across Spaces/Desktops on macOS
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
    backgroundColor: '#000',
    show: false, // Don't show until ready
  });

  // Show window when ready to prevent visual flash
  win.once('ready-to-show', () => {
    win.show();
  });

  // Remove the default menu
  Menu.setApplicationMenu(null);

  // IPC for custom window controls
  ipcMain.on('window-action', (event, action) => {
    console.log('Window action:', action); // Debug log
    if (action === 'close') win.close();
    if (action === 'minimize') win.minimize();
    if (action === 'maximize') win.isMaximized() ? win.unmaximize() : win.maximize();
    if (action === 'resize-tiny') {
      if (win.isMaximized()) win.unmaximize();
      win.setResizable(true);
      win.setBounds({ width: 430, height: 100 });
    }
    if (action === 'resize-phone') {
      if (win.isMaximized()) win.unmaximize();
      win.setResizable(true);
      win.setBounds({ width: 390, height: 750 });
    }
  });

  // Ensure overlay-like behavior at runtime (macOS/Windows/Linux)
  // Use a high level so it stays above even during fullscreen apps where possible
  try {
    // On macOS, specify a level for finer control
    win.setAlwaysOnTop(true, process.platform === 'darwin' ? 'screen-saver' : 'screen-saver');
    // Show on all workspaces and remain visible over fullscreen apps
    if (typeof win.setVisibleOnAllWorkspaces === 'function') {
      // @ts-ignore runtime option object is supported on macOS
      win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true, skipTransformProcessType: true });
    }
  } catch {}

  // Load the Svelte app (assume Vite dev server for dev, or file for prod)
  if (1+1===2) {
    win.loadURL('http://localhost:3000');
  } 

  // Optional: Open DevTools in development


  return win;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});