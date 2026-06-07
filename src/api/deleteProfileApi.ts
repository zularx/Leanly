import { useAuthStore } from "@/stores/authstore"


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function deleteProfile() {
    const auth = useAuthStore()

    const res = await fetch(`${API_BASE_URL}/profile`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}`
        }
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message)
    }
    
    return "Успех! Пользователь удален!"
}