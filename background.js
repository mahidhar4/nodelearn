// chrome.runtime.onInstalled.addListener(function () {
//     chrome.storage.sync.set({ color: '#3aa757' }, function () {
//         console.log("The color is green.");
//         //TradeStart();
//     });
//     chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
//         chrome.declarativeContent.onPageChanged.addRules([{
//             conditions: [new chrome.declarativeContent.PageStateMatcher({
//                 pageUrl: { hostEquals: 'developer.chrome.com' },
//             })
//             ],
//             actions: [new chrome.declarativeContent.ShowPageAction()]
//         }]);
//     });
// });


var exxecuteScript = `function TradeStart(){window.location.href.indexOf("https://trade.angelbroking.com/")<0&&window.location.assign("https://trade.angelbroking.com/"),setTimeout(function(){null!=document.getElementById("loginBtn")&&(document.getElementById("txtUserID").value="s248381",document.getElementById("txtTradingPassword").value="Balaji@123",document.getElementById("loginBtn").click()),setTimeout(function(){window.location.href.indexOf("https://trade.angelbroking.com/trade/trading/index?flag=mw")<0&&window.location.assign("https://trade.angelbroking.com/trade/trading/index?flag=mw"),setTimeout(function(){setInterval(function(){var t=document.querySelectorAll("#tbl_Angel_W td div a"),e=["GAIL","PNB"]; console.log("hehe"), t.forEach(function(t){var n=t.getAttribute("onclick").toString().split(",")[3].replace(/\'/gi,"").replace(/ /gi,"");if(e.includes(n)){var i={code:n,ltrrate:t.parentElement.parentElement.nextSibling.innerText,timestamp:(new Date).getTime()},a=localStorage.getItem(n);(a=null==a?[]:JSON.parse(a)).length>20&&(a=[]),a.push(i),localStorage.setItem(n,JSON.stringify(a))}})},2e3)},5e3)},3e3)},3e3)}TradeStart();`;

var startMe = `if (document.getElementById('loginBtn') != null) {
    document.getElementById('txtUserID').value = '{userName}';/*s248381*/
    document.getElementById('txtTradingPassword').value = '{userPassword}';/*Balaji@123*/
    document.getElementById('loginBtn').click();    
}`;


//on message recieved from popup.js
chrome.runtime.onMessage.addListener(function (message, callback) {

    if (message == "login") {

        chrome.storage.sync.get('siteInfo', function (data) {

            var infoSaved = data.siteInfo;

            if (infoSaved != null && infoSaved != undefined && infoSaved != "") {

                infoSaved = JSON.parse(infoSaved);

                chrome.tabs.executeScript({
                    code: startMe.replace('{userName}', infoSaved.userName).replace('{userPassword}', infoSaved.userPassword)
                });
            }
            else {
                chrome.tabs.executeScript({
                    code: 'alert("Please Configure User Info In Extension options")'
                });
            }

        });
    }

    if (message == "tradestart") {
        chrome.tabs.executeScript({
            file: 'content.js'
        });
    }
});


