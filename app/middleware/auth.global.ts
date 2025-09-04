export default defineNuxtRouteMiddleware((to) => {
    const loginUrl = "/login"
    if (to.path != loginUrl) {
        const { loggedIn } = useUserSession()
        if (to.path !== loginUrl && !loggedIn.value) return navigateTo(loginUrl)
    }
})
