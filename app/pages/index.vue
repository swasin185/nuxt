<template>
   Index Page
    <UCard>
        <template #title>Hello World</template>
        <h2 v-if="counter > 0">counter = {{ counter }}</h2>
        <template #footer>
            <UProgress :v-model="ref(null)" style="height: 6px"></UProgress>
        </template>
    </UCard>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
const counter = ref(0)
onMounted(async () => {
    counter.value = await $fetch('/api/counter')
})
</script>
<style scoped></style>
