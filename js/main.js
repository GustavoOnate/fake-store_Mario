import products from "./components/products.js"
import { getAllProducts } from "./api/fakeStore.js"

const App = document.querySelector("#app")

const productos = await getAllProducts()
console.log(productos)
App.innerHTML = products(productos)
