<template>
  <div class="container mx-auto">
    <div v-if="loading">Loading...</div>
    <div v-if="detail">
      <ul class="grid grid-cols-3 gap-4">
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
