// ArrayObject to store the place details
const place_details = [
  {
    id: 1,
    name: "Paris",
    location: "Paris, France",
    position: "left",
    background_url:
      "https://d31aoa0ehgvjdi.cloudfront.net/media/countries/176363325915420746803283691406.jpg",
    description:
      "Paris is a city that blends timeless elegance with vibrant culture. From the iconic Eiffel Tower to the artistic halls of the Louvre, every corner tells a story of history and creativity. Strolling along the Seine River or exploring charming cafés gives you a true taste of Parisian life. The city is also known for its fashion, cuisine, and romantic atmosphere, making it one of the most visited destinations in the world.",
    highlight: "The city of love and iconic landmarks",
    tag1: "Culture",
    tag2: "Romantic",
    best_time: "April - June",
    budget: "₹80,000 - ₹1,50,000",
    duration: "5-7 Days",
    weather: "Pleasant",
    rating: 4.8,
    attractions: ["Eiffel Tower", "Louvre Museum", "Nice Beach"],
  },

  {
    id: 2,
    name: "Rome",
    location: "Rome, Italy",
    position: "center",
    background_url:
      "https://d31aoa0ehgvjdi.cloudfront.net/media/countries/168441961093255019187927246094.jpg",
    description:
      "Rome is a living museum where ancient history meets modern life. The city is home to world-famous landmarks like the Colosseum, Roman Forum, and Vatican City. Walking through its streets feels like traveling back in time while enjoying delicious Italian cuisine and lively piazzas. From historic architecture to rich cultural traditions, Rome offers a unique experience that captures the essence of Italy.",
    highlight: "A journey through history and flavors",
    tag1: "History",
    tag2: "Food",
    best_time: "May - September",
    budget: "₹90,000 - ₹1,60,000",
    duration: "6-8 Days",
    weather: "Warm",
    rating: 4.7,
    attractions: ["Colosseum", "Venice Canals", "Leaning Tower of Pisa"],
  },

  {
    id: 3,
    name: "Barcelona",
    location: "Barcelona, Spain",
    position: "right",
    background_url:
      "https://d31aoa0ehgvjdi.cloudfront.net/media/countries/175344481739372777938842773438.jpg",
    description:
      "Barcelona is a vibrant coastal city known for its artistic architecture and energetic lifestyle. The city is famous for Antoni Gaudí’s masterpieces, including the stunning Sagrada Familia. With beautiful beaches, lively markets, and a rich cultural scene, Barcelona offers something for every traveler. Its nightlife, festivals, and Mediterranean charm make it one of the most exciting destinations in Europe.",
    highlight: "Where culture meets celebration",
    tag1: "Beach",
    tag2: "Nightlife",
    best_time: "March - May",
    budget: "₹70,000 - ₹1,40,000",
    duration: "5-7 Days",
    weather: "Sunny",
    rating: 4.6,
    attractions: ["Sagrada Familia", "Ibiza", "Madrid Palace"],
  },

  {
    id: 4,
    name: "Dubai",
    location: "Dubai, UAE",
    position: "left",
    background_url:
      "https://d31aoa0ehgvjdi.cloudfront.net/media/states/168449849427613854408264160156.jpeg",
    description:
      "Dubai is a futuristic city that combines luxury, innovation, and tradition. Known for its towering skyscrapers like the Burj Khalifa, the city offers world-class shopping, entertainment, and fine dining. Visitors can experience thrilling desert safaris, explore cultural heritage sites, or relax in luxurious resorts. Dubai’s blend of modern architecture and Arabian culture creates a unique and unforgettable travel experience.",
    highlight: "Experience luxury and futuristic living",
    tag1: "Luxury",
    tag2: "Modern",
    best_time: "November - February",
    budget: "₹60,000 - ₹1,20,000",
    duration: "4-6 Days",
    weather: "Warm",
    rating: 4.7,
    attractions: ["Burj Khalifa", "Desert Safari", "Dubai Mall"],
  },

  {
    id: 5,
    name: "Singapore",
    location: "Singapore",
    position: "center",
    background_url:
      "https://d31aoa0ehgvjdi.cloudfront.net/media/page/176061517102325797080993652344.jpg",
    description:
      "Singapore is a modern city-state known for its cleanliness, innovation, and diverse culture. It features iconic landmarks like Marina Bay Sands and Gardens by the Bay, blending urban development with nature. The city offers a wide variety of cuisines, shopping destinations, and entertainment options. With its efficient transport system and vibrant neighborhoods, Singapore provides a seamless and enjoyable travel experience.",
    highlight: "A perfect blend of nature and city",
    tag1: "City",
    tag2: "Clean",
    best_time: "February - April",
    budget: "₹70,000 - ₹1,30,000",
    duration: "4-5 Days",
    weather: "Humid",
    rating: 4.6,
    attractions: ["Marina Bay Sands", "Sentosa Island", "Gardens by the Bay"],
  },

  {
    id: 6,
    name: "Bali",
    location: "Bali, Indonesia",
    position: "right",
    background_url:
      "https://d31aoa0ehgvjdi.cloudfront.net/media/page/176061511496321749687194824219.jpg",
    description:
      "Bali is a tropical paradise known for its stunning beaches, lush rice terraces, and spiritual atmosphere. The island offers a perfect mix of relaxation and adventure, from surfing and diving to exploring temples and waterfalls. Visitors can experience rich Balinese culture, traditional art, and wellness retreats. Bali’s natural beauty and peaceful vibe make it a favorite destination for travelers seeking both excitement and tranquility.",
    highlight: "Relax in nature’s paradise",
    tag1: "Nature",
    tag2: "Relax",
    best_time: "April - October",
    budget: "₹50,000 - ₹1,00,000",
    duration: "5-7 Days",
    weather: "Tropical",
    rating: 4.8,
    attractions: ["Ubud", "Tanah Lot Temple", "Kuta Beach"],
  },
];

const card_container = document.querySelector(".card-section");

place_details.forEach(renderPlace); //renders every place while page loading

//funtion to render each places
function renderPlace(place) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.classList.add(place.position);

  //background image
  card.style.background = `
  linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6)),
  url(${place.background_url})
`;
  card.style.backgroundPosition = "center";
  card.style.backgroundSize = "cover";


  card.innerHTML = `
          <div class="card-header-badges">
            <span class="badge">${place.tag1}</span>
            <span class="badge">${place.tag2}</span>
          </div>
          <div class="card-footer">
            <h1 class="card-header">${place.name}</h1>
            <p class="card-description">${place.highlight}</p>
          </div>
    `;

  card.addEventListener("click", () => {
    const popup = document.getElementById("popup-body");
    const popup_bg = document.querySelector(".sub-popup-header");

    // background image
    popup_bg.style.background = `linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6)), url(${place.background_url})`;
    popup_bg.style.backgroundPosition = "center";
    popup_bg.style.backgroundSize = "cover";

    //loading details for popup header 
    popup_bg.innerHTML = `
      <div class="popup-header">
        <h1>${place.location}</h1>
        <p>${place.highlight}</p>
      </div>
    `;

    //loading details for popup body
    popup.innerHTML = `

            <div>
              <span class="badge"><i class="fa fa-star-o"></i> ${place.rating}</span>
              <span class="badge">${place.tag1}</span>
              <span class="badge">${place.tag2}</span>
              <span class="badge">${place.weather}</span>
            </div>
            <div>
              <h2>Popular locations to visit in ${place.name}</h2>
              <div class="popup-body-places">
                ${place.attractions.map((a) => `<span>${a}</span>`).join("")}
              </div>
            </div>
            <div>
              <h2>A little about ${place.name}</h2>
              <p>
              ${place.description}
              </p>
            </div>

            <div class="popup-body-footer">
              <div>
                <h2>Best time to visit</h2>
                <p>${place.best_time}</p>
              </div>
              <div>
                <h2>Budget</h2>
                <p>${place.budget}</p>
              </div>
              <div>
                <h2>Duration</h2>
                <p>${place.duration}</p>
              </div>
            </div>
      `;

    window.location.hash = "popup-container";
  });

  card_container.appendChild(card);
}
