function capitalize(str) {
  if (!str.length) {
    return str
  }
  return str.replace(/^(\w{1})/, function(str, g1) {
    return g1.toUpperCase()
  })
}
function checkType(val) {
  // 不是 object 返回原始类型 (number, boolean, string, function)
  // typeof function fn(){} === 'function'
  if (typeof val !== 'object') {
    return capitalize(typeof val)
  }
  // 是 object 则细分 (Date, RegExp, Math, ...)
  var str = Object.prototype.toString.call(val)
  var type = str.match(/\[object\s(\w+)\]/i)[1]
  return type
}

checkType(2) // "Number"
checkType('name') // "String"
checkType(true) // "Boolean"
checkType(null) // "Null"
checkType(undefined) // "Undefined"
checkType([]) // "Array"
checkType({}) // "Object"
checkType(function(){}) // "Function"
checkType(new RegExp()) // "RegExp"
checkType(new Date()) // "Date"
checkType(Math) // "Math"
checkType(new FormData()) // "FormData"
