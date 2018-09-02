const colorConvert = require('color-convert')

module.exports = (from, to, color) => {
  if (from === to) return color
  return colorConvert[from][to](color)
}
