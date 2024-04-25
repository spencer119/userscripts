// ==UserScript==
// @name        reddit google search
// @namespace   https://github.com/spencer119/userscripts
// @include     http*://www.google.*/search*
// @include     http*://google.*/search*
// @match       https://violentmonkey.github.io/posts/how-to-edit-scripts-with-your-favorite-editor/*
// @grant       none
// @version     1.0
// @author      spencer119
// @description 4/24/2024, 9:45:21 PM
// @run-at       document-end
// ==/UserScript==
(function () {
  "use strict";
  function searchReddit() {
    let currentUrl = new URL(window.location.href);
    let queryParam = currentUrl.searchParams.get("q");
    const redditSearch = "site:reddit.com";

    // Check if the Reddit site search is already in the query
    if (queryParam.includes(redditSearch)) {
      // If it is, remove it
      let newQueryParam = queryParam
        .replace(`${redditSearch} `, "")
        .replace(redditSearch, "");
      currentUrl.searchParams.set("q", newQueryParam);
    } else {
      // If not, add it
      currentUrl.searchParams.set("q", `${redditSearch} ${queryParam}`);
    }

    // Redirect to the new URL
    window.location.href = currentUrl.toString();
  }
  var container = document.querySelector(".crJ18e");
  let redditDiv = document.createElement("div");
  let moreDiv = document.querySelector(".SF7xd");
  redditDiv.className = "LtmTod";

  // Create the anchor element and set attributes
  let redditLink = document.createElement("a");
  redditLink.className = "LatpMc d4DFfb nPDzT T3FoJb";
  redditLink.href = "javascript:void(0);";
  redditLink.addEventListener("click", searchReddit);

  // Create the button label
  let redditLabel = document.createElement("div");
  redditLabel.className = "eJWNqc YmvwI";
  redditLabel.textContent = "Reddit";

  // Append the label to the link, and the link to the div
  redditLink.appendChild(redditLabel);
  redditDiv.appendChild(redditLink);

  // redditDiv.innerHTML = `<a href="javascript:void(0);" onclick="(${searchReddit.toString()})()">Reddit</a>`;
  // redditDiv.innerHTML = `
  //       <a class="LatpMc d4DFfb nPDzT T3FoJb"  onclick="alert('test')">
  //           <div class="eJWNqc YmvwI">Reddit</div>
  //       </a>
  //   `;
  if (container) {
    container.insertBefore(redditDiv, moreDiv);
    // container.appendChild(redditDiv);
  }
})();

{
  /* <div */
}
{
  /*   data-hveid="CBIQAA" */
}
{
  /*   data-ved="2ahUKEwipno2gv9yFAxVYIjQIHXjqBzAQtoAJKAB6BAgSEAA" */
}
{
  /* > */
}
{
  /*   <a */
}
{
  /*     href="/search?sca_esv=bdce78cde9db5882&amp;sxsrf=ACQVn09FH8AO_kFz0ZDCbiTPoZUzFeFroA:1714018167516&amp;q=fsdjklfs&amp;tbm=nws&amp;source=lnms&amp;prmd=ivnmbtz&amp;sa=X&amp;ved=2ahUKEwipno2gv9yFAxVYIjQIHXjqBzAQ0pQJegQIEhAB" */
}
{
  /*     class="LatpMc nPDzT T3FoJb" */
}
{
  /*     jsname="VIftV" */
}
{
  /*     role="link" */
}
{
  /*     data-hveid="CBIQAQ" */
}
{
  /*     data-ved="2ahUKEwipno2gv9yFAxVYIjQIHXjqBzAQ0pQJegQIEhAB" */
}
{
  /*   > */
}
{
  /*     <div jsname="bVqjv" class="YmvwI"> */
}
{
  /*       News */
}
{
  /*     </div> */
}
{
  /*   </a> */
}
{
  /* </div>; */
}
