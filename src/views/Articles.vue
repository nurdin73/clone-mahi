<template>
  <div class="container mx-auto">
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="articles">
      <div class="grid grid-cols-3 gap-4">
        <div v-for="article in articles.data" :key="article.key">
          <Post :post="article" :type="'article'" />
        </div>
      </div>
    </div>
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
      articles: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    fetchArticles() {
      this.loading = true;
      axios
        .get(`${this.$store.state.BASE_URL}/articles`)
        .then((res) => res.data)
        .then((res) => {
          this.articles = res;
          this.loading = false;
        })
        .catch((err) => {
          this.error = err.message;
          this.loading = false;
        });
    },
  },
  created() {
    this.fetchArticles();
  },
};
</script>
