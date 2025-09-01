<template>
  <UApp title="HelloWorld">
    <div class="flex">
      <UNavigationMenu orientation="vertical" :items="items" class="data-[orientation=vertical]:w-48" />
      <div>
        <NuxtPage />
      </div>
    </div>
  </UApp>
</template>
<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[]>([
  {
    label: 'Home',
    icon: 'i-lucide-home',
    children: [
      { label: 'Login/out', icon: 'i-lucide-home', to: '/login' },
      { label: 'Reload', icon: 'i-lucide-home', to: '/' },
      { label: 'Exit', icon: 'i-lucide-home', to: '/exit' },
    ],
  },
  {
    label: 'Setting',
    icon: 'i-lucide-home',
    children: [
      {
        label: 'สถานะเซิฟเวอร์',
        icon: 'i-lucide-home',
        to: '/setting/ServerStatus',
      },
      { label: 'ผู้ใช้', icon: 'i-lucide-home' },
      { label: 'สิทธิการใช้งาน', icon: 'i-lucide-home' },
    ],
  },
  {
    label: 'Game',
    icon: 'i-lucide-home',
    children: [
      {
        label: 'Mandelbrot',
        icon: 'i-lucide-home',
        to: '/game/Mandelbrot',
      },
      { label: 'Maze', icon: 'i-lucide-home', to: '/game/Maze' },
      {
        label: 'Montyhall',
        icon: 'i-lucide-home',
        to: '/game/Monty',
      },
      {
        label: 'Pascal Triangle',
        icon: 'i-lucide-home',
        to: '/game/Pascal',
      },
      { label: 'Sorting', icon: 'i-lucide-home', to: '/game/Sort' },
    ],
  },
  {
    label: 'Math',
    icon: 'i-lucide-home',
    children: [
      {
        label: 'Invoice',
        icon: 'i-lucide-home',
        to: '/math/TaxInvoice',
      },
      {
        label: 'Trigonometry',
        icon: 'i-lucide-home',
        to: '/math/Trigonometry',
      },
    ],
  },
  {
    label: 'Tutorial',
    icon: 'i-lucide-home',
    children: [
      {
        label: 'Installation',
        icon: 'i-lucide-home',
        to: '/tutorial/install',
      },
      {
        label: 'Content',
        icon: 'i-lucide-home',
        to: '/tutorial/content',
      },
    ],
  },
])
</script>
