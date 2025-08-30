import { Invoice, InvItem } from "@/shared/Invoice"

const invoices: Invoice[] = [
    new Invoice(1, new Date('2020-08-26'), 'Tom', true, 0, [
        new InvItem(1, 1, 'Sandwich Hamcheese', 1, 12, 0),
        new InvItem(2, 1, 'MEJI Milk Cafe S', 1, 12, 0),
        new InvItem(3, 1, 'Monfuer Water', 2, 12, 0)
    ]),
    new Invoice(2, new Date('2020-08-27'), 'CFour', true, 0, [
        new InvItem(4, 2, 'Sun Snack Original', 1, 9, 0),
        new InvItem(5, 2, 'SCOTT carepop', 4, 15, 0),
        new InvItem(6, 2, 'NESCAFE Co Brew', 3, 12, 0),
        new InvItem(7, 2, 'CORN', 2, 20, 0)
    ]),
    new Invoice(3, new Date('2020-08-28'), 'Tae', true, 0, [
        new InvItem(8, 2, 'MEJI Milk L', 1, 27.5, 0),
        new InvItem(9, 2, 'PureLife Water', 4, 12.5, 0),
        new InvItem(10, 2, 'MAMA Pig', 3, 7.5, 0),
        new InvItem(10, 2, 'BANANA', 3, 9, 0),
        new InvItem(11, 2, 'Sun Sanck Original', 2, 12, 0)
    ])
]

export default eventHandler(async () => {
    return invoices;
})
