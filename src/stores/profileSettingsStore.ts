import { defineStore } from 'pinia';
import type { ProfileSettingsType } from '@/types/ProfileSettingsType';

export const useProfileSettingsStore = defineStore('profileSettings',{
    state: () => ({
        nickname: '',
        user_avatar: null as File | null,

        userHeight: '',
        goalWeight: '',
        userAge: '',
        
        activity: '',
        goal: '',
        avgSteps: ''
    }),

    actions: {
        setProfile(data: ProfileSettingsType) {
            this.nickname = String(data.nickname) ?? ''
            
            this.userHeight = String(data.userHeight) ?? ''
            this.goalWeight = String(data.goalWeight) ?? ''
            this.userAge = String(data.userAge) ?? ''

            this.activity = String(data.activity) ?? ''
            this.goal = String(data.goal) ?? ''
            this.avgSteps = String(data.avg_steps) ?? ''
        }
    }
})