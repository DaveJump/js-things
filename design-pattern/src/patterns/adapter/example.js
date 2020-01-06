/**
 * Adapter Pattern
 */

class Adaptee {
  specificRequest() {
    return '美国标准插头'
  }
}

class Target {
  constructor() {
    this.adaptee = new Adaptee()
  }
  request() {
    const info = this.adaptee.specificRequest()
    return `${info} -> 转换器 -> 中国标准插头`
  }
}

const target = new Target()
target.request()
