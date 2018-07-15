class Cart {
    constructor(initItems) {
        this.items = initItems;
        this.totalPrice = 0;
        this.totalQty = 0;
        this.calculate();
    }

    calculate() {
        if (this.items) {
            for (var key in this.items) {
                this.totalQty += this.items[key].qty;
                this.totalPrice += this.items[key].qty * this.items[key].item.price;
            }
        }
    }

    add(item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {
                qty: 0,
                item: item,
                price: 0
            };
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    }

    remove(id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            return;
        }
        this.totalQty -= storedItem.qty;
        this.totalPrice -= storedItem.price;
        delete this.items[id];
    }

    reduce(id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            return;
        }
        this.totalQty -= 1;
        this.totalPrice -= storedItem.item.price;
        storedItem.qty--;
        storedItem.price -= storedItem.item.price;
        if (storedItem.qty === 0) {
            delete this.items[id];
        }
    }

    generateArray() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
}

module.exports = Cart;