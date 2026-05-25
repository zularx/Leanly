<script setup lang="ts">
    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        LineElement,
        PointElement,
        CategoryScale,
        LinearScale,
    } from 'chart.js'

    import { Line } from 'vue-chartjs'
    import { computed, watchEffect } from 'vue';
    import type { WeightItem } from '@/types/weightItem'
    import { ref } from 'vue';

    ChartJS.register(
        Title,
        Tooltip,
        Legend,
        LineElement,
        PointElement,
        CategoryScale,
        LinearScale
    )

    const isDark = ref(false)


    watchEffect(() => {
        isDark.value = document.documentElement.classList.contains('dark')
    })

    const props = defineProps<{
        weights: WeightItem[]
    }>()

    const chartData = computed(() => ({
        labels: props.weights.map(item => 
            new Date(item.created_at).toLocaleDateString()
        ),

        datasets: [
            {
                label: 'Вес (кг)',
                data: props.weights.map(item => item.weight),
                tension: 0.3,

                borderColor: isDark.value ? '#c9cbd0' : '#151614',
                backgroundColor: isDark.value ? '#c9cbd0' : '#151614',
                pointBackgroundColor: isDark.value ? '#c9cbd0' : '#151614',
                pointBorderColor: isDark.value ? '#c9cbd0' : '#151614',
            }
        ]
    }))

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                labels: {
                    color: isDark.value ? '#c9cbd0' : '#151614'
                }
            }
        },

        scales: {
            x: {
                ticks: {
                    color: isDark.value ? '#c9cbd0' : '#151614'
                },
                grid: {
                    color: isDark.value ? '#c9cbd0' : '#151614'
                }
            },

            y: {
                ticks: {
                    color: isDark.value ? '#c9cbd0' : '#151614'
                }, 
                grid: {
                    color: isDark.value ? '#c9cbd0' : '#151614'
                }
            }
        }


    }
</script>

<template>
    <div class="h-80">
        <Line
            :data="chartData"
            :options="chartOptions"></Line>
    </div>
</template>