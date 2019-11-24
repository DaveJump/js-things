const curry = (fn, ...args1) => (...args2) =>
  (arg => (arg.length === fn.length ? fn(...arg) : curry(fn, ...arg)))([
    ...args1,
    ...args2
  ])

const foo = (a, b, c) => a * b * c
curry(foo)(2, 3, 4) // 24
curry(foo, 2)(3, 4) // 24
curry(foo, 2, 3)(4) // 24
curry(foo, 2, 3, 4)() // 24
