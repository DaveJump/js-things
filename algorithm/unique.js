/**
 * 在 Array 的原型上定义一个去除数组重复项的方法，返回去重后的数组
 * 更多方法查阅: https://blog.csdn.net/qq_35624642/article/details/79290568
 */

// 方法一，ES6 (不考虑浏览器兼容性)
Array.prototype.unique = function() {
  if (!Array.isArray(this)) {
    return this
  }
  if (!this.length) {
    return this
  }
  var newArr = new Set(this)
  return Array.from(newArr)
}

// 方法二，用 splice 去重
Array.prototype.unique = function() {
  if (typeof Array.isArray === 'function' && !Array.isArray(this)) {
    return this
  }
  if (Object.prototype.toString.call(this) !== '[object Array]') {
    return this
  }
  if (!this.length) {
    return this
  }
  for (var n = 0; n < this.length; n++) {
    for (var j = this.length; j > n; j--) {
      if (this[n] === this[j]) {
        this.splice(j, 1)
      }
    }
  }
  return this
}

// 方法三，最简单的方法，前后对比，不相同的前一个元素压入临时数组
Array.prototype.unique = function() {
  if (typeof Array.isArray === 'function' && !Array.isArray(this)) {
    return this
  }
  if (Object.prototype.toString.call(this) !== '[object Array]') {
    return this
  }
  if (!this.length) {
    return this
  }
  var arr = []
  for (var i = 0; i < this.length; i++) {
    if (this[i] !== this[i + 1] && arr.indexOf(this[i]) < 0) {
      arr.push(this[i])
    }
  }
  return arr
}