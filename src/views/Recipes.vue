<template>
  <div class="container mx-auto">
    <div v-if="loading">Loading...</div>
    <div v-if="recipes">
      <div class="grid grid-cols-3 gap-4">
        <div v-for="recipe in recipes.data" :key="recipe.key">
          <Post :post="recipe" :type="'recipe'" />
        </div>
      </div>
    </div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>
<script>
import axios from "axios";
import Post from "../components/Post.vue";
export default {
  components: {
    Post,
  },
  data() {
    return {
      loading: false,
      recipes: null,
      error: null,
    };
  },
  methods: {
    fetchRecipes() {
      this.loading = true;
      axios
        .get(`${this.$store.state.BASE_URL}/recipes`)
        .then((res) => res.data)
        .then((res) => {
          this.recipes = res;
          this.loading = false;
        })
        .catch((err) => {
          this.error = err.message;
          this.loading = false;
        });
    },
  },
  created() {
    this.fetchRecipes();
  },
};
</script>
