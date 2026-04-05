//variables for card container , promo input and button and loading and checkout button
const card_container = document.querySelector(".card-container");
const payment_container = document.querySelector(".payment-container");
const loading_container = document.querySelector(".loading-content");

const promoinput = document.getElementById("promo-code");
const promobtn = document.getElementById("apply-button");
const checkout = document.getElementById("checkout-btn");

const cart = JSON.parse(localStorage.getItem("cart")) || []; // used for storing cart details from local storage
let products = [];
let promo = null;
let total = 0;
const validPromos = ["FLAT05", "FLAT10"];

fetchdetails();

//event listener for checkout button
checkout.addEventListener("click", () => {
  openRazorpay();
});

//event listener for promo button
promobtn.addEventListener("click", () => {
  // making promo input field empty and making button as apply
  if (promo) {
    promo = null;
    promoinput.value = "";
    promoinput.disabled = false;
    promobtn.textContent = "Apply";

    paymentdetails();
    return;
  }

  // storing promo
  const code = promoinput.value.trim().toUpperCase();

  if (!code) {
    alert("Enter a promo code");
    return;
  }

  if (!validPromos.includes(code)) {
    alert("Invalid promo code");
    return;
  }

  promo = code;

  //making fields disables and changing button names
  promoinput.disabled = true;
  promobtn.textContent = "Remove";

  paymentdetails();
});

//function to fetch details of the product and storing only thr product in cart
async function fetchdetails() {
  //loading container
  card_container.classList.add("empty");
  loading_container.classList.remove("empty");
  loading_container.innerHTML = `
          <h3>Loading products...</h3>
          <p>Please wait</p>
    `;
  try {
    const res = await fetch("https://dummyjson.com/products?limit=92");
    const data = await res.json();
    const item = data.products;

    for (let i = 0; i < cart.length; i++) {
      for (let j = 0; j < item.length; j++) {
        if (cart[i].product_id == item[j].id) {
          products.push(item[j]);
        }
      }
    }
    if (cart.length != products.length || cart.length === 0) {
      //showing error container
      card_container.classList.add("empty");
      loading_container.classList.remove("empty");
      loading_container.innerHTML = `
          <h3>No products to show</h3>
          <p>Try adding a product to cart</p>
    `;
      return;
    }
    products.forEach(render);
    card_container.classList.remove("empty");
    loading_container.classList.add("empty");
    paymentdetails();
  } catch (e) {
    //showing error container
    card_container.classList.add("empty");
    loading_container.classList.remove("empty");
    loading_container.innerHTML = `
          <h3>Failed to fetch products</h3>
          <p>Try again later</p>
    `;
    console.error(e);
  }
}

//function to render the card ui 
function render(product) {
  const card = document.createElement("div");
  card.dataset.id = product.id;
  card.classList.add("card");
  const cartItem = cart.find((c) => Number(c.product_id) === product.id);
  const qty = cartItem ? cartItem.quantity : 1;

  const selling_price =
    product.price - (product.price / 100) * product.discountPercentage;

  card.innerHTML = `
            <div class="image-container"></div>
          <div class="product-details">
            <div class="product-details-1">
              <h2>${product.brand || product.title}</h2>
              <p>${product.shippingInformation}</p>
            </div>
            <p id="product-price">$${(selling_price * qty).toFixed(2)}</p>
          </div>
          <div class="product-button">
            <div>
              <button class="delete">Remove</button>
            </div>
            <div>
              <button id="qty-btn" data-action="dec">-</button>
              <span class="qty-count">${qty}</span>
              <button id="qty-btn" data-action="inc">+</button>
            </div>
          </div>
  `;

  const header = card.querySelector(".image-container");
  header.style.background = `url(${product.images[0] || product.images[1]})`;
  header.style.backgroundPosition = "center";
  header.style.backgroundSize = "cover";
  header.style.backgroundColor = "white";

  card_container.appendChild(card);

  const cartButton = card.querySelector(".product-button");

  cartButton.addEventListener("click", (e) => {
    const index = cart.findIndex((c) => Number(c.product_id) === product.id);
    const selling_price =
      product.price - (product.price / 100) * product.discountPercentage;

    if (index === -1) return;

    //new to cart
    if (e.target.classList.contains("delete")) {
      cart.splice(index, 1);
      card.remove();
    }
    //incrementing the product qty
    else if (e.target.dataset.action === "inc") {
      if (cart[index].quantity >= product.stock) {
        return;
      }
      cart[index].quantity++;
      cartButton.querySelector(".qty-count").textContent = cart[index].quantity;
      card.querySelector("#product-price").textContent =
        "$" + (selling_price * cart[index].quantity).toFixed(2);
    }
    //decrementing the product qty
    else if (e.target.dataset.action === "dec") {
      if (cart[index].quantity === 1) {
        cart.splice(index, 1);
        card.remove();
        return;
      }
      cart[index].quantity--;
      cartButton.querySelector(".qty-count").textContent = cart[index].quantity;
      card.querySelector("#product-price").textContent =
        "$" + (selling_price * cart[index].quantity).toFixed(2);
    }

    paymentdetails();
    localStorage.setItem("cart", JSON.stringify(cart));
  });
}


//function to calculate the payment details
function paymentdetails() {
  let sub_total = 0;
  let discount = 0;

  for (let i = 0; i < cart.length; i++) {
    const index = products.findIndex((c) => Number(c.id) == cart[i].product_id);

    let product = products[index];

    const selling_price =
      product.price - (product.price / 100) * product.discountPercentage;

    sub_total += selling_price * cart[i].quantity;
  }

  if (promo === "FLAT05") {
    discount = sub_total * 0.05;
  } else if (promo == "FLAT10") {
    discount = sub_total * 0.1;
  }

  const delivery = cart.length > 0 ? 10 : 0;
  total = sub_total - discount + delivery;

  document.getElementById("sub-total").innerText = "$" + sub_total.toFixed(2);
  document.getElementById("discount").innerText = "- $" + discount.toFixed(2);
  document.getElementById("delivery").innerText = "$" + delivery.toFixed(2);
  document.getElementById("total").innerText = "$" + total.toFixed(2);
}

//function when checkpout button is called
function openRazorpay() {
  var options = {
    key: "rzp_test_SYiPPzxs0pZsYV",
    amount: Math.round(total * 100),
    currency: "INR",
    name: "Kartify",
    handler: function (response) {
      console.log(response);
      success();
    },
    prefill: {
      name: "ASWIN M A",
      email: "aswin@example.com",
      contact: "+919876543210",
    },
    theme: {
      color: "#282828",
    },
  };
  var rzp1 = new Razorpay(options);
  rzp1.open();
}


//function to show succes details after payment
function success() {
  card_container.classList.add("empty");
  payment_container.classList.add("empty");

  localStorage.removeItem("cart");

  window.location.hash="add-task-success";
}

