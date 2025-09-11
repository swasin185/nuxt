<template>
    <UCard>
        <USwitch class="pb-4" v-model="play" @change="startAnimation" label="START" />
        <canvas id="circleCanvas" width="600" height="700"></canvas>
    </UCard>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"

useHead({
    title: "Trigonometry",
})

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let centerX: number
let centerY: number
const radius = 200 // Use a large radius for visibility, but it's our '1 unit'
const lineWidth = 5 // Thickness of the circle line

function drawAngle(angle: number, a180: string) {
    ctx.beginPath()
    ctx.arc(centerX, centerY, 30, 0, angle, angle < 0)
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = "#abc"
    ctx.fillText(a180, centerX - 25, centerY + (angle < 0 ? 15 : -10), 100)
    ctx.stroke()
}

function drawCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height) // Clear the canvas
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = "#3498bb"
    ctx.stroke()
}

function drawAxes() {
    ctx.strokeStyle = "#999"
    ctx.lineWidth = 1

    // X-axis
    ctx.beginPath()
    ctx.moveTo(0, centerY)
    ctx.lineTo(canvas.width, centerY)
    ctx.stroke()

    // Y-axis
    ctx.beginPath()
    ctx.moveTo(centerX, 0)
    ctx.lineTo(centerX, canvas.height)
    ctx.stroke()
}
function drawLine(endX: number, endY: number, text: string) {
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(endX, endY)
    ctx.lineWidth = 3
    ctx.fillText(text, endX + 2, endY - 2, 100)
    ctx.stroke()
}

function drawDashLine(begX: number, begY: number, endX: number, endY: number) {
    ctx.beginPath()
    ctx.moveTo(begX, begY)
    ctx.lineTo(endX, endY)
    ctx.lineWidth = 1
    ctx.setLineDash([lineWidth, lineWidth])
    ctx.stroke()
    ctx.setLineDash([])
}

function drawSlope(endX: number, endY: number, text: string) {
    ctx.strokeStyle = "#000"
    ctx.beginPath()
    ctx.moveTo(endX, endY)
    ctx.lineTo(endX, centerY)
    ctx.fillText(text, endX + 2, endY - 2, 100)
    ctx.lineWidth = 3
    ctx.stroke()
}

function draw(a180: number) {
    angle360 = a180
    let angle = (-a180 / 180) * Math.PI
    drawCircle()
    drawAxes()
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    const pointX = centerX + radius * cos
    const pointY = centerY + radius * sin
    const pointXX = centerX + radius
    const pointYY = centerY + (radius * sin) / cos
    drawAngle(angle, a180 + "\u00B0")
    ctx.strokeStyle = "#eee"
    drawLine(pointX, pointY, "")
    drawDashLine(pointX, centerY, pointX, pointY)
    drawDashLine(centerX, pointY, pointX, pointY)
    drawDashLine(centerX, centerY, pointXX, pointYY)
    ctx.strokeStyle = "#0000f0"
    drawLine(pointX, centerY, "cos " + cos.toFixed(4))
    ctx.strokeStyle = "#e74c3c"
    drawLine(centerX, pointY, "sin " + (-sin).toFixed(4))
    drawSlope(pointXX, pointYY, "tan " + (-sin / cos).toFixed(4))
}

const play = ref(false)
let angle360 = 0
async function startAnimation() {
    while (play.value) {
        angle360++
        if (angle360 > 180) angle360 -= 360
        draw(angle360)
        await new Promise((r) => setTimeout(r, 100))
    }
}

onMounted(() => {
    canvas = document.getElementById("circleCanvas")! as HTMLCanvasElement
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    centerX = canvas.width / 2
    centerY = canvas.height / 2

    drawCircle()
    drawAxes()
    canvas.addEventListener("mousedown", (event) => {
        const rect = canvas.getBoundingClientRect()
        const mouseX = event.clientX - rect.left
        const mouseY = event.clientY - rect.top

        const distance = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2))

        if (distance >= radius) {
            let angle = Math.atan2(mouseY - centerY, mouseX - centerX)
            const a180 = Math.round((-angle / Math.PI) * 60) * 3
            draw(a180)
        }
    })
})
</script>

<style scoped>
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #f4f4f4;
    color: #fff;
}

canvas {
    border: 1px solid #ccc;
    background-color: #876;
}
</style>
