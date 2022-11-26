import { defineStore } from 'pinia'
import { getAllEditions, deleteEdition, updateEdition, createEdition } from '/src/helpers/edition'

export const useDatabaseStore = defineStore('ux', {
  state: () => ({
    editions: [],
  }),
  actions: {
    fetchEditions() {
      getAllEditions().then((editions) => this.$patch({ editions }))
    },
    deleteEdition(id) {
      return deleteEdition(id).then(() => this.fetchEditions())
    },
    updateEdition(id, update) {
      return updateEdition(id, update).then(() => this.fetchEditions())
    },
    createEdition(edition) {
      return createEdition(edition).then(() => this.fetchEditions())
    },
  },
})
