<template>
  <router-view></router-view>
  <Pf_TheNotifications></Pf_TheNotifications>
</template>

<script>
export default {
  provide: { pfNoPrerender: true },
}
</script>
