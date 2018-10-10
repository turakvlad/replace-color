# Replace Color [![Travis Build Status](https://img.shields.io/travis/turakvlad/replace-color.svg)](https://travis-ci.org/turakvlad/replace-color) [![JavaScript Standard Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard) [![NPM Version](https://img.shields.io/npm/v/replace-color.svg)](https://www.npmjs.com/package/replace-color)

`replace-color` replaces color with another one pixel by pixel. Especially this will be helpful if you want to remove the watermarks from the images. This package is built on top of [Jimp](https://github.com/oliver-moran/jimp).

## Install

```sh
npm install --save replace-color
```

## Basic usage

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
    * `targetColor` *[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) (required)* - a color you want to replace. A 7-symbol string in case of `hex` type (e.g. `#000000`, `#FFFFFF`). An array of `3` integers from `0` to `255` in case of `rgb` type (e.g. `[0, 0, 0]`, `[255, 255, 255]`).
    * `replaceColor` *[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) (required)* - a new color which will be used instead of a `targetColor` color. A 7-symbol string in case of `hex` type (e.g. `#000000`, `#FFFFFF`). An array of `3` integers from `0` to `255` in case of `rgb` type (e.g. `[0, 0, 0]`, `[255, 255, 255]`). You can also define a transparent channel for a `replaceColor` color. To achieve this, you can use a 9-symbol string in case of `hex` type (e.g. `#00000000`, `#FFFFFFFF`). Based on [this Stack Overflow answer](https://stackoverflow.com/questions/23201134/transparent-argb-hex-value/23201304#23201304), an alpha channel is controlled by the first pair of digits in a hex code (e.g., `00` means fully transparent, `7F` means 50%, `FF` means fully opaque). Also, you can use an array of `4` integers in case of `rgb` type. The first `3` integers must be from `0` to `255` and the last one must be from `0` to `1` (e.g., `0` means fully transparent, `0.5` means 50%, `1` means fully opaque).
  * `formula` *[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) (optional)* - one of the three formulas to calculate the [collor difference](https://en.wikipedia.org/wiki/Color_difference). Supported values are [`E76`](https://en.wikipedia.org/wiki/Color_difference#CIE76), [`E94`](https://en.wikipedia.org/wiki/Color_difference#CIE94) and [`E00`](https://en.wikipedia.org/wiki/Color_difference#CIEDE2000). The default value is `E00` (the best algorithm).
  * `deltaE` *[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) (optional)* - a `deltaE` value which corresponds to a [JND](https://en.wikipedia.org/wiki/Just-noticeable_difference). The default value is `2.3`. Please, read more about `deltaE` [here](http://zschuessler.github.io/DeltaE/learn/). Generaly speaking, if the processed by the `replace-color` package image still has the watermarks, you should increase the `deltaE` value.
* `callback` *[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) (optional)* - a Node.js error-first callback.

## Examples

### Remove a watermark

Let's try to remove a watermark from [this](https://i.imgur.com/XqNTuzp.jpg) picture.

```javascript
const replaceColor = require('replace-color')

replaceColor({
  image: 'https://i.imgur.com/XqNTuzp.jpg',
  colors: {
    type: 'hex',
    targetColor: '#FFB3B7',
    replaceColor: '#FFFFFF'
  },
  deltaE: 20
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

#### Result
![Example](https://i.imgur.com/d5PNhnt.jpg)

### Change a background color from a green to a blue one

Let's try to change a background color for [this](https://i.imgur.com/aCxZpaq.png) picture.

```javascript
const replaceColor = require('replace-color')

replaceColor({
  image: 'https://i.imgur.com/aCxZpaq.png',
  colors: {
    type: 'hex',
    targetColor: '#66AE74',
    replaceColor: '#63A4FF'
  },
  deltaE: 10
})
  .then((jimpObject) => {
    jimpObject.write('./output.png', (err) => {
      if (err) return console.log(err)
    })
  })
  .catch((err) => {
    console.log(err)
  })
```

#### Result
![Example](https://i.imgur.com/c0JT5tn.png)

### Change a background color from a green to a transparent one (using `hex` type)

Let's try to change a background color for [this](https://i.imgur.com/aCxZpaq.png) picture.

```javascript
const replaceColor = require('replace-color')

replaceColor({
  image: 'https://i.imgur.com/aCxZpaq.png',
  colors: {
    type: 'hex',
    targetColor: '#66AE74',
    replaceColor: '#00000000'
  },
  deltaE: 10
})
  .then((jimpObject) => {
    jimpObject.write('./output.png', (err) => {
      if (err) return console.log(err)
    })
  })
  .catch((err) => {
    console.log(err)
  })
```

#### Result
![Example](https://i.imgur.com/jmzpmBa.png)

### Change a background color from a green to a 50% transparent green (using `rgb` type)

Let's try to change a background color for [this](https://i.imgur.com/aCxZpaq.png) picture.

```javascript
const replaceColor = require('replace-color')

replaceColor({
  image: 'https://i.imgur.com/aCxZpaq.png',
  colors: {
    type: 'rgb',
    targetColor: [102, 174, 116],
    replaceColor: [102, 174, 116, 0.5]
  },
  deltaE: 10
})
  .then((jimpObject) => {
    jimpObject.write('./output.png', (err) => {
      if (err) return console.log(err)
    })
  })
  .catch((err) => {
    console.log(err)
  })
```

#### Result
![Example](https://i.imgur.com/lL1ox0G.png)

## Error handling

To indicate the `replace-color`'s errors you should use the `err instanceof replaceColor.ReplaceColorError` class.

```javascript
replaceColor({}, (err, jimpObject) => {
  if (err instanceof replaceColor.ReplaceColorError) {
    //  A replace-color's error occurred. 
  } else if (err) {
    // An unknown error occurred.
  }
  
  // Everything went fine.
})
```

A `replace-color`'s `error` instance has the `code` and `field` properties. For now, the package has two codes: `PARAMETER_INVALID` and `PARAMETER_REQUIRED`. The `field` property shows which exact property was not passed or is invalid using the glob notation (e.g. `options.colors.type`). Please, take a look at the [tests](https://github.com/turakvlad/replace-color/tree/master/test/error-handling.js) to see all the possible cases.

## License

[MIT](LICENSE)
