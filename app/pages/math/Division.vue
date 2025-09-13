<template>
    <UCard class="flex">
        <UInputNumber
            id="baseIn"
            v-model.number="baseIn"
            class="w-24 font-bold"
            orientation="vertical"
            :min="2"
        />
        <UInputNumber
            id="baseOut"
            v-model.number="baseOut"
            class="w-24 font-bold"
            orientation="vertical"
            :min="2"
        />
        <UButton @click="division">Division</UButton>
        <USeparator />
        <br />
        <hr />
        <div v-if="outputRepeat" class="w-250 flex justify-between items-center font-mono text-xl">
            <span class="text-left text-sm">ทศนิยมซ้ำ</span>
            <span class="text-right">{{ outputRepeat }}</span>
        </div>
        <div class="w-250 flex justify-between items-center font-mono text-xl">
            <span class="text-left">ผลหาร</span>
            <span class="text-right">{{ output }}</span>
        </div>
        <div class="w-250 flex justify-between items-center font-mono text-xl">
            <span class="text-left">ตัวหารร่วมมาก</span>
            <span class="text-right">{{ gcd }}</span>
        </div>
        <template #footer> </template>
    </UCard>
</template>

<script lang="ts" setup>
useHead({
    title: "Division",
})
import { ref } from "vue"
const baseIn = ref<number>(10)
const baseOut = ref<number>(2)
const output = ref<string>("0")
const gcd = ref<number>(0)
const repeat = ref<number>(0)
const outputRepeat = ref<string>("")

async function division() {
    const result = (await $fetch("/api/division", {
        query: {
            x: baseIn.value,
            y: baseOut.value,
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
    outputRepeat.value = ""
    if (ln > 0) for (let i = 0; i <= ln; i++) outputRepeat.value += "."
}
</script>
<style scoped></style>
