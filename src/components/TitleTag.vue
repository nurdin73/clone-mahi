<template>
  <div>
    <span
      class="
        bg-green-700
        py-3
        px-24
        text-2xl text-white
        rounded-tr-3xl rounded-br-3xl
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
