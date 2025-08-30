// ==UserScript==
// @name        Bing Reddit Filter
// @namespace   https://github.com/spencer119/userscripts
// @match       https://www.bing.com/search*
// @grant       none
// @run-at      document-end
// @version     1.3
// @author      spencer119
// @description Adds a Reddit filter button to Bing search navbar, highlights it when active, and allows toggling/removing the filter via other nav items.
// ==/UserScript==

(function () {
  "use strict";

  // Wait until the DOM is fully loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    const nav = document.querySelector(".b_scopebar ul");
    if (!nav) return;

    // Create Reddit nav item
    const li = document.createElement("li");
    li.setAttribute("class", "");
    li.setAttribute("data-menuurl", "");
    li.setAttribute("id", "b-scopeListItem-reddit");
    li.setAttribute("data-query", "");

    const a = document.createElement("a");
    a.setAttribute("class", "");
    a.setAttribute("aria-current", "false");
    a.setAttribute("disableredirectlink", "False");
    a.setAttribute("href", "#");
    a.textContent = "Reddit";

    li.appendChild(a);

    // Insert before the Video nav item
    const videoLi = document.getElementById("b-scopeListItem-video");
    if (videoLi) {
      nav.insertBefore(li, videoLi);
    } else {
      nav.appendChild(li); // fallback
    }

    // Highlight active filter based on current query
    const currentUrl = new URL(window.location.href);
    const currentQ = currentUrl.searchParams.get("q") || "";
    const isReddit = currentQ.includes("site:reddit.com");
    // Remove active class from all li elements
    nav.querySelectorAll("li").forEach((el) => el.setAttribute("class", ""));
    if (isReddit) {
      li.setAttribute("class", "b_active");
    }

    // Click handler to toggle Reddit filter
    li.addEventListener("click", function (e) {
      e.preventDefault();
      const url = new URL(window.location.href);
      const q = url.searchParams.get("q") || "";
      if (q.includes("site:reddit.com")) {
        // Remove the filter
        const cleaned = q.replace(/\bsite:reddit\.com\s+/i, "");
        url.searchParams.set("q", cleaned.trim());
      } else {
        // Add the filter
        const newQ = "site:reddit.com " + q;
        url.searchParams.set("q", newQ);
      }
      window.location.href = url.toString();
    });

    // Helper to remove Reddit filter from a query string
    function stripReddit(q) {
      return q.replace(/\bsite:reddit\.com\s+/i, "").trim();
    }

    // Handle clicking the "All" (web) nav item
    const webLi = document.getElementById("b-scopeListItem-web");
    if (webLi) {
      webLi.addEventListener("click", function (e) {
        e.preventDefault();
        const url = new URL(window.location.href);
        const q = url.searchParams.get("q") || "";
        const cleaned = stripReddit(q);
        url.searchParams.set("q", cleaned);
        window.location.href = url.toString();
      });
    }

    // Handle clicking the Copilot search nav item
    const copilotLi = document.getElementById("b-scopeListItem-copilotsearch");
    if (copilotLi) {
      copilotLi.addEventListener("click", function (e) {
        e.preventDefault();
        const url = new URL(window.location.href);
        const q = url.searchParams.get("q") || "";
        const cleaned = stripReddit(q);
        url.searchParams.set("q", cleaned);
        // After removing Reddit filter, navigate to Copilot's original href
        const targetHref = copilotLi.querySelector("a").href;
        const targetUrl = new URL(targetHref);
        const targetQ = targetUrl.searchParams.get("q") || "";
        const cleanedTargetQ = stripReddit(targetQ);
        targetUrl.searchParams.set("q", cleanedTargetQ);
        window.location.href = targetUrl.toString();
      });
    }
  }
})();
