<template>
  <teleport to="#header-slot">
    <div class="ml-2">Profile</div>
  </teleport>
  <form class="grid max-w-md grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-2" @submit.prevent="onSubmit">
    <div class="flex flex-col">
      <label for="pseudo" class="pf-label">Pseudo</label>
      <input id="pseudo" v-model="pseudo" name="pseudo" type="text" class="min-w-0 pf-input" />
    </div>
    <div class="col-span-2 mt-2">
      <Pf_SubmitButton class="pf-btn -primary" :loading="isLoading" type="submit"
        >Update Profile</Pf_SubmitButton
      >
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'
import { Pf_SubmitButton } from 'purplefox-tools'

import { useUserStore } from '/src/stores/user'

export default {
  components: { Pf_SubmitButton },
  setup() {
    const userStore = useUserStore()
    const pseudo = ref(userStore.profile?.pseudo)

    return { userStore, pseudo, isLoading: ref(false) }
  },
  methods: {
    async onSubmit() {
      this.isLoading = true
      try {
        await this.userStore.updateProfile({ pseudo: this.pseudo })
        this.$notif.success('Your profile has been updated !')
      } catch {
        this.$notif.error('Impossible to update your profile')
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
