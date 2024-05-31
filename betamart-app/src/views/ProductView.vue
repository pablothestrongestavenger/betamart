<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-end mb-3">
      <button class="btn btn-primary" @click="showModal('add')">Add Product</button>
    </div>
    <h1>Product Details</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Stocks</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in ApiProducts" :key="product.id">
          <th scope="row">{{ product.id }}</th>
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.stocks }}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="showModal('edit', product)">Edit</button>
            <button class="btn btn-danger btn-sm ml-2" @click="deleteProduct(product.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <transition :name="modalTransitionName">
      <div v-if="isModalVisible" class="modal fade show d-block" tabindex="-1" style="background: rgba(0, 0, 0, 0.5);">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ modalTitle }}</h5>
              <button type="button" class="btn-close" @click="isModalVisible = false"></button>
            </div>
            <div class="modal-body">
              <ProductForm :product="selectedProduct" @save="saveProduct" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import ProductForm from '../components/ProductForm.vue'; 

export default {
  components: {
    ProductForm
  },
  data() {
    return {
      ApiProducts: [],
      isModalVisible: false,
      selectedProduct: null,
      mode: 'add',
      modalTransitionName: ''
    };
  },
  computed: {
    modalTitle() {
      return this.mode === 'edit' ? 'Edit Product' : 'Add Product';
    }
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('/api/products');
        this.ApiProducts= response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    showModal(mode, product = null) {
      this.mode = mode;
      this.selectedProduct = mode === 'edit' ? { ...product } : { name: '', description: '', price: 0, stocks: 0 };
      this.isModalVisible = true;

      if (mode === 'edit') {
        this.modalTransitionName = 'modal-edit'; // Apply edit transition
      } else {
        this.modalTransitionName = 'modal'; // Apply default transition
      }
    },
    async saveProduct(product) {
      try {
        if (this.mode === 'edit') {
          await axios.put(`/api/products/${product.id}`, product);
          const index = this.ApiProducts.findIndex(p => p.id === product.id);
          if (index !== -1) {
            this.ApiProducts.splice(index, 1, product);
          }
        } else {
          const response = await axios.post('/api/products', product);
          this.ApiProducts.push(response.data);
        }
        this.isModalVisible = false;
      } catch (error) {
        console.error('Error saving product:', error);
      }
    },
    async deleteProduct(productId) {
      try {
        await axios.delete(`/api/products/${productId}`);
        this.ApiProducts = this.ApiProducts.filter(product => product.id !== productId);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    },
    resetModal() {
      this.selectedProduct = null;
    }
  },
  mounted() {
    this.fetchProducts(); // Fetch products when component is mounted
  }
};
</script>

<style scoped>
.modal.show.d-block {
  display: block;
}
</style>
