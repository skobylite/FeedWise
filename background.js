// Handle navigation updates for all supported platforms
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  const supportedPlatforms = ['facebook.com', 'twitter.com', 'x.com', 'instagram.com'];
  
  if (details.url && supportedPlatforms.some(platform => details.url.includes(platform))) {
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      files: ["content.js"]
    });
  }
});

// Handle extension installation - show onboarding
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Show onboarding on first install
    chrome.storage.local.get(['feedwiseOnboardingComplete'], (data) => {
      if (!data.feedwiseOnboardingComplete) {
        chrome.tabs.create({
          url: chrome.runtime.getURL('onboarding.html')
        });
      }
    });
  } else if (details.reason === 'update') {
    // Handle updates - could show what's new
    console.log('FeedWise updated to version', chrome.runtime.getManifest().version);
  }
});

// Handle new tab behavior based on user preference
chrome.tabs.onCreated.addListener((tab) => {
  if (tab.url === 'chrome://newtab/' || tab.url === 'chrome-search://local-ntp/local-ntp.html') {
    chrome.storage.local.get(['feedwiseSettings'], (data) => {
      const settings = data.feedwiseSettings || {};
      
      // If user has disabled new tab, redirect to default
      if (settings.newTabEnabled === false) {
        chrome.tabs.update(tab.id, {
          url: 'chrome://newtab/'
        });
      }
    });
  }
});