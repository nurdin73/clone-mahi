<template>
  <div>
    <div class="grid grid-cols-12 gap-4">
      <div class="items-start flex-col justify-center flex col-span-8">
        <div class="mb-20 mt-20">
          <h1 class="text-5xl font-bold">
            Cari <span class="text-green-700">Resep</span> Dan Dapatkan <br />
            Hati <span class="text-green-700">Keluarga</span>
          </h1>
          <div class="mt-10 relative">
            <input
              type="text"
              class="bg-gray-200 outline-none shadow-sm rounded p-3 w-full"
              name="search"
              id="search"
              v-model="search"
            />
            <button
              class="
                bg-green-700
                px-10
                text-white
                py-3
                rounded
                absolute
                top-0
                right-0
              "
              @click="searchPost"
            >
              Cari
            </button>
          </div>
        </div>
        <div v-if="loading" class="grid grid-cols-4 gap-4 w-full">
          <div v-if="loading" class="rounded">
            <div class="animate-pulse flex space-x-4">
              <div class="flex-1 space-y-4 py-1 bg-gray-300 rounded h-28">
                <div class="bg-gray-300"></div>
              </div>
            </div>
          </div>
          <div v-if="loading" class="rounded">
            <div class="animate-pulse flex space-x-4">
              <div class="flex-1 space-y-4 py-1 bg-gray-300 rounded h-28">
                <div class="bg-gray-300"></div>
              </div>
            </div>
          </div>
          <div v-if="loading" class="rounded">
            <div class="animate-pulse flex space-x-4">
              <div class="flex-1 space-y-4 py-1 bg-gray-300 rounded h-28">
                <div class="bg-gray-300"></div>
              </div>
            </div>
          </div>
          <div v-if="loading" class="rounded">
            <div class="animate-pulse flex space-x-4">
              <div class="flex-1 space-y-4 py-1 bg-gray-300 rounded h-28">
                <div class="bg-gray-300"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-4 w-full">
          <div
            class="relative h-28"
            v-for="feature in featured"
            :key="feature.slug"
          >
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
                      v-bind:src="feature.thumbnail"
                      alt="{{ feature.title }}"
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
                  <div
                    class="
                      absolute
                      p-2
                      bottom-0
                      left-0
                      right-0
                      flex
                      justify-start
                      items-start
                      flex-col
                      bg-gradient-to-t
                      from-gray-900
                      to-transparent
                    "
                  >
                    <router-link
                      :to="`/recipe/resep/${feature.slug}`"
                      class="
                        md:text-sm
                        w-full
                        overflow-hidden
                        truncate
                        block
                        cursor-pointer
                        hover:underline
                        text-gray-200
                        font-bold
                      "
                    >
                      {{ feature.title }}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-4 flex justify-center items-center">
        <img src="../assets/recipe.png" class="h-80" />
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: "Hero",
  props: {
    featured: null,
    loading: null,
  },

  data() {
    return {
      search: null,
    };
  },

  methods: {
    searchPost() {
      router.push({ name: "Search", params: { query: this.search } });
    },
  },
};
</script>
