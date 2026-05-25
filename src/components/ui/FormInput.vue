<template>
    <div class="flex w-full flex-col gap-1 dark:text-[#c9cbd0]">
    
        <label class="ml-1 md:text-xl"
        :for="id">
            <slot></slot>
        </label>

        <input
            class="p-2 border-2 appearance-none border-[#cbcfc3] dark:bg-[#13203a] dark:border-[#13203a] bg-[#cbcfc3] hover:bg-[#afb2a8] dark:hover:bg-[#1e325b] dark:hover:border-[#1e325b] hover:border-[#afb2a8] focus:border-[#419400] dark:focus:border-[#3abdf7] user-invalid:border-[#efc6c2] dark:user-invalid:border-[#fb7085] rounded-xl outline-0 transition-colors duration-100 md:text-xl lg:p-3"
            :id="id"
            :name="name"
            :type="type"
            :value="modelValue"
            :placeholder="placeholder"
            :required="required"
            :min="min"
            :max="max"
            :pattern="pattern"
            :step="step"
            :minlength="minlength"
            :maxlength="maxlength"
            @input="onInput"
            />

    </div>
</template>

<script setup lang="ts">
    defineProps<{
        modelValue?: string
        id?: string
        name?: string
        type?: string
        placeholder?: string
        required?: boolean
        min?: number
        max?: number
        pattern?: string
        step?: number
        minlength?: number | string
        maxlength?: number | string
        }>()

    const emit = defineEmits<{
        (e: 'update:modelValue', value: string): void
    }>()

    const onInput = (e: Event) => {
        emit('update:modelValue', (e.target as HTMLInputElement).value)
    }
</script>