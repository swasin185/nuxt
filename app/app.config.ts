export default defineAppConfig({
    ui: {
        colorMode: true,
        table: {
            slots: {
                td: "m-1 p-1 cursor-pointer",
                th: "p-2",
            },
        },
        inputNumber: {
            slots: {
                base: "text-right",
            },
        },
    },
})
