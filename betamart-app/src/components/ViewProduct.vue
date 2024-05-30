<template>
    <div>
      <h2>Products</h2>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: []
      }
    },
    mounted() {
      fetch('http://your-laravel-api/products')
        .then(response => response.json())
        .then(data => this.products = data);
    }
  }
  </script>
  