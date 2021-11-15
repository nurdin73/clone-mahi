<template>
  <div v-bind:class="`relative h-${height}`">
    <div class="h-full relative overflow-hidden rounded">
      <div class="h-full relative p-0 m-0">
        <div class="absolute top-0 bottom-0 left-0 right-0 w-full">
          <div class="relative overflow-hidden">
            <img
              v-bind:src="src"
              :alt="alt"
              class="w-full h-full object-cover rounded-md lg:rounded-none"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Image",
  props: {
    height: String,
    src: String,
    alt: String,
  },
};
</script>
