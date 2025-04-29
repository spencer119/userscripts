# Overview

Your task is to assist in creating, editing, debugging, etc. a browser userscript for the userscript manager extension TamperMonkey.

The userscript is going to be for searches on "google.com", so the userscript should be for urls that match anything starting with "<https://www.google.com/search>". 

# Userscript Details

The userscript will be modifying the search filter toolbar at the top of the google search page below the search box.
You will be adding additional buttons to the search filter toolbar on the google search results page. All the buttons for the search filter toolbar are in a div with role="list" (Alternatively the list div has a full XPath "/html/body/div[3]/div/div[4]/div/div/div/div/div[1]/div/div/div/div/div[1]/div").

You will be adding buttons at the end of the search filter toolbar, after the last filter but before the More button with 3 dots. It will be the last listItem in the list div, and it will be before the More button div at the end of the list (you can find the more div at the very end of the toolbar with the XPath "/html/body/div[3]/div/div[4]/div/div/div/div/div[1]/div/div/div/div/div[1]/div/div[8]")

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
