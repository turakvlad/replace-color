# Replace Color [![Build Status](https://api.travis-ci.org/turakvlad/replace-color.svg?branch=master)](https://travis-ci.org/turakvlad/replace-color) [![NPM version](https://badge.fury.io/js/replace-color.svg)](https://badge.fury.io/js/replace-color) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

`replace-color` replaces one color with another one. Especially this will be helpful if you want to remove the watermarks from the images. This package is built on top of [Jimp](https://github.com/oliver-moran/jimp).

![Example](https://i.imgur.com/d5PNhnt.jpg)

## Install

```sh
npm install --save replace-color
```

## Usage

`replace-color` supports both Node.js error-first callbacks and promises. The package returns a Jimp's instance which you can use to execute some other [image manipulations methods](https://github.com/oliver-moran/jimp#image-manipulation-methods) or save it with Jimp's [`write`](https://github.com/oliver-moran/jimp/tree/master/packages/jimp#writing-to-files-and-buffers) method.

### Node.js error-first callback example

```javascript
const replaceColor = require('replace-color')

replaceColor({
  image: './input.jpg',
  colors: {
    type: 'hex',
    targetColor: '#FF0000',
    replaceColor: '#FFFFFF'
  }
}, (err, jimpObject) => {
  if (err) return console.log(err)
  jimpObject.write('./output.jpg', (err) => {
    if (err) return console.log(err)
  })
})
```

### Promise example

```javascript
const replaceColor = require('replace-color')

replaceColor({
  image: './input.jpg',
  colors: {
    type: 'hex',
    targetColor: '#FF0000',
    replaceColor: '#FFFFFF'
  }
})
  .then((jimpObject) => {
    jimpObject.write('./output.jpg', (err) => {
      if (err) return console.log(err)
    })
  })
  .catch((err) => {
    console.log(err)
  })
```

## API

### replaceColor(options, [callback])

* `options` *[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) (required)* - the options.
  * `image` *[Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) | [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) (required)* - an image being processed. It can be a **buffer**, **Jimp's instance**, a **path to an image on your host machine** or a **URL address to an image on the internet**. Please, take a look at the [tests](https://github.com/turakvlad/replace-color/tree/master/test/replace-color.js) to understand all these options.
  * `colors` *[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) (required)* - the colors.
    * `type` *[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) (required)* - a `targetColor` and `replaceColor` type. Supported values are `hex` and `rgb`.
    * `targetColor` *[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) (required)* - a color you want to replace. A string in case of `hex` type (e.g. `#000000`, `#FFFFFF`). An array of `3` integers from `0` to `255` in case of `rgb` type (e.g. `[0, 0, 0]`, `[255, 255, 255]`).
    * `replaceColor` *[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) (required)* - a new color which will be used instead of a `targetColor` color. A string in case of `hex` type (e.g. `#000000`, `#FFFFFF`). An array of `3` integers from `0` to `255` in case of `rgb` type (e.g. `[0, 0, 0]`, `[255, 255, 255]`).
  * `formula` *[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) (optional)* - one of the three formulas to calculate the [collor difference](https://en.wikipedia.org/wiki/Color_difference). Supported values are [`E76`](https://en.wikipedia.org/wiki/Color_difference#CIE76), [`E94`](https://en.wikipedia.org/wiki/Color_difference#CIE94) and [`E00`](https://en.wikipedia.org/wiki/Color_difference#CIEDE2000). The default value is `E00` (the best algorithm).
  * `deltaE` *[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) (optional)* - a `deltaE` value which corresponds to a [JND](https://en.wikipedia.org/wiki/Just-noticeable_difference). The default value is `2.3`. Please, read more about `deltaE` [here](http://zschuessler.github.io/DeltaE/learn/). Generaly speaking, if the processed by the `replace-color` package image still has the watermarks, you should increase the `deltaE` value.
* `callback` *[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) (optional)* - a Node.js error-first callback.

## Error handling

To indicate the `replace-color`'s errors you should use the `err instanceof replaceColor.ReplaceColorError` class.

```javascript
replaceColor({}, (err, jimpObject) => {
  if (err instanceof replaceColor.ReplaceColorError) {
    //  A replace-color's error occured. 
  } else {
    // An uknown error occured.
  }
})
```

A `replace-color`'s `error` instance has the `code` and `field` properties. For now, the package has two codes: `PARAMETER_INVALID` and `PARAMETER_REQUIRED`. The `field` property shows which exact property was not passed or is invalid using the glob notation (e.g. `options.colors.type`). Please, take a look at the [tests](https://github.com/turakvlad/replace-color/tree/master/test/error-handling.js) to see all the possible cases.

## License

[MIT](LICENSE)
