/* global chrome */

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  var endiURL = 'http://www.elnuevodia.com';
  var startsWithURL = tab.url.slice(0, endiURL.length) === endiURL;

  if (changeInfo.status === 'loading' && startsWithURL) {
    chrome.cookies.set({
      url: 'http://www.elnuevodia.com',
      name: 'end_interstitial',
      value: 'Interstitial-General',
      expirationDate: (new Date().getTime() / 1000) + 3600
    });
  }
});
