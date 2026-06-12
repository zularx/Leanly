import { computed } from 'vue'
import { useAuthStore } from '@/stores/authstore'

const bmr = computed(() => {
    const auth = useAuthStore()
    const user = auth.user
    if (!user) {
        return 0
    }

    const weight = Number(user.userWeight)
    const height = Number(user.userHeight)
    const age = Number(user.userAge)

    if (user.gender === 'male') {
        return 10 * weight + 6.25 * height - 5 * age + 5
    } else {
        return 10 * weight + 6.25 * height - 5 * age - 161
    }
})

const tdee = computed(() => {
    const auth = useAuthStore()
    const user = auth.user
    if (!user) {
        return 0
    }

    const bmrValue = bmr.value

    const sportActivity = user.activity
    const stepActivity = user.avg_steps

    const onlyWorkoutMultipliers: Record<string, number> = {
        passive: 1.2,
        low: 1.375,
        medium: 1.55,
        high: 1.725,
        ultra: 1.9,
    }

    const onlyStepMultipliers: Record<string, number> = {
        'under_2k': 1.2,
        '2k-5k': 1.25,
        '5k-7.5k': 1.35,
        '7.5k-10k': 1.45,
        '10k-15k': 1.6,
        '15k-20k': 1.75,
        '20k+': 1.9,
    }

    const workoutBonuses: Record<string, number> = {
        passive: 0.0,
        low: 0.075,
        medium: 0.15,
        high: 0.225,
        ultra: 0.325,
    }

    const hasSteps = !!stepActivity
    const hasSport = !!sportActivity

    let finalMultiplier = 1.2

    if (hasSport && hasSteps) {
        const baseSteps = onlyStepMultipliers[stepActivity] || 1.2
        const sportBonus = workoutBonuses[sportActivity] || 0.0

        finalMultiplier = baseSteps + sportBonus

        if (finalMultiplier > 1.9) {
            finalMultiplier = 1.9
        }
    } else if(hasSteps) {
        finalMultiplier = onlyStepMultipliers[stepActivity] || 1.2
    } else if (hasSport) {
        finalMultiplier = onlyWorkoutMultipliers[sportActivity] || 1.2
    }

    return bmrValue * finalMultiplier
})

export function targetCalories(goal: string | undefined) {
    const base = tdee.value

    switch (goal) {
        case 'fit':
            return base * 0.85
        case 'weightMaintenance':
            return base
        case 'bodyBuild':
            return base + 300
        default:
            return base
    }
}