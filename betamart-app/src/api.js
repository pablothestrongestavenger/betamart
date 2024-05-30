// api.js

const baseUrl = 'http://your-laravel-api'; // Replace this with your actual API base URL

export async function fetchProducts() {
  const response = await fetch(`${baseUrl}/products`);
  return await response.json();
}

export async function addProduct(productData) {
  const response = await fetch(`${baseUrl}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData)
  });
  return await response.json();
}

export async function updateProduct(productId, productData) {
  const response = await fetch(`${baseUrl}/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData)
  });
  return await response.json();
}

export async function deleteProduct(productId) {
  const response = await fetch(`${baseUrl}/products/${productId}`, {
    method: 'DELETE'
  });
  return await response.json();
}
