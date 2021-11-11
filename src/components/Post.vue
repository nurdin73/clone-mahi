<template>
  <div>
    <router-link :to="`/recipe/${this.$route.params.category}/${post.slug}`">
      <img
        v-bind:src="post.thumbnail"
        alt="{{ post.title }}"
        class="object-cover"
      />
      <h3>{{ post.title }}</h3>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: {
    post: Object,
  },
};
</script>
