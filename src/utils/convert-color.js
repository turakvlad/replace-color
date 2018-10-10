const colorConvert = require('color-convert')

module.exports = (from, to, color) => {
  let alpha = null

  // If the "from" type is "hex" and the color's string length is 9, it means that we have "ahex" (a hex code with an alpha channel).
  if (from === 'hex' && color.length === 9) {
    // Extract an alpha channel (e.g., "AA" will be extracted from "#AABBCCDD").
    alpha = color.slice(1, 3)

    // Convert a hex code with an alpha channel to a hex code without it (e.g., "#AABBCCDD" will be converted to "#BBCCDD").
    color = color.slice(0, 1) + color.slice(3)

    // Convert an alpha channel from a [00, FF] period to a [0, 255] period.
    alpha = parseInt(alpha, 16)
  }

  // If the "from" type is "rgb" and the color's array length is 4, it means that we have "rgba" (an rgb code with an alpha channel).
  if (from === 'rgb' && color.length === 4) {
    // Extract an alpha channel.
    alpha = color.pop()

    // Convert an alpha channel from a [0, 1] period to a [0, 255] period.
    alpha = Math.round(alpha * 255)
  }

  // This is possible only in case of the "rgb" to "rgb" conversion.
  if (from === to) return [...color, alpha]

  return [...colorConvert[from][to](color), alpha]
}
