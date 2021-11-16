<template>
  <div class="container p-2 tablet:mx-auto">
    <div v-if="loading">
      <div
        class="
          grid
          desktop:grid-cols-4
          laptop:grid-cols-3
          tablet:grid-cols-2
          grid-cols-1
          gap-4
        "
      >
        <div
          class="animate-pulse flex space-x-4"
          v-for="load in loader"
          :key="load"
        >
          <div class="flex-1 space-y-4 py-1 bg-gray-300 rounded h-56">
            <div class="bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="error">{{ error }}</div>
    <div v-if="articles">
      <div
        class="
          grid
          desktop:grid-cols-4
          laptop:grid-cols-3
          tablet:grid-cols-2
          grid-cols-1
          gap-4
        "
      >
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
      loader: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
