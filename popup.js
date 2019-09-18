
// to create ane tab and work on it
document.getElementById("gotsite").onclick = function () {
  chrome.tabs.create({ url: "https://trade.angelbroking.com/" });
};

function navigateMeMan(cb) {

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

    chrome.tabs.executeScript(
      tabs[0].id,
      {
        code: `
    if (window.location.href.indexOf("https://trade.angelbroking.com/trade/trading/index?flag=mw") < 0)
        window.location.assign('https://trade.angelbroking.com/trade/trading/index?flag=mw');` }
      , cb);
  });
}

document.getElementById('navigateme').onclick = function () {
  navigateMeMan();
};

//to naviate to the site and execute script
document.getElementById("executeScriptStart").onclick = function () {

  navigateMeMan(function () {
    chrome.runtime.sendMessage("tradestart");
  });
};

document.getElementById("login").onclick = function () {

  chrome.runtime.sendMessage("login");
  setTimeout(navigateMeMan, 3000);

};

document.getElementById("executeScriptStop").onclick = function () {

};


