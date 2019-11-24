/**
 * 找出并返回一个字符串中出现次数最多的字符和次数
 */

// 思路: 遍历字符串，把每个字符和出现的次数当做一个对象键值存起来，最后再从这个对象中取出数字最大的一个字符
function findMax(str) {
  const obj = {}

  for (let i = 0; i < str.length; i++) {
    const currentChar = str.charAt(i)

    if (obj.hasOwnProperty(currentChar)) {
      obj[currentChar]++
    } else {
      obj[currentChar] = 1
    }
  }

  let char = []
  let times = 0

  for (let j in obj) {
    if (obj[j] > times) {
      times = obj[j]
      char = [j]
    } else if (obj[j] === times) { // 不要忘了次数一样多的字符
      char.push(j)
    }
  }
  
  return {
    char: char.toString(),
    times
  }
}