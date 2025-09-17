<template>
    <UApp title="HelloWorld">
        <div class="flex">
            <UNavigationMenu
                orientation="vertical"
                :items="items"
                class="data-[orientation=vertical]:w-64"
            />
            <NuxtPage class="w-[1200px] h-[800px] overflow-auto" />
        </div>
    </UApp>
</template>
<script lang="ts" setup>
import type { NavigationMenuItem } from "@nuxt/ui"

const items = ref<NavigationMenuItem[][]>([
    [
        {
            label: "Setting",
            icon: "i-lucide-settings", // A classic gear icon for settings.
            children: [
                { label: "Login/out", icon: "i-lucide-log-in",  tooltip: { text:"ป้อนชื่อผู้ใช้และรหัสผ่าน" }, to: "/login" },
                { label: "Reload", icon: "i-lucide-refresh-cw", to: "/" },
                {
                    label: "สถานะเซิฟเวอร์",
                    icon: "i-lucide-server",
                    to: "/setting/ServerStatus",
                },
                { label: "ผู้ใช้", icon: "i-lucide-users" },
                { label: "สิทธิการใช้งาน", icon: "i-lucide-shield-check" }, 
            ],
        },
        {
            label: "Game",
            icon: "i-lucide-gamepad-2", 
            children: [
                {
                    label: "Mandelbrot",
                    icon: "i-lucide-infinity", 
                    to: "/game/Mandelbrot",
                },
                { label: "Maze", icon: "i-lucide-brick-wall", to: "/game/Maze" }, 
                {
                    label: "Montyhall",
                    icon: "i-lucide-door-open",
                    to: "/game/Monty",
                },
                {
                    label: "Pascal Triangle",
                    icon: "i-lucide-boxes",
                    to: "/game/Pascal",
                },
                { label: "Sorting", icon: "i-lucide-arrow-up-narrow-wide", to: "/game/Sort" }, 
            ],
        },
        {
            label: "Math",
            icon: "i-lucide-calculator", 
            children: [
                {
                    label: "Invoice",
                    icon: "i-lucide-file-text",
                    to: "/math/TaxInvoice",
                },
                {
                    label: "Trigonometry",
                    icon: "i-lucide-axis-3d", 
                    to: "/math/Trigonometry",
                },
                {
                    label: "Goldbach 's conjecture",
                    icon: "i-lucide-ruler", 
                    to: "/math/Goldbach",
                },
                {
                    label: "Base Converter",
                    icon: "i-lucide-repeat",
                    to: "/math/Converter",
                },
                {
                    label: "Division",
                    icon: "i-lucide-divide",
                    to: "/math/Division",
                },
            ],
        },
        {
            label: "Tutorial",
            icon: "i-lucide-book-open", 
            children: [
                {
                    label: "Installation",
                    icon: "i-lucide-download",
                    to: "/tutorial/install",
                },
                {
                    label: "Content",
                    icon: "i-lucide-list", 
                    to: "/tutorial/content",
                },
            ],
        },
    ],
])
</script>
