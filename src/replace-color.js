const convertColor = require('./utils/convert-color')
const getDelta = require('./utils/get-delta')
const isNumber = require('./utils/is-number')
const Jimp = require('jimp')
const ReplaceColorError = require('./utils/replace-color-error')
const validateColors = require('./utils/validate-colors')

module.exports = ({
  image,
  colors,
  formula = 'E00',
  deltaE = 2.3
} = {}, callback) => {
  if (callback) {
    if (typeof callback !== 'function') {
      throw new ReplaceColorError('PARAMETER_INVALID', 'callback')
    }
  }

  return new Promise((resolve, reject) => {
    callback = callback || ((err, jimpObject) => {
      if (err) return reject(err)
      return resolve(jimpObject)
    })

    if (!image) {
      return callback(new ReplaceColorError('PARAMETER_REQUIRED', 'options.image'))
    }

    const colorsValidationError = validateColors(colors)
    if (colorsValidationError) {
      return callback(new ReplaceColorError(colorsValidationError.code, colorsValidationError.field))
    }

    if (!(typeof formula === 'string' && ['E76', 'E94', 'E00'].includes(formula))) {
      return callback(new ReplaceColorError('PARAMETER_INVALID', 'options.formula'))
    }

    if (!(isNumber(deltaE) && deltaE >= 0 && deltaE <= 100)) {
      return callback(new ReplaceColorError('PARAMETER_INVALID', 'options.deltaE'))
    }

    Jimp.read(image)
      .then((jimpObject) => {
        const targetLABColor = convertColor(colors.type, 'lab', colors.targetColor)
        const replaceRGBColor = convertColor(colors.type, 'rgb', colors.replaceColor)

        jimpObject.scan(0, 0, jimpObject.bitmap.width, jimpObject.bitmap.height, (x, y, idx) => {
          const currentLABColor = convertColor('rgb', 'lab', [
            jimpObject.bitmap.data[idx],
            jimpObject.bitmap.data[idx + 1],
            jimpObject.bitmap.data[idx + 2]
          ])

          if (getDelta(currentLABColor, targetLABColor, formula) <= deltaE) {
            jimpObject.bitmap.data[idx] = replaceRGBColor[0]
            jimpObject.bitmap.data[idx + 1] = replaceRGBColor[1]
            jimpObject.bitmap.data[idx + 2] = replaceRGBColor[2]
            if (replaceRGBColor[3] !== null) jimpObject.bitmap.data[idx + 3] = replaceRGBColor[3]
          }
        })

        callback(null, jimpObject)
      })
      .catch(callback)
  })
}
