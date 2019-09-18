


function loadPrevDetails() {

    chrome.storage.sync.get('siteInfo', function (data) {
        var infoSaved = data.siteInfo;
        if (infoSaved != null && infoSaved != undefined && infoSaved != "") {
            infoSaved = JSON.parse(infoSaved);

            var page = document.getElementById("frmMyDetails");

            for (const key in infoSaved) {
                if (infoSaved.hasOwnProperty(key)) {
                    const element = page.querySelector("#" + key);
                    element.value = infoSaved[key];
                    element.setAttribute("value", infoSaved[key]);
                }
            }

        }

    });

}

function savedetails() {

    var myFormFieldsWithData = {
        "userName": "",
        "userPassword": "",
        "companyCode": "",
        "sellAtProfitPercent": "",
        "sellAtLossProfitPercent": "",
        "differenceValueWithPrevRecord": "",
        "intervalCheck": "",
        "walletBalance": "",
        "walletQntyMultiplier": "",
        "selProductType": "AMF"
    };

    var page = document.getElementById("frmMyDetails");

    for (const key in myFormFieldsWithData) {
        if (myFormFieldsWithData.hasOwnProperty(key)) {
            const element = page.querySelector("#" + key);
            myFormFieldsWithData[key] = element.value || element.getAttribute("value");
        }
    }


    chrome.storage.sync.set({ siteInfo: JSON.stringify(myFormFieldsWithData) }, function () {
        alert("Info Saved Successfully");
    })
}

document.getElementById("save").onclick = function () {
    savedetails();
}


loadPrevDetails();


