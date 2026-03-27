const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // 👉 aqui vamos abrir o login
  win.loadFile("renderer/auth/login/login.html");
}

app.whenReady().then(createWindow);