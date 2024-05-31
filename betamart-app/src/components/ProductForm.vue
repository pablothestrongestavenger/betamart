<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" v-model="productData.name" class="form-control" id="name" required />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea v-model="productData.description" class="form-control" id="description" required></textarea>
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input type="number" v-model="productData.price" class="form-control" id="price" required />
      </div>
      <div class="form-group">
        <label for="stocks">Stocks</label>
        <input type="number" v-model="productData.stocks" class="form-control" id="stocks" required />
      </div>
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => ({
        name: '',
        description: '',
        price: 0,
        stocks: 0
      })
    }
  },
  data() {
    return {
      productData: { ...this.product }
    };
  },
  watch: {
    product(newProduct) {
      this.productData = { ...newProduct };
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('save', this.productData); // Emit save event with updated product data
    }
  }
};
</script>

<style scoped>
/* Add scoped styles if needed */
</style>
