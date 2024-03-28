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

(function() {
    'use strict';

    document.addEventListener('keydown', function(e) {
        // Open sidebar with Alt+Shift+S or Ctrl+Shift+S
        if ((e.altKey || e.ctrlKey) && e.shiftKey && e.key === 'S') {
            // Attempt to find the button using a complex class name
            let button = document.querySelector('button[class*="absolute bottom-0 left-0 top-0 inline-flex items-center justify-center rounded-md px-3 hover:text-token-text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white active:opacity-50"]');
            if (button) {
                button.click(); // Simulate a click on the button
            }
        }

        // Focus on the textarea with Ctrl+`
        if (e.ctrlKey && e.key === '`') {
            // Attempt to find the textarea by its id
            let textarea = document.getElementById('prompt-textarea');
            if (textarea) {
                textarea.focus(); // Set focus on the textarea
            }
        }
    });
})();
