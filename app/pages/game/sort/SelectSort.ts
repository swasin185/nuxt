import Sort from "./Sort"
export default class SelectSort extends Sort {
    public constructor(n: number, canvasId: string) {
        super(n, canvasId)
    }

    public override async runSort() {
        super.runSort()
        let x: any = -1
        for (let i = this.arr.length - 1; i > 0; i--) {
            let max = i
            for (let j = 0; j < i; j++) {
                x = await this.compareData(max, j)
                if (x < 0) max = j
            }
            // this.compare++;
            x = await this.compareData(i, max)
            if (x < 0) await super.swapData(i, max)
        }
    }
}
