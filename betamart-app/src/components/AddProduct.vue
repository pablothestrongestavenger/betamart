<template>
  <div>
    <NavBar></NavBar>
    <div class="container mt-5">
      <h1 class="text-center mb-4">Add Product</h1>
      <form @submit.prevent="addProduct" class="modern-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" v-model="name" placeholder="Enter name">
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea class="form-control" v-model="description" id="description" rows="3"></textarea>
        </div>

        <div class="row">
          <div class="form-group col-md-6">
            <label for="price">Price</label>
            <input type="number" class="form-control" step="0.01" v-model="price" placeholder="Price">
          </div>
          <div class="form-group col-md-6">
            <label for="stocks">Stocks</label>
            <input type="number" class="form-control" name="stocks" v-model="stocks" placeholder="Stocks">
          </div>
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-green">Save</button>
          <router-link to="/home" class="btn btn-secondary ml-2">Cancel</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '@/lib/config';
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      name: '',
      description: '',
      price: 0.00,
      stocks: 0
    }
  },
  methods: {
    async addProduct() {
      try {
        // Check if product already exists
        let products = this.$store.getters.getProducts;
        for (let i = 0; i < products.length; i++) {
          if (this.name.toLowerCase() == products[i].name.toLowerCase()) {
            throw "Product already exists";
          }
        }

        const response = await axios.post('/api/products/store', {
          name: this.name,
          description: this.description,
          stocks: this.stocks,
          user_id: this.$store.getters.getAccountDetails.id,
          price: this.price
        });

        if (response.status == 201) {
          this.$store.dispatch('asyncAddProduct', response.data.product);
          alert('Product created');
          this.$router.push('/home');
        }
      } catch (error) {
        alert(error);
      }
    }
  }
}
</script>

<style scoped>
.modern-form {
  width: 100%;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

.modern-form .form-group {
  margin-bottom: 20px;
}

.modern-form .form-control {
  border-radius: 5px;
}

.modern-form .btn {
  border-radius: 5px;
  padding: 10px 20px;
}

.btn-green {
  margin: 10px;
  background-color: #006400; /* Dark green button color */
  border-color: #004d00; /* Dark green border color */
  color: white;
}

.btn-green:hover {
  background-color: #004d00; /* Darker green on hover */
  border-color: #003300; /* Darker green border on hover */
}
</style>
