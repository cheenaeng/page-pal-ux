/* eslint-disable no-undef */
let currentURl = ''
// eslint-disable-next-line no-undef
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  if (tabs && tabs.length > 0) {
    currentURl = tabs[0].url
  }
})

document.addEventListener('DOMContentLoaded', function () {
  var saveButton = document.getElementById('save-url-btn')

  var inputFieldUrl = document.getElementById('url-input')

  inputFieldUrl.value = currentURl

  saveButton.addEventListener('click', function () {
    if (inputFieldUrl.value) {
      chrome.storage.sync.get({ readingList: [] }, function (result) {
        var readingList = result.readingList
        readingList.push(inputFieldUrl.value)
        chrome.storage.sync.set({ readingList: readingList }, function () {
          console.log('URL added to reading list:', inputFieldUrl.value)
        })
      })
    }
  })
})
