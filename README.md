# Markdown web-component

*A simple wrapper around [showdown](https://github.com/showdownjs/showdown/)'s markdown parser, in the form of a web-component.*

## Instructions

* Download [mark-down.js](mark-down.js) and [use-showdown.js](use-showdown.js)

* Import/Include module: 

  `<script src="mark-down.js" type="module">`

### Usage

* Declarative

  ```html
  <mark-down>
      # Some title
      ...
      A paragraph
      * A
      * List
  </mark-down>
  ```

* Imperative

  `document.querySelector('mark-down').innerHTML = "#whatever ..."`

### More info

* Some [Tests](tests/shouldParseMD.html) (summary shown in console).

* Code is simple, read it :)
