/**
 * 实现一个大整数加法函数，将字符串按照数字的形式相加返回结果字符串(不能简单的将参数转为数字计算)
 * 例如: bigAdd('999', '12') -> '1011'
 */

function bigAdd(a, b) {
  let i = a.length - 1
  let j = b.length - 1

  let carry = 0 // 进位
  let ret = ''

  while (i >= 0 || j >= 0) {
    let x = 0
    let y = 0
    let sum

    if (i >= 0) {
      x = a[i] - '0'
      i --
    }

    if (j >= 0) {
      y = b[j] - '0'
      j --
    }

    sum = x + y + carry

    // 满10进1位
    if (sum >= 10) { 
      carry = 1
      sum -= 10
    } else {
      carry = 0
    }

    ret = sum + ret
  }

  // 记得把最后的进位拼上
  if (carry) {
    ret = carry + ret
  }

  return ret
}