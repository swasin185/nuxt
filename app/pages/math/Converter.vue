<template>
    <UCard class="flex">
        <UInput
            id="numInput"
            v-model="numInput"
            class="w-100 font-bold"
            :ui="{ base: 'text-right' }"
            title="จำนวน"
        />
        <UInputNumber
            id="baseIn"
            v-model.number="baseIn"
            class="w-24 font-bold"
            title="เลขฐาน"
            :min="2"
            :max="32"
        />
        <USeparator />
        <UInput
            id="numOutput"
            v-model="numOutput"
            class="w-100 font-bold"
            :ui="{ base: 'text-right' }"
            title="จำนวน"
        />
        <UInputNumber
            id="baseOut"
            v-model.number="baseOut"
            class="w-24 font-bold"
            title="เลขฐาน"
            :min="2"
            :max="32"
        />
        <UButton @click="convert">Convert</UButton>
        <template #footer> </template>
    </UCard>
</template>

<script lang="ts" setup>
useHead({
    title: "Base Converter",
})
import { ref } from "vue"
const numInput = ref<string>("0")
const baseIn = ref<number>(10)
const baseOut = ref<number>(2)
const numOutput = ref<string>("")

async function convert() {
    numOutput.value = await $fetch("/api/converter", {
        query: {
            numInput: numInput.value,
            baseIn: baseIn.value,
            baseOut: baseOut.value,
        },
    })
}
</script>
<style scoped></style>
