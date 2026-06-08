<template>
    <RouterLink class="p-2 rounded-xl transition-colors duration-100" :to="to"
        :class="isActive ? 'bg-[#419400] dark:bg-[#3abdf7] hover:bg-[#53be00] active:bg-[#4bae00] dark:hover:bg-[#59ccfe] dark:active:bg-[#0ab4fc] dark:text-[#010d15]' : 'hover:bg-[#e1e6d9] active:bg-[#cbcfc3] dark:hover:bg-[#1e325b] dark:active:bg-[#2b477e]'">
        <slot>

        </slot>
    </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
    to: string
}>()

const route = useRoute()

const isActive = computed(() => 
    route.path === props.to
)
</script>