<template>
    <div>
      <NavBar></NavBar>
      <div class="container-lg">
        <h1 class="mb-4">Edit Product</h1>
        <form @submit.prevent="updateProduct">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <input type="text" class="form-control" name="name" v-model="name" placeholder="Name" required>
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <textarea class="form-control" name="description" v-model="description" rows="5" placeholder="Description"></textarea>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="price">Price:</label>
              <input type="number" step="0.01" class="form-control" name="price" v-model="price" placeholder="Price" required>
            </div>
            <div class="form-group col-md-6">
              <label for="stocks">Stocks:</label>
              <input type="number" class="form-control" name="stocks" v-model="stocks" placeholder="Stocks" required>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-success m-2">Edit</button>
            <router-link to="/home" class="btn btn-secondary m-2">Cancel</router-link>
          </div>
        </form>
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
    data() {
      return {
        name: '',
        description: '',
        price: 0.00,
        stocks: 0
      };
    },
    async beforeMount() {
      try {
        const response = await axios.get('/api/show/' + this.$route.params.id);
        if (response.status == 200) {
          const data = response.data.product;
          this.name = data.name;
          this.description = data.description;
          this.price = data.price;
          this.stocks = data.stocks;
        }
      } catch (error) {
        console.log(error);
      }
    },
    methods: {
      async updateProduct() {
        try {
          const payload = {
            name: this.name,
            description: this.description,
            price: this.price,
            stocks: this.stocks,
            id: this.$route.params.id
          };
  
          const count = this.$store.getters.getProducts.filter(product => product.name.toLowerCase() === payload.name.toLowerCase()).length;
  
          if (count > 1) {
            throw "Product name already exists";
          }
  
          const response = await axios.put('/api/products/update/' + this.$route.params.id, payload);
  
          if (response.status == 200) {
            this.$store.dispatch('asyncUpdateProduct', payload);
            this.name = '';
            this.description = '';
            this.price = 0.00;
            this.stocks = 0;
            alert('Product updated');
            this.$router.go(-1);
          }
        } catch (error) {
          alert(error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container-lg {
    width: 60%;
    margin-top: 20px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  }
  
  .form-control {
    border-radius: 5px;
  }
  
  .btn {
    border-radius: 5px;
  }
  
  .btn-success {
    background-color: #28a745;
    border-color: #28a745;
  }
  
  .btn-success:hover {
    background-color: #218838;
    border-color: #1e7e34;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;
  }
  
  .btn-secondary:hover {
    background-color: #5a6268;
    border-color: #545b62;
  }
  </style>
  