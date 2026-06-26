export default function productCard (item) {
  return `
  <div class="card">
      <img src="${item.image}" alt="">
      <h2>${item.title}</h2>
      <p>${item.category}</p>
      <p>${item.description}</p>
      <p>${item.price}</p>
      <a href="#">Agregar al carrito</a>
    </div>
  `
}
