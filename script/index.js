// Modal Close btn
const closeModal = () => {
  const modal = document.getElementById("productModal");
  modal.close();
};

// ShowModal
const showDetailsModal = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/plant/${id}`,
  );
  const data = await res.json();

  // set dynamic element for modal
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <h2 class="text-xl font-semibold">${data.plants.name}</h2>
                  <div
                    class="badge badge-soft badge-accent text-[#15803D] font-medium"
                  >
                    ${data.plants.category}
                  </div>
                </div>
                <div id="modal-close-btn" onclick="closeModal()" class="">
                  <span class="btn btn-ghost hover:bg-white hover:border-none"><i class=" fa-solid fa-circle-xmark text-[#15803D] text-3xl"></i></span>
                   
                </div>
              </div>
              <div class="">
                <img src="${data.plants.image}" alt="" class="h-[300px] w-auto mx-auto rounded-md" />
              </div>
              <p>
                A fast-growing tropical tree that produces delicious, juicy
                mangoes during summer. Its dense green canopy offers shade,
                while its sweet fruits are rich in vitamins and minerals.
              </p>
              <div class="flex justify-between items-center mt-3">
                  <p class="font-bold text-2xl text-[#15803D]">&#2547 500 </p>
                  <button class="btn active rounded-full ">Add To Cart</button>
              </div>
  `;

  // display modal
  document.getElementById("productModal").showModal();
};

// Spinner Controller
const controllSpinner = (value) => {
  if (value) {
    document.getElementById("spinner").classList.remove("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
  }
};

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
            id="catagory-btn-${catagory.id}"
                onclick="loadTreeByCatagory(${catagory.id})"
                class="btn btn-outline justify-start w-full catagory-btn"
              >
               ${catagory.category_name}
              </button>
        `;

    catagoriesContainer.append(btnDiv);
  });
};

// Load all trees Product
const loadAllTrees = async () => {
  controllSpinner(true);
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  displayAllTrees(data.plants);
};

// Display all tress defaultly
const displayAllTrees = (trees) => {
  const productContainer = document.getElementById("product-card-container");
  productContainer.innerHTML = "";
  trees.forEach((tree) => {
    const card = document.createElement("div");
    card.innerHTML = `
            <div class="card bg-base-100 shadow-xl h-[500px]">
                <figure class="" onclick="showDetailsModal(${tree.id})">
                  <img
                  class="w-full"
                    src="${tree.image}"
                    alt=""
                  />
                </figure>
                <div class="card-body p-4 space-y-1">
                  <h2 onclick="showDetailsModal(${tree.id})" class="card-title text-left">${tree.name}</h2>
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
    controllSpinner(false);
  });
};

// Load Tree product by catagory
const loadTreeByCatagory = async (id) => {
  controllSpinner(true);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/category/${id}`,
  );
  const data = await res.json();
  removeActive();
  const catagoryBtn = document.getElementById(`catagory-btn-${id}`);
  catagoryBtn.classList.add("active");
  displayAllTrees(data.plants);
};

// Remove Active Class from tab btn
const removeActive = () => {
  const catagoryBtn = document.querySelectorAll(".catagory-btn");
  catagoryBtn.forEach((btn) => {
    btn.classList.remove("active");
  });
};

// All trees tab btn
const allTreeBtn = () => {
  const productContainer = document.getElementById("product-card-container");
  productContainer.innerHTML = "";
  removeActive();
  const btn = document.getElementById("all-tree-btn");
  btn.classList.add("active");
  loadAllTrees();
};

loadAllTrees();
loadCatagories();
