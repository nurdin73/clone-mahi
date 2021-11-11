<template>
  <div v-if="detail">
    {{ detail.title }}
  </div>
  <div v-else>
    <p>Loading....</p>
  </div>
</template>
<script>
import axios from "axios";
export default {
  setup() {
    let BASE_URL =
      process.env.VUE_APP_API_URL ||
      "https://scrapping-mahi.herokuapp.com/api/v1";
    return { BASE_URL };
  },
  data() {
    return {
      detail: null,
      error: [],
    };
  },
  methods: {
    fetchDetailRecipe() {
      axios
        .get(`${this.BASE_URL}/recipe/${this.$route.params.key}`)
        .then((res) => res.data)
        .then((res) => {
          this.detail = res;
        })
        .catch((err) => {
          this.error.push(err.message);
        });
    },
  },
  mounted() {
    this.fetchDetailRecipe();
  },
};
</script>
