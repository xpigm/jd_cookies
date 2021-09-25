/**
 * @author xpigm@outlook.com
 */
var domain = "jd.com"
var getCookie = function () {
    chrome.cookies.getAll({ domain: domain }, function (cookies) {
        //console.dir(cookies);
        cookiesFiltered = cookies.filter(item => item.httpOnly == true)
        console.dir(cookiesFiltered)
        let obj = {};
        cookiesFiltered.forEach(element => {
            let key = element.name;
            obj[key] = element.value;
        });
        if (obj["pt_key"] == null) {
            console.log("未登录");
            desktop_notification("未登录","未登录");
            return;
        } else {
            var CookieValue = "pt_key=" + obj["pt_key"] + ";" + "pt_pin=" + obj["pt_pin"];
            copy(CookieValue);
            desktop_notification("已经复制至剪切板", CookieValue);
            setTimeout(function(){
                removeCookie();
            },1000);
            
        }
    });
}

var removeCookie = function () {
    chrome.cookies.getAll({ domain: domain }, function (cookies) {
        cookies.forEach(item => {
            console.log(item);
            chrome.cookies.remove({ url: "https://"+item.domain.slice(1)+item.path, name: item.name });
        })
    });
    desktop_notification("COOKIE已清理","COOKIE已清理");
}



var copy = function (text) {
    navigator.clipboard.writeText(text)
}

$(function () {
    $("#login").on('click', function () {
        window.open("https://m.jd.com/")
    });
    $("#get-remove-cookie").on('click', function () {
        getCookie();
    });
});