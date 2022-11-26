import { defineStore } from 'pinia'

export const useUxStore = defineStore('ux', {
  state: () => ({
    isHeaderLoad: false,
  }),
})
