<template>
  <form class="space-y-2" @submit.prevent="onSubmit">
    <div class="flex flex-col">
      <label for="code" class="pf-label">Code</label>
      <input id="code" v-model="code" required name="code" type="text" class="min-w-0 pf-input" />
    </div>
    <div class="flex flex-col">
      <label for="name" class="pf-label">Name</label>
      <input id="name" v-model="name" required name="name" type="text" class="min-w-0 pf-input" />
    </div>
    <div class="flex flex-col">
      <label for="createdAt" class="pf-label">Release date</label>
      <input
        id="createdAt"
        v-model="createdAt"
        required
        name="createdAt"
        type="date"
        class="min-w-0 pf-input"
      />
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useDatabaseStore } from '/src/stores/database'

export default {
  props: { edition: { type: Object, required: true } },
  setup(props) {
    return {
      code: ref(props.edition?.code || ''),
      name: ref(props.edition?.name || ''),
      date: ref(props.edition?.date || null),
      databaseStore: useDatabaseStore(),
      isLoading: ref(false),
    }
  },
  methods: {
    onSubmit() {},
  },
}
</script>
