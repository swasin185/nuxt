// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    modules: ["@nuxt/ui", "nuxt-auth-utils"],
    css: ["@/assets/styles.css"],
    runtimeConfig: {
        public: {
            buildTime: new Date().getTime()
        },
        session: {
            maxAge: 60 * 5, // 5 minutes
            password: process.env.NUXT_SESSION_PASSWORD || "1234567_1234567_1234567_12345678",
        },
    },
    nitro: {
        storage: {
            redis: {
                driver: "redis",
                port: parseInt(process.env.REDIS_PORT || "18868"),
                host:
                    process.env.REDIS_HOST ||
                    "redis-18868.c1.ap-southeast-1-1.ec2.redns.redis-cloud.com",
                username: process.env.REDIS_USER || "default",
                password: process.env.REDIS_PASSWORD || "m1gT9dR2bwA8dwXhj9mCxLt0lq4Uwuut",
                db: 0,
            },
        },
    },
    app: {
        head: {
            titleTemplate: "%s - Nuxt2025",
            meta: [
                { charset: "utf-8" },
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
            ],
        },
    },
})
