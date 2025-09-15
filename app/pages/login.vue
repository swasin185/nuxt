<template>
    <UCard header="Login ชื่อผู้ใช้" class="gap-4 mb-2">
        <UInput ref="txtUser" class="pr-4" v-model="username" placeholder="ชื่อ user" :disabled="loggedIn" />
        <UInput
            v-if="!loggedIn"
            ref="txtPassword"
            v-model="password"
            placeholder="รหัสผ่าน"
            :disabled="loggedIn"
            toggleMask
            @keydown.enter="login"
            type="password"
        />
        <UBadge v-else color="secondary">{{ fullName }}</UBadge>
        <template #footer>
            <UButton v-if="loggedIn" @click="logout">Logout</UButton>
            <UButton v-else @click="login">Login</UButton>
        </template>
    </UCard>
</template>

<script lang="ts" setup>
useHead({
    title: "Login",
})
const { loggedIn, user, session, clear, fetch: refreshSession } = useUserSession()
const username: Ref<string> = ref(user?.value?.id || "test")
const password: Ref<string> = ref("abc123")
const fullName: Ref<string> = ref(user?.value?.name || "")

const txtUser = useTemplateRef("txtUser")
const txtPassword = useTemplateRef("txtPassword")

function login() {
    if (!username.value) {
        txtUser.value!.inputRef?.focus()
        return
    }
    if (!password.value) {
        txtPassword.value!.inputRef?.focus()
        return
    }

    $fetch("/api/auth/local", {
        method: "POST", 
        body: {
            id: username.value,
            pwd: password.value,
        },
    })
        .then(async () => {
            await refreshSession()
            if (loggedIn.value)  // location.reload()
                await navigateTo('/')
            else
                alert('ชื่อผู้ใช้/รหัสผ่าน ผิดพลาด')
        })
        .catch((error) => alert(error.message))
}

async function logout() {
    await clear()
    location.reload()
}
</script>
