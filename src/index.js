const electron = require("electron");
const path = require("path");
const BrowserWindow = electron.remote.BrowserWindow;
const axios = require("axios");
const ipc = electron.ipcRenderer;

const notifybtn = document.getElementById("notifybtn");

let price = document.querySelector("h1");
let priceTarget = document.getElementById("targetPrice");
let targetpriceval;

const notification = {
  title: "BTC Alert",
  body: "Your BTC just reached your target",
  icon: path.join(__dirname, "../assets/icons/win/icon.ico")
};

function getBTC() {
  axios
    .get(
      "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,DASH&tsyms=BTC,USD,EUR&api_key=6e890f682235c03a8e9ca39ba250967fb4f819e851f5938f47e60acf0588b3c7"
    )
    .then(res => {
      const cryptos = res.data.BTC.USD;
      price.innerHTML = "$" + cryptos.toLocaleString("en");

      if (priceTarget.innerHTML !== "" && targetPriceVal < res.data.BTC.USD) {
        const mynotification = new window.Notification(
          notification.title,
          notification
        );
      }
    })
    .catch(err => {
      console.log(err);
    });
}

getBTC();
setInterval(getBTC, 30000);
notifybtn.addEventListener("click", e => {
  let win = new BrowserWindow({
    width: 400,
    height: 200,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false,
    transparent: true
  });

  win.loadFile(path.join(__dirname, "add.html"));
  win.on("close", () => {
    win = null;
  });
  win.show();
});

ipc.on("targetPriceVal", function(event, arg) {
  targetPriceVal = Number(arg);
  priceTarget.innerHTML = "$" + targetPriceVal.toLocaleString("en");
});
