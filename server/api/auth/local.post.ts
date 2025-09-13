export default eventHandler(async (event) => {
//    const query = getQuery(event)
    const body = await readBody(event)
    const inputId = body.id?.toString().toLowerCase()
    const inputPwd = body.pwd?.toString()
    const d = new Date()
    console.log("...Authen Login...", d.toString())
    if (!inputId || !inputPwd) {
        throw createError({
            statusCode: 400,
            statusMessage: "User ID and Password are required."
        })
    }
    try {
        const authUser = {
            id: "test",
            name: "Tommy",
            passwd: "abc123",
            level: 9,
            role: "admin",
        }
        if (authUser && (authUser.passwd == null || authUser.passwd === inputPwd)) {
            await setUserSession(event, {
                user: authUser,
            })
            // setResponseStatus(event, 200)
            return {
                message: "Login successful!",
                user: { id: authUser.id, name: authUser.name },
            }
        } else {
            await clearUserSession(event)
            setResponseStatus(event, 200)
            return {
                message: "Invalid User ID or Password.",
            }
        }
    } catch (error) {
        console.error("Authentication Error:", error)
        await clearUserSession(event)
        throw createError({
            statusCode: 500,
            statusMessage: "Authentication Error : " + error
        })
    }
})
