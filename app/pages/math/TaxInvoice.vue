<template>
    <UCard>
        <UTable
            ref="inv"
            :data="invoices"
            :columns="columns"
            @select="onSelectInv"
            class="w-[600px] h-[200px]"
        />
        <hr />
        <UTable
            ref="invitem"
            :data="invoice.items"
            :columns="itemColumns"
            @select="onSelectItem"
            class="w-[600px] h-[200px]"
        />
        <template #footer
            >{{ invoices.length }} records ราคารวม VAT?
            <USwitch v-model="invoice.incVAT" @change="calculateInv(invoice)" />
        </template>
    </UCard>
</template>

<script lang="ts" setup>
useHead({
    title: "Invoice",
})

import type { TableColumn, TableRow } from "@nuxt/ui"
import { ref, onMounted } from "vue"
import { Invoice, InvItem, calculateInv } from "~/shared/Invoice"

const invoices = ref<Invoice[]>([])
const invoice = ref<Invoice>(new Invoice())
const invitem = ref<InvItem>()

onMounted(async () => {
    $fetch<Invoice[]>("/api/invoice")
        .then((result) => {
            invoices.value = result
            for (let inv of invoices.value!) calculateInv(inv)
            invoice.value = invoices.value![0]!
            console.log("fetch Invoices ", invoices.value.length)
        })
        .catch((error) => {
            console.error("Failed to fetch invoices:", error)
        })
})

const table = useTemplateRef("inv")
const tableItems = useTemplateRef("invitem")
const columns: TableColumn<Invoice>[] = [
    // {
    //   id: 'select',
    //   cell: ({ row }) =>
    //     h(UCheckbox, {
    //       modelValue: row.getIsSelected(),
    //       'onUpdate:modelValue': (value: boolean | 'indeterminate') => {
    //         table.value!.tableApi.toggleAllRowsSelected(false)
    //         row.toggleSelected(true)
    //       }
    //     })
    // },
    {
        accessorKey: "invNr",
        header: "#",
        cell: ({ row }) => `#${row.getValue("invNr")}`,
    },
    {
        accessorKey: "invDate",
        header: "Date",
        cell: ({ row }) => {
            return new Date(row.getValue("invDate")).toString()
        },
    },
    {
        accessorKey: "customer",
        header: "Customer",
        cell: ({ row }) => {
            return row.getValue("customer")
        },
    },
    {
        accessorKey: "incVAT",
        header: "incVAT",
    },
    {
        accessorKey: "itemAmt",
        header: () => h("div", { class: "text-right" }, "itemAmt"),
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue("itemAmt"))
            const formatted = new Intl.NumberFormat("th-TH", {
                minimumFractionDigits: 2,
            }).format(amount)
            return h("div", { class: "text-right font-medium" }, formatted)
        },
    },
    {
        accessorKey: "vatAmt",
        header: () => h("div", { class: "text-right" }, "vatAmt"),
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue("vatAmt"))
            const formatted = new Intl.NumberFormat("th-TH", {
                minimumFractionDigits: 2,
            }).format(amount)

            return h("div", { class: "text-right font-medium" }, formatted)
        },
    },
    {
        accessorKey: "totalAmt",
        header: () => h("div", { class: "text-right" }, "totalAmt"),
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue("totalAmt"))
            const formatted = new Intl.NumberFormat("th-TH", {
                minimumFractionDigits: 2,
            }).format(amount)

            return h("div", { class: "text-right font-medium" }, formatted)
        },
    },
]

const itemColumns: TableColumn<InvItem>[] = [
    // {
    //   id: 'select',
    //   header: ({ table }) =>
    //     h(UCheckbox, {
    //       modelValue: table.getIsSomePageRowsSelected()
    //         ? 'indeterminate'
    //         : table.getIsAllPageRowsSelected(),
    //       'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
    //         table.toggleAllPageRowsSelected(!!value)
    //     }),
    //   cell: ({ row }) =>
    //     h(UCheckbox, {
    //       modelValue: row.getIsSelected(),
    //       'onUpdate:modelValue': (value: boolean | 'indeterminate') => {
    //         tableItems.value!.tableApi.toggleAllRowsSelected(false)
    //         row.toggleSelected(!!value)
    //       }
    //     })
    // },
    {
        accessorKey: "name",
        header: "name",
        cell: ({ row }) => row.getValue("name"),
    },
    {
        accessorKey: "qty",
        header: () => h("div", { class: "text-right" }, "Qty"),
        cell: ({ row }) => {
            return h("div", { class: "text-right font-medium" }, row.getValue("qty"))
        },
    },
    {
        accessorKey: "discount",
        header: () => h("div", { class: "text-right" }, "discount"),
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue("discount"))
            const formatted = new Intl.NumberFormat("th-TH", {
                minimumFractionDigits: 2,
            }).format(amount)

            return h("div", { class: "text-right font-medium" }, formatted)
        },
    },
    {
        accessorKey: "total",
        header: () => h("div", { class: "text-right" }, "total"),
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue("total"))
            const formatted = new Intl.NumberFormat("th-TH", {
                minimumFractionDigits: 2,
            }).format(amount)

            return h("div", { class: "text-right font-medium" }, formatted)
        },
    },
]

function onSelectInv(row: TableRow<Invoice>, e?: Event) {
    table.value!.tableApi.toggleAllRowsSelected(false)
    row.toggleSelected(true)
    invoice.value = invoices.value[row.index]!
}

function onSelectItem(row: TableRow<InvItem>, e?: Event) {
    tableItems.value!.tableApi.toggleAllRowsSelected(false)
    row.toggleSelected(true)
    invitem.value = invoice.value.items[row.index]!
}
</script>
