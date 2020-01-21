/**
 * Proxy Pattern
 */

// virtual proxy

class RealImage {
  constructor() {
    this.imageNode = document.createElement('img')
    document.body.appendChild(this.imageNode)
  }

  setSrc(src) {
    this.imageNode.src = src
  }
}

class ProxyImage {
  constructor() {
    this.imageInst = new Image()
    this.realImage = new RealImage()
    this.imageInst.onload = function() {
      this.realImage.setSrc(this.src)
    }
  }

  setSrc(src) {
    this.imageInst.src = src
  }
}


// proxy interceptor

const star = {
  name: 'DaveJump',
  age: 26,
  phoneNum: 'star: 13322229999'
}

const agent = new Proxy(Object.assign({}, star), {
  get(target, key) {
    if (key === 'phoneNum') {
      return 'agent: 13988887777'
    }
    if (key === 'price') {
      return 120000
    }
    return target[key]
  },
  set(target, key, value) {
    if (key === 'customPrice') {
      if (value < 100000) {
        throw new Error('the price is too low')
      } else {
        target[key] = value
        return true
      }
    }
  }
})

const props = Object.keys(star).reduce((obj, key) => {
  obj[key] = {
    get() {
      throw new Error(`you must get the ${key} through the agent proxy`)
    },
    set() {
      throw new Error(`you must set the ${key} through the agent proxy`)
    },
    configurable: false
  }
  return obj
}, {})

Object.defineProperties(star, props)
