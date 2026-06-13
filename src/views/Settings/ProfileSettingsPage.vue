<template>
    <form @submit.prevent="submitProfileHandler" class="flex flex-col gap-4 border border-[#cbcfc3] dark:border-[#1e293b] p-6 rounded-2xl mb-10">
        <div class="flex flex-col border border-[#cbcfc3] dark:border-[#1e293b] p-4 gap-4 rounded-2xl">
            <h2 class="text-xl font-semibold md:text-2xl">Основные настройки</h2>
            <FormInput v-model="profileSettings.nickname" id="currentNickname" type="text" placeholder="Введите никнейм" minlength="2" maxlength="30" autocomplete="off" @validation="profileUpdateErrors.nickname = $event">
                <template #inputLabel>
                    Никнейм
                </template>
                <template #inputError v-if="profileUpdateErrors.nickname">
                    {{ profileUpdateErrors.nickname }}
                </template>
            </FormInput>
            <AvatarInput v-model="profileSettings.user_avatar">
                
            </AvatarInput>
        </div>
        <div class="flex flex-col border border-[#cbcfc3] dark:border-[#1e293b] p-4 gap-4 rounded-2xl">
            <h2 class="text-xl font-semibold md:text-2xl">Настройки параметров</h2>
            <FormInput v-model="profileSettings.userHeight" type="number" placeholder="Введите рост в см" min="120" max="240" step="0.01" id="userCurrentHeight" @validation="profileUpdateErrors.userHeight = $event">
                <template #inputLabel>
                    Рост
                </template>
                <template v-if="profileUpdateErrors.userHeight" #inputError>
                    {{ profileUpdateErrors.userHeight }}
                </template>
            </FormInput>
            <FormInput v-model="profileSettings.goalWeight" type="number" min="30" max="250" step="0.01" placeholder="Введите желаемый вес в кг" id="userCurrentGoalWeight" @validation="profileUpdateErrors.goalWeight = $event">
                <template #inputLabel>
                    Желаемый вес
                </template>
                <template v-if="profileUpdateErrors.goalWeight" #inputError>
                    {{ profileUpdateErrors.goalWeight }}
                </template>
            </FormInput>
            <FormInput v-model="profileSettings.userAge" type="number" min="12" max="99" step="1" placeholder="Введите возраст (целое число лет)" id="userCurrentAge" @validation="profileUpdateErrors.userAge = $event">
                <template #inputLabel>
                    Возраст
                </template>
                <template v-if="profileUpdateErrors.userAge" #inputError>
                    {{ profileUpdateErrors.userAge }}
                </template>
            </FormInput>
        </div>
        <div class="flex flex-col border border-[#cbcfc3] dark:border-[#1e293b] p-4 gap-4 rounded-2xl">
            <h2 class="text-xl font-semibold md:text-2xl">Настройки активности и цели</h2>
            <SelectYourActivity v-model="profileSettings.activity">

            </SelectYourActivity>
            <FormSelect id="everydayAvgSteps" name="everydayAvgSteps" v-model="profileSettings.avgSteps">
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
            <SelectYourGoal v-model="profileSettings.goal">

            </SelectYourGoal>
        </div>

        <NextStepBtn>
            Обновить данные
        </NextStepBtn>
    </form>
    <SettingsSection>
        <template #text>
            Удалить профиль
        </template>
        <template #action>
            <RedButton @click="deleteClicked">
                Удалить профиль
            </RedButton>
        </template>
    </SettingsSection>
</template>

<script setup lang="ts">
import RedButton from '@/components/ui/RedButton.vue';
import SettingsSection from '@/components/ui/SettingsSection.vue';
import { deleteProfile } from '@/api/deleteProfileApi';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authstore';
import { useToast } from 'vue-toastification';
import FormInput from '@/components/ui/FormInput.vue';
import SelectYourActivity from '@/components/ui/userParams/SelectYourActivity.vue';
import SelectYourGoal from '@/components/ui/userParams/SelectYourGoal.vue';
import NextStepBtn from '@/components/ui/NextStepBtn.vue';
import { useProfileSettingsStore } from '@/stores/profileSettingsStore';
import { onMounted } from 'vue';
import { getProfileSettings, profileUpdateErrors, updateProfileSettings } from '@/api/profileSettingsApi';
import FormSelect from '@/components/ui/FormSelect.vue';
import AvatarInput from '@/components/ui/AvatarInput.vue';

const router = useRouter()
const auth = useAuthStore()
const toast = useToast()

const profileSettings = useProfileSettingsStore()

function submitProfileHandler() {
    updateProfileSettings()
}


async function deleteClicked() {
    try {
        const res = await deleteProfile()
        auth.logOut()
        router.push('/auth')
        toast.success(res)
    } catch (err: unknown) {
        const message =
            err instanceof Error
                ? err.message
                : 'Неизвестная ошибка'
        
        toast.error(message)
        console.log(err)
    }
}

onMounted(async () => {
    const data = await getProfileSettings()
    profileSettings.setProfile(data.result[0])
})


</script>