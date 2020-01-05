// Implementation (jQuery-like)
class jQuery {
  constructor(selector) {
    const doms = Array.prototype.slice.call(document.querySelectorAll(selector))
    const len = doms ? doms.length : 0
    for (let i = 0; i < doms.length; i++) {
      this[i] = doms[i]
    }
    this.length = len
    this.selector = selector || ''
  }

  append(node) {}
  addClass(name) {}
  html(data) {}
  // ...apis
}
window.$ = function(selector) {
  return new jQuery(selector)
}
