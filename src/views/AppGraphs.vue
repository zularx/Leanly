<script setup lang="ts">
    import DefaultLayout from '@/layout/DefaultLayout.vue';
    import type { WeightHistory } from '@/types/weightHistory';
    import { ref, onMounted } from 'vue';
    import { chartKey } from '@/keys/chartKey';
    import DefaultSection from '@/components/ui/DefaultSection.vue';
    import WeightChart from '@/components/charts/WeightChart.vue';
    import { fetchWeightHistory } from '@/api/weightApi.ts';

    const weights = ref<WeightHistory[]>([])

    onMounted(async () => {
        weights.value = await fetchWeightHistory()
    })
</script>
<template>
    <DefaultLayout>
        <DefaultSection>
            <template #h2Header>
                График веса
            </template>
            <template #mainContent>
                <WeightChart :weights="weights" :key="chartKey"></WeightChart>
            </template>
        </DefaultSection>
    </DefaultLayout>
</template>