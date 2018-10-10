const hexColorRegex = require('hex-color-regex')

module.exports = (colors) => {
  if (!colors) {
    return {
      code: 'PARAMETER_REQUIRED',
      field: 'options.colors'
    }
  }

  if (!['hex', 'rgb'].includes(colors.type)) {
    return {
      code: 'PARAMETER_INVALID',
      field: 'options.colors.type'
    }
  }

  let isTargetColorValid
  let isReplaceColorValid

  if (colors.type === 'hex') {
    isTargetColorValid = typeof colors.targetColor === 'string' && colors.targetColor.length === 7 && hexColorRegex({ strict: true }).test(colors.targetColor)
    isReplaceColorValid = typeof colors.replaceColor === 'string' && (colors.targetColor.length === 7 || colors.targetColor.length === 9) && hexColorRegex({ strict: true }).test(colors.replaceColor)
  }

  if (colors.type === 'rgb') {
    isTargetColorValid = Array.isArray(colors.targetColor) && colors.targetColor.length === 3 && colors.targetColor.every((color) => color >= 0 && color <= 255)

    if (Array.isArray(colors.replaceColor)) {
      if (colors.replaceColor.length === 3) {
        isReplaceColorValid = colors.replaceColor.every((color) => color >= 0 && color <= 255)
      } else if (colors.replaceColor.length === 4) {
        isReplaceColorValid = colors.replaceColor.slice(0, 3).every((color) => color >= 0 && color <= 255) && (colors.replaceColor[3] >= 0 && colors.replaceColor[3] <= 1)
      } else {
        isReplaceColorValid = false
      }
    } else {
      isReplaceColorValid = false
    }
  }

  if (!isTargetColorValid) {
    return {
      code: 'PARAMETER_INVALID',
      field: 'options.colors.targetColor'
    }
  }

  if (!isReplaceColorValid) {
    return {
      code: 'PARAMETER_INVALID',
      field: 'options.colors.replaceColor'
    }
  }

  return null
}
