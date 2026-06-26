import productCard from "./productCard.js"

export default function products (products) {
  return products.map(product => productCard(product))
}
