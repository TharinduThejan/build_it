const API_URL = 'http://localhost:5000';

export async function getProducts() {
  const res = await fetch(`${API_URL}/products`, {
    cache: 'no-store',
  });
  return res.json();
}

export async function getProductById(id: string) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    cache: 'no-store',
  });
  return res.json();
}
