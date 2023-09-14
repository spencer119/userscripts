// ==UserScript==
// @name         dlc list builder
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  make creamapi.ini dlc list on steamdb
// @author       spencer119
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        https://steamdb.info/app/*
// ==/UserScript==
/* jshint esversion: 6 */
(function () {
    let style = `.container_new {display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
} .store{color: #0072c6;}`;

    let button = document.querySelector('[aria-controls="dlc"]');

    if (!button) {
        return;
    }

    let nStyle = document.createElement('style');
    nStyle.innerHTML = style;
    document.head.appendChild(nStyle);

    function filter(data, className, func) {
        return `<p>${data
            .filter(func)
            .map(({ firstElementChild }) => `<span class="${className || ''}">${firstElementChild.innerText}</span> = ${firstElementChild.nextElementSibling.innerText}</br>`)
            .join('')}</p>`;
    }

    function inStore(el) {
        return el.firstElementChild.nextElementSibling.querySelector('.octicon-globe');
    }

    let listener = function (e) {
        let div = document.createElement('div');
        div.className = 'container_new';
        let data = Array.from(document.querySelectorAll('tr.app'));
        div.innerHTML = filter(data, 'store', el => inStore(el)) + filter(data, 'muted', el => !inStore(el) && el.firstElementChild.nextElementSibling.className !== 'muted');
        let cont = document.querySelector('.footer');
        cont.parentElement.insertBefore(div, cont);
        this.removeEventListener('click', listener);
    };

    button.addEventListener('click', listener);
}());