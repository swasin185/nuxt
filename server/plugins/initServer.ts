import Prime from "../math/Prime"

export default defineNitroPlugin((nitroApp) => {
    console.log("Server initialized at startup")
    Prime.initialize()
})
