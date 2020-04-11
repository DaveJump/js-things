const shuffle = require('../algorithm/shuffle')

Array.prototype.shuffle = shuffle

function generateUUID() {
  return (
    new Date().getTime() +
    Math.random()
      .toString(36)
      .substr(2)
  ).split('').shuffle().join('')
}
generateUUID()
