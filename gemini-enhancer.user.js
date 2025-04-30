// ==UserScript==
// @name         Gemini Enhancer
// @namespace    https://github.com/spencer119/userscripts
// @version      0.3
// @description  changes stuff on gemini
// @author       spencer119
// @match        https://gemini.google.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";

  // Add custom stylesheet that overrides the max-width values
  function addCustomCSS() {
    const style = document.createElement("style");
    style.textContent = `
            .conversation-container.tts-removed[_ngcontent-ng-c2735779439] {
                max-width: 900px !important;
            }

            .ui-improvements-phase-1[_nghost-ng-c2438131665] .input-area-container[_ngcontent-ng-c2438131665],
            .ui-improvements-phase-1[_nghost-ng-c2438131665] condensed-tos-disclaimer[_ngcontent-ng-c2438131665] {
                max-width: 800px !important;
            }
        `;
    document.head.appendChild(style);

    console.log("Gemini Conversation Width Enhancer: Width settings applied");
  }

  // Function to toggle sidebar by clicking the sidebar button
  function toggleSidebar() {
    const sidebarButton = document.querySelector(
      'button[data-test-id="side-nav-menu-button"]',
    );
    if (sidebarButton) {
      sidebarButton.click();
      console.log(
        "Gemini Conversation Width Enhancer: Sidebar toggled via keyboard shortcut",
      );
    } else {
      console.log(
        "Gemini Conversation Width Enhancer: Sidebar button not found",
      );
    }
  }

  // Add keyboard shortcut for toggling sidebar (Ctrl+Shift+S)
  function setupKeyboardShortcuts() {
    document.addEventListener("keydown", function (e) {
      // Check for Ctrl+Shift+S
      if (e.ctrlKey && e.shiftKey && e.key === "S") {
        e.preventDefault(); // Prevent default browser behavior
        toggleSidebar();
      }
    });

    console.log(
      "Gemini Conversation Width Enhancer: Keyboard shortcuts initialized",
    );
  }

  // Use DOM ready event to ensure the head exists for CSS
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      addCustomCSS();
      // setupKeyboardShortcuts();
    });
  } else {
    addCustomCSS();
    // setupKeyboardShortcuts();
  }

  // As a backup, also try after window load
  window.addEventListener("load", function () {
    // Check if our style is applied
    if (!document.head.innerHTML.includes("max-width: 1050px !important")) {
      addCustomCSS();
    }
  });
})();
