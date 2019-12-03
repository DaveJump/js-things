function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

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
