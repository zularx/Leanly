<script setup lang="ts">
    import DefaultLayout from '@/layout/DefaultLayout.vue';
    import { useAuthStore } from '@/stores/authstore';
    import { useRouter } from 'vue-router';
    import { computed } from 'vue'

    const auth = useAuthStore();
    const router = useRouter()

    const bmi = computed(() => {
        if (!auth.user) {
            return null
        }
        return (
            auth.user.userWeight / ((auth.user.userHeight) / 100 ) ** 2
        ).toFixed(2)
    })

    const weightLeft = computed(() => {
        if (!auth.user || auth.user.goalWeight == null) {
            return null
        }
        if (auth.user.goal === 'bodyBuild') {
            return (auth.user.goalWeight - auth.user.userWeight).toFixed(2);
        }
        return (auth.user.userWeight - auth.user.goalWeight).toFixed(2);
    })

    function bmiToString(bmi: number) {
        if (bmi < 16) {
            return 'Значительный дефицит массы тела'
        }  
        if (bmi >= 16 && bmi < 18.5) {
            return 'Дефицит массы тела'
        }  
        if (bmi >= 18.5 && bmi < 25) {
            return 'Норма'
        }  
        if (bmi >= 25 && bmi < 30) {
            return 'Лишний вес'
        }  
        if (bmi >= 30 && bmi < 35) {
            return 'Ожирение 1 степени'
        }  
        if (bmi >= 35 && bmi < 40) {
            return 'Ожирение 2 степени'
        }  

        return 'Ожирение 3 степени'
    }

    function goalToString(goal: string) {
        if (goal === 'fit') {
            return 'Сброс веса'
        }
        if (goal === 'weightMaintenance') {
            return "Поддержание веса"
        }
        if (goal === 'bodyBuild') {
            return "Набор мышечной массы"
        }
    }

    function activityToSting(activity: string) {
        if (activity === 'passive') {
            return 'Сидячий образ жизни'
        }
        if (activity === 'low') {
            return 'Тренировки 1-3 раза в неделю'
        } 
        if (activity === 'medium') {
            return 'Тренировки 3-5 раз в неделю'
        }
        if (activity === 'high') {
            return 'Тренировки 5-6 раз в неделю'
        }
        if (activity === 'ultra') {
            return 'Постоянная физическая нагрузка'
        }
    }


    function logoutClicked() {
        auth.logOut()
        router.push('/auth')
    }
</script>

<template>
    <DefaultLayout>
        <section class="flex items-stretch">
            <div class="bg-[#419400] dark:bg-[#3abdf7] w-30 rounded-l-xl hidden lg:block">
    
            </div>
            <div class="bg-[#f8fdef] flex flex-col items-center justify-center w-full dark:bg-[#0a1120] rounded-xl p-4 transition-colors duration-100 md:w-3xl md:p-7 lg:w-220 lg:rounded-l-none">
                <p class="dark:text-[#c9cbd0] w-fit text-2xl font-bold md:text-3xl">{{ auth.user?.nickname }}</p>
                <div class="mt-2 mb-4 w-full flex flex-1 flex-col gap-4 md:flex-row">
                    <div class="flex flex-col justify-center dark:text-[#c9cbd0] bg-[#e1e6d9] dark:bg-[#0c1425] p-4 rounded-xl md:w-90 transition-colors duration-100">
                        <h2 class="text-xl dark:text-[#c9cbd0] font-bold md:text-2xl">Текущие показатели</h2>
                        <p class="md:text-xl">Вес: {{ auth.user?.userWeight }} Кг Рост: {{ auth.user?.userHeight }} См</p>
                        <p class="md:text-xl">ИМТ: {{ bmi }} - {{ bmi? bmiToString(Number(bmi)) : '' }}</p>
                    </div>
                    <div class="dark:text-[#c9cbd0] flex flex-col flex-1 bg-[#e1e6d9] dark:bg-[#0c1425] p-4 rounded-xl transition-colors duration-100">
                        <h2 class="text-xl dark:text-[#c9cbd0] font-bold md:text-2xl">Общая информация</h2>
                        <p class="md:text-xl">Пол: {{ auth.user?.gender === 'male' ? 'Мужской' : 'Женский' }}</p>
                        <p class="md:text-xl">Возраст: {{ auth.user?.userAge }} Лет</p>
                        <p class="md:text-xl">Цель: {{ auth.user ? goalToString(auth.user?.goal) : '' }}</p>
                        <p class="md:text-xl">Активность: {{ auth.user ? activityToSting(auth.user?.activity) : '' }}</p>
                    </div>
                </div>
                <div class="dark:text-[#c9cbd0] w-full bg-[#e1e6d9] dark:bg-[#0c1425] p-4 rounded-xl mb-2 transition-colors duration-100">
                    <p class="md:text-xl">До желаемого веса осталось: {{ weightLeft ?? '' }} Кг</p>
                </div>
                
                <button class="border-3 px-2 py-1 rounded-xl cursor-pointer dark:text-[#c9cbd0] dark:border-[#fb7085] border-[#efc6c2] dark:hover:bg-[#fb7085] dark:hover:text-[#150406] hover:bg-[#efc6c2] dark:active:bg-[#fc4863] active:bg-[#f0948c] dark:active:border-[#fc4863] active:border-[#f0948c] md:text-xl md:mt-2 transition-colors duration-100" @click="logoutClicked">Выйти</button>
            </div>
        </section>
    </DefaultLayout>
</template>