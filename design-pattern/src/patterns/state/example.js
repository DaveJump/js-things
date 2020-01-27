/**
 * State pattern
 */

const MyPromise = (function() {
  // Split the state class from promise-subject
  class StateManager {
    constructor(instance) {
      this._state = 'pending'
      this.result = null
      this.instance = instance
    }

    get state() {
      return this._state
    }
    set state(state){
      if (!['pending', 'resolved', 'rejected'].includes(state)) {
        this._state = 'pending'
        return
      }
      this._state = state
      this.onStateChange(state)
    }
    setState(state, result) {
      this.result = result
      this.state = state
    }
    onStateChange(state) {
      switch (state) {
        case 'resolved':
          this.instance.fulfilledList.forEach(cb => cb(this.result))
          break
        case 'rejected':
          this.instance.rejectedList.forEach(cb => cb(this.result))
          break
      }
    }
  }

  class MyPromise {
    constructor(fn) {
      this.fulfilledList = []
      this.rejectedList = []
      fn(
        data => {
          this.resolve(data)
        },
        error => {
          this.reject(error)
        }
      )
      this.sm = new StateManager(this)
    }

    resolve(data) {
      this.sm.setState('resolved', data)
    }
    reject(error) {
      this.sm.setState('rejected', error)
    }
    then(fcb, rcb) {
      fcb && this.fulfilledList.push(fcb)
      rcb && this.rejectedList.push(rcb)
    }
  }

  return MyPromise
}())

const p1 = new MyPromise(resolve => {
  setTimeout(() => {
    resolve('p1-resolved!')
  }, 2000)
})
p1.then(
  data => {
    console.log(`%cp1-fulfilled-data: ${data}`, 'color: green')
  }
)
p1.then(
  data => {
    console.log(`%cp1-fulfilled-data: ${data}`, 'color: yellow')
  }
)

const p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('p2-rejected!'))
  }, 4000)
})
p2.then(
  () => {},
  error => {
    console.error(error)
  }
)
