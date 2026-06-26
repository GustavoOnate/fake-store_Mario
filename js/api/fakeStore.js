const BASE_URL = "https://fakestoreapi.com"

export async function getAllProducts () {
  const response = await fetch(`${BASE_URL}/products`)
  return response.json()
}
