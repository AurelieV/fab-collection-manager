<template>
    <header class="fixed top-0 left-0 right-0 z-20 flex items-center h-10 px-2 text-white bg-purple">
        <button @click="openMenu"><Pf_Icon icon="mdi:menu"></Pf_Icon></button>
        <div id="header-slot" class="flex-1"></div>
    </header>
    <TheMenu :is-open="isMenuOpen" @close="closeMenu"></TheMenu>
</template>

<script>
import emitter from "tiny-emitter/instance";
import { watch } from "vue";
import { useModal } from "purplefox-tools";

import TheMenu from "/src/components/layout/TheMenu.vue";

export default {
    components: { TheMenu },
    setup() {
        const { isOpen: isMenuOpen, close: closeMenu, open: openMenu } = useModal("menu");

        watch(isMenuOpen, (isOpen) => {
            if (isOpen) {
                document.body.classList.add("overflow-hidden");
            } else {
                document.body.classList.remove("overflow-hidden");
            }
        });
        emitter.on("close-menu", () => closeMenu());

        return { isMenuOpen, closeMenu, openMenu };
    },
};
</script>

<style scoped>
#header-slot {
    display: flex;
}
</style>
