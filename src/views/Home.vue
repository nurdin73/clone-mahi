<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="container mx-auto mb-10">
      <Hero :featured="featured" :loading="loadingFeatured" />
    </div>
    <TitleTag :tt="'Kategori'" />
    <div class="container mx-auto my-7">
      <ul v-if="loadingCategories" class="grid grid-cols-9 gap-4">
        <li class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-4 py-1 bg-gray-300 rounded h-12">
            <div class="bg-gray-300"></div>
          </div>
        </li>
        <li class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-4 py-1 bg-gray-300 rounded h-12">
            <div class="bg-gray-300"></div>
          </div>
        </li>
        <li class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-4 py-1 bg-gray-300 rounded h-12">
            <div class="bg-gray-300"></div>
          </div>
        </li>
        <li class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-4 py-1 bg-gray-300 rounded h-12">
            <div class="bg-gray-300"></div>
          </div>
        </li>
        <li class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-4 py-1 bg-gray-300 rounded h-12">
            <div class="bg-gray-300"></div>
          </div>
        </li>
        <li class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-4 py-1 bg-gray-300 rounded h-12">
            <div class="bg-gray-300"></div>
          </div>
        </li>
        <li class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-4 py-1 bg-gray-300 rounded h-12">
            <div class="bg-gray-300"></div>
          </div>
        </li>
        <li class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-4 py-1 bg-gray-300 rounded h-12">
            <div class="bg-gray-300"></div>
          </div>
        </li>
        <li class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-4 py-1 bg-gray-300 rounded h-12">
            <div class="bg-gray-300"></div>
          </div>
        </li>
      </ul>
      <ul class="grid grid-cols-9 gap-4">
        <li v-for="category in categories" :key="category.key">
          <router-link
            :to="`/recipe/${category.key}`"
            class="
              bg-green-700
              block
              p-3
              text-center text-white
              rounded
              whitespace-nowrap
              truncate
            "
            :title="category.title"
          >
            {{ category.title }}
          </router-link>
        </li>
      </ul>
    </div>
    <TitleTag :tt="'Postingan Terbaru'" />
    <div class="container mx-auto my-7">
      <ul v-if="loadingArticles" class="grid grid-cols-3 gap-4">
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
      <ul class="grid grid-cols-3 gap-4">
        <li v-for="article in articles" :key="article.slug">
          <Post
            :post="article"
            :type="article.category == 'resep' ? 'recipe' : 'article'"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Hero from "../components/Hero.vue";
import TitleTag from "../components/TitleTag.vue";
import Post from "../components/Post.vue";
export default {
  components: {
    Hero,
    TitleTag,
    Post,
  },
  data() {
    return {
      featured: null,
      categories: null,
      articles: null,
      errorFeatured: null,
      errorCategories: null,
      errorArticles: null,
      loadingFeatured: false,
      loadingCategories: false,
      loadingArticles: false,
    };
  },
  created() {
    this.fetchFeatured();
    this.fetchCategories();
    this.fetchArticles();
  },
  methods: {
    fetchFeatured() {
      this.featured = this.errorFeatured = null;
      this.loadingFeatured = true;
      axios
        .get(`${this.$store.state.BASE_URL}/recipes/featured`)
        .then((res) => res.data)
        .then((res) => {
          this.featured = res;
          this.loadingFeatured = false;
        })
        .catch((err) => {
          this.errorFeatured = err.message;
        });
    },
    fetchCategories() {
      this.categories = this.errorCategories = null;
      this.loadingCategories = true;
      axios
        .get(`${this.$store.state.BASE_URL}/categories/recipe`)
        .then((res) => res.data)
        .then((res) => {
          this.categories = res;
          this.loadingCategories = false;
        })
        .catch((err) => {
          this.errorCategories = err.message;
        });
    },
    fetchArticles() {
      this.articles = this.errorArticles = null;
      this.loadingArticles = true;
      axios
        .get(`${this.$store.state.BASE_URL}/latest`)
        .then((res) => res.data)
        .then((res) => {
          this.articles = res;
          this.loadingArticles = false;
        })
        .catch((err) => {
          this.errorArticles = err.message;
        });
    },
  },
};
</script>
