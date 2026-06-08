<template>
    <button @click="onClick" class="flex ml-4 mt-40 group items-center justify-center bg-[#00000000] hover:bg-[#e1e6d9] dark:hover:bg-[#13203a] active:bg-[#afb4a6] transition-colors duration-100 cursor-pointer rounded-3xl w-12 h-12 md:mt-0">
        <svg
            class="w-8 h-8 dark:text-[#cdd0d4] text-[#343300] dark:group-hover:text-[#eef5fe] group-hover:text-[#50504d] dark:group-active:text-[#818cf8] group-active:text-[#edd000] transition-colors duration-100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            >
            <circle cx="12" cy="12" r="5" fill="currentColor"></circle>

            <line x1="12" y1="1" x2="12" y2="4"></line>
            <line x1="12" y1="20" x2="12" y2="23"></line>

            <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"></line>
            <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"></line>

            <line x1="1" y1="12" x2="4" y2="12"></line>
            <line x1="20" y1="12" x2="23" y2="12"></line>

            <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"></line>
            <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"></line>
        </svg>
    </button>
</template>

<script setup lang="ts">
defineProps<{
    onClick?: () => void
}>()
</script>