// ======================================
// SS TEXTILE ERP V3
// PDF + PRINT + SHARE
// ======================================

// ======================================
// DOWNLOAD PDF
// ======================================

function downloadInvoicePDF() {

    const invoiceArea =
        document.getElementById(
            "invoicePrintArea"
        );

    if (!invoiceArea) {

        alert(
            "Invoice preview not found"
        );

        return;
    }

    const invoiceNo =

        getField("invoiceNo")

        ||

        "invoice";

    const options = {

        margin: 5,

        filename:

            `${invoiceNo}.pdf`,

        image: {

            type: "jpeg",

            quality: 1
        },

        html2canvas: {

            scale: 2,

            useCORS: true
        },

        jsPDF: {

            unit: "mm",

            format: "a4",

            orientation:
                "portrait"
        }
    };

    html2pdf()

        .set(options)

        .from(invoiceArea)

        .save();
}

// ======================================
// PRINT
// ======================================

function printInvoice() {

    window.print();
}

// ======================================
// WHATSAPP SHARE
// ======================================

function shareOnWhatsApp() {

    const customer =
        getField(
            "customerName"
        );

    const invoiceNo =
        getField(
            "invoiceNo"
        );

    const total =
        document.getElementById(
            "grandTotal"
        )?.textContent || "";

    const message =

`Hello ${customer},

Invoice No: ${invoiceNo}

Amount: ${total}

Thank you for your business.

- SS Textile`;

    const url =

        `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(
        url,
        "_blank"
    );
}

// ======================================
// SAVE INVOICE
// ======================================

function saveCurrentInvoice() {

    if (
        invoiceItems.length === 0
    ) {

        alert(
            "Add items first"
        );

        return;
    }

    const invoice =
        buildInvoiceObject();

    saveInvoice(invoice);

    refreshDashboard();

    renderInvoiceHistory();

    alert(
        "Invoice Saved"
    );
}

// ======================================
// OPEN INVOICE
// ======================================

function openInvoice(id) {

    const invoice =
        getInvoiceById(id);

    if (!invoice)
        return;

    const area =
        document.getElementById(
            "invoicePrintArea"
        );

    area.innerHTML =

        generateInvoiceHTML(
            invoice
        );
}

// ======================================
// DELETE INVOICE
// ======================================

function deleteInvoiceRecord(id) {

    const ok = confirm(
        "Delete invoice?"
    );

    if (!ok)
        return;

    deleteInvoice(id);

    renderInvoiceHistory();

    refreshDashboard();
}

// ======================================
// HISTORY TABLE
// ======================================

function renderInvoiceHistory() {

    const tbody =
        document.querySelector(
            "#historyTable tbody"
        );

    if (!tbody)
        return;

    tbody.innerHTML = "";

    const invoices =
        getInvoices();

    invoices.forEach(invoice => {

        const row =
            document.createElement(
                "tr"
            );

        row.innerHTML = `

<td>
${invoice.invoiceNo}
</td>

<td>
${invoice.date}
</td>

<td>
${invoice.customerName}
</td>

<td>
₹${Number(
invoice.total
).toFixed(2)}
</td>

<td>

<button
onclick="openInvoice('${invoice.id}')">

View

</button>

<button
onclick="deleteInvoiceRecord('${invoice.id}')">

Delete

</button>

</td>

`;

        tbody.appendChild(
            row
        );
    });
}

// ======================================
// EXPORTS
// ======================================

window.downloadInvoicePDF =
    downloadInvoicePDF;

window.printInvoice =
    printInvoice;

window.shareOnWhatsApp =
    shareOnWhatsApp;

window.saveCurrentInvoice =
    saveCurrentInvoice;

window.renderInvoiceHistory =
    renderInvoiceHistory;

window.openInvoice =
    openInvoice;

window.deleteInvoiceRecord =
    deleteInvoiceRecord;
