<template>
  <div v-if="loading">Loading...</div>
  <div v-if="detail">
    <div
      class="h-56"
      v-bind:style="{
        'background-image': 'url(' + detail.thumbnail.desktop + ')',
      }"
    >
      <div
        class="
          flex-col flex
          justify-center
          items-center
          bg-gray-800
          h-full
          bg-opacity-75
        "
      >
        <h1 class="text-3xl font-bold text-white">{{ detail.name }}</h1>
        <p class="text-white">{{ detail.desc }}</p>
      </div>
    </div>
    <div class="container mx-auto">
      <div class="grid grid-cols-12 gap-10 mt-10">
        <div class="col-span-8">
          <div class="grid grid-cols-2 gap-4">
            <div v-for="post in detail.post" :key="post.key">
              <Post :post="post" :type="'article'" />
            </div>
          </div>
        </div>
        <div class="col-span-4">
          <div v-if="loadingNewArticle">Loading....</div>
          <div v-if="newArticles">
            <h2
              class="
                text-center
                font-bold
                p-2
                text-2xl
                mb-5
                bg-green-600
                text-white
              "
            >
              Artikel Terbaru
            </h2>
            <ul class="flex flex-col gap-4">
              <li v-for="newArticle in newArticles" :key="newArticle.slug">
                <SimplePost :post="newArticle" :type="'article'" />
              </li>
            </ul>
          </div>
          <div v-if="errorNewArticle">{{ errorNewArticle }}</div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="error">{{ error }}</div>
</template>
<script>
import axios from "axios";
import Post from "../components/Post.vue";
import SimplePost from "../components/SimplePost.vue";
export default {
  components: {
    Post,
    SimplePost,
  },
  data() {
    return {
      detail: null,
      loading: false,
      error: null,
      newArticles: null,
      loadingNewArticle: false,
      errorNewArticle: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchDetailArticle(to.params.category);
      vm.fetchNewArticle();
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.detail = null;
    this.newArticles = null;
    this.fetchDetailArticle(to.params.category);
    this.fetchNewArticle();
    next();
  },
  methods: {
    fetchDetailArticle(category) {
      this.loading = true;
      axios
        .get(`${this.$store.state.BASE_URL}/category/article/${category}`)
        .then((res) => res.data)
        .then((res) => {
          this.detail = res;
          this.loading = false;
          this.error = null;
        })
        .catch((err) => {
          this.error = err.message;
          this.loading = false;
        });
    },
    fetchNewArticle() {
      this.loadingNewArticle = true;
      axios
        .get(`${this.$store.state.BASE_URL}/article/latest`)
        .then((res) => res.data)
        .then((res) => {
          this.newArticles = res;
          this.loadingNewArticle = false;
        })
        .catch((err) => {
          this.errorNewArticle = err.message;
          this.loadingNewArticle = false;
        });
    },
  },
};
</script>
