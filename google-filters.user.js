// ==UserScript==
// @name         Google Search Filters for Reddit and GitHub
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add Reddit and GitHub filters to Google search results
// @author       spencer119
// @match        https://www.google.com/search*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Try to add the custom filters periodically until successful or max attempts reached
  let attempts = 0;
  const maxAttempts = 20;

  const checkInterval = setInterval(function () {
    attempts++;
    if (addCustomFilters() || attempts >= maxAttempts) {
      clearInterval(checkInterval);
    }
  }, 500);

  function addCustomFilters() {
    // Find the search filter toolbar (div with role="list")
    const filterToolbar = document.querySelector(
      'div[role="list"][style="display: contents"]'
    );
    if (!filterToolbar) return false;

    // Check if we've already added our custom filters
    if (
      document.querySelector('[data-custom-filter="reddit"]') ||
      document.querySelector('[data-custom-filter="github"]')
    ) {
      return true;
    }

    // Find the "More" button at the end of the toolbar
    const moreButton = Array.from(filterToolbar.children).find((child) => {
      return (
        child.classList.contains("SF7xd") ||
        child.querySelector(".SF7xd") ||
        child.querySelector('[jscontroller="xdV1C"]')
      );
    });

    if (!moreButton) return false;

    // Get an existing button to copy its style
    const existingButton = document.querySelector(
      'div[role="listitem"]:not(.SF7xd)'
    );
    if (!existingButton) return false;

    // Create and add Reddit filter button
    const redditButton = createFilterButton(
      "Reddit",
      "site:reddit.com ",
      existingButton
    );
    if (redditButton) {
      redditButton.setAttribute("data-custom-filter", "reddit");
      filterToolbar.insertBefore(redditButton, moreButton);
    }

    // Create and add GitHub filter button
    const githubButton = createFilterButton(
      "GitHub",
      "site:github.com ",
      existingButton
    );
    if (githubButton) {
      githubButton.setAttribute("data-custom-filter", "github");
      filterToolbar.insertBefore(githubButton, moreButton);
    }

    return true;
  }

  function createFilterButton(text, sitePrefix, templateButton) {
    // Create a list item div
    const listItem = document.createElement("div");
    listItem.setAttribute("role", "listitem");

    // Create the anchor element with the same classes as template
    const anchor = document.createElement("a");
    const templateAnchor = templateButton.querySelector("a");
    if (templateAnchor) {
      anchor.className = templateAnchor.className;
    } else {
      anchor.className = "nPDzT T3FoJb";
    }

    // Set up the anchor properties
    anchor.setAttribute("role", "link");
    anchor.href = "#";

    // Create the inner div with the same classes as template
    const innerDiv = document.createElement("div");
    const templateInnerDiv = templateAnchor
      ? templateAnchor.querySelector("div")
      : null;
    if (templateInnerDiv) {
      innerDiv.className = templateInnerDiv.className;
    } else {
      innerDiv.className = "YmvwI";
    }

    innerDiv.textContent = text;

    // Add click handler
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      modifySearchQuery(sitePrefix);
    });

    // Put it all together
    anchor.appendChild(innerDiv);
    listItem.appendChild(anchor);

    return listItem;
  }

  function modifySearchQuery(prefix) {
    // Get the current search query from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const currentQuery = urlParams.get("q") || "";

    // Check if the prefix is already in the query
    if (!currentQuery.includes(prefix)) {
      // Add the prefix to the beginning of the query
      const newQuery = prefix + currentQuery;
      urlParams.set("q", newQuery);

      // Navigate to the new search URL
      window.location.href = `${window.location.origin}${
        window.location.pathname
      }?${urlParams.toString()}`;
    }
  }
})();
