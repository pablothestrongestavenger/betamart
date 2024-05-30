<template>
    <div>
      <h2>Delete Product</h2>
      <button @click="deleteProduct">Delete Product</button>
    </div>
  </template>
  
  <script>
  import { deleteProduct } from '../api';
  
  export default {
    data() {
      return {
        productId: '' // Assuming you have a way to get the product ID
      }
    },
    methods: {
      async deleteProduct() {
        try {
          await deleteProduct(this.productId);
          console.log('Product deleted successfully');
          // Optionally, you can navigate to the product list page after deleting
          this.$router.push('/');
        } catch (error) {
          console.error('Error deleting product:', error);
          // Handle error, show feedback to the user
        }
      }
    }
  }
  </script>
  