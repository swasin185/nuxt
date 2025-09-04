import { onScopeDispose } from "vue"

export class Invoice {
    static VAT = 0.07
    static IncVAT = around(1 + Invoice.VAT)
    invNr: number
    invDate: Date
    customer: string
    incVAT: boolean
    couponAmt: number
    itemAmt: number = 0
    vatAmt: number = 0
    totalAmt: number = 0
    items: InvItem[]

    constructor(
        invNr: number = 0,
        invDate: Date = new Date(),
        customer: string = "",
        incVAT: boolean = false,
        couponAmt: number = 0,
        items: InvItem[] = []
    ) {
        this.invNr = invNr
        this.invDate = invDate
        this.customer = customer
        this.incVAT = incVAT
        this.couponAmt = couponAmt
        this.items = items
    }
    // public toString(): string {
    //     let attributes = Object.entries(this)
    //         .map(([key, value]) => `${key}: ${value}`)
    //         .join(', ')
    //     return attributes
    // }
}

export class InvItem {
    itemNr: number
    invNr: number
    name: string
    qty: number
    price: number
    discount: number
    total: number

    constructor(
        itemNr: number,
        invNr: number,
        name: string,
        qty: number,
        price: number,
        discount: number
    ) {
        this.itemNr = itemNr
        this.invNr = invNr
        this.name = name
        this.qty = qty
        this.price = price
        this.discount = discount
        this.total = 0
    }
}

export function around(n: number): number {
    return parseFloat(n.toFixed(2))
}

export function calculateInv(invoice: Invoice): void {
    invoice.itemAmt = 0
    for (let it of invoice.items) {
        it.total = around((it.qty * it.price * (100 - it.discount)) / 100)
        invoice.itemAmt += it.total
    }
    invoice.itemAmt += invoice.couponAmt
    invoice.itemAmt = around(invoice.itemAmt)
    if (invoice.incVAT) {
        invoice.totalAmt = invoice.itemAmt
        invoice.itemAmt = around(invoice.totalAmt / Invoice.IncVAT)
        invoice.vatAmt = around(invoice.totalAmt - invoice.itemAmt)
    } else {
        invoice.vatAmt = around(invoice.itemAmt * Invoice.VAT)
        invoice.totalAmt = around(invoice.itemAmt + invoice.vatAmt)
    }
}
