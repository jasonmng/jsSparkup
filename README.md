jsSparkup
=========

This is a class that is very similar in functionality to 
https://github.com/rstacruz/sparkup, with some slight differences at the moment.

You can write HTML in a CSS-like syntax, and have jsSparkup handle the expansion to full HTML code.

Examples
--------

**`sparkup.build('html_text_here')`** returns elements ready for dom insertion

**`sparkup.build('div')`** expands to:

```html
<div></div>
```

**`sparkup.build('div#header')`** expands to:

```html
    <div id="header"></div>
```

**`sparkup.build('div.align-left#header')`** expands to:

```html
    <div id="header" class="align-left"></div>
```

**`sparkup.build('div#header div#footer')`** expands to:

```html
    <div id="header"></div>
    <div id="footer"></div>
```

**`sparkup.build('div#menu > ul')`** expands to:

```html
    <div id="menu">
        <ul></ul>
    </div>
```

**`sparkup.build('div#header > h1{Welcome to our site}')`** expands to:

```html
    <div id="header">
        <h1>Welcome to our site</h1>
    </div>
```

**`sparkup.build('a[href=index.html]{Home}')`** expands to:

```html
    <a href="index.html">Home</a>
```


**`sparkup.build('div#header > ul > li < < p{Footer}')`** expands to:

```html
    <!-- The < symbol goes back up the parent; i.e., the opposite of >. -->
    <div id="header">
        <ul>
            <li></li>
        </ul>
        <p>Footer</p>
    </div>
```
