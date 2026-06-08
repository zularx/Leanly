<template>
    <div class="flex justify-between border border-[#cbcfc3] dark:border-[#1e293b] rounded-2xl items-center p-2 transition-colors duration-100">
        <p>Сменить тему</p>
        <ThemeButton @click="toggleTheme">

        </ThemeButton>
    </div>
</template>

<script setup lang="ts">
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