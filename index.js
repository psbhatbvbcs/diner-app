import { menuArray } from "./data.js";
let myOrder = {}


document.addEventListener('click', (e) => {
    if (e.target.closest('#add-item')) {
        showQuantity('add', e)
    } else if (e.target.closest('#decrease-item')) {
        showQuantity('sub', e)
    } else if (e.target.closest('#close-icon')) {
        document.querySelector(".final-purchase").classList.add('hidden')
    } else if (e.target.matches("#order-button")) {
        document.querySelector(".final-purchase").classList.remove('hidden')
    } else if (e.target.matches("#pay-order")) {
        e.preventDefault();
        const name = document.querySelector("#full-name").value.trim();
        const cardNumber = document.querySelector("#card-number").value.trim();
        const cvv = document.querySelector("#cvv").value.trim();
        if (!name || !cardNumber || !cvv) {
            alert("Please fill all required fields");
        } else {
            document.querySelector(".final-purchase").classList.add('hidden')
            document.querySelector("#order-completion").classList.remove('hidden');
        }

    }
});

document.querySelector(".cart").addEventListener("click", (e) => {
    if (e.target.matches(".remove-button")) {
        const menuItemId = e.target.closest(".cart-desc").dataset.menuId;
        menuArray[menuItemId].numberOrdered = 0;
        render();
        renderCart();
    }
});

function showQuantity(addOrSub, e) {
    const menuItemId = e.target.closest('.quantity').dataset.menuId;
    let numOrdered = menuArray[menuItemId].numberOrdered

    if (addOrSub === 'add' && numOrdered >= 0) {
        menuArray[menuItemId].numberOrdered++;
    } else if (addOrSub === 'sub' && numOrdered > 0) {
        menuArray[menuItemId].numberOrdered--;
    }


    render();
    renderCart();
    //console.log(`${addOrSub} button clicked for menu item with ID ${menuItemId}`);
}

function getCartHtml() {
    let cartHtml = '<h3 id="order-title">Your Order</h3>'
    let cartArray = []
    let totalPrice = 0

    menuArray.forEach((menuItem, index) => {
        if (menuItem.numberOrdered > 0) {
            cartArray.push(menuItem)

            cartHtml += `
            <div class='cart-desc'  data-menu-id=${index}>
                <p class="cart-item-title">${menuItem.name} ${menuItem.emoji}</p>
                <span class="remove-button">(remove)</span>
                <p class="price"><span class="quantity-items">(x ${menuItem.numberOrdered})</span>$ ${menuItem.price * menuItem.numberOrdered}</p>
            </div>
            `
            totalPrice += menuItem.price * menuItem.numberOrdered
        }
    })
    //console.log(cartArray)
    if (cartArray.length > 0) {
        document.querySelector(".cart").classList.remove("hidden-visibility")
    }
    else {
        document.querySelector(".cart").classList.add("hidden-visibility")
        //console.log(document.querySelector(".cart").classList)
    }
    cartHtml += `
        <div class="total-bar">
            <h3 id="total-cost">TOTAL COST:</h3>
            <h3 id="total-cost-value">$ ${totalPrice} </h3>
        </div>
        <section class='order-complete'>
            <button class='order-button' id='order-button'>Complete order</button>
        </section>`
    return cartHtml
}

function renderCart() {
    document.querySelector(".cart").innerHTML = getCartHtml()
}

function getMenuHtml() {
    let menuHtml = '';
    let ingredientsString = '';

    menuArray.forEach((menuItem, index) => {
        let itemsOrdered = menuItem.numberOrdered;
        let itemsOrderedClass = 'number-of-items';

        if (itemsOrdered === 0) {
            itemsOrderedClass = 'number-of-items hidden';
        }

        menuItem.ingredients.forEach((ingredient) => {
            ingredientsString += `${ingredient}, `;
        });

        menuHtml += `
            <div class='menu-item' id='menu-item'>
                <img src=${menuItem.image} class='menu-pic' id=${menuItem.name}>
                <div class='menu-desc'>
                <p class="item-name">${menuItem.name}</p>
                <p class="item-ingredients">${ingredientsString}</p>
                <p class="item-price">$ ${menuItem.price}</p>
                </div>
                <div class='quantity' id='quantity' data-menu-id=${index}>
                <div class='quantity-buttons' id='quantity-buttons'>
                    <button class="item-quantity" id="decrease-item"><i class="fa-solid fa-minus"></i></button>
                    <button class="item-quantity" id="add-item"><i class="fa-solid fa-plus"></i></button>
                </div>
                <p class=${itemsOrderedClass}>(x ${itemsOrdered})</p>
                </div>
            </div>
        `;

        ingredientsString = '';
    });

    return menuHtml;
}

function render() {
    document.getElementById('menu').innerHTML = getMenuHtml();
}

render();
