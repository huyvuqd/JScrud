const items = [
    {
        name: 'Pizza', price: 7, quantity: 1
    }
    ,
    {
        name: 'Pepsi', price: 3, quantity: 1
    },
    {
        name: 'Chips', price: 1, quantity: 1
    }]
const SHIPPING = 2;

function add() {
    items.push(
        { name: `Food ${Math.floor(Math.random() * 11)}`, quantity: 1, price: `${Math.floor(Math.random() * 11)}` }

    )
    render()
}

function remove(index) {
    items.splice(index, 1)
    render();
}
function updateQuantity(index, quantity) {
    if (quantity < 1) {
        return
    }
    items[index].quantity = quantity
    render()
}
function render() {
    let subTotal = 0;
    items.forEach(item => { subTotal += item.quantity * item.price })
    const total = subTotal + SHIPPING;

    const html = items.map(item => `
    <li class="order-item">
        <span class="item-name">${item.name}</span>
        <span class="item-quantity">
            <button class="btn-quantity dec" id="btn-minus">-</button>
            <input type="number" value="${item.quantity}" class="quantity-input">
            <button class="btn-quantity inc" id="btn-plus">+</button>
        </span>
        <span class="item-price">
            <span>$${item.price * item.quantity}</span>
            <button class="btn-quantity  del" id="btn-delete">X</button>
        </span>
    </li>
`).join('')
    $('#order-items').innerHTML = html

    const deleteBtn = [...$$('.del')]
    const decBtn = [...$$('.dec')]
    const incBtn = [...$$('.inc')]


    for (let i = 0; i < deleteBtn.length; i++) {
        decBtn[i].addEventListener('click', () => {
            updateQuantity(i, items[i].quantity - 1)
        })
        incBtn[i].addEventListener('click', () => {
            updateQuantity(i, items[i].quantity + 1)
        })
        deleteBtn[i].addEventListener('click', () => {
            remove(i);
        })
    }
    $('#sub-total').innerText = `$${subTotal}`
    $('#shipping').innerText = `$${SHIPPING}`
    $('#total').innerText = `$${total}`

}

$('#btn-add').addEventListener('click', () => {
    add()
})
render();
