<template>
  <div class="container p-2 tablet:mx-auto">
    <div v-if="loading">Loading...</div>
    <div
      v-if="category"
      class="
        grid
        desktop:grid-cols-4
        laptop:grid-cols-3
        tablet:grid-cols-2
        grid-cols-2
        gap-4
      "
    >
      <div v-for="product in category.data" :key="product.id">
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
  components: {
    Product,
  },
  data() {
    return {
      category: null,
      loading: false,
      error: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchProductCategory(to.params.category);
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.category = null;
    this.fetchProductCategory(to.params.category);
    next();
  },
  methods: {
    fetchProductCategory(category) {
      this.loading = true;
      axios
        .get(`${this.$store.state.BASE_URL}/products/${category}`)
        .then((res) => res.data)
        .then((res) => {
          this.category = res;
          this.loading = false;
        })
        .catch((err) => {
          this.error = err.message;
          this.loading = false;
        });
    },
  },
};
</script>
