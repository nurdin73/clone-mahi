<template>
  <div class="container mx-auto">
    <div v-if="loading">Loading..</div>
    <div v-if="detail" class="grid grid-cols-3">
      <div class="col-span-1 flex justify-center items-center">
        <img v-bind:src="detail.thumbnail" :alt="detail.title" class="object-cover w-56 h-56">
      </div>
      <div class="col-span-2">
        <h1 class="text-2xl text-gray-700 font-bold">{{ detail.title }}</h1>
        <div v-html="detail.description" class="text-md my-5"></div>
        <a :href="detail.seeDetail" target="_blank" rel="noopener noreferrer" class="bg-green-500 py-2 px-5 rounded text-white">Lihat Detail</a>
      </div>
    </div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      loading: false,
      detail: null,
      error:null
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchProduct(to.params.key)
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.detail = null;
    this.fetchProduct(to.params.key)
    next();
  },
  methods: {
    fetchProduct(key) {
      this.loading = true
      axios
        .get(`${this.$store.state.BASE_URL}/product/${key}`)
        .then(res => res.data)
        .then(res => {
          this.loading = false
          this.detail = res
        })
        .catch(err => {
          this.error = err.message
          this.loading = false
        })
    }
  },
}
</script>