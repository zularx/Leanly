<template>
    <RouterLink 
        :to="to"
        class="dark:text-[#3abdf7] text-[#419400] dark:hover:text-[#59ccfe] hover:text-[#53be00] dark:active:text-[#0ab4fc] active:text-[#4bae00]">
        <slot></slot>
    </RouterLink>
</template>

<script setup lang="ts">
    defineProps<{
        to: string,
    }>()
</script>