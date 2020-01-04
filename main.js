const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const ipc = require("electron").ipcMain;
const shell = require("electron").shell;
let win;
let onlineStatusWindow;
let question;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 400,
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, "assets/icons/win/icon.ico")
  });

  win.loadFile(path.join(__dirname, "src/index.html"));

  // win.webContents.openDevTools();

  win.on("closed", () => {
    win = null;
  });

  let menu = Menu.buildFromTemplate([
    {
      label: "Configuration",
      submenu: [
        {
          label: "Adjust notification level"
        },
        { type: "separator" },
        {
          label: "Coin market cap",
          click() {
            shell.openExternal("https://coinmarketcap.com/");
          }
        },
        { type: "separator" },
        {
          label: "Exit",
          click() {
            app.quit();
          }
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);
}

app.on("ready", createWindow);
app.on("ready", () => {
  onlineStatusWindow = new BrowserWindow({
    width: 200,
    height: 100,
    show: false
  });
  onlineStatusWindow.loadFile(
    path.join(__dirname, "./src/online/online-status.html")
  );
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

ipc.on("update-notify-value", function(event, arg) {
  win.webContents.send("targetPriceVal", arg);
});
