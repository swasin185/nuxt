<template>
    <UCard class="flex font-mono font-bold text-xl">
        <UInputNumber v-model.number="dividend" class="w-24 mr-2" orientation="vertical" :min="1" />
        /
        <UInputNumber v-model.number="divisor" class="w-24 mr-2" orientation="vertical" :min="2" />
        <UButton class="ml-4 mb-2 justify-center" @click="division" color="secondary">Division</UButton>
        <div v-if="outputRepeat" class="w-full flex justify-between">
            <span class="text-left text-sm">ทศนิยมซ้ำ</span>
            <span class="text-right">{{ outputRepeat }}</span>
        </div>
        <div class="w-full flex justify-between">
            <span class="text-left mr-4">ผลหาร</span>
            <span class="text-right primary">{{ output }}</span>
        </div>
        <div class="w-full flex justify-between">
            <span class="text-left">หารร่วมมาก</span>
            <span class="text-right">{{ gcd }}</span>
        </div>
        <template #footer> </template>
    </UCard>
</template>

<script lang="ts" setup>
useHead({
    title: "Division",
})
import { ref, onMounted } from "vue"
const dividend = ref<number>(1)
const divisor = ref<number>(2)
const output = ref<string>("0")
const gcd = ref<number>(0)
const repeat = ref<number>(0)
const outputRepeat = ref<string>("")

onMounted(() => {
    division()
})

async function division() {
    const result = (await $fetch("/api/division", {
        query: {
            x: dividend.value,
            y: divisor.value,
        },
    })) as {
        decimal: string
        dividend: number
        divisor: number
        quotient: string
        remainderList: number[]
        repeatPoint: number
        gcd: number
    }
    output.value = result.quotient
    if (result.decimal) output.value += "." + result.decimal
    gcd.value = result.gcd
    repeat.value = result.repeatPoint
    const ln = result.decimal.length - result.repeatPoint
    outputRepeat.value = repeat.value > 0 ? ".".repeat(ln + 1) : ""
}
</script>
<style scoped></style>
