// declaring our variables (global)


//? Dan's comments for explanations

//? We're declaring our globally-scoped variables here. We're using methods to extract information from our HTML page's embedded Bootstrap code (for the navbar in this case). We changed these id's and innerText in HTML to fit our specific project's info (electronics, jewelry, etc.).

//? The cart variable is an array, and we did this because it will store the multiple objects (in an array -- ) (the ones called from the API with a specified endpoint), and the apiURL is just the fakestore example here, but we'd mirror this in other situations by pasting the URL to a specific website's URL (... or server?) we'd need to extract data from.
const electronicsButton = document.getElementById("electronics");
const jewelryButton = document.getElementById("jewelry");
const mensClothingButton = document.getElementById("mens-clothing");
const womensClothingButton = document.getElementById("womens-clothing");
const tableOneBody = document.getElementById("table-body");
const modalSubtotal = document.getElementById("modal-subtotal");
const modalTax = document.getElementById("modal-tax");
const modalShipping = document.getElementById("modal-shipping");
const modalTotal = document.getElementById("modal-total");
const cartButton = document.getElementById("cart");
const Display = document.getElementById("display");
const purchaseButton = document.getElementById("purchase-button");
const clearCartButton = document.getElementById("modal-clear");
const apiURL = "https://fakestoreapi.com/products/";
const cart = [];


//? We're making a fakestore function here, which runs asynchronously (why, I'm not fully sure) and takes in an endpoint. When running, the function does a couple of things:
//?    - It logs our data (which is just a JSON version of our fetched API, with the assigned endpoint).
//?    - It runs the displayCards function, with said data as a parameter.
const fakeStore = async (endpoint) => {
  let result = await fetch(apiURL + endpoint);
  let data = await result.json();
  console.log(data);
  displayCards(data);
};

// creating our functions

//? The displayCards function takes in products as a parameter [aka the set of items returned from a given endpoint's API fetch request]. Its purpose is to create elements on our HTML page variably (based on specific fetch).

function displayCards(products) {
  
  // create element
  // edit element
  // append element
  
//? We're creating a new HTML element (a div), which we'll assign to the varibale 'row.'

  const row = document.createElement("div");

//? This new HTML element's classname is set to the specified Bootstrap class name, which causes it to take the shape of this same pre-coded Boostrap-specific class, hence shaping it like the corresponding Boostrap docs. From there, we append our newly-created 'row' variable to our 'Display' variable as defined at the top here.
  
  row.className = "row row-cols-1 row-cols-md-2 g-4";
  Display.appendChild(row);
  
//? Bearing in mind that we're still in the 'displayCards' function, we're writing that any time this function is called it will...

//?   - Create a new series of HTML elements for each product (individual object fetched from the given API request). Again, these are given class names, src codes, and other HTML element attributes which correspond specifically with the naming conventions used in Boostrap's docs, which, since we imported Boostrap into our HTML, creates elements that look as they are pre-coded via Bootcamp.

  products.forEach((product) => {
    const productColumn = document.createElement("div");
    productColumn.className = "col";
    row.appendChild(productColumn);
    
    const productCard = document.createElement("div");
    productCard.className = "card";
    productColumn.appendChild(productCard);
    
    const productImage = document.createElement("img");
    productImage.className = "card-img-top";
    productImage.src = product.image;
    productCard.appendChild(productImage);
    
    const productCardBody = document.createElement("div");
    productCardBody.className = "card-body";
    productCard.appendChild(productCardBody);
    
    const productCardTitle = document.createElement("h5");
    productCardTitle.className = "card-title";
    productCardTitle.innerHTML = product.title;
    productCardBody.appendChild(productCardTitle);
    
    const accordionContainer = document.createElement("div");
    accordionContainer.className = "accordion";
    accordionContainer.id = "accordionExample";
    productCardBody.appendChild(accordionContainer);
    
    const accordionItemOne = document.createElement("div");
    accordionItemOne.className = "accordion-item";
    accordionContainer.appendChild(accordionItemOne);
    
    const accordionHeaderOne = document.createElement("h2");
    accordionHeaderOne.id = "headingOne";
    accordionHeaderOne.className = "accordion-header";
    accordionItemOne.appendChild(accordionHeaderOne);

    const accordionButtonOne = document.createElement("button");
    accordionButtonOne.className = "accordion-button";
    accordionButtonOne.type = "button";
    accordionButtonOne.setAttribute("data-bs-toggle", "collapse");
    accordionButtonOne.setAttribute("data-bs-target", `#collapseOne${product.id}`);
    accordionButtonOne.setAttribute("aria-expanded", "true");
    accordionButtonOne.setAttribute("aria-controls", "collapseOne");
    accordionButtonOne.innerText = "Descripton";
    accordionHeaderOne.appendChild(accordionButtonOne);
    
    const accordionCollapseOne = document.createElement("div");
    accordionCollapseOne.id = `collapseOne${product.id}`;
    accordionCollapseOne.className = "accordion-collapse collapse";
    accordionCollapseOne.setAttribute("data-bs-parent", "#accordionExample");
    accordionItemOne.appendChild(accordionCollapseOne);
    
    const accordionBodyOne = document.createElement("div");
    accordionBodyOne.className = "accordion-body";
    accordionBodyOne.innerText = product.description;
    accordionCollapseOne.appendChild(accordionBodyOne);

    const accordionItemTwo = document.createElement("div");
    accordionItemOne.className = "accordion-item";
    accordionContainer.appendChild(accordionItemTwo);
    
    const accordionHeaderTwo = document.createElement("h2");
    accordionHeaderOne.className = "accordion-header";
    accordionItemTwo.appendChild(accordionHeaderTwo);
    
    const accordionButtonTwo = document.createElement("button");
    accordionButtonTwo.className = "accordion-button collapsed";
    accordionButtonTwo.type = "button";
    accordionButtonTwo.setAttribute("data-bs-toggle", "collapse");
    accordionButtonTwo.setAttribute("data-bs-target", `#collapseTwo${product.id}`);
    accordionButtonTwo.setAttribute("aria-expanded", "false");
    accordionButtonTwo.setAttribute("aria-controls", "collapseTwo");
    accordionButtonTwo.innerText = "Price";
    accordionHeaderTwo.appendChild(accordionButtonTwo);

    const accordionCollapseTwo = document.createElement("div");
    accordionCollapseTwo.id = `collapseTwo${product.id}`;
    accordionCollapseTwo.className = "accordion-collapse collapse";
    accordionCollapseTwo.setAttribute("data-bs-parent", "#accordionExample");
    accordionItemTwo.appendChild(accordionCollapseTwo);
    
    const accordionBodyTwo = document.createElement("div");
    accordionBodyTwo.className = "accordion-body";
    accordionBodyTwo.innerText = `$${product.price.toFixed(2)}`;
    accordionCollapseTwo.appendChild(accordionBodyTwo);
    
//? Here, it's the same process, but we're creating the 'add to cart' button, which has an 'onclick' instruction. This instruction is to run a function which console logs our cartItem (using properties titled preciesly as they are in the console (from our fetch)), and runs the submitToCart function, with this item as its parameter. We then append this button to our product card.

    const addToCartButton = document.createElement("button");
    addToCartButton.className = "btn btn-dark";
    addToCartButton.type = "button";
    addToCartButton.innerText = "Add to Cart";
    addToCartButton.onclick = function() {
      let cartItem = {
        id: product.id,
        title: product.title,
        cost: product.price,
        quantity: 1
      }
      console.log(cartItem);
      submitToCart(cartItem);
    };
    productCard.appendChild(addToCartButton);
    
    
    
    // figure out how to only have selected accordion animate when clicked on, as opposed to all of them doing so.
    
  });
}

//? Our submitToCart function takes in an item as a parameter (which, honestly, I'm not sure how this one is differentiated from 'product'). We're trying to basically make it so that the user sees a cart with only one item of each kind displayed, and their quantity reflective of the order quantity, not a series of repeating objects. To do this, we created a matchingId variable, and used the .findIndex array method on our 'cart' array. The parameters here confuse me upon review, but I do understand what we accomplished with it.

function submitToCart(item) {
  let matchingId = cart.findIndex(cartItem => cartItem.id === item.id);
  matchingId === -1
  ?
  cart.push(item)
  :
  cart[matchingId].quantity += 1;
  console.log(cart);
};

function displayCart() {

  tableOneBody.innerHTML = "";
  let subtotal = 0;
  let tax = 0;
  let shipping = 0;
  let total = 0;

  if (cart.length !== 0) {
    cart.forEach(item =>{
      subtotal += item.cost * item.quantity;

    const row = document.createElement("tr");
    tableOneBody.appendChild(row);

    const modalQuantity = document.createElement("td");
    modalQuantity.innerText = item.quantity;
    row.appendChild(modalQuantity);
    
    const modalItem = document.createElement("td");
    modalItem.innerText = `${item.title} at $${item.cost.toFixed(2)} ea`;
    row.appendChild(modalItem);

    const modalPrice = document.createElement("td");
    modalPrice.innerText = `$${(item.quantity * item.cost).toFixed(2)}`;
    row.appendChild(modalPrice);
    })

    tax = subtotal * .07;
    shipping = subtotal * .2;
    total = subtotal + tax + shipping;

    purchaseButton.innerText = `Purchase for $${total.toFixed(2)}`;
  }

  modalSubtotal.innerText = `$${subtotal.toFixed(2)}`;

  modalTax.innerText = `$${tax.toFixed(2)}`;

  modalShipping.innerText = `$${shipping.toFixed(2)}`;

  modalTotal.innerText = `$${total.toFixed(2)}`;
};

function clearCart() {
  cart.length = 0;
  purchaseButton.innerText = "Purchase";
};

// creating our event listeners


//? We're creating an event listener on our buttons in the navbar, which essentially sets our innerHTML to blank meaning 

electronicsButton.addEventListener("click", (e) => {
  e.preventDefault();
  Display.innerHTML = "";
  fakeStore("/category/electronics");
});

jewelryButton.addEventListener("click", (e) => {
  e.preventDefault();
  Display.innerHTML = "";
  fakeStore("/category/jewelery");
});

mensClothingButton.addEventListener("click", (e) => {
  e.preventDefault();
  Display.innerHTML = "";
  fakeStore(`/category/men's%20clothing?sort=asc1`);
});

womensClothingButton.addEventListener("click", (e) => {
  e.preventDefault();
  Display.innerHTML = "";
  fakeStore(`/category/women's%20clothing?sort=asc`);
});

cartButton.addEventListener("click", e => {
  e.preventDefault();
  displayCart();
});

purchaseButton.addEventListener("click", (e) => {
  e.preventDefault();
  alert("Thank you for your Purchase!");
});

clearCartButton.addEventListener("click", (e) => {
  e.preventDefault();
  displayCart();
  clearCart();
  console.log(cart);
})

// page loads, no user action taken

window.onload = (e) => {
  fakeStore("");
};


