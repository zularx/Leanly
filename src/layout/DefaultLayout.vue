<script setup lang="ts">
    import AppHeader from '@/components/layouts/AppHeader.vue';
    import AppFooter from '@/components/layouts/AppFooter.vue';
</script>

<template>
    <AppHeader>

    </AppHeader>
    <main class="flex flex-col min-h-160 h-dvh items-center justify-center">
        <slot></slot>
    </main>
    <AppFooter>
        
    </AppFooter>
</template>