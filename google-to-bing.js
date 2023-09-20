// ==UserScript==
// @name        Google to Bing
// @namespace   Violentmonkey Scripts
// @match       https://www.google.com/search*
// @grant       none
// @version     1.0
// @author      spencer119
// @description 9/19/2023, 11:14:54 PM
// ==/UserScript==
(function() {
 'use strict';
  const logo = document.querySelector('div.logo > a');
  const search = document.getElementById("APjFqb");
  const q = encodeURIComponent(search.value)
  logo.href = "https://bing.com/search?q=" + q
})();
