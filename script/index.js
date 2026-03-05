// Load and display catagories Tab
const loadCatagories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories",
  );
  const data = await res.json();
  displayCatagories(data.categories);
};

const displayCatagories = (catagories) => {
  const catagoriesContainer = document.getElementById("catagories-container");
  catagories.forEach((catagory) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
            <button
                class="btn btn-outline justify-start w-full "
              >
               ${catagory.category_name}
              </button>
        `;

    catagoriesContainer.append(btnDiv);
  });
};

// Load all trees Product
const loadAllTrees = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  displayAllTrees(data.plants);
};

// Display all tress defaultly
const displayAllTrees = (trees) => {
  const productContainer = document.getElementById("product-card-container");
  trees.forEach((tree) => {
    const card = document.createElement("div");
    card.innerHTML = `
            <div class="card bg-base-100 shadow-sm h-[500px]">
                <figure>
                  <img
                  class="w-full"
                    src="${tree.image}"
                    alt=""
                  />
                </figure>
                <div class="card-body p-4 space-y-1">
                  <h2 class="card-title text-left">${tree.name}</h2>
                  <p class="text-left">
                    ${tree.description}
                  </p>
                  <div class="flex justify-between my-1">
                    <div class="badge badge-soft badge-accent text-[#15803D] font-medium">${tree.category}</div>
                    <div>
                        <p class="font-bold text-xl">&#2547 ${tree.price}</p>
                    </div>
                  </div>
                  <div class="card-actions justify-end">
                    <button class="btn active rounded-full w-full mx-auto mt-2.5">Add To Cart</button>
                  </div>
                </div>
              </div>
        `;

    productContainer.append(card);
  });
};

loadAllTrees();
loadCatagories();
