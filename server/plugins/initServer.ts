import Prime from "../math/Prime"

export default defineNitroPlugin((nitroApp) => {
    console.log("Server initialized at startup")
    Date.prototype.toString = function () {
        return this.getHours() == 7
            ? this.toLocaleDateString("sv-SE")
            : this.toLocaleString("sv-SE")
    }
    Prime.initialize()
})
