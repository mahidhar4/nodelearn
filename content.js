
var intervalId = undefined;

function TradeStart() {

    chrome.storage.sync.get('siteInfo', function (data) {

        var infoSaved = data.siteInfo;

        if (infoSaved != null && infoSaved != undefined && infoSaved != "") {

            var siteInfoInp = JSON.parse(infoSaved);

            if (!document.getElementById("tab1").classList.contains("activeTab")) {
                tab5ClickMethod(siteInfoInp);
                return;
            }

            intervalId = setTimeout(function (siteInfo) {

                // "companyCode": "",
                // "sellAtProfitPercent": "",
                // "sellAtLossProfitPercent": ""

                console.log("started interval0");

                // var collection = document.querySelectorAll("#tbl_Angel_W td div a");

                var collection = document.querySelectorAll("#tbl_Angel_W #ltrate_" + siteInfo.companyCode);

                var list = [siteInfo.companyCode];
                var anyItemFound = false;

                collection.forEach(function (item) {

                    // var codeItem = item.getAttribute("onclick")
                    //     .toString().split(',')[3].replace(/\'/ig, "").replace(/ /ig, "");

                    var codeItem = item.getAttribute("id").split("_")[1];

                    if (list.includes(codeItem)) {

                        anyItemFound = true;
                        // var ltrRate = item.parentElement.parentElement.nextSibling.innerText;

                        var ltrRate = item.innerText;

                        ltrRate = parseFloat(ltrRate);

                        var newItem = { "code": codeItem, "ltrrate": ltrRate, "timestamp": new Date().getTime() };

                        var prevArray = localStorage.getItem(codeItem);

                        if (prevArray === null || prevArray === undefined) prevArray = [];

                        else prevArray = JSON.parse(prevArray);

                        if (prevArray.length > 20) prevArray = [];

                        //current interval price
                        var currentPrice = ltrRate;

                        if (prevArray.length > 0) {

                            //getting latest before interval price
                            var prevPrice = prevArray[prevArray.length - 1].ltrrate;

                            var calcPrice = prevPrice + (prevPrice * parseFloat(siteInfo.differenceValueWithPrevRecord) / 100);

                            // currentPrice = 67.01;

                            if (calcPrice <= currentPrice) {

                                console.log("Buy the Share Now");

                                buyShares(siteInfo, currentPrice, item, function () {

                                    prevArray.push(newItem);

                                    localStorage.setItem(codeItem, JSON.stringify(prevArray));

                                    TradeStart();

                                });

                            }
                        }
                        else {
                            prevArray.push(newItem);

                            localStorage.setItem(codeItem, JSON.stringify(prevArray));

                            TradeStart();

                        }
                    }

                });

                if (!anyItemFound) TradeStart();

            }, (siteInfoInp.intervalCheck ?
                (isNaN(parseInt(siteInfoInp.intervalCheck)) ? null
                    : parseInt(siteInfoInp.intervalCheck)) : null) || 2000,
                siteInfoInp);

        }
        else {
            alert("Please Configure User Info In Extension options");
        }

    });

}



function buyShares(siteInfoInp, currentPrice, elemItem, callbackfn) {

    // elemItem.parentElement.parentElement.parentElement.click();//wen anchor tag
    elemItem.parentElement.click();//wen td

    var meForProduct = siteInfoInp.selProductType || 'AMF';

    document.querySelector("#tabs .fR.blue_btn").click();

    tryMe("#BuySellMainDiv", function () {

        tryMe(`#BuySellDiv #ddlProductType [data-prodtype='${meForProduct}']`, function () {

            document.querySelector(`#BuySellDiv #ddlProductType [data-prodtype='${meForProduct}']`).click();

            document.querySelector("#BuySellDiv #ddlPriceType [data-prctype='2']").click();

            let { walletBalance, walletQntyMultiplier } = siteInfoInp;

            walletBalance = parseFloat(walletBalance);

            walletQntyMultiplier = parseInt(walletQntyMultiplier);

            var Quantity = Math.ceil(walletBalance * walletQntyMultiplier / currentPrice);

            document.querySelector("#BuySellDiv #txtQuantity").value = Quantity;

            document.querySelector("#BuySellDiv #btnSubmitOrder").click();

            tryMe("#ConfirmOrderDiv .confirmOrderTable", function () {

                tryMe("#ConfirmOrderDiv #btnConfirm", function () {

                    document.getElementById("btnConfirm").click();

                    tryMe("#btnOk_Confirm", function () {

                        document.getElementById("btnOk_Confirm").click();

                        tab5ClickMethod(siteInfoInp);
                    }, 2500);

                }, 500);

            }, 200)


        }, 1800);

    }, 1500);
}

function tab5ClickMethod(siteInfoInp) {
    document.getElementById("tab5").children[0].click();

    tryMe("#otherReports_table_tbody #spnCMP_" + siteInfoInp.companyCode, function () {

        var eleConsider = document.querySelector("#otherReports_table_tbody #spnCMP_" + siteInfoInp.companyCode);
        var valueOf = eleConsider.innerText;

        valueOf = parseFloat(valueOf);

        if (valueOf > 0)//need to chsange
        {
            //finding sqroff btn
            eleConsider.parentElement.parentElement.querySelector("td.pR5 .blue_btn.withdraw.fL").click();
        }

        setTimeout(callbackfn, 2500);

    });

}

function tryMe(elementId, cb, timer) {

    var elements = document.querySelector(elementId);

    if (elements == null || !meVisible(elements)) {
        window.requestAnimationFrame(function () {
            tryMe(elementId, cb);
        });
    } else {
        meVisible(elements) ? setTimeout(cb, timer || 2000) : tryMe(elementId, cb);
    }
};

function meVisible(elem) {
    return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
}


TradeStart();