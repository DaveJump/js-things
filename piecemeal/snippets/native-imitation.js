/**
 * call (es5)
 * @param {any} context
 */
Function.prototype._call = function (context) {
  // Check if the instance is callable
  if (typeof this !== 'function') {
    throw new TypeError(this + 'is not a function')
  }

  // Set global window object to context when context is nullable
  if (context === void 0 || context === null) {
    context = window
  } else {
    // Wrap context with object when context is not an object
    context = Object(context)
  }

  context.fn = this

  var args = []

  // In order to use es5, use eval to call the spliced ​​string
  for (var i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
  }

  var result = eval('context.fn(' + args + ')')

  delete context.fn

  return result
}

/**
 * apply (es5)
 * @param {any} context
 * @param {Array} args arguments
 */
Function.prototype._apply = function (context, args) {
  if (typeof this !== 'function') {
    throw new TypeError(this + 'is not a function')
  }

  if (context === void 0 || context === null) {
    context = window
  } else {
    context = Object(context)
  }

  context.fn = this

  var result
  var _args = []

  // Check argument list
  if (!args) {
    result = context.fn()
  } else {
    for (var i = 0; i < args.length; i++) {
      _args.push('args[' + i + ']')
    }
    result = eval('context.fn(' + _args + ')')
  }

  delete context.fn

  return result
}

/**
 * bind (es5)
 * @param {any} context
 * @returns
 */
Function.prototype._bind = function (context) {
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
  }

  var self = this
  var args = Array.prototype.slice.call(arguments, 1)

  var fNOP = function () {}

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments)
    // Use apply inside the function to bind the function call. It is necessary to judge the function as the constructor. At this time, the 'this' arg is needed to be called, and in other cases, pass in the specified context object.
    // Concat the args in order to pass args again during the second call, like 'fn.bind(arg1)(arg2)'.
    return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs))
  }

  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()

  return fBound
}
