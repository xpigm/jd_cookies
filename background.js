/**
 * @author xpigm@outlook.com
 */
var desktop_notification = function (title, message) {
    chrome.notifications.create("jd_notify_"+title+(new Date()).valueOf(), {
        type: 'basic',
        title: title,
        message: message,
        iconUrl: './128.png'
    });
}