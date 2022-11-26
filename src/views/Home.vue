<template>
  <div class="lg:max-w-lg grid grid-cols-2 lg:grid-cols-3 gap-2">
    <div
      v-for="edition in databaseStore.editions"
      :key="edition.code"
      class="
        bg-white
        rounded
        shadow-md
        p-2
        flex flex-col
        items-center
        cursor-pointer
        hover:-translate-y-0.5 hover:shadow-lg
        ease-in-out
        transition-all
      "
    >
      <img :src="edition.logo" class="w-full" />
      <h2 class="text-xl mt-2">{{ edition.name }}</h2>
    </div>
  </div>
</template>

<script>
import { useDatabaseStore } from '/src/stores/database'

export default {
  setup() {
    return {
      databaseStore: useDatabaseStore(),
    }
  },
}
</script>
