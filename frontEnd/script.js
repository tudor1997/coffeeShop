const countCart = document.querySelector('.count');
const cartBtn = document.querySelector('.cart i');
const cartContainer = document.querySelector('.cart-container');
const cartOverlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn');
const goUpBtn = document.querySelector('.go-up');
const home = document.querySelector('.home');
const carouselItem = document.querySelector('.carrousel-item');
const containerProducts = document.querySelector('.products-container');
const cartTotal = document.querySelector('.cartTotal');
const cartContent = document.querySelector('.cart-products-container');
const clearCart = document.querySelector('.clearCart');


const productsAPI = "http://127.0.0.1:8000/products/";
const cartAPI = "http://127.0.0.1:8000/cart/";
const totalAPI = "http://127.0.0.1:8000/total/";
let cart = [];

let buttonsDOM = [];




class Products{
// get products 
async  getProducts(){
        try{
            let result = await fetch(productsAPI);
            let data =  await result.json();
            let products = data.map(product => {
               const id = product.id;
               const title = product.title;
               const price = product.price;
               const image = product.image;
               return {id, title, price, image}
           })
           return products;
        }catch(error){
            console.log(error);
        }
   }
}

class Ui{

 showProducts(products) {
     
    let result = '';
    products.forEach(product =>{
        result += `
        <div class="card" >
        <div class="image-card">
        <img src="${product.image}" alt="${product.title}" class="card-img">
        </div>
        
        <div class="card-body">
            <h5 class="card-title">
              ${product.title}
            </h5>
            <div class="price">$${product.price}</div>
            <div class="card-text">Lorem ipsum dolor sit amet.</div>
            <button class="card-btn" data-id=${product.id}>Add to Cart</button>
        </div>
    </div>
        `;
    })
    containerProducts.innerHTML = result;
 }
 getButtons(){
     const buttons = [...document.querySelectorAll('.card-btn')];
    
     buttons.forEach(button =>{
         let id = button.dataset.id;
         let inCart = cart.find(item => item.id == id);
         if(inCart) {
             button.innerText = "In cart";
             button.disabled = true;
         }
         buttonsDOM = buttons;
         button.addEventListener("click",(event) =>{
            event.target.innerText = "In Cart";
            event.target.disabled = true;
           
            let cartItem = {...Storage.getProduct(id), amount:1};
            
            // add product to cart
            cart = [...cart, cartItem];
            // save cart 
            Storage.saveCart(cart);
            // set cart values
            this.setCartValues(cart);
            // display cart items
             this.addCartItem(cartItem);
             // show the cart
             this.showCart();
             
         })
     })
 }
 setCartValues (cart){
     let totalTemp = 0;
     let itemsTotal = 0;
     cart.map(item =>{
         totalTemp += item.amount * item.price;
         itemsTotal += item.amount;
     });
     cartTotal.innerText =`Total: $${parseFloat(totalTemp.toFixed(2))}`;
     countCart.innerText = itemsTotal; 
 }
 
 addCartItem(item){
    
        const div = document.createElement("div");
        div.classList.add('cart-product');
        div.innerHTML = `
        
                    <div class="product-img">
                        <img src="${item.image}" alt="${item.title}" >
                    </div>
                    <div class="product-content">
                        <span class="name">${item.title}</span>
                        <span class="price">$${item.price}</span>
                        <span class="remove" data-id=${item.id}>Remove</span>
                    </div>
                    <div class="count-in-cart">
                        <i class="fas fa-chevron-up" data-id="${item.id}"></i>
                        <span class="in-cart">${item.amount}</span>
                        <i class="fas fa-chevron-down" data-id="${item.id}"></i>
                    </div>
               
        `
        cartContent.appendChild(div);
     

}
populateCart(cart){
    cart.forEach(item => {
        this.addCartItem(item);
    })
}
closeCart(){
    cartOverlay.classList.remove('showOverlay');
    cartContainer.classList.remove('showCart');
}

 showCart(){
    cartContainer.classList.add('showCart');
    cartOverlay.classList.add('showOverlay');
    
 }

 scrollToTop(){
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
}

 scrollInView() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
 }
 setupAPP(){
    this.showCart();
    this.closeCart();
    cartBtn.addEventListener('click',this.showCart);
    closeBtn.addEventListener('click', this.closeCart);
    cartOverlay.addEventListener('click', this.closeCart);
    goUpBtn.addEventListener('click', this.scrollToTop);
    this.scrollInView();
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    
 }
 cartSetup(){
    clearCart.addEventListener('click', () =>{
        this.clearCart();
    });
    // cart functionality
    cartContent.addEventListener('click', (event) =>{
        if(event.target.classList.contains('remove')){
            let removeItem = event.target;
            let id = removeItem.dataset.id;
            
            cartContent.removeChild(removeItem.parentElement.parentElement);
            this.removeItem(id);
        }else if(event.target.classList.contains('fa-chevron-up')){
            let addAmount = event.target;
            let id = addAmount.dataset.id;
            let tempItem = cart.find(item => item.id == id);
            tempItem.amount = tempItem.amount + 1;
            Storage.saveCart(cart, tempItem);
            this.setCartValues(cart);
            addAmount.nextElementSibling.innerText = tempItem.amount;

        }else if(event.target.classList.contains('fa-chevron-down')){
            let lowerAmount = event.target;
            let id = lowerAmount.dataset.id;
            let tempItem = cart.find(item => item.id == id);
            tempItem.amount = tempItem.amount - 1;
            if(tempItem.amount > 0){
                Storage.saveCart(cart, tempItem);
                this.setCartValues(cart);
                lowerAmount.previousElementSibling.innerText = tempItem.amount;
            }else{
                cartContent.removeChild(lowerAmount.parentElement.parentElement);
                this.removeItem(id);
            }
        }
    })
 }
 clearCart(){
        let cartItems = cart.map(item => item.id);
        cartItems.forEach(id => this.removeItem(id))
        while(cartContent.children.length > 0){
            cartContent.removeChild(cartContent.children[0]);
        }
 }
 removeItem(id) {
    
    cart = cart.filter(item => item.id != id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = `
    <i class="fas fa-shopping-cart"></i>
    Add to Cart
    `
}
getSingleButton(id) {
    return buttonsDOM.find(button => button.dataset.id == id);
}
}
class Storage{
    static saveProducts(products) {
        localStorage.setItem('products', JSON.stringify(products));
    }
    static getProduct(id){
       let product = JSON.parse(localStorage.getItem('products'));
       return product.find(product => product.id == id);
    }
    static saveCart(cart){
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    static getCart(){
        return localStorage.getItem('cart') ? 
        JSON.parse(localStorage.getItem('cart')) : []
    }
}


document.addEventListener("DOMContentLoaded", () =>{
    const products = new Products();
    const ui = new Ui();
    
    ui.setupAPP();
    products.getProducts().then(products => {
        ui.showProducts(products)
        Storage.saveProducts(products);
    }).then(() =>{
        ui.getButtons();
        ui.cartSetup();
    });
})
  