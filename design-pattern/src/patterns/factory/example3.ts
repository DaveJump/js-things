/**
 * Factory pattern
 */

interface Menu {
  no: string
  name: string
  price: number
}

interface Material {
  no: string
  list: string[]
}

const Restaurant = (function() {
  const menu: Menu[] = [
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

  const material: Material[] = [
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
    quantityOfHeat!: number
    taste!: string

    constructor(foodNo: Menu['no']) {
      const kitchener = new Kitchener(foodNo)
      const foodInfo = kitchener.cook(kitchener.getMaterial(foodNo))
      const { quantityOfHeat, taste } = foodInfo

      this.quantityOfHeat = quantityOfHeat
      this.taste = taste
    }
  }

  class Kitchener {
    constructor(materialNo: Material['no']) {
      this.cook(this.getMaterial(materialNo))
    }
    getMaterial(materialNo: Material['no']) {
      const mat = material.find(m => m.no === materialNo)
      return mat ? mat.list : []
    }
    cook(materialList: Material['list']) {
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
  function orderForAFood(foodNo: Menu['no']): Promise<Food> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(new Food(foodNo))
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
const { menu, orderForAFood } = Restaurant
// customer get menu list
console.log(menu)
// order for a food then eat it
orderForAFood(menu[0].no).then(food => {
  console.log('eat food:', food)
})
