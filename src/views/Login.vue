<template>
  <section class="flex flex-col min-h-screen p-0 sm:px-4">
    <div
      class="w-full max-w-sm px-4 py-6 mx-auto my-0 bg-white sm:rounded-md sm:my-auto sm:shadow-md"
    >
      <h1 class="title">Login</h1>
      <p class="text-center">Welcome to Flesh and Blood Collection Manager</p>
      <img src="/login.svg" class="w-4/5 mx-auto mt-6" />
      <div class="flex flex-col mx-auto mt-8 space-y-2">
        <button
          class="flex items-center justify-center pf-btn -primary"
          :disabled="isLoading"
          @click="login"
        >
          <Pf_Icon class="mr-2" icon="mdi:google" inline></Pf_Icon>
          Login with Google
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { watch, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { useUserStore } from '/src/stores/user'

export default {
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

    return { isLoading: ref(false), userStore }
  },
  methods: {
    login() {
      this.isLoading = true
      this.userStore.login()
    },
  },
}
</script>
