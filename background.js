chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
        details.requestHeaders.forEach(function(requestHeader){
            if (requestHeader.name.toLowerCase() === "cookie") {
                requestHeader.value = processCookieStr(requestHeader.value);
            }
        });
        return {
            cancel: details.url.indexOf("pay_iframe.html") != -1 
           //  requestHeaders: details.requestHeaders
        };
    }, {
        urls: [ "*://*/*" ]
    }, ['blocking', 'requestHeaders']
);

chrome.webRequest.onHeadersReceived.addListener(
    function (details) {
        details.responseHeaders.forEach(function(responseHeader){
            if (responseHeader.name.toLowerCase() === "set-cookie") {
                responseHeader.value = processSetCookieStr(responseHeader.value);
                console.log(`${details.url} sets cookie: ${responseHeader.value}`);
            }
        });
        return {
            responseHeaders: details.responseHeaders
        };
    }, {
        urls: ["*://*/*"]
    }, ['blocking','responseHeaders']
);
