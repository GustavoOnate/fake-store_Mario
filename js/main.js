import productsComponent from "./components/products.js"
import { getAllProducts, getCategories, getProductsByCategory } from "./api/fakeStore.js"

const App = document.querySelector("#app")

function router() {
  const hash = window.location.hash || "#/" 

  App.innerHTML = ""

  switch (hash) {
    case "#/":
      renderCatalog()
      break
    case "#/cart":
      renderCart()
      break
    default:
      App.innerHTML = `<h2>404 - Página no encontrada</h2>`
  }
}

window.addEventListener("hashchange", router)
window.addEventListener("DOMContentLoaded", router)

async function renderCatalog() {
  App.innerHTML = `
  <div class="flex flex-col items-center justify-center gap-3 py-20">
    <span class="loading loading-spinner loading-lg text-success"></span>
    <p class="text-gray-500 text-sm">Cargando productos...</p>
  </div>
`  
  try {
    const [productos, categorias] = await Promise.all([
      getAllProducts(),
      getCategories()
    ])

    App.innerHTML = `
      <div id="filters-container" class="category-filter-container"></div>
      <div id="products-container"></div>
    `
    renderFilters(categorias)
    renderProductsGrid(productos)
  } catch (error) {
    console.error(error)
    App.innerHTML = `
    <div class="flex flex-col items-center justify-center gap-4 py-20">
      <div class="alert alert-error max-w-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>No se pudieron cargar los productos. Revisa tu conexión.</span>
      </div>
      <button onclick="location.reload()" class="btn btn-error btn-outline btn-sm">
        Reintentar
      </button>
    </div>
  `  }
}

function renderCart() {
  App.innerHTML = `
    <div style="padding: 32px;">
      <h2>Carrito de Compras</h2>
      <p>Aquí verás tus productos próximamente.</p>
    </div>
  `
}

function renderFilters(categorias) {
  const container = document.querySelector("#filters-container")
  const allCategories = ["all", ...categorias]

  container.innerHTML = allCategories.map(cat => 
    `<button class="filter-btn" data-category="${cat}">${cat === "all" ? "Todos" : cat}</button>`
  ).join("")

  container.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const cat = e.target.dataset.category
      const productsContainer = document.querySelector("#products-container")
      productsContainer.innerHTML = `
      <div class="flex items-center justify-center py-16">
        <span class="loading loading-spinner loading-lg text-success"></span>
      </div>
    `      
      const products = cat === "all" ? await getAllProducts() : await getProductsByCategory(cat)
      renderProductsGrid(products)
    })
  })
}

function renderProductsGrid(productos) {
  const container = document.querySelector("#products-container")
  container.innerHTML = `<div class="grid">${productsComponent(productos)}</div>`
}