<template>
    <div>
      <h1>Products</h1>
      <ProductList />
    </div>
  </template>
  
  <script>
  import ProductList from '@/components/ProductList.vue';
  
  export default {
    name: 'ProductsView',
    components: {
      ProductList
    }
  }
  </script>
  
  <style scoped>
  </style>
  