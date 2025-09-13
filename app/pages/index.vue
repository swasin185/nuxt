<template>
    <UCard>
        <h2>Build : {{ buildTime }}</h2>
        <h2 v-if="counter > 0">counter = {{ counter }}</h2>
        <template #footer>
            <UProgress v-if="counter == 0" :v-model="ref(null)" style="height: 6px"></UProgress>
        </template>
    </UCard>
</template>

<script lang="ts" setup>
useHead({
    title: "Index Page",
})
import { ref, onMounted } from "vue"
const config = useRuntimeConfig()
const buildTime = new Date(config.public.buildTime)
const counter = ref(0)
onMounted(async () => {
    counter.value = await $fetch("/api/counter")
})
</script>
<style scoped></style>
