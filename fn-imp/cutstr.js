String.prototype.cutstr = function(len) {
  var restr = this
  var wlength = this.replace(/[^\x00-\xff]/g, '**').length
  if (wlength > len) {
    for (var k = len / 2; k < this.length; k++) {
      if (this.substr(0, k).replace(/[^\x00-\xff]/g, '**').length >= len) {
        restr = this.substr(0, k) + '...'
        break
      }
    }
  }
  return restr
}
