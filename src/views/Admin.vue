<template>
  <HeaderSlot>
    <div class="ml-2 flex items-center">Admin<Pf_Icon icon="mdi:lock" class="ml-1" /></div>
  </HeaderSlot>
  <section>
    <header class="title text-left">Editions</header>
    <button class="pf-btn -secondary flex items-center" @click="createEdition">
      <Pf_Icon icon="mdi:add" class="mr-2"></Pf_Icon>
      Add an new edition
    </button>
    <table class="table-auto">
      <thead>
        <th class="text-left p-2">Code</th>
        <th class="text-left p-2">Name</th>
        <th class="text-left p-2">Date</th>
        <th class="text-left p-2">Actions</th>
      </thead>
      <AdminEditionRow
        v-for="item in databaseStore.editions"
        :key="item.id"
        :edition="item"
        @edit="onEditionEdit(item)"
        @delete="onEditionDelete(item.id)"
      ></AdminEditionRow>
    </table>
    <Pf_Dialog
      v-if="isOpen"
      :title="editionEdition ? 'Edit edition' : 'Create edition'"
      @close="close"
    >
      <AdminCreateOrEditEdition :edition="editingEdition"></AdminCreateOrEditEdition>
    </Pf_Dialog>
  </section>
</template>

<script>
import { useModal } from 'purplefox-tools'
import { useDatabaseStore } from '/src/stores/database'
import HeaderSlot from '/src/components/layout/HeaderSlot.vue'
import AdminEditionRow from '/src/components/admin/AdminEditionRow.vue'
import AdminCreateOrEditEdition from '../components/admin/AdminCreateOrEditEdition.vue'

export default {
  components: { HeaderSlot, AdminEditionRow, AdminCreateOrEditEdition },
  setup() {
    const { isOpen, close, open } = useModal('edition')
    return {
      databaseStore: useDatabaseStore(),
      isOpen,
      close,
      open,
    }
  },
  methods: {
    onEditionEdit(edition) {
      this.editingEdition = edition
      this.open()
    },
    async onEditionDelete(id) {
      try {
        await this.databaseStore.deleteEdition(id)
        this.$notif.success('Edition delete successfully')
      } catch {
        this.$notif.error('Impossible to delete the edition')
      }
    },
    createEdition() {
      this.editingEdition = null
      this.open()
    },
  },
}
</script>
