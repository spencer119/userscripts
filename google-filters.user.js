// ==UserScript==
// @name         Google Search - Reddit & GitHub Filters
// @namespace    https://github.com/spencer119/userscripts
// @version      1.0
// @description  Adds Reddit and GitHub filter buttons to Google search results
// @author       spencer119
// @homepage     https://github.com/spencer119/userscripts
// @match        https://www.google.com/search*
// @match        https://google.com/search*
// @icon         https://www.google.com/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Add custom CSS to ensure the pointer cursor on hover
  function addCustomStyles() {
    const styleElement = document.createElement("style");
    styleElement.textContent = `
            .custom-filter-button a {
                cursor: pointer !important;
            }
        `;
    document.head.appendChild(styleElement);
  }

  // Function to create filter buttons
  function createFilterButton(text, site) {
    // Create the container div with role="listitem"
    const listItem = document.createElement("div");
    listItem.setAttribute("role", "listitem");
    listItem.className = "custom-filter-button"; // Add custom class for styling

    // Create the anchor element
    const anchor = document.createElement("a");
    anchor.className = "nPDzT T3FoJb";
    anchor.setAttribute("role", "link");

    // Create the inner div for the button text
    const innerDiv = document.createElement("div");
    innerDiv.className = "YmvwI";
    innerDiv.setAttribute("jsname", "bVqjv");
    innerDiv.textContent = text;

    // Append the inner div to the anchor
    anchor.appendChild(innerDiv);

    // Append the anchor to the list item
    listItem.appendChild(anchor);

    // Add click event listener
    anchor.addEventListener("click", function (event) {
      event.preventDefault();

      // Get current search query from URL
      const urlParams = new URLSearchParams(window.location.search);
      const currentQuery = urlParams.get("q") || "";

      // Prevent adding the site filter multiple times
      const sitePrefix = `site:${site} `;
      let newQuery = currentQuery;

      if (!currentQuery.includes(`site:${site}`)) {
        newQuery = sitePrefix + currentQuery;
      }

      // Update URL and navigate
      urlParams.set("q", newQuery);
      window.location.href =
        window.location.pathname + "?" + urlParams.toString();
    });

    return listItem;
  }

  // Function to add the buttons to the page
  function addFilterButtons() {
    // First try to find the hdtb-sc element by ID
    const hdtbScElement = document.getElementById("hdtb-sc");
    if (!hdtbScElement) {
      console.log("Google Filters: hdtb-sc element not found");
      return;
    }

    // Try multiple approaches to find the list div
    let listContainer = null;

    // Approach 1: Try direct XPath
    try {
      const xpathResult = document.evaluate(
        '//*[@id="hdtb-sc"]/div/div/div[1]/div',
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      );
      if (xpathResult && xpathResult.singleNodeValue) {
        const potentialListContainer =
          xpathResult.singleNodeValue.querySelector('div[role="list"]');
        if (potentialListContainer) {
          listContainer = potentialListContainer;
        }
      }
    } catch (e) {
      console.log("Google Filters: XPath error:", e);
    }

    // Approach 2: Try to find it by role within hdtb-sc
    if (!listContainer) {
      listContainer = hdtbScElement.querySelector('div[role="list"]');
    }

    // Approach 3: Try to find any div with role="list" in the document
    if (!listContainer) {
      const allListContainers = document.querySelectorAll('div[role="list"]');
      // Find the one that has listitems with YmvwI class (filter buttons)
      for (const container of allListContainers) {
        if (container.querySelector('div[role="listitem"] div.YmvwI')) {
          listContainer = container;
          break;
        }
      }
    }

    if (!listContainer) {
      console.log("Google Filters: List container not found");
      return;
    }

    // Find the More button (it has the distinct Lu57id class)
    const moreButton = Array.from(
      listContainer.querySelectorAll('div[role="listitem"]')
    ).find((item) => item.querySelector(".Lu57id"));

    if (!moreButton) {
      console.log("Google Filters: More button not found");
      return;
    }

    // Check if our buttons are already there
    const existingRedditButton = Array.from(
      listContainer.querySelectorAll('div[role="listitem"]')
    ).find((item) => {
      const textDiv = item.querySelector("div.YmvwI");
      return textDiv && textDiv.textContent === "Reddit";
    });

    if (existingRedditButton) {
      console.log("Google Filters: Buttons already added");
      return;
    }

    // Create Reddit filter button
    const redditButton = createFilterButton("Reddit", "reddit.com");

    // Create GitHub filter button
    const githubButton = createFilterButton("GitHub", "github.com");

    // Insert the buttons before the More button
    listContainer.insertBefore(redditButton, moreButton);
    listContainer.insertBefore(githubButton, moreButton);

    console.log("Google Filters: Added Reddit and GitHub buttons");
  }

  // Execute when DOM is fully loaded
  function init() {
    // Add custom styles first
    addCustomStyles();

    // Delay execution slightly to ensure the page is fully rendered
    setTimeout(() => {
      addFilterButtons();

      // Sometimes Google loads content dynamically, so we also set up a mutation observer
      const observer = new MutationObserver((mutations) => {
        // Check if hdtb-sc exists and doesn't have our custom buttons yet
        const hdtbScElement = document.getElementById("hdtb-sc");
        if (hdtbScElement) {
          const listDivs = document.querySelectorAll('div[role="list"]');
          let needsButtons = true;

          for (const listDiv of listDivs) {
            const items = listDiv.querySelectorAll(
              'div[role="listitem"] div.YmvwI'
            );
            for (const item of items) {
              if (item.textContent === "Reddit") {
                needsButtons = false;
                break;
              }
            }
            if (!needsButtons) break;
          }

          if (needsButtons) {
            addFilterButtons();
          }
        }
      });

      // Start observing the document body for changes
      observer.observe(document.body, { childList: true, subtree: true });
    }, 1000); // Wait 1 second for the page to fully render
  }

  // Run the script
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
