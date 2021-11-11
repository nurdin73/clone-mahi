<template>
  <div v-if="category">
    <ul class="grid grid-cols-3 gap-4">
      <li v-for="product in category.post" :key="product.key">
        <router-link
          :to="`/recipe/${this.$route.params.category}/${product.slug}`"
        >
          <h3>{{ product.title }}</h3>
          <img
            v-bind:src="product.thumbnail"
            alt="{{ product.title }}"
            class="object-cover"
          />
        </router-link>
      </li>
    </ul>
  </div>
  <div v-else>
    <p>loading....</p>
  </div>
</template>
<script>
import axios from "axios";

export default {
  setup() {
    let BASE_URL =
      process.env.VUE_APP_API_URL ||
      "https://scrapping-mahi.herokuapp.com/api/v1";
    return { BASE_URL };
  },
  data() {
    return {
      category: null,
      error: [],
    };
  },
  methods: {
    fetchRecipeByCategory() {
      axios
        .get(`${this.BASE_URL}/category/recipe/${this.$route.params.category}`)
        .then((res) => res.data)
        .then((res) => {
          this.category = res;
        })
        .catch((err) => {
          this.error.push(err.message);
        });
    },
  },
  mounted() {
    this.fetchRecipeByCategory();
  },
};
</script>
