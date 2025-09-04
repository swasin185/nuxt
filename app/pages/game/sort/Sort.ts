export default abstract class Sort {
    protected arr: number[]
    private canvasId: string
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    protected swap: number = 0
    protected compare: number = 0
    private temp: number = 0
    constructor(n: number, canvasId: string) {
        this.canvasId = canvasId
        this.arr = new Array(n)
        for (let i = 0; i < this.arr.length; i++) this.arr[i] = i + 1
        for (let i = 0; i < this.arr.length; i++) {
            let x = Math.floor(Math.random() * this.arr.length)
            if (i != x) {
                let a = this.arr[i]
                this.arr[i] = this.arr[x]!
                this.arr[x] = a!
            }
        }
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D
        this.buttom = this.canvas.height - 15
        this.repaint()
    }

    private buttom = 0

    protected repaint(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (let i = 0; i < this.arr.length; i++)
            this.ctx.fillRect(20 + i * 3, this.buttom, 2, -this.arr[i]!)
        this.ctx.fillText(
            this.canvasId + " compare=" + this.compare + " swap=" + this.swap,
            5,
            this.canvas.height - 3
        )
    }

    protected async swapData(i: number, j: number) {
        this.swap++
        this.temp = this.arr[i]!
        this.arr[i] = this.arr[j]!
        this.arr[j] = this.temp
        this.repaint()
        await new Promise((r) => setTimeout(r, 10))
    }

    protected async compareData(x: number, y: number) {
        this.compare++
        await new Promise((r) => setTimeout(r, 10))
        return this.arr[x]! - this.arr[y]!
    }

    public runSort(): void {
        this.swap = 0
        this.compare = 0
    }
}
