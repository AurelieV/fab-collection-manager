import { defineStore } from 'pinia'
import { login, logout, updateProfile } from '/src/helpers/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: undefined,
    profile: null,
  }),
  getters: {
    isConnected: (state) => !!state.id,
  },
  actions: {
    login,
    logout,
    async updateProfile(profile) {
      return updateProfile(this.id, profile).then((profile) => this.$patch({ profile }))
    },
  },
})
