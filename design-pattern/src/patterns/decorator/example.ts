/**
 * Decorator pattern
 */

function readonly(target, name, descriptor) {
  descriptor.writable = false
  return descriptor
}

function dressed(target, name, descriptor) {
  const beforeDressing = descriptor.value
  descriptor.value = function(...args) {
    beforeDressing.apply(this, args)
    console.log('I am dressing...')
    console.log('I am ready to go.')
    return {
      lazy: false,
      goodSmell: true
    }
  }
  return descriptor
}

class Person2 {
  readonly firstName: string
  readonly lastName: string
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName
    this.lastName = lastName
  }

  @readonly
  name() {
    return `${this.firstName} ${this.lastName}`
  }

  @dressed
  goOutside(body) {
    console.log('I am washing...')
    return body
  }
}

const Dave2 = new Person2('Lee', 'Dave')
// Dave2.name = function() {return ''} // error, the property "name" of Dave2 is readonly
const body = Dave2.goOutside({ lazy: true })
console.log(body) // { lazy: false, goodSmell: true }
