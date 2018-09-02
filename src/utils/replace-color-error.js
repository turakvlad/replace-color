const messages = {
  'PARAMETER_INVALID': 'Parameter is not valid',
  'PARAMETER_REQUIRED': 'Parameter is required'
}

module.exports = class ReplaceColorError extends Error {
  constructor (code, field) {
    super(messages[code])
    this.name = this.constructor.name
    this.code = code
    this.field = field
  }
}
