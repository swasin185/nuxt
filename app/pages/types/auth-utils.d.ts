declare module '#auth-utils' {
    interface User {
        id: string
        name: string,
        level: number,
        role: string
    }
    interface UserSession {
        user: User,
        loginTime: number
    }
}
