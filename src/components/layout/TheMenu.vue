<template>
  <teleport to="body">
    <div class="the-menu isolate">
      <transition name="fade">
        <div
          v-show="isOpen"
          class="absolute top-0 bottom-0 left-0 right-0 bg-gray-200 opacity-70"
          @click="$emit('close')"
        ></div>
      </transition>
      <div id="submenus"></div>
      <transition name="slide">
        <aside
          v-show="isOpen"
          class="
            fixed
            top-0
            bottom-0
            left-0
            flex flex-col
            w-[min(90vw,400px)]
            overflow-auto
            bg-white
            shadow-sm
            md:border-r
            border-purple-300
            isolate
          "
        >
          <div class="flex items-center px-2 py-4 bg-purple-100 border-b border-purple-300">
            <img src="/logo.png" class="w-[40px]" />
            <h1 class="ml-4 text-2xl text-purple-900 select-none">FaB Collection Manager</h1>
          </div>
          <div class="flex flex-col flex-1 px-2 py-4">
            <ul id="menu-specific-items" class="flex-1"></ul>
          </div>
          <div v-if="userStore.isConnected" class="px-2 pt-4 pb-2 border-t border-gray-200">
            <div class="mb-1">
              Connected as
              <span class="font-bold text-purple">{{
                userStore.profile?.pseudo || 'Unknown'
              }}</span>
            </div>
            <ul>
              <li>
                <router-link class="menu-item" :to="{ name: 'home' }">
                  <Pf_Icon icon="mdi:home" inline class="mr-2"></Pf_Icon>
                  <div>Home</div>
                </router-link>
              </li>
              <li>
                <router-link class="menu-item" :to="{ name: 'profile' }">
                  <Pf_Icon icon="mdi:cog" inline class="mr-2"></Pf_Icon>
                  <div>Profile</div>
                </router-link>
              </li>
            </ul>
            <hr class="mx-2 my-1 border-t border-gray-300" />
            <div class="menu-item" role="button" @click="userStore.logout">
              <Pf_Icon icon="mdi:logout" inline class="mr-2"></Pf_Icon>
              Logout
            </div>
          </div>
        </aside>
      </transition>
    </div>
  </teleport>
</template>

<script>
import { useUserStore } from '/src/stores/user'
export default {
  props: {
    isOpen: { type: Boolean, default: true },
  },
  emits: ['close'],
  setup() {
    const userStore = useUserStore()

    return { userStore }
  },
}
</script>

<style lang="postcss">
.the-menu {
  .fade-enter-active,
  .fade-leave-active {
    @apply transition-opacity;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .slide-leave-active,
  .slide-enter-active {
    @apply transition-transform;
  }
  .slide-leave-to,
  .slide-enter-from {
    transform: translate(-100%, 0);
  }
  .menu-item {
    @apply p-2 rounded text-xl;
    display: flex;
    align-items: center;
    user-select: none;
    &.-active:not(.-description) {
      @apply bg-purple-100 border-l-4 border-purple;
    }
    &:not(.-description) {
      @apply hover:bg-gray-100 transition-colors cursor-pointer border-l-4 border-transparent;
    }
  }
}
</style>
