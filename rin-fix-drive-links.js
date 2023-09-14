// ==UserScript==
// @name        remove share
// @namespace   Violentmonkey Scripts
// @match       https://privatebin.rinuploads.org/*
// @grant       none
// @version     1.0
// @author      spencer119
// @description 5/17/2023, 9:11:09 PM
// ==/UserScript==

(function () {
    'use strict';

    // Create a new button and set its properties
    var button = document.createElement('button');
    button.innerHTML = 'Clean Google Drive Links';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.zIndex = '1000';
    document.body.appendChild(button);

    // Define what happens when the button is clicked
    button.addEventListener('click', function () {
        // Get all <a> elements on the page
        var links = document.getElementsByTagName('a');

        for (var i = 0; i < links.length; i++) {
            // Check if the link contains "/view?usp=sharing", if so, remove it
            if (links[i].href.includes('/view?usp=sharing')) {
                links[i].href = links[i].href.replace('/view?usp=sharing', '');
            }
            links[i].textContent = links[i].href;
        }
        // Find the <pre> tag with the id 'prettyprint'
        var preTag = document.getElementById('prettyprint');

        // Create a new text node with the content 'Links Fixed'
        var textNode = document.createTextNode('Links Fixed\n');

        // Add the new text node to the top of the 'prettyprint' <pre> tag
        preTag.prepend(textNode);
    });
})();