<template>
  <div>asd</div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      articles: null,
      loading: false,
      error: null
    }
  },
  methods: {
    fetchArticles() {
      this.loading = true
      axios
        .get(`${this.$store.state.BASE_URL}/article/latest`)
        .then(res => res.data)
        .then(res => {
          this.articles = res
          this.loading = false
        })
        .catch(err => {
          this.error = err.message
          this.loading = false
        })
    }
  },
  created() {
    this.fetchArticles()
  }
}
</script>