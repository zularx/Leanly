<template>
    <DefaultLayout>
        <ThemeButton @click="toggleTheme">

        </ThemeButton>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layout/DefaultLayout.vue';
import { chartKey } from '@/keys/chartKey';
import { ref, onMounted} from 'vue';
import ThemeButton from '@/components/ui/ThemeButton.vue';

const isDark = ref(false);

onMounted(async () => {
    isDark.value =
        document.documentElement.classList.contains('dark');
});

function toggleTheme() {
    isDark.value = !isDark.value;

    if (isDark.value) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }

    chartKey.value++

}
</script>