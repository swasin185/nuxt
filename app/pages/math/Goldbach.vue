<template>
    <UCard>
        <div class="flex justify-left items-center gap-2 mb-4">
            <label for="rulerLength" class="font-medium">Even Number:</label>
            <UInputNumber
                id="rulerLength"
                v-model.number="evenNumber"
                :min=4
                :max="maxEventNumber"
                :step=2
                class="w-32"
                :title="maxEventNumber"
            />
        </div>

        <div
            class="h-[50px] bg-gray-100 border-y border-gray-800 relative pl-2 font-sans overflow-hidden shadow-md"
            :style="{ width: 100 + evenNumber * 5 + 'px' }"
        >
            <div class="flex w-full h-full items-end">
                <div
                    v-for="num in topMarkers"
                    :key="'top-' + num"
                    class="flex-grow relative h-[5px] border-l-2"
                    :class="{
                        'h-[20px] border-red-600': isPrime(num),
                        'h-[10px] border-cyan-300': !isPrime(num) && num % 2 != 0,
                    }"
                >
                    <span
                        v-if="isPrime(num)"
                        class="absolute -top-5 left-1/2 -translate-x-3 text-xs text-gray-700"
                    >
                        {{ num }}
                    </span>
                </div>
            </div>
        </div>

        <div
            class="h-[50px] bg-gray-100 border-y border-gray-800 relative pl-2 font-sans overflow-hidden shadow-md"
            :style="{ width: 100 + evenNumber * 5 + 'px' }"
        >
            <div class="flex w-full h-full items-start">
                <div
                    v-for="num in bottomMarkers"
                    :key="'bottom-' + num"
                    class="flex-grow relative h-[5px] border-l-2"
                    :class="{
                        'h-[20px] border-red-600': isPrime(num),
                        'h-[10px] border-cyan-300': !isPrime(num) && num % 2 != 0,
                    }"
                >
                    <span
                        v-if="isPrime(num)"
                        class="absolute top-5 left-1/2 -translate-x-3 text-xs text-gray-700"
                    >
                        {{ num }}
                    </span>
                </div>
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"

onMounted(async () => {
    $fetch<number[]>("/api/prime-list")
        .then((result) => {
            primeNumbers.value = result
            console.log("fetch Prime ", primeNumbers.value.length)
        })
        .catch((error) => {
            console.error("Failed to fetch Prime:", error)
        })
})

const primeNumbers = ref<number[]>([])
const evenNumber = ref<number>(100)

const maxEventNumber = computed(() => {
    return primeNumbers.value[primeNumbers.value.length - 1]! + 1
})

const half = computed(() => {
    return Math.floor(evenNumber.value / 2 - 1)
})

function isPrime(n: number) {
    return primeNumbers.value.includes(n)
}

const topMarkers = computed(() => {
    return Array.from({ length: half.value }, (_, idx) => evenNumber.value - idx - 1)
})

const bottomMarkers = computed(() => {
    return Array.from({ length: half.value }, (_, idx) => idx + 1)
})

watch(evenNumber, (val) => {
    const max = maxEventNumber.value
    if (val > max) evenNumber.value = max
    else if (val < 4) evenNumber.value = 4
    else if (val % 2 !== 0) evenNumber.value = val - 1
})
</script>
