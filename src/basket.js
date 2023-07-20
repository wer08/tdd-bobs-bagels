const { Inventory } = require('./Inventory')
class Basket {
    constructor (capacity = 5) {
       this.capacity = capacity
        this.basketList = {}
        this.inventory = new Inventory()
    }

    addProduct = (product, amount) => {
        if (this.capacity - this.getNumberOfProducts() >= amount) {
            this.basketList[product.sku] = (this.basketList[product.sku] || 0) + amount
        }
    }

    removeProduct = (product, amount) => {
        if (Object.keys(this.basketList).includes(product.sku)) {
            delete this.basketList[product.sku]
        } else return 'Product not in basket'
    }

    getTotalCost = () => {
        let totalCost = 0.00
        const tmp = structuredClone(this.basketList)
        
    }

    getPriceOfProductsWithoutDiscount = () => {
        const bagelsWithoutDiscount = Object.entries(this.basketList)
            .filter(([product, quantity]) => product[0] === 'B')
            .flatMap(([product, quantity]) => Array((quantity % 6)).fill(this.inventory.getProductBySKU(product).getPrice()))
            
        console.log(bagelsWithoutDiscount)
        const coffees = Object.entries(this.basketList)
            .filter(([product, quantity]) => product[0] === 'C')
            .flatMap(([product, quantity]) => Array(quantity).fill(this.inventory.getProductBySKU(product).getPrice()))
        console.log(coffees)   
        if (bagelsWithoutDiscount.length > coffees) {
            return bagelsWithoutDiscount
                .slice(coffees.length)
                .reduce((x,y) => x + y, 0)
        } else {
            return coffees
                .slice(bagelsWithoutDiscount.length)
                .reduce((x,y) => x + y, 0)
        }
    }

    getPriceOfFillings = () => {
        return Object.entries(this.basketList)
            .filter(([product, quantity]) => product[0] === 'F')
            .map(([product, quantity]) => quantity * 0.12)
            .reduce((x, y) => x + y, 0)
    }

    getPriceOfMultipleBagels = () => {
        return Object.entries(this.basketList)
            .filter(([product, quantity]) => product.startsWith('B'))
            .map(([product, quantity]) => {
                if (quantity >= 6) {
                    const count = Math.floor(quantity / 6)
                    return 3.99 * Math.floor(count/2) + 2.49 * (count%2)
                }
                return 0.00
            }).reduce((x,y) => x+y,0)
    }

    getCapacity = () => {
        return this.capacity
    }
    setCapacity = (newCapacity) => {
        this.capacity = newCapacity
    }
    getBasketList = () => {
        return this.basketList
    }

    getNumberOfProducts = () => {
        return Object.values(this.basketList).reduce((x, y) => x + y, 0)
    }

    getNumberOfBagels = () => {
        const bagels = Object
            .entries(this.basketList)
            .filter(([product, quantity]) => product[0] === 'B')
            .map(([product,quantity])=>quantity)
        return bagels.reduce((x,y) => x+y,0)
    }

    isFull = () => {
        return this.getNumberOfProducts() === this.capacity
    }

}

module.exports = {
    Basket
}