export default eventHandler(async () => {
    const memory = process.memoryUsage()
    return memory
})
