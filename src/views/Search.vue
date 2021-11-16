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
    <div v-if="searchs">
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
        <div v-for="article in searchs.data" :key="article.key">
          <Post :post="article" :type="'article'" />
        </div>
      </div>
    </div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import Post from "../components/Post.vue";
import axios from "axios";
export default {
  name: "Search",
  components: {
    Post,
  },
  props: ["query"],
  data() {
    return {
      loading: false,
      searchs: null,
      error: null,
      loader: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => vm.fetchSearch(to.params.query));
  },
  beforeRouteUpdate(to, from, next) {
    this.searchs = null;
    this.fetchSearch(to.params.query);
    next();
  },
  methods: {
    fetchSearch(key) {
      this.loading = true;
      axios
        .get(`${this.$store.state.BASE_URL}/search/${key}`)
        .then((res) => res.data)
        .then((res) => {
          this.searchs = res;
          this.loading = false;
        })
        .catch((err) => {
          this.error = err.message;
          this.loading = false;
        });
    },
  },
};
</script>
