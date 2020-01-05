// Base Usage (with Capsulation)
class Person {
  name: string
  age: number
  protected bodyWeight: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
    this.bodyWeight = 120
  }
  speak(color = 'color: yellow') {
    console.log(
      `%c${this.name} say: My name is ${this.name}, I am ${this.age}.`,
      color
    )
  }
}
const Dave = new Person('Dave', 25)
Dave.speak()

// Extension (with Capsulation)
class Student extends Person {
  number: string | number
  private buns = 'myRoundBuns'
  constructor(name: string, age: number, number: string | number) {
    super(name, age)
    this.number = number
  }

  study() {
    console.log(
      `%c${this.name} say: I am a student of No.${this.number} and I am learning.`,
      'color: red'
    )
  }
  showBunsAndWeight() {
    console.log(`%c${this.name + ' say: ' + this.buns + ' ' + this.bodyWeight}`, 'color: red')
  }
}

const Jack = new Student('Jack', 21, '001')
Jack.speak('color: red')
Jack.study()
Jack.showBunsAndWeight()
