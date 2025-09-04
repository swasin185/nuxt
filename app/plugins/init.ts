export default defineNuxtPlugin(async (nuxtApp) => {
    console.log("Default Date Format")
    Date.prototype.toString = function () {
        return this.getHours() == 7
            ? this.toLocaleDateString("sv-SE")
            : this.toLocaleString("sv-SE")
    }
})
