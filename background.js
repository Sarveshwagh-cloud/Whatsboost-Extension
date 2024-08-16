chrome.action.onClicked.addListener((tab) => {
  const dashboardUrl = 'https://whatsboost.in/user/dashboard';
  const mainUrl = 'https://whatsboost.in/';

  // Check if the tab's URL is valid for injection
  if (tab.url.startsWith('http://') || tab.url.startsWith('https://')) {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: checkDashboard,
      args: [dashboardUrl, mainUrl]
    });
  } else {
    // If the current tab is not valid, open a new tab directly
    chrome.tabs.create({ url: mainUrl });
  }
});

function checkDashboard(dashboardUrl, mainUrl) {
  fetch(dashboardUrl, { method: 'GET', credentials: 'include' })
    .then(response => {
      if (response.ok) {
        window.location.href = dashboardUrl;
      } else {
        window.location.href = mainUrl;
      }
    })
    .catch(() => {
      window.location.href = mainUrl;
    });
}
