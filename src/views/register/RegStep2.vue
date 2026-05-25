<script setup lang="ts">
    import RegLayout from '@/layout/RegLayout.vue';
    import NextStepBtn from '@/components/ui/NextStepBtn.vue';
    import { useRouter } from 'vue-router';
    import FormInput from '@/components/ui/FormInput.vue';
    import FormHeader from '@/components/ui/FormHeader.vue';
    import { useRegisterStore } from '@/stores/register';

    const register = useRegisterStore()

    const router = useRouter();

    const nextStep = () => {
        router.push('/register/step-3')
    }
</script>

<template>
    <RegLayout>
        <FormHeader>Регистрация: шаг 2</FormHeader>
        <form @submit.prevent="nextStep" class="w-full flex mt-4 flex-col gap-3 items-center justify-center">
            <FormInput v-model="register.userWeight" id="userWeight" name="userWeight" placeholder="Введите вес (в кг)" type="number">
                Сколько вы весите?
            </FormInput>

            <FormInput v-model="register.userHeight" id="userHeight" name="userHeight" placeholder="Введите рост (в см)" type="number">
                Какой у вас рост?
            </FormInput>

            <FormInput v-model="register.userAge" id="userAge" name="userAge" placeholder="Введите возраст" type="number">
                Сколько вам лет?
            </FormInput>
            <div class="w-full dark:text-[#c9cbd0]">
                <label class="ml-1 md:text-xl" for="sex">Ваш пол?</label>
                <select v-model="register.gender" class="p-2 w-full border-2 appearance-none border-[#cbcfc3] dark:bg-[#13203a] dark:border-[#13203a] bg-[#cbcfc3] hover:bg-[#afb2a8] dark:hover:bg-[#1e325b] dark:hover:border-[#1e325b] hover:border-[#afb2a8] rounded-xl outline-0 transition-colors duration-100 md:text-xl lg:p-3" name="sex" id="sex">
                    <option value="male">мужчина</option>
                    <option value="female">женщина</option>
                </select>
            </div>
            <NextStepBtn>
                Далее
            </NextStepBtn>
        </form>
    </RegLayout>
</template>