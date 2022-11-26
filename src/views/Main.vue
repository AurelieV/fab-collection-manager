<template>
  <div class="isolate">
    <TheHeader></TheHeader>
    <main class="z-10 px-2 py-4 mt-10 md:px-3 lg:px-10 isolate">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { watch } from 'vue'
import { useRouter } from 'vue-router'

import TheHeader from '/src/components/layout/TheHeader.vue'

import { useDatabaseStore } from '/src/stores/database'
import { useUserStore } from '/src/stores/user'

export default {
  components: { TheHeader },
  setup() {
    const userStore = useUserStore()
    const databaseStore = useDatabaseStore()
    const router = useRouter()

    watch(
      () => userStore.id,
      (userId) => {
        if (!userId) {
          router.replace({ name: 'login' })
        }
      }
    )
    databaseStore.fetchEditions()
  },
}
</script>
