<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="container mx-auto mb-10">
      <Hero :featured="featured" :loading="loadingFeatured" />
    </div>
    <TitleTag :tt="'Kategori'" />
  </div>
</template>
<script>
import axios from "axios";
import Hero from "../components/Hero.vue";
import TitleTag from "../components/TitleTag.vue";
export default {
  components: {
    Hero,
    TitleTag,
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
