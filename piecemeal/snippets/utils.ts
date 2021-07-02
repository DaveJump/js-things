function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

function capitalize(str: string) {
  if (!str.length) {
    return str
  }
  return str.replace(/^(\w{1})/, function (str, g1) {
    return g1.toUpperCase()
  })
}

/**
 * Merge objects deeply
 * @param objs objects
 * @returns
 */
function deepMerge(...objs: any[]): any {
  const results = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(results[key])) {
            results[key] = deepMerge(results[key], val)
          } else {
            results[key] = deepMerge(val)
          }
        } else {
          results[key] = val
        }
      })
    }
  })
  return results
}

/**
 * Generate unique-id by passing output length
 * @param length output length
 * @returns generated string
 */
function genUID(length = 13): string {
  if (length === 1) {
    return (~~(Math.random() * 36)).toString(36)
  }
  return (~~(Math.random() * 36)).toString(36) + genUID(length - 1)
}

/**
 * Get type finely
 * @param val
 * @returns
 */
function checkType(val: unknown): string {
  // return primitive types (number, boolean, string, function)
  if (typeof val !== 'object') {
    return capitalize(typeof val)
  }

  // return object types
  let str = Object.prototype.toString.call(val) as string
  let type = str.match(/\[object\s(\w+)\]/i)?.[1] || ''

  return type
}
checkType(2) // "Number"
checkType('name') // "String"
checkType(true) // "Boolean"
checkType(null) // "Null"
checkType(undefined) // "Undefined"
checkType([]) // "Array"
checkType({}) // "Object"
checkType(function () {}) // "Function"
checkType(new RegExp('')) // "RegExp"
checkType(new Date()) // "Date"
checkType(Math) // "Math"
checkType(new FormData()) // "FormData"

/**
 * Cut a string by passing length
 */
String.prototype.cutstr = function (len) {
  let restr = this.toString()
  const wlength = this.replace(/[^\x00-\xff]/g, '**').length

  if (wlength > len) {
    for (let k = len / 2; k < this.length; k++) {
      if (this.substr(0, k).replace(/[^\x00-\xff]/g, '**').length >= len) {
        restr = this.substr(0, k) + '...'
        break
      }
    }
  }
  return restr
}
interface String {
  cutstr(len: number): string
}

/**
 * 柯里化
 * @param func 待转换函数
 */
function curry(func: Function) {
  return function curried(this: any, ...args: any[]) {
    if (args.length >= func.length) {
      // 通过函数的length属性，来获取函数的形参个数
      return func.apply(this, args)
    } else {
      return function (this: any, ...args2: any[]) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

/**
 * 记忆函数，先预计算部分参数结果，后通过传递剩余参数做剩余计算
 * @param fn 待转换函数
 * @param rest 部分参数
 */
function partial(fn: Function, ...rest: any[]) {
  return function (this: any, ...args: any[]) {
    return fn.apply(this, rest.concat(args))
  }
}
