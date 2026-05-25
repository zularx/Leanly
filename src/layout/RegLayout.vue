<script setup lang="ts">
    import AppHeader from '@/components/layouts/AppHeader.vue';
    import AppFooter from '@/components/layouts/AppFooter.vue';
</script>

<template>
    <AppHeader>

    </AppHeader>
    <main class="flex min-h-160 h-dvh items-center">
        <div class="flex items-stretch w-full justify-center">
            <div class="hidden bg-[#419400] dark:bg-[#3abdf7] w-40 rounded-l-xl md:block transition-colors duration-100 lg:w-70">
            </div>
            <div class="w-full my-auto bg-[#f8fdef] dark:bg-[#0a1120] rounded-xl p-4 transition-colors duration-100 sm:w-105 md:rounded-l-none md:w-152.5">
                <slot></slot>
            </div>
        </div>
    </main>
    <AppFooter>

    </AppFooter>
</template>