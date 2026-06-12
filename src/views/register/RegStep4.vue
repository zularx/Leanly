<script setup lang="ts">
    import RegLayout from '@/layout/RegLayout.vue';
    import NextStepBtn from '@/components/ui/NextStepBtn.vue';
    import FormHeader from '@/components/ui/FormHeader.vue';
    import { registerErrors, submitReg } from '@/api/registerApi/registerFinallApi';
    import FormInput from '@/components/ui/FormInput.vue';
    import { useRegisterStore } from '@/stores/register';
    import RegisterSteps from '@/components/ui/RegisterSteps.vue';
    import { useRouter } from 'vue-router';
    import { useToast } from 'vue-toastification';
    import SelectYourActivity from '@/components/ui/userParams/SelectYourActivity.vue';
    import SelectYourGoal from '@/components/ui/userParams/SelectYourGoal.vue';
import FormSelect from '@/components/ui/FormSelect.vue';

    const register = useRegisterStore();
    const router = useRouter()
    const toast = useToast()

    async function submitRegHandle() {

        try {
            const res = await submitReg();
            toast.success('Пользователь создан успешно!')
            console.log("Успех", res)
            console.log(registerErrors.value)
            router.push('/auth')
            register.$reset()
        } catch (err) {
            console.log(err)
            toast.error('Не удалось создать пользователя.')
        }
    }
</script>

<template>
    <RegLayout>
        <FormHeader>Регистрация: шаг 4</FormHeader>
        <form @submit.prevent="submitRegHandle" class="w-full flex mt-4 flex-col gap-3 items-center justify-center">
            <SelectYourActivity v-model="register.activity">

            </SelectYourActivity>

            <SelectYourGoal v-model="register.goal">

            </SelectYourGoal>
            <FormSelect id="everydayAvgSteps" name="everydayAvgSteps" v-model="register.avg_steps">
                <template #selectLabel>
                    Сколько шагов в день вы делаете?
                </template>
                <template #options>
                    <option value="" disabled>Выберите среднее количество шагов в день</option>
                    <option value="under_2k">Меньше 2000</option>
                    <option value="2k-5k">от 2000 до 5000</option>
                    <option value="5k-7.5k">от 5000 до 7500</option>
                    <option value="7.5k-10k">от 7500 до 10000</option>
                    <option value="10k-15k">от 10000 до 15000</option>
                    <option value="15k-20k">от 15000 до 20000</option>
                    <option value="20k+">20000 и больше</option>
                </template>
            </FormSelect>
            
            <FormInput v-model="register.goalWeight" id="goalWeight" name="goalWeight" placeholder="Введите вес в кг" type="number" min="30" max="250" step="0.01" required @validation="registerErrors.goalWeight = $event">
                <template #inputLabel>
                    Сколько бы хотели весить?
                </template>

                <template #inputError v-if="registerErrors.goalWeight">
                    {{ registerErrors.goalWeight }}
                </template>
            </FormInput>
            

            <div class="flex justify-between w-full items-center">
                <RegisterSteps>

                </RegisterSteps>

                <NextStepBtn noMargin>
                    Далее
                </NextStepBtn>
            </div>
        </form>
    </RegLayout>
</template>