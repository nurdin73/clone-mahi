<template>
  <div class="container p-2 tablet:mx-auto">
    <div v-if="loading">Loading...</div>
    <div
      class="
        grid
        desktop:grid-cols-4
        laptop:grid-cols-3
        tablet:grid-cols-2
        grid-cols-2
        gap-4
      "
      v-if="products"
    >
      <div v-for="product in products.data" :key="product.id">
        <Product :product="product" />
      </div>
    </div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from "axios";
import Product from "../components/Product.vue";
export default {
  name: "Products",
  components: {
    Product,
  },
  data() {
    return {
      loading: false,
      products: null,
      error: null,
    };
  },
  methods: {
    fetchProducts(page = 1) {
      this.loading = true;
      axios
        .get(`${this.$store.state.BASE_URL}/products?page=${page}`)
        .then((res) => res.data)
        .then((res) => {
          this.products = res;
          this.loading = false;
        })
        .catch((err) => {
          this.error = err.message;
          this.loading = false;
        });
    },
  },
  created() {
    this.fetchProducts();
  },
};
</script>
