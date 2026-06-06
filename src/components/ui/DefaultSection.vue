<script setup lang="ts">
defineProps<{
    noMargin?: boolean
}>()
</script>

<template>
    <section 
        :class=" [
            'bg-[#f8fdef] dark:bg-[#0a1120] w-90 rounded-xl p-4 md:w-3xl lg:w-5xl',
            !noMargin && 'mt-8 md:mt-16 lg:mt-20'
        ]"
    >
            <h2 class="text-2xl dark:text-[#c9cbd0] font-bold md:text-3xl">
                <slot name="h2Header"></slot>
            </h2>
            <slot name="mainContent"></slot>
    </section>
</template>