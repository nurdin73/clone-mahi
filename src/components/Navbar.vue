/* eslint-disable prettier/prettier */
<template>
  <div class="bg-white">
    <div
      class="
        container
        p-2
        flex
        items-center
        justify-between
        h-16
        tablet:mx-auto
      "
    >
      <router-link class="font-bold text-xl" to="/">Clone MAHI</router-link>
      <ul class="flex space-x-5 items-center">
        <li class="group relative">
          <router-link to="/recipes" class="relative">Resep</router-link>
          <ul
            class="
              hidden
              group-hover:block
              absolute
              bg-white
              border
              rounded
              w-48
              overflow-hidden
              right-0
              z-50
            "
          >
            <li
              v-for="recipeCategory in recipeCategories"
              :key="recipeCategory.key"
            >
              <router-link
                :to="`/recipe/${recipeCategory.key}`"
                class="block px-3 py-2 hover:bg-green-700"
                >{{ recipeCategory.title }}</router-link
              >
            </li>
          </ul>
        </li>
        <li class="group relative">
          <router-link to="/articles" class="relative">Artikel</router-link>
          <ul
            class="
              hidden
              group-hover:block
              absolute
              bg-white
              border
              rounded
              w-48
              overflow-hidden
              right-0
              z-50
            "
          >
            <li
              v-for="articleCategory in articleCategories"
              :key="articleCategory.key"
            >
              <router-link
                :to="`/article/${articleCategory.key}`"
                class="block px-3 py-2 hover:bg-green-700"
              >
                {{ articleCategory.title }}
              </router-link>
            </li>
          </ul>
        </li>
        <li class="group relative">
          <router-link to="/products" class="relative">Produk</router-link>
          <ul
            class="
              hidden
              group-hover:block
              absolute
              bg-white
              border
              rounded
              w-48
              overflow-hidden
              right-0
              z-50
            "
          >
            <li
              v-for="productCategory in productCategories"
              :key="productCategory.key"
            >
              <router-link
                :to="`/product/${productCategory.key}`"
                class="block px-3 py-2 hover:bg-green-700"
              >
                {{ productCategory.title }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
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
