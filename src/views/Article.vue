<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-12 gap-10 mt-10">
      <div class="col-span-8">
        <div v-if="loading">Loading....</div>
        <div v-if="detail">
          <h1 class="text-4xl font-bold text-center text-gray-700">{{ detail.title }}</h1>
          <p class="text-center text-sm text-gray-700 my-3">{{ detail.author.name }} | {{ detail.author.created_at }}</p>
          <Image :src="detail.thumbnail.src" :alt="detail.thumbnail.alt" :height="'96'" />
          <div v-html="detail.description" class="mt-4 text-gray-700 flex flex-col space-y-6 text-md text-justify"></div>
          <h2 class="text-4xl font-bold text-green-600 my-3">Tags</h2>
          <ul class="flex flex-wrap justify-start items-center gap-2">
            <li v-for="tag in detail.tags" :key="tag.key" >
              <router-link :to="`/tag/${tag.key}`" class="bg-green-300 text-center text-sm text-green-900 py-1 rounded px-4">{{ tag.name }}</router-link>
            </li>
          </ul>
        </div>
        <div v-if="error">{{ error }}</div>
      </div>
      <div class="col-span-4">
        <div v-if="loadingRelate">Loading....</div>
        <div v-if="relates">
          <h2 class="text-center font-bold p-2 text-2xl mb-5 bg-green-600 text-white">Article Terkait</h2>
          <ul class="flex flex-col gap-4">
            <li v-for="relate in relates" :key="relate.slug">
              <SimplePost :post="relate" :type="'article'" />
            </li>
          </ul>
        </div>
        <div v-if="errorRelated">{{ error }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import SimplePost from "../components/SimplePost.vue";
import Image from "../components/Image.vue";

export default {
  name: "Article",
  components: {
    SimplePost,
    Image,
  },
  data() {
    return {
      loading: false,
      detail: null,
      error: null,
      loadingRelate: false,
      relates: null,
      errorRelate: null
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchDetailArticle(to.params.category, to.params.key)
      vm.fetchRelatedArticle(to.params.category, to.params.key)
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.detail = null;
    this.relates = null;
    this.fetchDetailArticle(to.params.category, to.params.key);
    this.fetchRelatedArticle(to.params.category, to.params.key)
    next();
  },
  methods: {
    fetchDetailArticle(category, key) {
      this.loading = true
      axios
        .get(`${this.$store.state.BASE_URL}/article/${category}/${key}`)
        .then(res => res.data)
        .then(res => {
          this.detail = res
          this.loading = false
        })
        .catch(err => {
          this.error = err.message
          this.loading = false
        })
    },
    fetchRelatedArticle(category, key) {
      this.loadingRelate = true
      axios
        .get(`${this.$store.state.BASE_URL}/article/${category}/${key}/related`)
        .then(res => res.data)
        .then(res => {
          this.relates = res
          this.loadingRelate = false
        })
        .catch(err => {
          this.errorRelate = err.message
          this.loadingRelate = false
        })
    }
  }
}
</script>