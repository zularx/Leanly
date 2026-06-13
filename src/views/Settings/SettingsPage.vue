<template>
    <SettingsLayout>
        <h1 class="text-2xl mb-4 font-bold lg:mb-6 md:text-3xl">{{ route.meta.title }}</h1>
        <RouterView>
            
        </RouterView>
    </SettingsLayout>
</template>

<script setup lang="ts">
import SettingsLayout from '@/layout/SettingsLayout.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
</script>