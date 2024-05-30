<template>
    <div>
      <h2>Add Product</h2>
      <form @submit.prevent="addProduct">
        <input type="text" v-model="productName" placeholder="Product Name" required>
        <input type="number" v-model="price" placeholder="Price" required>
        <button type="submit">Add Product</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        productName: '',
        price: 0
      }
    },
    methods: {
      addProduct() {
        fetch('http://your-laravel-api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.productName,
            price: this.price
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Product added successfully:', data);
          // Optionally, you can navigate to the product list page after adding
          this.$router.push('/');
        })
        .catch(error => console.error('Error adding product:', error));
      }
    }
  }
  </script>
  