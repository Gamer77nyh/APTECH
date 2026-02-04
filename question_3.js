function calculateTotal(cart) {
    let total = 0;
    
    for (let i = 0; i < cart.length; i++) { total += cart[i].price * cart[i].quantity;
    }

    if (total > 100) {
        total = total * 0.9;
    }

    return total;
}

const cart = [
    { name: "Arsenal cap", price: 20, quantity: 2 },
    { name: "Arsenal Mug", price: 25, quantity: 1 },
    { name: "Arsenal Jersey", price: 5, quantity: 4 }
];

console.log(calculateTotal(cart));
