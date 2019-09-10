

function TradeStart() {

    if (window.location.href.indexOf("https://trade.angelbroking.com/") < 0)
        window.location.assign('https://trade.angelbroking.com/');

    setTimeout(function () {


        if (document.getElementById('loginBtn') != null) {
            document.getElementById('txtUserID').value = 's248381';
            document.getElementById('txtTradingPassword').value = 'Balaji@123';
            document.getElementById('loginBtn').click();
        }

        setTimeout(function () {

            if (window.location.href.indexOf("https://trade.angelbroking.com/trade/trading/index?flag=mw") < 0)
                window.location.assign('https://trade.angelbroking.com/trade/trading/index?flag=mw');

            setTimeout(function () {

                setInterval(function () {

                    var collection = document.querySelectorAll("#tbl_Angel_W td div a");
                    var list = ["GAIL", "PNB"];

                    collection.forEach(function (item) {

                        var codeItem = item.getAttribute("onclick")
                        .toString().split(',')[3].replace(/\'/ig, "").replace(/ /ig, "");

                        if (list.includes(codeItem)) {

                            var ltrRate = item.parentElement.parentElement.nextSibling.innerText;

                            var newItem = { "code": codeItem, "ltrrate": ltrRate, "timestamp": new Date().getTime() };

                            var prevArray = localStorage.getItem(codeItem);

                            if (prevArray === null || prevArray === undefined) prevArray = [];
                            else prevArray = JSON.parse(prevArray);


                            if (prevArray.length > 20) prevArray = [];


                            prevArray.push(newItem);


                            localStorage.setItem(codeItem, JSON.stringify(prevArray));


                        }

                    });

                }, 2000);

            }, 5000);

        }, 3000);

    }, 3000);
}
TradeStart();