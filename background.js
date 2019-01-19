// background.js

var green = {color: [0, 190, 0, 255]};
var yellow = {color: [244, 238, 66, 255]};
var orange = {color: [255, 168, 30, 255]};
var red = {color: [255, 0, 0, 255]};

function updateTabCount() {
  chrome.tabs.query({}, function(tabs) {
    var tabCount = tabs.length;
    var tabColor = green;
    if ( tabCount > 30 && tabCount <= 50 ) {
      tabColor = yellow; 
    } else if ( tabCount > 50 && tabCount <= 75 ) {
      tabColor = orange;
    } else if ( tabCount > 75 ) {
      tabColor = red;
    }
    chrome.browserAction.setBadgeBackgroundColor(tabColor);  
    chrome.browserAction.setBadgeText({text: ''+tabCount});
  });
};

chrome.browserAction.setBadgeBackgroundColor({ color: [100, 100, 100, 255] });
chrome.browserAction.setBadgeText({text: '0'});

updateTabCount();

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  updateTabCount();
});

chrome.tabs.onCreated.addListener(function(tab) {
  updateTabCount();
});

chrome.tabs.onRemoved.addListener(function(tab) {
  updateTabCount();
});
