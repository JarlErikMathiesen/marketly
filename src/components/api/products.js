const BASE_URL = 'https://v2.api.noroff.dev/online-shop';

export async function fetchProducts() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
}

export async function fetchProductById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  return response.json();
}
