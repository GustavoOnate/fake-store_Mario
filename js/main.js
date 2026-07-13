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
    App.innerHTML = `<p class="state-message">Error al cargar la tienda.</p>`
  }
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