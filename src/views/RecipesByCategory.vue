<template>
  <div class="container mx-auto">
    <ul v-if="loading" class="grid grid-cols-3 gap-4">
      <li class="animate-pulse flex space-x-4">
        <div class="flex-1 space-y-4 py-1 bg-gray-300 rounded h-56">
          <div class="bg-gray-300"></div>
        </div>
      </li>
      <li class="animate-pulse flex space-x-4">
        <div class="flex-1 space-y-4 py-1 bg-gray-300 rounded h-56">
          <div class="bg-gray-300"></div>
        </div>
      </li>
      <li class="animate-pulse flex space-x-4">
        <div class="flex-1 space-y-4 py-1 bg-gray-300 rounded h-56">
          <div class="bg-gray-300"></div>
        </div>
      </li>
      <li class="animate-pulse flex space-x-4">
        <div class="flex-1 space-y-4 py-1 bg-gray-300 rounded h-56">
          <div class="bg-gray-300"></div>
        </div>
      </li>
      <li class="animate-pulse flex space-x-4">
        <div class="flex-1 space-y-4 py-1 bg-gray-300 rounded h-56">
          <div class="bg-gray-300"></div>
        </div>
      </li>
      <li class="animate-pulse flex space-x-4">
        <div class="flex-1 space-y-4 py-1 bg-gray-300 rounded h-56">
          <div class="bg-gray-300"></div>
        </div>
      </li>
      <li class="animate-pulse flex space-x-4">
        <div class="flex-1 space-y-4 py-1 bg-gray-300 rounded h-56">
          <div class="bg-gray-300"></div>
        </div>
      </li>
      <li class="animate-pulse flex space-x-4">
        <div class="flex-1 space-y-4 py-1 bg-gray-300 rounded h-56">
          <div class="bg-gray-300"></div>
        </div>
      </li>
      <li class="animate-pulse flex space-x-4">
        <div class="flex-1 space-y-4 py-1 bg-gray-300 rounded h-56">
          <div class="bg-gray-300"></div>
        </div>
      </li>
    </ul>
    <div v-if="error">
      {{ error }}
    </div>
    <div v-if="category">
      <ul
        class="
          grid
          desktop:grid-cols-4
          laptop:grid-cols-3
          tablet:grid-cols-2
          grid-cols-1
          gap-4
        "
      >
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
