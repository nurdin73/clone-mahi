<template>
  <div class="container p-2 tablet:mx-auto">
    <div v-if="loading">
      <div class="grid grid-cols-3 gap-4">
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
    <div v-if="detail">
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
        <li v-for="post in detail.data" :key="post.slug">
          <Post
            :post="post"
            :type="post.category == 'resep' ? 'recipe' : 'article'"
          />
        </li>
      </ul>
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
      detail: null,
      error: null,
      loader: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchTagDetail(to.params.key);
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.detail = null;
    this.fetchTagDetail(to.params.key);
    next();
  },
  methods: {
    fetchTagDetail(key) {
      this.loading = true;
      axios
        .get(`${this.$store.state.BASE_URL}/posts/${key}`)
        .then((res) => res.data)
        .then((res) => {
          this.detail = res;
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
