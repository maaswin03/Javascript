//variable to store card and loading container
const card_container = document.querySelector(".card-container");
const loading_container = document.querySelector(".loading-content");
loading_container.classList.add("empty"); // making the loader container empty but adding empty class

//variables for filter option
const radio = document.querySelectorAll('input[name="stock"]');
const checkbox = document.querySelectorAll('input[name="cat"]');
const select = document.getElementById("sortSelect");
const search = document.getElementById("searchInput");

const cart = JSON.parse(localStorage.getItem("cart")) || []; //array to store cart data from localstorage
let products = []; //array to store product details
let filter = { stock: "", category: [], sort: "", search: "" }; //object for storing filter contents

fetchproducts();

//function to filter products
function filterproducts() {
  let result = [...products];

  //filter - stock
  if (filter.stock) {
    if (filter.stock === "In Stock") {
      result = result.filter((p) => p.availabilityStatus === "In Stock");
    } else if (filter.stock === "Low Stock") {
      result = result.filter((p) => p.availabilityStatus === "Low Stock");
    } else {
      filter.stock = "";
    }
  }

  //filter - category
  if (filter.category.length > 0) {
    result = result.filter((p) => {
      if (filter.category.includes("beauty") && p.category === "beauty") {
        return true;
      }
      if (
        filter.category.includes("fragrances") &&
        p.category === "fragrances"
      ) {
        return true;
      }
      if (filter.category.includes("furniture") && p.category === "furniture") {
        return true;
      }
      if (filter.category.includes("groceries") && p.category === "groceries") {
        return true;
      }
      if (
        filter.category.includes("home-decoration") &&
        p.category === "home-decoration"
      ) {
        return true;
      }
      if (
        filter.category.includes("kitchen-accessories") &&
        p.category === "kitchen-accessories"
      ) {
        return true;
      }
      if (filter.category.includes("laptops") && p.category === "laptops") {
        return true;
      }
      if (filter.category.includes("mens")) {
        return p.category === "mens-shoes" || p.category === "mens-shirts";
      }
      return false;
    });
  }

  //filter - sort
  if (filter.sort) {
    if (filter.sort == "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (filter.sort == "price-desc") {
      result = [...result].sort((a, b) => a.price - b.price);
      result = result.reverse();
    } else if (filter.sort == "rating") {
      result = [...result].sort((a, b) => a.rating - b.rating);
      result = result.reverse();
    }
  }

  //filter - search
  if (filter.search) {
    console.log(filter.search);
    result = result.filter(
      (a) =>
        a.category?.toLowerCase().includes(filter.search) ||
        a.title?.toLowerCase().includes(filter.search) ||
        a.brand?.toLowerCase().includes(filter.search),
    );
  }

  //make container empty if result = 0
  if (result.length === 0) {
    card_container.classList.add("empty");
    loading_container.classList.remove("empty");
    loading_container.innerHTML = `
          <h3>No products found</h3>
          <p>Try adjusting your filters or search term</p>
    `;
  }

  //removing empty container class
  if (result.length > 0) {
    card_container.classList.remove("empty");
    loading_container.classList.add("empty");
  }

  card_container.innerHTML = "";
  result.forEach(render);
}

//function to fetch product details
async function fetchproducts() {
  //making the container so loading
  card_container.classList.add("empty");
  loading_container.classList.remove("empty");
  loading_container.innerHTML = `
          <h3>Loading products...</h3>
          <p>Please wait</p>
    `;
  // fetching products
  try {
    const res = await fetch("https://dummyjson.com/products?limit=92");
    const data = await res.json();
    products = [...data.products];
    products.forEach(render);
    card_container.classList.remove("empty");
    loading_container.classList.add("empty");
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

//event listener for stock
radio.forEach((ch) => {
  ch.addEventListener("change", (e) => {
    filter.stock = e.target.value;
    filterproducts();
  });
});

//event listener for category
checkbox.forEach((r) => {
  r.addEventListener("change", (e) => {
    if (e.target.checked) {
      filter.category.push(e.target.value);
    } else {
      filter.category = filter.category.filter((c) => c !== e.target.value);
    }
    filterproducts();
  });
});

//event listener for sorting
select.addEventListener("change", (e) => {
  filter.sort = e.target.value;
  filterproducts();
});

//event listener for searching
search.addEventListener("input", (e) => {
  filter.search = e.target.value.toLowerCase();
  filterproducts();
});

//function to render the card ui
function render(product) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.id = product.id;

  const selling_price =
    product.price - (product.price / 100) * product.discountPercentage; //selling price calculation

  card.innerHTML = `
        <div class="card-header">
            <div class="tag"><span>${product.availabilityStatus}</span></div>
          </div>
          <div class="card-body">
            <div class="product-name">
              <h2>${product.brand || product.title}</h2>
              <p>
              ${product.description}
              </p>
            </div>
            <div class="extra-details">
              <span class="badge">${product.stock} left</span>
              <span class="badge"><i class="fa fa-star-o"></i> ${product.rating}</span>
              <span class="badge">${product.discountPercentage}% Off</span>
            </div>
            <div class="product-price">
              <div class="card-price">
                <h3>$${selling_price.toFixed(2)}</h3>
              </div>
              <div class="cart-button">
                <button type="button">Add to cart</button>
              </div>
            </div>
          </div>
    `;
  const header = card.querySelector(".card-header");
  header.style.background = `url(${product.images[0] || product.images[1]}`;
  header.style.backgroundPosition = "center";
  header.style.backgroundSize = "cover";
  header.style.backgroundColor = "white";

  card_container.appendChild(card);

  const existingItem = cart.find((c) => c.product_id === String(product.id));

  const cartButton = card.querySelector(".cart-button");

  if (existingItem) {
    cartButton.innerHTML = `
    <button class="qty-btn" data-action="dec">-</button>
    <span class="qty-count">${existingItem.quantity}</span>
    <button class="qty-btn" data-action="inc">+</button>
  `;
  } else {
    cartButton.innerHTML = `<button class="add-btn">Add to cart</button>`;
  }

  //changing button based on cart details
  cartButton.addEventListener("click", (e) => {
    const id = card.dataset.id;
    const index = cart.findIndex((c) => c.product_id === id);
    
    //new to cart
    if (e.target.classList.contains("add-btn")) {
      cart.push({ product_id: String(id), quantity: 1 });
      cartButton.innerHTML = `
      <button class="qty-btn" data-action="dec">-</button>
      <span class="qty-count">1</span>
      <button class="qty-btn" data-action="inc">+</button>
    `;
    } 
    //incrementing the product qty
    else if (e.target.dataset.action === "inc") {
      if (cart[index].quantity >= product.stock) {
        return;
      }
      cart[index].quantity++;
      cartButton.querySelector(".qty-count").textContent = cart[index].quantity;
    }
    //decrementing the product qty 
    else if (e.target.dataset.action === "dec") {
      cart[index].quantity--;
      if (cart[index].quantity === 0) {
        cart.splice(index, 1);
        cartButton.innerHTML = `<button class="add-btn">Add to cart</button>`;
      } else {
        cartButton.querySelector(".qty-count").textContent =
          cart[index].quantity;
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // storing in localstorage
  });
}
