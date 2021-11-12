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
  data() {
    return {
      detail: null,
      error: [],
    };
  },
  methods: {
    fetchDetailRecipe() {
      axios
        .get(`${this.$store.state.BASE_URL}/recipe/${this.$route.params.key}`)
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
