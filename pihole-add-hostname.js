// ==UserScript==
// @name         pihole add hostname
// @namespace    https://github.com/spencer119/userscripts/
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Replace specific IP addresses with custom names in the table on admin queries page.
// @author       spencer119
// @install      https://raw.githubusercontent.com/spencer119/userscripts/master/pihole-add-hostname.js
// @match        http://10.0.0.111/admin/queries.php*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function replaceTextInTable() {
    const replacements = {
      "10.0.0.4": "xps",
      "10.0.0.3": "desktop",
      "10.0.0.160": "tv",
      "10.0.0.5": "pixel",
    };

    const table = document.getElementById("all-queries");
    if (!table) return;

    const rows = table.getElementsByTagName("tr");
    for (let row of rows) {
      const cells = row.getElementsByTagName("td");
      for (let cell of cells) {
        if (replacements.hasOwnProperty(cell.textContent.trim())) {
          cell.textContent = replacements[cell.textContent.trim()];
        }
      }
    }
  }

  const observer = new MutationObserver((mutations) => {
    replaceTextInTable();
  });

  const config = { childList: true, subtree: true };
  const targetNode = document.getElementById("all-queries");
  if (targetNode) {
    observer.observe(targetNode, config);
  }

  replaceTextInTable();
})();
