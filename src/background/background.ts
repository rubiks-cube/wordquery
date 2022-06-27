// TODO: background script
chrome.runtime.onInstalled.addListener(() => {
  // TODO: on installed function
  chrome.contextMenus.create({
    title: "WordQuery",
    id:"wordquerycm",
    contexts:["page","selection"]
  })
  
})

chrome.contextMenus.onClicked.addListener(async e=>{
  console.log(e.selectionText);
  const x= await getCurrentTab()
  console.log(x)
  chrome.tabs.sendMessage(x.id, e.selectionText)
})
chrome.runtime.onMessage.addListener((request) => {
  if (request === "showOptions") {
    chrome.runtime.openOptionsPage();
  }
});

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}