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
    isTargetColorValid = typeof colors.targetColor === 'string' && hexColorRegex({ strict: true }).test(colors.targetColor)
    isReplaceColorValid = typeof colors.replaceColor === 'string' && hexColorRegex({ strict: true }).test(colors.replaceColor)
  }

  if (colors.type === 'rgb') {
    isTargetColorValid = Array.isArray(colors.targetColor) && colors.targetColor.every((color) => color >= 0 && color <= 255)
    isReplaceColorValid = Array.isArray(colors.replaceColor) && colors.replaceColor.every((color) => color >= 0 && color <= 255)
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
