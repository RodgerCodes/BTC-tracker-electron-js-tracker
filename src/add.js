const electron = require("electron");
const path = require("path");
const remote = electron.remote;
const ipc = electron.ipcRenderer;
const closeBtn = document.getElementById("closeBtn");

closeBtn.addEventListener("click", e => {
  let window = remote.getCurrentWindow();
  window.close();
});

const updateBtn = document.getElementById("updateBtn");

updateBtn.addEventListener("click", () => {
  ipc.send("update-notify-value", document.getElementById("notifyval").value);

  let window = remote.getCurrentWindow();
  window.close();
});
