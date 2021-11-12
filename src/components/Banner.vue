<template>
  <div class="relative h-52">
    <div class="h-full relative overflow-hidden rounded">
      <div class="h-full relative p-0 m-0">
        <div class="absolute top-0 bottom-0 left-0 right-0 w-full">
          <div
            class="
              relative
              overflow-hidden
              bg-gradient-to-r
              from-gray-800
              via-gray-700
              to-gray-800
            "
          >
            <img
              v-bind:src="banner.thumbnail"
              alt="{{ banner.title }}"
              class="
                w-full
                h-full
                object-cover
                rounded-md
                lg:rounded-none
                mix-blend-overlay
              "
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
  name: "Banner",
  props: {
    banner: null,
  },
};
</script>
