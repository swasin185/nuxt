import Big from 'big.js'
import fx from 'fs'
import BinaryArray from './BinaryArray'

export default class Prime {
    public static fileName = 'prime.txt'
    public static ZERO = new Big(0)
    public static ONE = new Big(1)

    private static primeArray: Big[] = [Big(2), Big(3), Big(5), Big(7), Big(11), Big(13), Big(17), Big(19), Big(23)]
    private static n: number = Prime.primeArray.length

    static {
        try {
            console.time('get primes')
            useStorage('redis').getItem('primes').then((primes) => {
                if (primes) {
                    const p = primes as string[]
                    Prime.primeArray = new Array(p.length)
                    for (let i = 0; i < p.length; i++) {
                        Prime.primeArray[i] = new Big(p[i])
                    }
                    Prime.n = Prime.primeArray.length
                } else {
                    Prime.createPrimeArray('100')
                }
                console.timeEnd('get primes') 
                // console.log(Prime.primeArray)
            })
        } catch (err) {
            console.log('Redis data Error!', err)
        }
    }

    public static getPrimes() {
        return Prime.primeArray.slice(0, Prime.n)
    }

    public static searchMaxPrime(x: Big): number {
        let found = -1
        if (x.gt(1) && x.lte(Prime.getLastPrime())) {
            let hi = Prime.n - 1
            if (x.lte(Prime.primeArray[hi])) {
                let lo = 0
                let mid = 0
                while (lo <= hi && found === -1) {
                    // Binary Search
                    mid = Math.floor((hi + lo) / 2)
                    if (x.eq(Prime.primeArray[mid])) {
                        found = mid
                    } else if (x.lt(Prime.primeArray[mid])) {
                        hi = mid - 1
                    } else {
                        lo = mid + 1
                    }
                }
                if (found === -1) {
                    if (hi < mid) found = hi
                    else found = mid
                }
            }
        } else {
            found = Prime.n - 1
        }
        return found
    }

    public static searchPrime(x: Big): boolean {
        return Prime.primeArray[Prime.searchMaxPrime(x)].eq(x)
    }

    public static findDivisor(x: Big): Big {
        let divisor = Prime.ONE
        if (!Prime.searchPrime(x)) {
            // if not prime find divisor
            const sqrt: Big = x.sqrt()
            Prime.createPrimeArray(sqrt.toString())
            let i = 0
            divisor = Prime.primeArray[i]
            while (i < Prime.n && divisor.lt(sqrt) && !x.mod(divisor).eq(0)) {
                divisor = Prime.primeArray[++i]
            }
            if (i >= Prime.n || divisor.gt(sqrt)) {
                divisor = Prime.ONE
            }
        }
        return divisor
    }

    public static isPrime(s: string): boolean {
        return this.findDivisor(new Big(s)).eq(1)
    }

    public static getPrime(i: number): Big {
        return Prime.primeArray[i]
    }

    public static getLastPrime() {
        return Prime.primeArray[Prime.n - 1]
    }

    public static getLength(): number {
        return Prime.n
    }

    private static diffArray: number[]
    private static diffFile = 'primegap.txt'
    public static gapHistogram() {
        console.log('Prime Gap')
        Prime.diffArray = new Array(Prime.n)
        let diff = 0
        Prime.diffArray[0] = 0
        for (let i = 1; i < Prime.n; i++) {
            diff = Prime.primeArray[i].sub(Prime.primeArray[i - 1]).toNumber()
            diff = Math.floor(diff / 2)
            Prime.diffArray[i] = diff
        }
        console.log(Prime.diffArray)
        let data: string = ''
        for (let i = 0; i < Prime.n; i++) {
            data += Prime.diffArray[i].toFixed() + '\n'
        }
        fx.writeFileSync(Prime.diffFile, data, 'utf-8')
        console.log('save to prime gap file')
    }

    public static createPrimeArrayCount(n: number) {
        console.time('create prime')
        let lp = Prime.getLastPrime()
        while (Prime.getLength() < n) {
            lp = lp.add(2)
            this.createPrimeArray(lp.toFixed())
        }
        console.timeEnd('create prime')
    }

    private static extendArray() {
        const extend = new Array(Math.ceil(Prime.n / 2))
        Prime.primeArray.push(...extend)
        console.log('Extend array size = ', Prime.primeArray.length)
    }

    public static createPrimeArray(x: string) {
        const bx: Big = new Big(x)
        let lp: Big = Prime.getLastPrime()
        while (lp.lt(bx)) {
            lp = lp.add(2)
            if (Prime.findDivisor(lp).eq(Prime.ONE)) {
                if (Prime.primeArray.length === Prime.n) {
                    if (Prime.n < 9999) // prevent storage overflow
                        useStorage('redis').setItem('primes', Prime.primeArray)
                    // console.log('update primes redis', Prime.n)
                    Prime.extendArray()
                }
                Prime.primeArray[Prime.n++] = lp
                if (Prime.n % 100 === 0) {
                    console.log('primes count to', Prime.n)
                }
            }
        }
    }

    public static conjGoldbach(n: string): string[] {
        const n2 = new Big(n)
        if (n2.mod(2).eq(1) || n2.eq(2)) return []
        if (n2.eq(4)) return ['2']
        let len = 0
        const goldbach: string[] = new Array(1)
        const half = n2.div(2)
        const lp = Prime.searchMaxPrime(n2.minus(2))
        let y = 1
        let result: Big
        for (let i = lp; Prime.primeArray[i].gte(half); i--) {
            result = n2.minus(Prime.primeArray[i]) // คำนวณคู่บวก จากผลลบ
            while (result.gt(Prime.primeArray[y])) y++ // หา prime ถัดไปที่ไม่น้อยกว่าผลลบ
            if (result.eq(Prime.primeArray[y])) {
                // ถ้าผลลบ == prime เก็บผลลัพธ์
                goldbach[len++] = Prime.primeArray[i].toString()
                y++
            }
        }
        return goldbach
    }

    public static sumReciprocal(n: number): number {
        if (n > Prime.getLength()) Prime.createPrimeArrayCount(n)
        const lp = Prime.primeArray[n - 1]
        const n2 = lp.mul(lp)
        let sum = Prime.ZERO
        const barr = new BinaryArray(n)
        let x: Big = Prime.ONE
        while (barr.next()) {
            x = Prime.ONE
            for (let i = 0; i < n && x.lte(n2); i++) if (barr.isExists(i)) x = x.mul(Prime.primeArray[i])
            if (x.lte(n2)) {
                x = n2.div(x).sub(0.5).round()
                if (barr.count() % 2 === 0) sum = sum.sub(x)
                else sum = sum.add(x)
            } else barr.fillRemainBits()
        }
        let count: Big = n2.sub(sum).add(n).sub(1)
        console.log('sum of reciprocal', n, 'prime=', Prime.getPrime(n-1), 'prime^2=', n2.toString(), 'count=', count)
        return count.toNumber()
    }

    /*
     * Legendre's Formula
     * Binary permutaion & Inclusive/Exclusive Set & Floor function
     * count(prime <= x) = x - set of divisor + set of (prime <= root(x)) - 1 (one is not prime)
     */
    public static primeCount(n: number): number {
        if (n > Prime.getLength()) Prime.createPrimeArrayCount(n)
        console.time('prime counting function')
        const barr = new BinaryArray(n)
        const pn = Prime.primeArray[n - 1].toNumber()
        const x = pn * pn
        let sum = 0
        let c = 1
        let k = 0
        while (barr.next()) {
            c = 1
            for (let i = 0; i < n && c <= x; i++) {
                if (barr.isExists(i)) {
                    c *= Prime.primeArray[i].toNumber()
                }
            }
            if (c <= x) {
                k++
                c = Math.floor(x / c)
                if (barr.count() % 2 == 0)
                    // -1 power count
                    sum -= c
                else sum += c
            } else {
                barr.fillRemainBits()
            }
        }
        const primeCount = x - sum + n - 1
        console.log('prime count =', primeCount, 'under', x)
        console.timeEnd('prime counting function')

        return primeCount
    }
}
