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

const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

/**
 * Promise (es5, simple)
 * @param {*} fn
 */
function _Promise(fn) {
  // Save the initializal state
  var self = this

  // Initial state
  this.state = PENDING

  // Used to save the value passed in resolve or rejected
  this.value = null

  // Callback function used to save resolve
  this.resolvedCallbacks = []

  // Callback function for saving reject
  this.rejectedCallbacks = []

  function resolve(value) {
    // Determine whether the incoming element is a Promise value, if it is, the state change must wait for the previous state to change before making the change
    if (value instanceof _Promise) {
      return value.then(resolve, reject)
    }

    // Ensure that the code execution sequence is at the end of this round of event loop
    setTimeout(() => {
      // It can only be changed when the state is pending
      if (self.state === PENDING) {
        // Change the state to 'RESOLVED'
        self.state = RESOLVED

        self.value = value

        // Execute callback functions
        self.resolvedCallbacks.forEach(callback => {
          callback(value)
        })
      }
    }, 0)
  }

  function reject(value) {
    setTimeout(() => {
      if (self.state === PENDING) {
        // Change the state to 'REJECTED'
        self.state = REJECTED

        self.value = value

        self.rejectedCallbacks.forEach(callback => {
          callback(value)
        })
      }
    }, 0)
  }

  // Pass the two methods into the function to execute
  try {
    fn(resolve, reject)
  } catch (e) {
    // When an error is encountered, catch the error and execute the reject function
    reject(e)
  }
}

_Promise.prototype.then = function (onResolved, onRejected) {
  // First determine whether the two parameters are function types cause these two parameters are optional
  onResolved =
    typeof onResolved === 'function'
      ? onResolved
      : function (value) {
          return value
        }

  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : function (error) {
          throw error
        }

  // If the state is 'PENDING', add the function to the corresponding list
  if (this.state === PENDING) {
    this.resolvedCallbacks.push(onResolved)
    this.rejectedCallbacks.push(onRejected)
  }

  // If the state has been frozen, directly execute the function of the corresponding state

  if (this.state === RESOLVED) {
    onResolved(this.value)
  }

  if (this.state === REJECTED) {
    onRejected(this.value)
  }
}
