/**
 * Strategy pattern
 */

// Strategy classes
class SchemaA {
  calculate(salary) {
    return salary * 2
  }
}
class SchemaB {
  calculate(salary) {
    return salary * 3
  }
}
class SchemaC {
  calculate(salary) {
    return salary * 4
  }
}
// Context class
class Bonus {
  constructor() {
    this.salary = null
    this.strategy = null
  }

  setSalary(salary) {
    this.salary = salary
  }
  setStrategy(strategy) {
    this.strategy = strategy
  }
  getBonus() {
    return this.strategy.calculate(this.salary)
  }
}
// External calls
const bonus = new Bonus()
bonus.setSalary(1000)
bonus.setStrategy(new SchemaA()) // set different strategy
bonus.getBonus()

/* Or use function-based version */

// Strategies object
const strategies = {
  'A': function(salary) {
    return salary * 2
  },
  'B': function(salary) {
    return salary * 3
  },
  'C': function(salary) {
    return salary * 4
  }
}
// Context function
const calculateBonus = function(type, salary) {
  return strategies[type](salary)
}
// External calls
calculateBonus('A', 1000)
calculateBonus('B', 2000)
