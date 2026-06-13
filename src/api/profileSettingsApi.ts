import { useAuthStore } from "@/stores/authstore"
import { useProfileSettingsStore } from "@/stores/profileSettingsStore"
import type { ValidationIssue } from "@/types/validationIssues"
import { ref } from "vue"
import { useToast } from "vue-toastification"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const toast = useToast()
export const profileUpdateErrors = ref<Record<string, string>>({})

export async function getProfileSettings() {
    const auth = useAuthStore()
    const res = await fetch(`${API_BASE_URL}/profile-settings`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`
        }
    })

    const data = await res.json()
    return data
}

export async function updateProfileSettings() {
    try {
        const auth = useAuthStore()
        const profileSettings = useProfileSettingsStore()

        const formData = new FormData()

        formData.append('nickname', profileSettings.nickname)
        if (profileSettings.user_avatar) {
            formData.append('user_avatar', profileSettings.user_avatar)
        }

        formData.append('userHeight', profileSettings.userHeight)
        formData.append('goalWeight', profileSettings.goalWeight)
        formData.append('userAge', profileSettings.userAge)

        formData.append('activity', profileSettings.activity)
        formData.append('goal', profileSettings.goal)
        formData.append('avgSteps', profileSettings.avgSteps)

        const res = await fetch(`${API_BASE_URL}/profile-settings`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${auth.token}`
            },
            body: formData
        })

        const data = await res.json()

        if (res.status === 422) {
            data.issues.forEach((issue: ValidationIssue) => {
                profileUpdateErrors.value[String(issue.field)] = issue.message
            })
            throw new Error('Ошибка! Не удалось обновить данные.')
        }

        if (!res.ok) {
            throw new Error('Ошибка! Не удалось обновить данные.')
        }

        toast.success(data.message)
    } catch (err) {
        toast.error('Ошибка! Не удалось обновить данные.')
    }
}