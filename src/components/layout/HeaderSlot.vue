<template>
  <teleport v-if="uxStore.isHeaderLoad" to="#header-slot">
    <slot></slot>
  </teleport>
</template>

<script setup>
import { useUxStore } from '/src/stores/ux'

const uxStore = useUxStore()
</script>
