<template>
  <div>
    <NavBar></NavBar>
    <div class="container-lg">
      <br>
      <div class="text-center mb-4">
        <router-link to="/add" class="btn btn-primary">Add Product</router-link>
      </div>

      <div v-if="getProducts.length < 1" class="text-center">
        <h3>Your cart is empty! Add to cart now!</h3>
      </div>

      <div v-else>
        <h2 class="text-center mb-4">My Products</h2>

        <div class="table-responsive">
          <table class="table table-hover table-bordered">
            <thead class="thead-light">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stocks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in getProducts" :key="product.name">
                <td>{{ product.name }}</td>
                <td>{{ product.description }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.stocks }}</td>
                <td>
                  <div class="d-flex justify-content-center">
                    <button @click="gotoEdit(product.id)" class="btn btn-warning mr-2">Edit</button>
                    <form @submit.prevent="deleteProduct(product)" class="d-inline-block">
                      <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure you want to delete this product?')">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/lib/config';
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar
  },

  async beforeMount() {
    // Load user details
    const accountDetails = await axios.get('/api/user');
    this.$store.dispatch('asyncLoadAccountDetails', accountDetails.data);

    // Load products of logged-in user
    const products = await axios.get('/api/all', {
      params: {
        user_id: this.$store.getters.getAccountDetails.id
      }
    });
    this.$store.dispatch('asyncLoadProducts', products.data.products);
  },

  computed: {
    getAccountDetails() {
      return this.$store.getters.getAccountDetails;
    },

    getProducts() {
      return this.$store.getters.getProducts;
    }
  },

  methods: {
    gotoEdit(productId) {
      this.$router.push({
        name: 'editProduct',
        params: { id: productId }
      });
    },

    async deleteProduct(product) {
      try {
        const response = await axios.delete('/api/products/delete/' + product.id);
        if (response.status == 200) {
          // Assign product as payload for deletion in products list
          let payload = product;
          this.$store.dispatch('asyncDeleteProduct', payload);
          alert("Product " + product.name + " has been deleted.");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
/* Adjust table styles */
.table {
  border: 1px solid #006400; /* Dark green border */
}

.table th,
.table td {
  border: 1px solid #006400; /* Dark green border */
  padding: 8px;
}

/* Button styles */
.btn {
  border-radius: 5px;
  padding: 8px 16px;
  font-size: 14px;
  margin: 4px;
}

.btn-primary {
  background-color: #006400; /* Dark green button color */
  border-color: #006400; /* Dark green border color */
}

.btn-primary:hover {
  background-color: #004d00; /* Dark green hover color */
  border-color: #004d00; /* Dark green hover border color */
}

.btn-warning {
  background-color: #ffc107; /* Yellow button color */
  border-color: #ffc107; /* Yellow border color */
}

.btn-warning:hover {
  background-color: #e0a800; /* Darker yellow hover color */
  border-color: #e0a800; /* Darker yellow hover border color */
}

.btn-danger {
  background-color: #dc3545; /* Red button color */
  border-color: #dc3545; /* Red border color */
}

.btn-danger:hover {
  background-color: #c82333; /* Darker red hover color */
  border-color: #bd2130; /* Darker red hover border color */
}
</style>
