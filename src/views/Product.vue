<template>
  <div class="container p-2 tablet:mx-auto">
    <div v-if="loading">Loading..</div>
    <div v-if="detail" class="grid grid-cols-3 mb-10">
      <div class="col-span-3 tablet:col-span-1 flex justify-center items-center">
        <img
          v-bind:src="detail.thumbnail"
          :alt="detail.title"
          class="object-cover w-56 h-56"
        />
      </div>
      <div class="col-span-3 tablet:col-span-2">
        <h1 class="text-2xl text-gray-700 font-bold">{{ detail.title }}</h1>
        <div v-html="detail.description" class="text-md my-5"></div>
        <a
          :href="detail.seeDetail"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-green-500 py-2 px-5 rounded text-white"
          >Lihat Detail</a
        >
      </div>
    </div>
    <div v-if="error">{{ error }}</div>
    <div v-if="loadingRelate">Loading...</div>
    <div v-if="errorRelate">{{ errorRelate }}</div>
    <div v-if="relates">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-3">
        Resep Terkait
      </h2>
      <div class="grid
          desktop:grid-cols-4
          laptop:grid-cols-3
          tablet:grid-cols-2
          grid-cols-1
          gap-4">
        <div v-for="relate in relates" :key="relate.key">
          <Post :post="relate" :type="'recipe'" />
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
      loading: false,
      detail: null,
      error: null,
      relates: null,
      loadingRelate: false,
      errorRelate: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchProduct(to.params.key);
      vm.fetchRelate(to.params.key);
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.detail = null;
    this.fetchProduct(to.params.key);
    this.fetchRelate(to.params.key);
    next();
  },
  methods: {
    fetchProduct(key) {
      this.loading = true;
      axios
        .get(`${this.$store.state.BASE_URL}/product/${key}`)
        .then((res) => res.data)
        .then((res) => {
          this.loading = false;
          this.detail = res;
        })
        .catch((err) => {
          this.error = err.message;
          this.loading = false;
        });
    },
    fetchRelate(key) {
      this.loadingRelate = true;
      axios
        .get(`${this.$store.state.BASE_URL}/product/${key}/related-recipe`)
        .then((res) => res.data)
        .then((res) => {
          this.relates = res;
          this.loadingRelate = false;
        })
        .catch((err) => {
          this.errorRelate = err.message;
          this.loadingRelate = false;
        });
    },
  },
};
</script>
