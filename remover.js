chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'mail.google.com'},
            })
            ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);


        function removeSignature() {
            setTimeout(function () {
                for(var i = 0; document.getElementsByClassName("mt-signature").length; i++)
                    document.getElementsByClassName("mt-signature")[i].remove();
                removeSignature();
            }, 1000);
        }
    
        chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {  
            if(changeInfo.status == "complete"){
                if (tab.url.indexOf('mail.google.com') !== -1){
                    chrome.tabs.executeScript({
                        code: '(' + removeSignature + ')();' 
                    }, (results) => {
                    });
                }
            }
          }); 

    });
});