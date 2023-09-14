// ==UserScript==
// @name        Bing to Google
// @namespace   Violentmonkey Scripts
// @match       https://www.bing.com/search*
// @grant       none
// @version     1.0
// @author      spencer119
// @description 8/25/2023, 5:57:28 PM
// ==/UserScript==
(function () {
    'use strict';

    // Get all anchor elements with class 'b_logoArea'
    const logoLinks = document.querySelectorAll('a.b_logoArea');
    const search_box = document.getElementById('sb_form_q');
    const search = search_box.value
    const query = encodeURIComponent(search);
    // Loop through each logo link and update its href
    logoLinks.forEach(link => {
        link.href = 'https://www.google.com/search?q=' + query;
    });
})();