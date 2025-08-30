<template>
    <div>
        <UButton class="tool-button" label="Refresh" @click="refresh" />
    </div>
    <div>
        <UTable :data="chartData"/>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

onMounted(refresh)

const chartData = ref()

async function refresh() {
    const data = await $fetch('/api/server-status')
    console.log(data)
}
</script>