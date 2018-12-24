chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'mail.google.com'},
            })
            ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);


        function blockSignature(){
            var style = document.createElement('mt-signature');
            style.type = 'text/css';
            style.innerHTML = '.cssClass { display: none; }';
            document.getElementsByTagName('head')[0].appendChild(style);
            
            document.getElementById('someElementId').className = 'cssClass';
        }


        function removeSignatureProccess(recursive=false){

            function removeSignature() {
                document.getElementsByClassName("mt-signature")[0].remove();
            }
    
            function isNewMessageWindows() {
                return document.getElementsByClassName("Am Al editable LW-avf").length != 0;
            }
    
            function canRemove() {
                return document.getElementsByClassName("mt-signature")[0] != undefined;
            }

            alert('removeSignatureProccess');
            if (!recursive){
                if (!isNewMessageWindows()){
                    alert('exit');
                    return;
                }
            } 

            if (canRemove()){
                alert('canRemove');
                removeSignature();
            } else { 
                alert('repeat');
                removeSignatureProccess(true);
            }

        }

        chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {  
            if(changeInfo.status == "complete"){ 
                    if (tab.url.indexOf('mail.google.com') !== -1){
                    chrome.tabs.executeScript({
                        code: '(' + removeSignatureProccess + ')(false);' 
                    }, (results) => {
                    });
                }
            }
          }); 

    });
});