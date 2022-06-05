/* eslint-env mocha */

const assert = require('assert')
const Jimp = require('jimp')
const replaceColor = require('../')
const requestPromise = require('request-promise')

describe('Replace color', function () {
  this.timeout(60000)

  it('should respect a dual callback / promise API and execute an error-first callback with a Jimp instance', (done) => {
    replaceColor(
      {
        image: './test/files/watermark.jpg',
        colors: [
          {
            type: 'hex',
            targetColor: '#FFB3B5',
            replaceColor: '#FFFFFF'
          }
        ]
      },
      (err, jimpObject) => {
        if (err) return done(err)

        assert.strictEqual(jimpObject instanceof Jimp, true)

        done()
      }
    )
  })

  it('should respect a dual callback / promise API and fulfil a promise with a Jimp instance', (done) => {
    replaceColor({
      image: './test/files/watermark.jpg',
      colors: [
        {
          type: 'hex',
          targetColor: '#FFB3B5',
          replaceColor: '#FFFFFF'
        }
      ]
    })
      .then((jimpObject) => {
        assert.strictEqual(jimpObject instanceof Jimp, true)
        done()
      })
      .catch(done)
  })

  it('should fulfil a promise with a Jimp instance when an image is a local path', (done) => {
    replaceColor({
      image: './test/files/watermark.jpg',
      colors: [
        {
          type: 'hex',
          targetColor: '#FFB3B5',
          replaceColor: '#FFFFFF'
        }
      ]
    })
      .then((jimpObject) => {
        assert.strictEqual(jimpObject instanceof Jimp, true)

        done()
      })
      .catch(done)
  })

  it('should fulfil a promise with a Jimp instance when an image is a remote URL', (done) => {
    replaceColor({
      image: 'https://i.imgur.com/XqNTuzp.jpg',
      colors: [
        {
          type: 'hex',
          targetColor: '#FFB3B5',
          replaceColor: '#FFFFFF'
        }
      ]
    })
      .then((jimpObject) => {
        assert.strictEqual(jimpObject instanceof Jimp, true)

        done()
      })
      .catch(done)
  })

  it('should fulfil a promise with a Jimp instance when an image is a Jimp instance', (done) => {
    Jimp.read('./test/files/watermark.jpg')
      .then((jimpObject) => {
        return replaceColor({
          image: jimpObject,
          colors: [
            {
              type: 'hex',
              targetColor: '#FFB3B5',
              replaceColor: '#FFFFFF'
            }
          ]
        })
      })
      .then((jimpObject) => {
        assert.strictEqual(jimpObject instanceof Jimp, true)

        done()
      })
      .catch(done)
  })

  it('should fulfil a promise with a Jimp instance when an image is a buffer', (done) => {
    requestPromise({ url: 'https://i.imgur.com/XqNTuzp.jpg', method: 'GET', encoding: null })
      .then((buffer) => {
        return replaceColor({
          image: buffer,
          colors: [
            {
              type: 'hex',
              targetColor: '#FFB3B5',
              replaceColor: '#FFFFFF'
            }
          ]
        })
      })
      .then((jimpObject) => {
        assert.strictEqual(jimpObject instanceof Jimp, true)

        done()
      })
      .catch(done)
  })

  it('should respect "colors.type" HEX value', (done) => {
    replaceColor({
      image: './test/files/watermark.jpg',
      colors: [
        {
          type: 'hex',
          targetColor: '#FFB3B5',
          replaceColor: '#FFFFFF'
        }
      ]
    })
      .then((jimpObject) => {
        assert.strictEqual(jimpObject instanceof Jimp, true)

        done()
      })
      .catch(done)
  })

  it('should respect "colors.type.replaceColor" AHEX value', (done) => {
    replaceColor({
      image: './test/files/watermark.jpg',
      colors: [
        {
          type: 'hex',
          targetColor: '#FFB3B5',
          replaceColor: '#FFFFFFFF'
        }
      ]
    })
      .then((jimpObject) => {
        assert.strictEqual(jimpObject instanceof Jimp, true)

        done()
      })
      .catch(done)
  })

  it('should respect "colors.type" RGB value', (done) => {
    replaceColor({
      image: './test/files/watermark.jpg',
      colors: [
        {
          type: 'rgb',
          targetColor: [255, 179, 181],
          replaceColor: [255, 255, 255]
        }
      ]
    })
      .then((jimpObject) => {
        assert.strictEqual(jimpObject instanceof Jimp, true)

        done()
      })
      .catch(done)
  })

  it('should respect "colors.type.replaceColor" RGBA value', (done) => {
    replaceColor({
      image: './test/files/watermark.jpg',
      colors: [
        {
          type: 'rgb',
          targetColor: [255, 179, 181],
          replaceColor: [255, 255, 255, 0.5]
        }
      ]
    })
      .then((jimpObject) => {
        assert.strictEqual(jimpObject instanceof Jimp, true)

        done()
      })
      .catch(done)
  })

  it('should respect "colors.formula" E76 value', (done) => {
    replaceColor({
      image: './test/files/watermark.jpg',
      colors: [
        {
          type: 'hex',
          targetColor: '#FFB3B5',
          replaceColor: '#FFFFFF'
        }
      ],
      formula: 'E76'
    })
      .then((jimpObject) => {
        assert.strictEqual(jimpObject instanceof Jimp, true)

        done()
      })
      .catch(done)
  })

  it('should respect "colors.formula" E94 value', (done) => {
    replaceColor({
      image: './test/files/watermark.jpg',
      colors: [
        {
          type: 'hex',
          targetColor: '#FFB3B5',
          replaceColor: '#FFFFFF'
        }
      ],
      formula: 'E94'
    })
      .then((jimpObject) => {
        assert.strictEqual(jimpObject instanceof Jimp, true)

        done()
      })
      .catch(done)
  })

  it('should respect "colors.formula" E00 value', (done) => {
    replaceColor({
      image: './test/files/watermark.jpg',
      colors: [
        {
          type: 'hex',
          targetColor: '#FFB3B5',
          replaceColor: '#FFFFFF'
        }
      ],
      formula: 'E00'
    })
      .then((jimpObject) => {
        assert.strictEqual(jimpObject instanceof Jimp, true)

        done()
      })
      .catch(done)
  })

  it('should respect "colors.formula" deltaE value', (done) => {
    replaceColor({
      image: './test/files/watermark.jpg',
      colors: [
        {
          type: 'hex',
          targetColor: '#FFB3B5',
          replaceColor: '#FFFFFF'
        }
      ],
      deltaE: 50
    })
      .then((jimpObject) => {
        assert.strictEqual(jimpObject instanceof Jimp, true)

        done()
      })
      .catch(done)
  })

  it('should respect "colors.Array" Array Color value', (done) => {
    replaceColor({
      image: './test/files/watermark.jpg',
      colors: [
        {
          type: 'hex',
          targetColor: '#FFB3B5',
          replaceColor: '#FFFFFF'
        },
        {
          type: 'hex',
          targetColor: '#FFB3B5',
          replaceColor: '#DDDDDD'
        },
        {
          type: 'hex',
          targetColor: '#FFB3B5',
          replaceColor: '#DDDDDD'
        }
      ],
      deltaE: 50
    })
      .then((jimpObject) => {
        assert.strictEqual(jimpObject instanceof Jimp, true)

        done()
      })
      .catch(done)
  })

  it('should respect "colors.Array" Array Color with all Delta value', (done) => {
    replaceColor({
      image: './test/files/watermark.jpg',
      colors: [
        {
          type: 'hex',
          targetColor: '#FFB3B5',
          replaceColor: '#FFFFFF',
          deltaE: 5
        },
        {
          type: 'hex',
          targetColor: '#FFB3B5',
          replaceColor: '#DDDDDD',
          deltaE: 5
        },
        {
          type: 'hex',
          targetColor: '#FFB3B5',
          replaceColor: '#DDDDDD',
          deltaE: 5
        }
      ],
      deltaE: 50
    })
      .then((jimpObject) => {
        assert.strictEqual(jimpObject instanceof Jimp, true)

        done()
      })
      .catch(done)
  })

  it('should respect "colors.Array" Array Color with Some Delta value', (done) => {
    replaceColor({
      image: './test/files/watermark.jpg',
      colors: [
        {
          type: 'hex',
          targetColor: '#FFB3B5',
          replaceColor: '#FFFFFF',
          deltaE: 5
        },
        {
          type: 'hex',
          targetColor: '#FFB3B5',
          replaceColor: '#DDDDDD',
        },
        {
          type: 'hex',
          targetColor: '#FFB3B5',
          replaceColor: '#DDDDDD',
        }
      ],
      deltaE: 50
    })
      .then((jimpObject) => {
        assert.strictEqual(jimpObject instanceof Jimp, true)

        done()
      })
      .catch(done)
  })
})