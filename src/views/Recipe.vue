<template>
  <div class="container mx-auto mt-5">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-8">
        <div v-if="loading">
          <p>Loading....</p>
        </div>
        <div v-if="detail">
          <h1 class="text-4xl font-bold text-center text-gray-700">{{ detail.title }}</h1>
          <p class="text-center text-gray-700 my-5 text-md">{{ detail.excerpt }}</p>
          <div class="flex space-x-4 items-center justify-center">
            <div class="flex items-center space-x-1 bg-green-100 py-2 px-5 rounded bg-green-100 py-2 px-5 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-green-700 text-sm">{{ detail.times }}</span>
            </div>
            <div class="flex items-center space-x-1 bg-green-100 py-2 px-5 rounded">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="concierge-bell" class="svg-inline--fa fa-concierge-bell text-green-700 h-5 w-5 fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M288 130.54V112h16c8.84 0 16-7.16 16-16V80c0-8.84-7.16-16-16-16h-96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h16v18.54C115.49 146.11 32 239.18 32 352h448c0-112.82-83.49-205.89-192-221.46zM496 384H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h480c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path>
              </svg>
              <span class="text-green-700 text-sm">{{ detail.servings }}</span>
            </div>
            <div class="flex items-center space-x-1 bg-green-100 py-2 px-5 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="text-green-700 text-sm">{{ detail.difficulty }}</span>
            </div>
          </div>
          <p class="text-center text-sm text-gray-700 my-3">{{ detail.author.name }} | {{ detail.author.created_at }}</p>
          <Image :src="detail.thumbnail.src" :alt="detail.thumbnail.alt" :height="'96'" />
          <p class="text-gray-600 text-sm">{{ detail.thumbnail.alt }}</p>
          <div class="mt-4 text-gray-700 flex flex-col space-y-6 text-md text-justify" v-html="detail.description"></div>
          <h2 class="text-4xl font-bold text-green-600 my-3">Bahan</h2>
          <ul class="grid grid-cols-2 gap-4">
            <li v-for="ingredient in detail.ingredients" :key="ingredient.ingredient" class="flex items-center space-x-2">
              <span class="text-3xl font-bold text-green-500">{{ ingredient.quantity == "" ? 1 : ingredient.quantity }}</span>
              <div v-html="ingredient.ingredient" class="text-gray-700"></div>
            </li>
          </ul>
          <h2 class="text-4xl font-bold text-red-600 my-3">Cara Membuat</h2>
          <ul class="flex flex-col space-y-2">
            <li class="flex space-x-2 justify-start items-start" v-for="step in detail.steps" :key="step.number">
              <span class="text-3xl font-bold text-red-500">{{ step.number }}</span>
              <div v-html="step.desc" class="text-gray-700"></div>
            </li>
          </ul>
          <h2 class="text-4xl font-bold text-green-600 my-3">Tags</h2>
          <ul class="flex flex-wrap justify-start items-center gap-2">
            <li v-for="tag in detail.tags" :key="tag.key" class="bg-green-300 flex-auto text-center text-sm text-green-900 py-1 rounded px-4">
              <router-link :to="`/tag/${tag.key}`">{{ tag.name }}</router-link>
            </li>
          </ul>
        </div>
        <div v-if="error">
          {{ error }}
        </div>
      </div>
      <div class="col-span-4">
        <div v-if="loadingRelated">
          Loading...
        </div>
        <div v-if="related">
          <ul>
            <li v-for="relate in related" :key="relate.slug">
              {{ relate.title }}
            </li>
          </ul>
        </div>
        <div v-if="errorRelated">
          {{ errorRelated }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Image from "../components/Image.vue";
export default {
  components: {
    Image,
  },
  data() {
    return {
      detail: null,
      error: null,
      loading: false,
      loadingRelated: false,
      related: null,
      errorRelated: null
    };
  },
  methods: {
    fetchDetailRecipe() {
      this.loading = true
      axios
        .get(`${this.$store.state.BASE_URL}/recipe/${this.$route.params.key}`)
        .then((res) => res.data)
        .then((res) => {
          this.detail = res;
          this.loading = false
        })
        .catch((err) => {
          this.error = err.message;
          this.loading = false
        });
    },

    fetchRelatedRecipe() {
      this.loadingRelated = true
      axios
        .get(`${this.$store.state.BASE_URL}/recipe/${this.$route.params.key}/related`)
        .then(res => res.data)
        .then(res => {
          this.related = res
          this.loadingRelated = false
        }).catch(err => {
          this.errorRelated = err.message
          this.loadingRelated = false
        })
    },
  },
  mounted() {
    this.fetchDetailRecipe();
    this.fetchRelatedRecipe()
  },
};
</script>
