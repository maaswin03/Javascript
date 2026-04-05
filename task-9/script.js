let recipes = []; // array to store recipe details
let skip = 0;
let limit = 10;
let loading = false;
let hasMore = true;

const loader_card = document.querySelector(".loader");
loader_card.classList.add("loader_hide");
const card_container = document.querySelector(".card-container");

fetchdetails();

// Event listener for scroll and when reached the bottom trigger fetchdetails
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
    !loading &&
    hasMore
  ) {
    fetchdetails();
  }
});

// function to fetch details of the recipe
async function fetchdetails() {
  try {
    loading = true;

    loader_card.innerHTML = `
      <h2>Loading delicious recipes...</h2>
      `;
    loader_card.classList.remove("loader_hide");

    const res = await fetch(
      `https://dummyjson.com/recipes?limit=${limit}&skip=${skip}`,
    );
    const data = await res.json();

    if (data.recipes.length === 0) {
      hasMore = false;
      loader_card.innerHTML = `
      <h2>You’ve reached the end !</h2>
      `;
      loader_card.classList.remove("loader_hide");
      return;
    }

    recipes = [...recipes, ...data.recipes];

    skip += limit;

    data.recipes.forEach(render);

    loading = false;

    if (!loading) {
      loader_card.classList.add("loader_hide");
    }
  } catch (e) {
    loading = false;
    hasMore = false;
    loader_card.innerHTML = `
      <h2>Oops! Something went wrong. Please try again.</h2>
      `;
    loader_card.classList.remove("loader_hide");
    console.error(e);
  }
}

//function to render the card ui
function render(recipe) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
            <div class="card-header">
              <div class="header-badge">
                <span>${recipe.rating}</span>
                ${recipe.tags.map((i) => `<span>${i}</span>`).join("")}
              </div>
              <div class="header-heading">
                <h2>${recipe.name}</h2>
              </div>
            </div>

            <div class="card-body">
              <div class="ingredients">
                <h2>Ingredients</h2>
                <div class="header-badge">
                ${recipe.ingredients.map((i) => `<span>${i}</span>`).join("")}
                </div>
              </div>
              <div class="instructions">
                <h2>Instructions</h2>
                <div>
                  <ol>
                  ${recipe.instructions.map((i) => `<li>${i}</li>`).join("")}
                  </ol>
                </div>
              </div>
              <div class="others">
                <h2>Other Details</h2>
                <div class="header-badge">
                  <span>Prep Time : ${recipe.prepTimeMinutes}</span>
                  <span>Cook Time : ${recipe.cookTimeMinutes}</span>
                  <span>Servings : ${recipe.servings}</span>
                  <span>${recipe.difficulty}</span>
                </div>
              </div>
            </div>

    `;

  const card_header = card.querySelector(".card-header");
  card_header.style.background = `linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6)), url(${recipe.image})`;
  card_header.style.backgroundPosition = "center";
  card_header.style.backgroundSize = "cover";

  card_container.appendChild(card);
}
