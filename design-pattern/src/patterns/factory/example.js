const restaurant = (function() {
  const menu = [
    {
      no: '#001',
      name: 'Kung Pao Chicken',
      price: 50
    },
    {
      no: '#002',
      name: 'American Steak',
      price: 67
    }
  ]

  const material = [
    {
      no: '#001',
      list: ['chicken', 'pepper', 'garlic', 'peanut-oil']
    },
    {
      no: '#002',
      list: ['beef', 'fennel', 'butter']
    }
  ]

  class Food {
    constructor(food) {
      const kitchener = new Kitchener(food)
      const foodInfo = kitchener.cook(kitchener.getMaterial(food))
      const { quantityOfHeat, taste } = foodInfo

      this.quantityOfHeat = quantityOfHeat
      this.taste = taste
    }
  }

  class Kitchener {
    constructor(food) {
      this.cook(this.getMaterial(food))
    }
    getMaterial(food) {
      const mat = material.find(m => m.no === food)
      return mat ? mat.list : []
    }
    cook(materialList) {
      // ...process
      const quantityOfHeat = materialList.includes('beef') ? 700 : 200
      const taste = materialList.includes('pepper') ? 'spicy' : 'salty'
      return {
        quantityOfHeat,
        taste
      }
    }
  }

  // Wrap the constructor to outside
  function orderForAFood(food) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(new Food(food))
      }, 2000)
    })
  }

  return {
    menu,
    orderForAFood
  }
})()

/**
 * Usage: customer instance
 */
const { menu, orderForAFood } = restaurant
// customer get menu list
console.log(menu)
// order for a food then eat it
orderForAFood(menu[0].no).then(food => {
  console.log('eat food:', food)
})
