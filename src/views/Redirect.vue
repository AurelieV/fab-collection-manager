<template>
  <section class="flex flex-col min-h-screen p-0 sm:px-4">
    <Pf_Spinner v-if="isProcessing" class="m-auto"></Pf_Spinner>
    <p v-else>Login complete, redirecting you to homepage</p>
  </section>
</template>

<script>
import { watch, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { useUserStore } from '/src/stores/user'
import Pf_Spinner from '/src/components/common/Pf_Spinner.vue'

export default {
  components: { Pf_Spinner },
  setup() {
    const userStore = useUserStore()
    const router = useRouter()
    const route = useRoute()

    watch(
      () => userStore.id,
      (userId) => {
        if (userId) {
          const path = route.query['redirect_uri']
          if (path) {
            router.replace({ path })
          } else {
            router.replace({ name: 'home' })
          }
        }
      }
    )

    return { isLoading: ref(false), userStore, isProcessing: route.hash.length }
  },
}
</script>
