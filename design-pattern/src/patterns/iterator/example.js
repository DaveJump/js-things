/**
 * Iterator pattern
 */

function each(set, callback) {
  if (!set) return
  const iterator = set[Symbol.iterator]
  if (iterator) {
    const setArr = Array.from(set)
    if (Array.isArray(setArr)) {
      if (set instanceof Map) {
        for (let [key, value] of set) {
          callback && callback.call(set, key, value)
        }
      } else {
        setArr.forEach((i, idx) => {
          callback && callback.call(set, i, idx)
        })
      }
    }
  }
}

each([1,2,3,4], function(i, idx) {
  console.log(i, idx)
})

const map = new Map()
map.set('a', 'a_1')
map.set('b', 'b_1')
each(map, function(key, value) {
  console.log(key, value)
})

const set = new Set([5,6,7,8])
each(set, function(i, idx) {
  console.log(i, idx)
})
