# Overview

Your task is to assist in creating, editing, debugging, etc. a browser userscript for the userscript manager extension TamperMonkey. You will write the userscript in the file #file:google-filters.js .

The userscript is going to be for searches on "google.com", so the userscript should be for urls that match anything starting with "<https://www.google.com/search>".

# Userscript Details

The userscript will be modifying the search filter toolbar at the top of the google search page below the search box.
You will be adding additional buttons to the search filter toolbar on the google search results page. All the buttons for the search filter toolbar are in a div with role="list" (Alternatively the list div has a full XPath "/html/body/div[3]/div/div[4]/div/div/div/div/div[1]/div/div/div/div/div[1]/div").

You will be adding buttons at the end of the search filter toolbar, after the last filter but before the More button with 3 dots. It will be the last listitem in the list div, and it will be before the More button div at the end of the list (you can find the more div at the very end of the toolbar with the XPath "/html/body/div[3]/div/div[4]/div/div/div/div/div[1]/div/div/div/div/div[1]/div/div[8]")

# New Buttons to Add

New buttons should look the same as the existing filter buttons like "Images", "Video", "Shopping", "News", etc.
They will be added at the end of the list, but before the 3 dots icon More button.

The new buttons you will be adding to the toolbar are:

## Reddit Search Filter (New Button)

- The button should say "Reddit".
- When the Reddit search filter button is clicked, append text to the beginning of the search query. You will be adding "site:reddit.com " to the beginning of the google search query.
  - For example, if I searched "go lang" and im on the URL "<https://www.google.com/search?q=go+lang>". Clicking the reddit button would navigate me to the page "<https://www.google.com/search?q=site%3Areddit.com+go+lang>"

## GitHub Search Filter (New Button)

- The button should say "GitHub".
- When the GitHub search filter button is clicked, append text to the beginning of the search query. You will be adding "site:github.com " to the beginning of the google search query.
  - For example, if I searched "best react frameworks" and im on the URL "<https://www.google.com/search?q=sitebest+react+frameworks>". Clicking the GitHub button would navigate me to the page "<https://www.google.com/search?q=site%3Agithub.com%3A+best+react+frameworks>"

# Context and Example Source Code

Example html source code of what the expected html on a google search has been provided.
In list.html there is example source code for the list div which contains listitem divs for each filter. This example list has the following search filters in the toolbar from left to right:
AI Mode, All, Images, Shopping, Videos, Short videos, Forums, : More

In this example the userscript would change the toolbar to have two more listitem divs before the More button (the More button is a unique listitem because it has a jsaction and jscontroller attribute). The new order of the list would be:
AI Mode, All, Images, Shopping, Videos, Short videos, Forums, Reddit, GitHub, : More

# Overview

Your task is to assist in creating, editing, debugging, etc. a browser userscript for the userscript manager extension TamperMonkey. You will write the userscript in new file google-filters.user.js

The userscript is going to be for automatically adding new filter buttons to every search result Google. So, the userscript should be for urls that match google search queries.

# Userscript Details

The userscript will be modifying the search filter toolbar at the top of the google search page below the search box.
You will be adding additional buttons to the search filter toolbar on the google search results page. All the buttons for the search filter toolbar are in a div with role="list"

To familiarize yourself with the structure of the web page. Analyze

You will be appending new buttons at the end of the list div. You will append the new buttons in the second to last position of the list. The new buttons will be added after the last listitem

# Context and Example Source Code

You have been provided with example source files

# General HTML Structure

- The first main parent div is a div with class="main" id="main". All other needed divs will be within this one. This will be referred to as the main div. You can see an example of the source code in example.html
- The next element you will need is the list div. The div has a role="list" and contains listitem children elements. Each of the listitem divs here is a button for a search filter. This div will be referred to as the list div.
  - The last element in the list div has attributes like: `<div jscontroller="xdV1C" class="SF7xd" role="listitem" jsaction="rcuQ6b:npT2md;KyPa0e:Y0y4c">`. This is the More button in the toolbar.

## Reddit Search Filter (New Button)

- The button should say "Reddit".
- When the Reddit search filter button is clicked, append text to the beginning of the search query. You will be adding "site:reddit.com " to the beginning of the google search query.
  - For example, if I searched "go lang" and im on the URL "<https://www.google.com/search?q=go+lang>". Clicking the reddit button would navigate me to the page "<https://www.google.com/search?q=site%3Areddit.com+go+lang>"

## GitHub Search Filter (New Button)

- The button should say "GitHub".
- When the GitHub search filter button is clicked, append text to the beginning of the search query. You will be adding "site:github.com " to the beginning of the google search query.
  - For example, if I searched "best react frameworks" and im on the URL "<https://www.google.com/search?q=sitebest+react+frameworks>". Clicking the GitHub button would navigate me to the page "<https://www.google.com/search?q=site%3Agithub.com%3A+best+react+frameworks>"
