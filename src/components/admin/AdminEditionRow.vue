<template>
  <tr>
    <td class="p-2">{{ edition.code }}</td>
    <td class="p-2">{{ edition.name }}</td>
    <td class="p-2">{{ formatedCreationDate }}</td>
    <td class="p-2 flex items-baseline justify-end">
      <button class="pf-icon-btn -primary" @click="$emit('edit')">
        <Pf_Icon icon="mdi:edit"></Pf_Icon>
      </button>
      <button class="pf-icon-btn -primary" @click="$emit('delete')">
        <Pf_Icon icon="mdi:delete"></Pf_Icon>
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: { edition: { type: Object, required: true } },
  emits: ['edit', 'delete'],
  computed: {
    formatedCreationDate() {
      const date = new Date(this.edition.created_at)
      return date.toLocaleString('default', {
        month: 'short',
        day: 'numeric',
      })
    },
  },
}
</script>
