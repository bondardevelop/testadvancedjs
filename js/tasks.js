"use strict";

document.addEventListener('DOMContentLoaded', function() {

    var orderButton       = document.querySelectorAll('.top-cart-info-container .btn-check')[0];
    var priductItems      = document.querySelectorAll('.product-box__item');
    var modalBg           = document.querySelectorAll('.modal-bg')[0];
    var body              = document.querySelectorAll('body')[0];
    var closeModalButton  = document.querySelectorAll('.close')[0];
    var filterPrice       = document.getElementById('filter-price');
    var orderForm         = document.getElementById('oeder-form');
    var filterType        = document.getElementById('filter-type');
    var qtyInputs         = document.querySelectorAll('.qty__item');
    var allInputs         = document.querySelectorAll('input');
    var productsBox       = document.querySelectorAll('.products-box')[0];
    var cartProductsQty   = document.getElementById('cart-products-qty');
    var cartProductsPrice = document.getElementById('cart-products-price');
    var cart = {
        qty: 0,
        price: 0
    }

    productsBox.onclick = function(e) {
        if (!e.target.classList.contains("product-box__btn")) {
            return false
        }
        var itemInput = e.target.parentNode.querySelectorAll('.qty__item')[0];
        var itemValue = itemInput.value;
        if (itemValue < 0 || itemValue == "") {
            itemInput.classList.add("error");
        }
        else {
            calculateQtyPrice();
            if (cart.qty == 0) {
                cleanCart();
            }
            else {
                cartProductsQty.innerHTML = cart.qty;
                cartProductsPrice.innerHTML = cart.price;
            }
        }
    };

    //Calculate qty and price of products
    function calculateQtyPrice() {
        cart.qty = 0;
        cart.price = 0;
        qtyInputs.forEach(function(input) {
            if (input.value > 0) {
                var priceInput = input.parentNode.parentNode.querySelectorAll('p')[0];
                var priceInputNumber = priceInput.innerHTML.replace(/\D/g, "")
                cart.qty += 1;
                cart.price += input.value*Number(priceInputNumber);
            }
        });
    }

    //Sort by price
    filterPrice.addEventListener("change", function() {
        var chosedPrice = Number(this.value);
        priductItems.forEach(function(product) {
            var productPrice = product.querySelectorAll('.product-box__meta>p')[0];
            var productPriceNumber = Number(productPrice.innerHTML.replace(/\D/g, ""));
            if (productPriceNumber < chosedPrice) {
                product.classList.remove("hide");
            }
            else {
                product.classList.add("hide");
            }
            if (chosedPrice == 0) {
                product.classList.remove("hide");
            }
        });
    });

    //Sort by product type
    filterType.addEventListener("change", function() {
        var chosedType = this.value;
        priductItems.forEach(function(product) {
            var productType = product.getAttribute("data-type");
            if (chosedType == productType) {
                product.classList.remove("hide");
            }
            else {
                product.classList.add("hide");
            }
            if (chosedType == "0") {
                product.classList.remove("hide");
            }
        });
    });

    //Show order popup
    orderButton.addEventListener("click", function() {
        if (cart.qty > 0) {
            body.classList.toggle("active-popup");
        }
        else {
            alert('У вас 0 товаров в корзине. Выберите что вы хотите сейчас поесть');
        }
    });

    //Hide order popup
    [closeModalButton, modalBg].forEach(function(element) {
        element.addEventListener("click", function() {
            body.classList.toggle("active-popup");
        });
    });

    //Remove error styles on focus qty input
    allInputs.forEach(function(item){
        item.addEventListener("focus", function() {
            this.classList.remove("error");
        });
    });

    //Clean cart data
    function cleanCart() {
        cartProductsQty.innerHTML = "XXX";
        cartProductsPrice.innerHTML = "XXX";
    }

    //Submit order form
    orderForm.addEventListener("submit", function(e) {
        e.preventDefault();
        var email = this.querySelectorAll('input[name="email"]')[0];
        var name = this.querySelectorAll('input[name="name"]')[0];
        if ((email.value.trim().length > 0) && (name.value.trim().length > 0)) {
            alert('Спасибо за заказ');
            cleanCart();
            closeModalButton.click();
        }
        else {
            alert('Пожалуйста зполните вашы данные');
            if (email.value.trim().length < 1) {
                email.classList.add("error");
            }
            if (name.value.trim().length < 1) {
                name.classList.add("error");
            }
        }
    });

});