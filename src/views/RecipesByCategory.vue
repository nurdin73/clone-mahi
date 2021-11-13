<template>
  <div class="container mx-auto">
    <div v-if="loading">
      <p>loading....</p>
    </div>
    <div v-if="error">
      {{ error }}
    </div>
    <div v-if="category">
      <ul class="grid grid-cols-3 gap-4">
        <li v-for="product in category.post" :key="product.key">
          <Post :post="product" :type="'recipe'" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Post from "../components/Post.vue";

export default {
  name: "RecipesByCategory",
  components: {
    Post,
  },
  data() {
    return {
      loading: false,
      category: null,
      error: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => vm.fetchRecipeByCategory(to.params.category));
  },
  beforeRouteUpdate(to, from, next) {
    this.category = null;
    this.fetchRecipeByCategory(to.params.category);
    next();
  },
  methods: {
    fetchRecipeByCategory(param) {
      this.category = this.error = null;
      this.loading = true;
      axios
        .get(`${this.$store.state.BASE_URL}/category/recipe/${param}`)
        .then((res) => res.data)
        .then((res) => {
          this.category = res;
          this.loading = false;
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
  },
  // created() {
  //   this.fetchRecipeByCategory();
  //   console.log("created");
  // },
  // watch: {
  //   // call again the method if the route changes
  //   $route: "fetchRecipeByCategory",
  // },
};
</script>
