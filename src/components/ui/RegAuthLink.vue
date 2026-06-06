<template>
    <div class="flex gap-2 w-fit mx-auto">
        <p class="dark:text-[#c9cbd0]">
            <slot name="question"></slot>
        </p>
        <DefaultLink :to="to!">
            <slot name="link">

            </slot>
        </DefaultLink>
    </div>
</template>

<script setup lang="ts">
import DefaultLink from '@/components/ui/DefaultLink.vue';
defineProps<{
    to?: string
}>()
</script>