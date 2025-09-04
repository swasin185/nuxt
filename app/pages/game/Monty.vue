<template>
    <div style="height: 100%; padding: 100px; text-align: center; justify-content: center">
        <h1>{{ coins }} เหรียญ</h1>
        <h2>{{ message }}</h2>
        <div>
            <button class="card" v-for="card in cards" :key="card.id" @click="select(card)">
                <h3>{{ card.name }}</h3>
                <img src="/assets/game/question.svg" v-show="!card.isOpened" />
                <img src="/assets/game/coin.png" v-show="card.isOpened && card.id == coinCard" />
                <img
                    src="/assets/game/bomb.svg"
                    v-show="card.isOpened && card.id != coinCard"
                    class="blinking"
                />
            </button>
        </div>
        <h4>
            ครั้งที่ {{ counter }}
            <progress :value="winrate" max="100" />
            {{ winrate }}%
        </h4>
    </div>
</template>

<script lang="ts" setup>
useHead({
    title: "Monty Hall",
})
import { ref } from "vue"

const message = ref("เกมส์เปิดการ์ดหาเหรียญ")
const coins = ref(10)
const counter = ref(0)
const winrate = ref(0)
let selected = ref(-1)
let coinCard = 1
let winCount = 0

interface Card {
    id: number
    name: string
    isOpened: boolean
}

const cards = ref<Card[]>([
    { id: 0, name: "A", isOpened: true },
    { id: 1, name: "B", isOpened: true },
    { id: 2, name: "C", isOpened: true },
])

function select(card: Card): void {
    if (cards.value[coinCard]!.isOpened) {
        reset()
    } else {
        if (selected.value == -1) {
            selected.value = card.id
            message.value = "ยืนยัน / เปลี่ยนการ์ด"
            let rc = Math.round(Math.random())
            if (card.id != coinCard) rc = 0
            let x = (card.id + 1 + rc) % cards.value.length
            while (cards.value[x]!.id == coinCard) x = (x + 1) % cards.value.length
            cards.value[x]!.isOpened = true
        } else {
            if (card.id == coinCard) {
                coins.value += 2
                winCount++
                message.value = "เจอเหรียญ +1"
            } else {
                message.value = "!!! ตูม !!!"
            }
            winrate.value = Math.round((winCount / counter.value) * 10000) / 100
            for (const c of cards.value) c.isOpened = true
            selected.value = card.id
        }
    }
}

function reset(): void {
    if (coins.value == 0) {
        message.value = "ไม่มีเหรียญเล่นแล้ว"
        return
    }
    for (let x of cards.value) x.isOpened = false
    coinCard = Math.floor(Math.random() * cards.value.length)
    selected.value = -1
    counter.value++
    coins.value--
    message.value = "เลือกการ์ด 1 ใบ"
    const x = document.activeElement as HTMLElement
    x.blur()
}
</script>

<style lang="css" scoped>
img {
    height: 8em;
    padding: 10px;
    margin: auto;
}

img:hover {
    filter: drop-shadow(0 0 2em rgb(80, 0, 20));
}

.card:focus {
    background: white;
    color: darkred;
}

.card {
    margin: 1em;
    height: 20em;
    width: 12em;
    background: darkred;
    color: white;
    border-width: 0.2em;
    border-color: darkgrey;
    outline-color: red;
    text-align: center;
    align-items: center;
    justify-content: center;
}

.blinking {
    animation: blink 1s infinite;
}

@keyframes blink {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>
