<template>
    <UCard header="Login ชื่อผู้ใช้">
        <div class="flex flex-col w-70">
            <div class="w-full flex justify-between items-center mb-1">
                <span>User</span>
                <span>
                    <UInput ref="txtUser" class="w-50" v-model="username" placeholder="ชื่อ user"
                        :disabled="loggedIn" />
                </span>
            </div>
            <div class="w-full flex justify-between items-center mb-2">
                <span>Password</span>
                <span>
                    <UInput class="w-50" v-if="!loggedIn" ref="txtPassword" v-model="password" placeholder="รหัสผ่าน"
                        :disabled="loggedIn" toggleMask @keydown.enter="login" :type="show ? 'text' : 'password'"
                        :ui="{ trailing: 'pe-1' }">
                        <template #trailing>
                            <UButton color="neutral" variant="link" size="sm"
                                :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                                :aria-label="show ? 'Hide password' : 'Show password'" :aria-pressed="show"
                                aria-controls="password" @click="show = !show" />
                        </template>
                    </UInput>
                    <UBadge v-else color="secondary">{{ fullName }}</UBadge>
                </span>
            </div>
            <UButton class="w-20 justify-center" color="secondary" v-if="loggedIn" @click="logout">Logout</UButton>
            <UButton class="w-20 justify-center" color="primary" v-else @click="login">Login</UButton>
        </div>
    </UCard>
</template>

<script lang="ts" setup>
useHead({
    title: "Login",
})
const { loggedIn, user, session, clear, fetch: refreshSession } = useUserSession()
const show = ref(false)
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
            if (loggedIn.value)
                // location.reload()
                await navigateTo("/")
            else alert("ชื่อผู้ใช้/รหัสผ่าน ผิดพลาด")
        })
        .catch((error) => alert(error.message))
}

async function logout() {
    await clear()
    location.reload()
}
</script>
