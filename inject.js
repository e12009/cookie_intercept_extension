var cookieGetter = document.__lookupGetter__("cookie").bind(document);
var cookieSetter = document.__lookupSetter__("cookie").bind(document);

var oldEval = eval;


Object.defineProperty(document, 'cookie', {
    get: function() {
        var storedCookieStr = cookieGetter();
        return processCookieStr(storedCookieStr);
    },

    set: function(cookieString) {
        console.log(`Setting cookie ${cookieString} by document: ${document.URL}`);

        if (cookieString.indexOf('FSSBB') >= 0) {
            let stack = new Error().stack;
            console.log(`Backtrace: ${stack}`);
            debugger;
        }
        var newValue = processSetCookieStr(cookieString);
        return cookieSetter(newValue);
    }
});

/*
window.eval = function(expr) {
    console.log(`Evaluating expr : ${expr}`);
    return oldEval(expr);

}
*/
