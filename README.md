# Markdown web-component

*A simple wrapper around [showdown](https://github.com/showdownjs/showdown/)'s markdown parser, in the form of a web-component.*



### Import/Include module

  ```html
  <script type="module" src="https://tomyo.github.io/mark-down/mark-down.js" >
  ```

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

  ```js
    document.querySelector('mark-down').innerHTML = `
      # Some title
      ...
      A paragraph
      * A
      * List
    `
 ```

### More info
* [Demo](./demo.html)
* [Tests](./tests/shouldParseMD.html)
* [Github](https://github.com/tomyo/mark-down)

