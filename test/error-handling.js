/* eslint-env mocha */

const assert = require('assert')
const replaceColor = require('../')

describe('Error handling', function () {
  it('should be an instance of both "Error" and "ReplaceColorError" classes in case of the ReplaceColor error', (done) => {
    replaceColor({})
      .catch((err) => {
        assert.strictEqual(err instanceof Error, true)
        assert.strictEqual(err instanceof replaceColor.ReplaceColorError, true)

        done()
      })
  })

  it('should throw an error if a passed "callback" is not a function', (done) => {
    try {
      replaceColor({}, {})
    } catch (err) {
      assert.strictEqual(err.code, 'PARAMETER_INVALID')
      assert.strictEqual(err.field, 'callback')

      done()
    }
  })

  it('should return an error if an "options.image" value was not passed', (done) => {
    replaceColor({})
      .catch((err) => {
        assert.strictEqual(err.code, 'PARAMETER_REQUIRED')
        assert.strictEqual(err.field, 'options.image')

        done()
      })
  })

  it('should return an error if an "options.colors" value was not passed', (done) => {
    replaceColor({
      image: './test/files/watermark.jpg'
    })
      .catch((err) => {
        assert.strictEqual(err.code, 'PARAMETER_REQUIRED')
        assert.strictEqual(err.field, 'options.colors')

        done()
      })
  })

  it('should return an error if an "options.colors.type" value is invalid', (done) => {
    replaceColor({
      image: './test/files/watermark.jpg',
      colors: {
        type: 'invalidType'
      }
    })
      .catch((err) => {
        assert.strictEqual(err.code, 'PARAMETER_INVALID')
        assert.strictEqual(err.field, 'options.colors.type')

        done()
      })
  })

  it('should return an error if an "options.colors.targetColor" HEX value is invalid', (done) => {
    replaceColor({
      image: './test/files/watermark.jpg',
      colors: {
        type: 'hex',
        targetColor: 'invalidHex',
        replaceColor: ''
      }
    })
      .catch((err) => {
        assert.strictEqual(err.code, 'PARAMETER_INVALID')
        assert.strictEqual(err.field, 'options.colors.targetColor')

        done()
      })
  })

  it('should return an error if an "options.colors.replaceColor" HEX value is invalid', (done) => {
    replaceColor({
      image: './test/files/watermark.jpg',
      colors: {
        type: 'hex',
        targetColor: '#FFFFFF',
        replaceColor: 'invalidHex'
      }
    })
      .catch((err) => {
        assert.strictEqual(err.code, 'PARAMETER_INVALID')
        assert.strictEqual(err.field, 'options.colors.replaceColor')

        done()
      })
  })

  it('should return an error if an "options.colors.targetColor" RGB value is invalid', (done) => {
    replaceColor({
      image: './test/files/watermark.jpg',
      colors: {
        type: 'rgb',
        targetColor: 'invalidRgb',
        replaceColor: ''
      }
    })
      .catch((err) => {
        assert.strictEqual(err.code, 'PARAMETER_INVALID')
        assert.strictEqual(err.field, 'options.colors.targetColor')

        done()
      })
  })

  it('should return an error if an "options.colors.replaceColor" RGB value is invalid', (done) => {
    replaceColor({
      image: './test/files/watermark.jpg',
      colors: {
        type: 'rgb',
        targetColor: [255, 255, 255],
        replaceColor: 'invalidRgb'
      }
    })
      .catch((err) => {
        assert.strictEqual(err.code, 'PARAMETER_INVALID')
        assert.strictEqual(err.field, 'options.colors.replaceColor')

        done()
      })
  })

  it('should return an error if an "options.formula" value is invalid', (done) => {
    replaceColor({
      image: './test/files/watermark.jpg',
      colors: {
        type: 'hex',
        targetColor: '#FFFFFF',
        replaceColor: '#000000'
      },
      formula: 'invalidFormula'
    })
      .catch((err) => {
        assert.strictEqual(err.code, 'PARAMETER_INVALID')
        assert.strictEqual(err.field, 'options.formula')

        done()
      })
  })

  it('should return an error if an "options.deltaE" value is not a number', (done) => {
    replaceColor({
      image: './test/files/watermark.jpg',
      colors: {
        type: 'hex',
        targetColor: '#FFFFFF',
        replaceColor: '#000000'
      },
      formula: 'E00',
      deltaE: 'notANumber'
    })
      .catch((err) => {
        assert.strictEqual(err.code, 'PARAMETER_INVALID')
        assert.strictEqual(err.field, 'options.deltaE')

        done()
      })
  })

  it('should return an error if an "options.deltaE" value is less than 0', (done) => {
    replaceColor({
      image: './test/files/watermark.jpg',
      colors: {
        type: 'hex',
        targetColor: '#FFFFFF',
        replaceColor: '#000000'
      },
      formula: 'E00',
      deltaE: -1
    })
      .catch((err) => {
        assert.strictEqual(err.code, 'PARAMETER_INVALID')
        assert.strictEqual(err.field, 'options.deltaE')

        done()
      })
  })

  it('should return an error if an "options.deltaE" value is greater than 100', (done) => {
    replaceColor({
      image: './test/files/watermark.jpg',
      colors: {
        type: 'hex',
        targetColor: '#FFFFFF',
        replaceColor: '#000000'
      },
      formula: 'E00',
      deltaE: 101
    })
      .catch((err) => {
        assert.strictEqual(err.code, 'PARAMETER_INVALID')
        assert.strictEqual(err.field, 'options.deltaE')

        done()
      })
  })

  it('should return an error if a passed "image" value is invalid', (done) => {
    replaceColor({
      image: './nonExistentFolder/nonExistentImage.jpg',
      colors: {
        type: 'hex',
        targetColor: '#FFFFFF',
        replaceColor: '#000000'
      }
    })
      .catch((err) => {
        assert.strictEqual(err instanceof Error, true)

        done()
      })
  })
})
