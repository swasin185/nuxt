<template>
    <UCard header="Login ชื่อผู้ใช้" class="flex justify-left items-top gap-2 mb-2">
        <UInput v-model="username" placeholder="ชื่อ user" :disabled="loggedIn" />
        <UInput
            v-model="password"
            placeholder="รหัสผ่าน"
            :disabled="loggedIn"
            toggleMask
            @keydown.enter="login"
            type="password"
        />
        <template #footer>
            <UButton v-if="loggedIn" @click="logout">Logout</UButton>
            <UButton v-else @click="login">Login</UButton>
            &MediumSpace;
            {{ fullName }}
        </template>
    </UCard>
</template>

<script lang="ts" setup>
useHead({
    title: "Login",
})
const { loggedIn, user, session, clear, fetch: refreshSession } = useUserSession()
const username: Ref<string> = ref(user?.value?.id || "")
const password: Ref<string> = ref("")
const fullName: Ref<string> = ref(user?.value?.name || "")

function login() {
    $fetch("/api/auth/local", {
        query: {
            id: username.value,
            pwd: password.value,
        },
    })
        .then(async () => {
            await refreshSession()
            if (loggedIn.value) location.reload()
            // await navigateTo('/')
            else alert("ชื่อผู้ใช้/รหัสผ่าน ผิดพลาด")
        })
        .catch(() => alert("เซิฟเวอร์มีปัญหา"))
}

async function logout() {
    await clear()
    location.reload()
}
</script>
