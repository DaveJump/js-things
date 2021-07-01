Function.prototype.mybind = function(context, ...args1) {
  if (typeof this !== 'function') {
    throw new Error('not a function')
  }

  let fn = this
  let resFn = function(...args2) {
    return fn.apply(this instanceof resFn ? this : context, args1.concat(args2))
  }
  const DumpFunction = function DumpFunction() {}
  DumpFunction.prototype = this.prototype
  resFn.prototype = new DumpFunction()

  return resFn
}
