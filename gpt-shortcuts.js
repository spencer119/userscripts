// ==UserScript==
// @name         gpt shortcuts
// @namespace    http://tampermonkey.net/
// @version      2024-03-28
// @description  try to take over the world!
// @author       You
// @match        https://chat.openai.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @grant        none
// ==/UserScript==
(function () {
  "use strict";

  document.addEventListener("keydown", function (e) {
    // Check if Alt+Shift+S or Ctrl+Shift+S is pressed for opening the sidebar
    if ((e.altKey || e.ctrlKey) && e.shiftKey && e.key === "S") {
      let button = document.querySelector(
        'button[class*="absolute bottom-0 left-0 top-0 inline-flex items-center justify-center rounded-md px-3 hover:text-token-text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white active:opacity-50"]',
      );
      if (button) {
        button.click();
      }
    }

    // Check if Alt+Tab is pressed for focusing on the textbox
    if (e.altKey && e.key === "Tab") {
      e.preventDefault(); // Prevent the default Alt+Tab behavior
      let textarea = document.getElementById("prompt-textarea");
      if (textarea) {
        textarea.focus();
      }
    }

    // Add new condition for Ctrl+Shift+Enter or Alt+Enter to act as if the button was clicked
    if (
      (e.ctrlKey && e.shiftKey && e.key === "Enter") ||
      (e.altKey && e.key === "Enter")
    ) {
      e.preventDefault(); // Prevent the default action to ensure the key combination works as intended
      // Query the button using its data-testid attribute
      let sendButton = document.querySelector(
        'button[data-testid="send-button"]',
      );
      if (sendButton) {
        sendButton.click(); // Simulate a click on the button
      }
    }
  });
})();
