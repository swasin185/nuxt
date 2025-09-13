export default class LongDivision {
    private dividend: number
    private divisor: number
    private decimal: String
    private quotient: number
    private repeatPoint: number
    private remainderList: number[]
    private gcd: number

    constructor(dividend: number, divisor: number) {
        console.time("LongDivision")
        this.dividend = dividend
        this.divisor = divisor
        this.quotient = Math.floor(dividend / divisor)
        let remainder = dividend % divisor
        let output = []
        this.remainderList = remainder == 0 ? [] : [remainder]
        this.repeatPoint = 0
        for (let point = 1; remainder != 0 && this.repeatPoint == 0; point++) {
            // console.log(remainder, this.repeatPoint, this.remainderList)
            this.remainderList.push(remainder)
            remainder *= 10
            output.push(Math.floor(remainder / divisor))
            remainder %= divisor
            if (remainder != 0)
                for (let i = 0; i < point && this.repeatPoint == 0; i++)
                    if (this.remainderList[i] == remainder) this.repeatPoint = i + 1
        }
        this.decimal = output.join("")
        this.gcd = this.getGcd()
        console.timeEnd("LongDivision")
    }

    public getRemainderList(): number[] {
        return this.remainderList
    }

    public getRepeatPoint(): number {
        return this.repeatPoint
    }

    public getDecimalLength(): number {
        return this.decimal.length
    }

    public getQuotient(): number {
        return this.quotient
    }

    public toString() {
        if (this.decimal.length == 0) return this.quotient
        else return this.quotient + "." + this.decimal
    }

    private getGcd(): number {
        let a = this.dividend
        let b = this.divisor
        let gcd = b
        if (b > a) {
            b = a
            a = gcd
            gcd = b
        }
        while (b != 0) {
            gcd = a % b
            a = b
            b = gcd
        }
        return a
    }
}

// const n = 20
// const result = new LongDivision(51, 97);
// console.log(result.toString());
// console.log(result.getDecimalLength());
// console.log(result.getRepeatPoint());
// console.log(result.getRemainderList());
