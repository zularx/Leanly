import { useAuthStore } from "@/stores/authstore"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


export async function connectGoogleHealth() { 
    const auth = useAuthStore()
    try {
        const res = await fetch(`${API_BASE_URL}/google/url`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        })

        const data = await res.json()

        if (data.url) {
            window.location.href = data.url
        }
    } catch (err) {
        console.error(err)
    }
}