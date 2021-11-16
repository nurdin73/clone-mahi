<template>
  <router-link
    :to="`/product/${product.category}/${product.slug}`"
    class="flex p-4 flex-col justify-center items-center border-2 rounded"
  >
    <img
      v-bind:src="product.thumbnail"
      :alt="product.title"
      class="object-cover w-32 h-32"
    />
    <h2
      class="
        truncate
        overflow-hidden
        w-full
        text-center text-lg text-gray-700
        font-bold
      "
    >
      {{ product.title }}
    </h2>
  </router-link>
</template>

<script>
export default {
  name: "Product",
  props: {
    product: Object,
  },
};
</script>
