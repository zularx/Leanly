import { useAuthStore } from "@/stores/authstore";
import { ref } from "vue";

const steps_date = ref(
    new Date().toLocaleDateString('en-CA')
)

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


export async function getTodayGoogleSteps() {
    const auth = useAuthStore()
    const result = fetch(`${API_BASE_URL}/google/steps?steps_date=${steps_date.value}` , {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${auth.token}`
        }
    })
}