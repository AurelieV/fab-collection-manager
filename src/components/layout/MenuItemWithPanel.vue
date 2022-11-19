<template>
    <li class="menu-item" :class="{ '-active': isOpen }" @click="open">
        <Pf_Icon v-if="icon" :icon="icon" inline class="mr-2"></Pf_Icon>
        <div class="mr-auto">{{ title }}</div>
        <Pf_Icon icon="mdi:chevron-right" inline></Pf_Icon>
    </li>
    <teleport to="#submenus">
        <div class="submenu">
            <transition name="fade">
                <div
                    v-show="isOpen"
                    class="absolute top-0 bottom-0 left-0 right-0 bg-gray-200 opacity-70"
                    @click.stop="close"
                ></div>
            </transition>
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
                        md:w-initial md:left-[min(90vw,400px)] md:max-w-[500px]
                        bg-white
                        md:shadow-sm md:z-auto
                        z-10
                    "
                >
                    <div class="flex items-center p-2">
                        <button @click="close"><Pf_Icon icon="mdi:chevron-left" class="mt-1"></Pf_Icon></button>
                        <div class="ml-4 select-none text-xl">{{ title }}</div>
                    </div>
                    <hr class="w-[90%] mx-auto bg-gray-200 h-[1px]" />
                    <div class="flex flex-col flex-1 px-3 pb-5 mt-4 overflow-auto pf-scroll">
                        <slot></slot>
                    </div>
                </aside>
            </transition>
        </div>
    </teleport>
</template>

<script>
import { onUnmounted, reactive, watch } from "vue";
import { useModal } from "purplefox-tools";
const items = reactive({});

export default {
    props: {
        title: { type: String, required: true },
        icon: { type: String, default: null },
        id: { type: String, required: true },
    },
    emits: ["close"],
    setup(props) {
        const { isOpen, close, open } = useModal(props.id);
        items[props.id] = close;

        watch(isOpen, (isOpen) => {
            if (isOpen) {
                Object.entries(items).forEach(([index, closeMenu]) => {
                    if (index !== props.id) {
                        closeMenu();
                    }
                });
            }
        });
        onUnmounted(() => {
            close();
            delete items[props.id];
        });

        return { isOpen, close, open };
    },
};
</script>

<style lang="postcss" scoped>
.submenu {
    .slide-leave-active,
    .slide-enter-active {
        @apply transition-transform;
    }
    .slide-leave-to,
    .slide-enter-from {
        transform: translate(-100%, 0);
    }
}
</style>
