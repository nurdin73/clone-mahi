<template>
  <div>
    <span
      class="
        bg-green-700
        py-3
        px-24
        text-xl
        tablet:text-2xl
        text-white
        rounded-tr-3xl rounded-br-3xl
        whitespace-nowrap
      "
      >{{ tt }}</span
    >
  </div>
</template>

<script>
export default {
  name: "TitleTag",
  props: {
    tt: String,
  },
};
</script>
