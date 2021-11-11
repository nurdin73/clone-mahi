/* eslint-disable prettier/prettier */
<template>
  <div>
    <h1 class="font-bold">Categories Recipe</h1>
    <div v-if="recipeCategories">
      <ul>
        <li
          v-for="recipeCategory in recipeCategories"
          :key="recipeCategory.key"
        >
          <router-link :to="`/recipe/${recipeCategory.key}`">{{
            recipeCategory.title
          }}</router-link>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>loading recipe category.....</p>
    </div>

    <h1 class="font-bold">Categories Article</h1>
    <div v-if="articleCategories">
      <ul>
        <li
          v-for="articleCategory in articleCategories"
          :key="articleCategory.key"
        >
          <router-link :to="`/article/${articleCategory.key}`">
            {{ articleCategory.title }}
          </router-link>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>loading article category.....</p>
    </div>
    <h1 class="font-bold">Categories Product</h1>
    <div v-if="productCategories">
      <ul>
        <li
          v-for="productCategory in productCategories"
          :key="productCategory.key"
        >
          <router-link :to="`/product/${productCategory.key}`">
            {{ productCategory.title }}
          </router-link>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>loading product category.....</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Navbar",
  setup() {
    let BASE_URL =
      process.env.VUE_APP_API_URL ||
      "https://scrapping-mahi.herokuapp.com/api/v1";
    return {
      BASE_URL,
    };
  },
  data() {
    return {
      recipeCategories: null,
      articleCategories: null,
      productCategories: null,
      error: [],
    };
  },
  methods: {
    fetchCategories(type = "recipe") {
      axios
        .get(`${this.BASE_URL}/categories/${type}`)
        .then((res) => res.data)
        .then((res) => {
          if (type == "product") {
            this.productCategories = res;
          } else if (type == "article") {
            this.articleCategories = res;
          } else {
            this.recipeCategories = res;
          }
        })
        .catch((err) => {
          this.error.push(err.message);
        });
    },
  },
  mounted() {
    this.fetchCategories("recipe");
    this.fetchCategories("product");
    this.fetchCategories("article");
  },
};
</script>
