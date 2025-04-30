# Application Overview

Your task is to create a web scraping application in python that is designed to scrape the website documentation for coding libraries. This tool is designed to turn website documentation into easy to read, formatted, local files that mirror the documentation on the website.
You will use the library BeautifulSoup4 to perform the web scraping operations.

# Website to scrape

The website with the documentation we will be scraping is: "https://nilesoft.org/docs". Below in the subsection "Documentation Page Links" I have listed all the URLs that need to be scraped from the documentation website.

## What to copy

From each URL you scrape, you should save the contents of the main div. Here is an example using the app function's documentation page's main div (it is the same on each /docs/\* page):

```html
<div id="content" class="column">
  <div class="content">
    <h5>APP</h5>
    <br />
    <p>
      The namespace of the application contains file paths, version and some
      details.
    </p>
    <br />
    <section id="app.directory" class="my-5">
      <h5>app.directory</h5>
      <p>Returns the path of <b>Shell</b> directory.</p>
      <p>Syntax</p>
      <pre><code>app.directory     // usage in section context
'@app.directory'  // usage inside quoted-string literals</code></pre>
    </section>

    <section id="app.cfg" class="my-5">
      <h5>app.cfg</h5>
      <p>
        Returns the path of the
        <a href="/docs/configuration/index.html#shell.nss"
          >configuration file</a
        >
        <code>shell.nss</code> (or <code>shell.shl</code> in older
        installations).
      </p>
      <p>Syntax</p>
      <pre><code>app.cfg     // usage in section context
'@app.cfg'  // usage inside quoted-string literals</code></pre>
    </section>

    <section id="app.dll" class="my-5">
      <h5>app.dll</h5>
      <p>Returns the path of <code>shell.dll</code>.</p>
      <p>Syntax</p>
      <pre><code>app.dll     // usage in section context
'@app.dll'  // usage inside quoted-string literals</code></pre>
    </section>

    <section id="app.exe" class="my-5">
      <h5>app.exe</h5>
      <p>Returns the path of <code>shell.exe</code>.</p>
      <p>Syntax</p>
      <pre><code>app.exe     // usage in section context
'@app.exe'  // usage inside quoted-string literals</code></pre>
    </section>

    <section id="app.name" class="my-5">
      <h5>app.name</h5>
      <p>Returns application name.</p>
      <p>Syntax</p>
      <pre><code>app.name     // usage in section context
'@app.name'  // usage inside quoted-string literals</code></pre>
    </section>

    <section id="app.version" class="my-5">
      <h5>app.version</h5>
      <p>Returns <b>Shell</b> version.</p>
      <p>Syntax</p>
      <pre><code>app.version     // usage in section context
'@app.version'  // usage inside quoted-string literals</code></pre>
    </section>

    <section id="app.is64" class="my-5">
      <h5>app.is64</h5>
      <p>Returns the architecture of the application.</p>
      <p>Syntax</p>
      <pre><code>app.is64     // usage in section context
'@app.is64'  // usage inside quoted-string literals</code></pre>
    </section>

    <section id="app.about" class="my-5">
      <h5>app.about</h5>
      <p>Returns <b>Shell</b> information.</p>
      <p>Syntax</p>
      <pre><code>app.about     // usage in section context
'@app.about'  // usage inside quoted-string literals</code></pre>
    </section>

    <section id="app.reload" class="my-5">
      <h5>app.reload</h5>
      <p>
        Reload the
        <a href="/docs/configuration/index.html#shell.nss">configuration file</a
        >.
      </p>
      <p>Syntax</p>
      <pre><code>app.reload     // usage in section context
'@app.reload'  // usage inside quoted-string literals</code></pre>
    </section>

    <section id="app.unload" class="my-5">
      <h5>app.unload</h5>
      <p>
        Unload the
        <a href="/docs/configuration/index.html#shell.nss">configuration file</a
        >.
      </p>
      <p>Syntax</p>
      <pre><code>app.unload     // usage in section context
'@app.unload'  // usage inside quoted-string literals</code></pre>
    </section>

    <hr />
    <div id="improve" class="my-5">
      <p class="">
        This page is <strong class="has-text-grey">open source</strong>. Noticed
        a typo? Or something unclear?
        <br />
        <a
          href="https://github.com/moudey/shell/blob/main/docs/functions/app.html"
          style="border-bottom: 1px solid currentColor;"
        >
          Improve this page on GitHub
        </a>
      </p>
    </div>
  </div>
</div>
```

## Documentation Page Links

This list contains all the URLs you need to scrape from the documentation.

https://nilesoft.org/docs
https://nilesoft.org/docs/installation
https://nilesoft.org/docs/get-started
https://nilesoft.org/docs/configuration
https://nilesoft.org/docs/configuration/settings
https://nilesoft.org/docs/configuration/themes
https://nilesoft.org/docs/configuration/modify-items
https://nilesoft.org/docs/configuration/new-items
https://nilesoft.org/docs/configuration/properties
https://nilesoft.org/docs/expressions
https://nilesoft.org/docs/expressions/comments
https://nilesoft.org/docs/expressions/variables
https://nilesoft.org/docs/expressions/string
https://nilesoft.org/docs/expressions/numeric
https://nilesoft.org/docs/expressions/color
https://nilesoft.org/docs/expressions/operators
https://nilesoft.org/docs/expressions/identifier
https://nilesoft.org/docs/functions
https://nilesoft.org/docs/functions/app
https://nilesoft.org/docs/functions/appx
https://nilesoft.org/docs/functions/color
https://nilesoft.org/docs/functions/command
https://nilesoft.org/docs/functions/id
https://nilesoft.org/docs/functions/image
https://nilesoft.org/docs/functions/io
https://nilesoft.org/docs/functions/key
https://nilesoft.org/docs/functions/msg
https://nilesoft.org/docs/functions/path
https://nilesoft.org/docs/functions/process
https://nilesoft.org/docs/functions/reg
https://nilesoft.org/docs/functions/sel
https://nilesoft.org/docs/functions/str
https://nilesoft.org/docs/functions/sys
https://nilesoft.org/docs/functions/this
https://nilesoft.org/docs/functions/user
https://nilesoft.org/docs/functions/window
https://nilesoft.org/docs/functions/clipboard
https://nilesoft.org/docs/functions/input
https://nilesoft.org/docs/functions/ini
https://nilesoft.org/docs/functions/regex
https://nilesoft.org/docs/examples/copy-path
https://nilesoft.org/docs/examples/favorites
https://nilesoft.org/docs/examples/goto
