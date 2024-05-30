<template>
    <div>
      <h2>Edit Product</h2>
      <form @submit.prevent="updateProduct">
        <input type="text" v-model="productName" placeholder="Product Name" required>
        <input type="number" v-model="price" placeholder="Price" required>
        <button type="submit">Update Product</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        productId: '', // Assuming you have a way to get the product ID
        productName: '',
        price: 0
      }
    },
    mounted() {
      // Fetch product details based on product ID
      axios.get(`http://your-laravel-api/products/${this.productId}`)
        .then(response => {
          this.productName = response.data.name;
          this.price = response.data.price;
        })
        .catch(error => {
          console.error('Error fetching product:', error);
        });
    },
    methods: {
      updateProduct() {
        axios.put(`http://your-laravel-api/products/${this.productId}`, {
          name: this.productName,
          price: this.price
        })
        .then(response => {
          console.log('Product updated successfully:', response.data);
          // Optionally, you can navigate to the product list page after updating
          // this.$router.push('/');
        })
        .catch(error => {
          console.error('Error updating product:', error);
        });
      }
    }
  }
  </script>
  