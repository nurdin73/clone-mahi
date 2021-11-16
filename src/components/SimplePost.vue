<template>
  <div class="grid grid-cols-12 gap-4">
    <Image
      :height="'20'"
      :src="post.thumbnail"
      :alt="post.title"
      class="col-span-4"
    />
    <router-link
      :to="`/${type}/${post.category}/${post.slug}`"
      class="
        col-span-8
        text-justify
        font-bold
        text-gray-600
        line-clamp-3
        text-md
      "
      >{{ post.title }}</router-link
    >
  </div>
</template>

<script>
import Image from "../components/Image.vue";
export default {
  name: "SimplePost",
  props: {
    post: Object,
    type: String,
  },
  components: {
    Image,
  },
};
</script>
