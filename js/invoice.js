// ======================================
// SS TEXTILE ERP V3
// INVOICE CORE ENGINE
// ======================================

let invoiceItems = [];

// ======================================
// ADD ITEM
// ======================================

function addInvoiceItem() {

    const description =
        getField("itemDescription");

    const hsn =
        getField("itemHSN");

    const qty =
        Number(
            getField("itemQty")
        );

    const rate =
        Number(
            getField("itemRate")
        );

    const gst =
        Number(
            document.getElementById(
                "itemGST"
            ).value
        );

    if (
        !description ||
        qty <= 0 ||
        rate <= 0
    ) {

        alert(
            "Enter valid item details"
        );

        return;
    }

    const taxableValue =
        qty * rate;

    const gstAmount =
        taxableValue *
        gst /
        100;

    const total =
        taxableValue +
        gstAmount;

    const item = {

        id:
            Date.now()
            .toString(),

        description,

        hsn,

        qty,

        rate,

        gst,

        taxableValue,

        gstAmount,

        total
    };

    invoiceItems.push(item);

    renderItemsTable();

    updateTotalsUI();

    clearItemForm();
}

// ======================================
// REMOVE ITEM
// ======================================

function removeInvoiceItem(id) {

    invoiceItems =
        invoiceItems.filter(

            item =>
                item.id !== id

        );

    renderItemsTable();

    updateTotalsUI();
}

// ======================================
// CLEAR ITEM FORM
// ======================================

function clearItemForm() {

    setField(
        "itemDescription",
        ""
    );

    setField(
        "itemHSN",
        ""
    );

    setField(
        "itemQty",
        ""
    );

    setField(
        "itemRate",
        ""
    );
}

// ======================================
// TABLE RENDER
// ======================================

function renderItemsTable() {

    const tbody =
        document.querySelector(
            "#itemsTable tbody"
        );

    if (!tbody)
        return;

    tbody.innerHTML = "";

    invoiceItems.forEach(

        (item,index) => {

        const row =
            document.createElement(
                "tr"
            );

        row.innerHTML = `

        <td>
        ${index+1}
        </td>

        <td>
        ${item.description}
        </td>

        <td>
        ${item.hsn}
        </td>

        <td>
        ${item.qty}
        </td>

        <td>
        ₹${item.rate.toFixed(2)}
        </td>

        <td>
        ₹${item.total.toFixed(2)}
        </td>

        <td>

        <button
        onclick="removeInvoiceItem('${item.id}')">

        Delete

        </button>

        </td>

        `;

        tbody.appendChild(row);

    });
}

// ======================================
// TOTALS
// ======================================

function calculateTotals() {

    let subtotal = 0;

    let totalGST = 0;

    invoiceItems.forEach(item => {

        subtotal +=
            item.taxableValue;

        totalGST +=
            item.gstAmount;
    });

    const cgst =
        totalGST / 2;

    const sgst =
        totalGST / 2;

    const grandTotal =
        subtotal +
        totalGST;

    return {

        subtotal,

        totalGST,

        cgst,

        sgst,

        igst: 0,

        grandTotal
    };
}

// ======================================
// UPDATE SUMMARY UI
// ======================================

function updateTotalsUI() {

    const totals =
        calculateTotals();

    setText(
        "subtotal",

        formatMoney(
            totals.subtotal
        )
    );

    setText(
        "cgst",

        formatMoney(
            totals.cgst
        )
    );

    setText(
        "sgst",

        formatMoney(
            totals.sgst
        )
    );

    setText(
        "grandTotal",

        formatMoney(
            totals.grandTotal
        )
    );
}

// ======================================
// BUILD INVOICE
// ======================================

function buildInvoiceObject() {

    const totals =
        calculateTotals();

    return {

        id:
            Date.now()
            .toString(),

        invoiceNo:
            getField(
                "invoiceNo"
            ),

        date:
            getField(
                "invoiceDate"
            ),

        dueDate:
            getField(
                "dueDate"
            ),

        challanNo:
            getField(
                "challanNo"
            ),

        ewayBillNo:
            getField(
                "ewayBillNo"
            ),

        paymentTerms:
            getField(
                "paymentTerms"
            ),

        deliveryType:
            getField(
                "deliveryType"
            ),

        customerName:
            getField(
                "customerName"
            ),

        customerMobile:
            getField(
                "customerMobile"
            ),

        customerGST:
            getField(
                "customerGST"
            ),

        customerAddress:
            getField(
                "customerAddress"
            ),

        items:
            [...invoiceItems],

        subtotal:
            totals.subtotal,

        cgst:
            totals.cgst,

        sgst:
            totals.sgst,

        igst:
            totals.igst,

        total:
            totals.grandTotal,

        status:
            "UNPAID",

        createdAt:
            new Date()
            .toISOString()
    };
}

// ======================================
// NEW INVOICE
// ======================================

function clearInvoiceForm() {

    invoiceItems = [];

    renderItemsTable();

    updateTotalsUI();

    setField(
        "customerName",
        ""
    );

    setField(
        "customerMobile",
        ""
    );

    setField(
        "customerGST",
        ""
    );

    setField(
        "customerAddress",
        ""
    );

    setField(
        "invoiceNo",

        generateInvoiceNumber()
    );
}

// ======================================
// HELPERS
// ======================================

function getField(id) {

    const el =
        document.getElementById(id);

    return el
        ? el.value.trim()
        : "";
}

function setField(id,value) {

    const el =
        document.getElementById(id);

    if(el)
        el.value = value;
}

function setText(id,value) {

    const el =
        document.getElementById(id);

    if(el)
        el.textContent = value;
}

function formatMoney(value) {

    return new Intl.NumberFormat(

        "en-IN",

        {
            style:"currency",
            currency:"INR"
        }

    ).format(value || 0);
}

// ======================================
// EXPORTS
// ======================================

window.addInvoiceItem =
    addInvoiceItem;

window.removeInvoiceItem =
    removeInvoiceItem;

window.buildInvoiceObject =
    buildInvoiceObject;

window.clearInvoiceForm =
    clearInvoiceForm;
// ======================================
// AMOUNT IN WORDS
// ======================================

function numberToWords(num) {

    const ones = [
        "", "One", "Two", "Three", "Four",
        "Five", "Six", "Seven", "Eight",
        "Nine", "Ten", "Eleven", "Twelve",
        "Thirteen", "Fourteen", "Fifteen",
        "Sixteen", "Seventeen", "Eighteen",
        "Nineteen"
    ];

    const tens = [
        "", "", "Twenty", "Thirty",
        "Forty", "Fifty", "Sixty",
        "Seventy", "Eighty", "Ninety"
    ];

    function convert(n) {

        if (n < 20)
            return ones[n];

        if (n < 100)
            return tens[Math.floor(n / 10)] +
            " " +
            ones[n % 10];

        if (n < 1000)
            return ones[Math.floor(n / 100)] +
            " Hundred " +
            convert(n % 100);

        if (n < 100000)
            return convert(Math.floor(n / 1000)) +
            " Thousand " +
            convert(n % 1000);

        if (n < 10000000)
            return convert(Math.floor(n / 100000)) +
            " Lakh " +
            convert(n % 100000);

        return convert(Math.floor(n / 10000000)) +
            " Crore " +
            convert(n % 10000000);
    }

    return (
        convert(
            Math.round(num)
        ) +
        " Rupees Only"
    );
}

// ======================================
// INVOICE HTML
// ======================================

function generateInvoiceHTML(invoice) {

    const company =
        getCompany();

    const logo =
        company.logo
        ? `<img src="${company.logo}" class="invoice-logo">`
        : "";

    const qr =
        company.qr
        ? `<img src="${company.qr}" class="qr-image">`
        : "";

    const sign =
        company.signature
        ? `<img src="${company.signature}" class="signature-image">`
        : "";

    const itemRows =
        invoice.items.map(
        (item,index)=>{

        return `

        <tr>

        <td>${index+1}</td>

        <td>
        ${item.description}
        </td>

        <td>
        ${item.hsn}
        </td>

        <td>
        ${item.qty}
        </td>

        <td>
        ₹${item.rate.toFixed(2)}
        </td>

        <td>
        ${item.gst}%
        </td>

        <td>
        ₹${item.total.toFixed(2)}
        </td>

        </tr>

        `;

    }).join("");

    return `

<div class="invoice-page">

<!-- HEADER -->

<div class="invoice-header">

<div>

${logo}

<div class="invoice-company">

${company.name || "SS TEXTILE"}

</div>

<div>

GSTIN :
${company.gst || "-"}

</div>

<div>

${company.address || ""}

</div>

<div>

${company.email || ""}

</div>

<div>

${company.phone || ""}

</div>

</div>

<div style="text-align:right">

<div class="invoice-badge">

TAX INVOICE

</div>

<br>

<b>
Invoice No:
</b>

${invoice.invoiceNo}

<br>

<b>
Date:
</b>

${invoice.date}

<br>

<b>
Due:
</b>

${invoice.dueDate}

<br>

<b>
Status:
</b>

${invoice.status}

</div>

</div>

<!-- CUSTOMER -->

<div class="invoice-section">

<div class="invoice-row">

<div class="invoice-left">

<h4>
Bill To
</h4>

<br>

<b>
${invoice.customerName}
</b>

<br>

${invoice.customerAddress}

<br>

Mobile:
${invoice.customerMobile}

<br>

GST:
${invoice.customerGST || "N/A"}

</div>

<div class="invoice-right">

<b>
Delivery Challan
</b>

<br>

${invoice.challanNo || "-"}

<br><br>

<b>
E-Way Bill
</b>

<br>

${invoice.ewayBillNo || "-"}

<br><br>

<b>
Payment Terms
</b>

<br>

${invoice.paymentTerms}

</div>

</div>

</div>

<!-- ITEMS -->

<table class="invoice-table">

<thead>

<tr>

<th>#</th>
<th>Description</th>
<th>HSN</th>
<th>Qty</th>
<th>Rate</th>
<th>GST</th>
<th>Amount</th>

</tr>

</thead>

<tbody>

${itemRows}

</tbody>

</table>

<!-- TOTAL -->

<div class="invoice-summary">

<div class="invoice-summary-row">

<span>
Taxable Value
</span>

<span>
₹${invoice.subtotal.toFixed(2)}
</span>

</div>

<div class="invoice-summary-row">

<span>
CGST
</span>

<span>
₹${invoice.cgst.toFixed(2)}
</span>

</div>

<div class="invoice-summary-row">

<span>
SGST
</span>

<span>
₹${invoice.sgst.toFixed(2)}
</span>

</div>

<div class="invoice-total">

<span>
TOTAL
</span>

<span>
₹${invoice.total.toFixed(2)}
</span>

</div>

</div>

<!-- WORDS -->

<div class="amount-words">

<b>
Amount In Words
</b>

<br><br>

${numberToWords(
invoice.total
)}

</div>

<!-- FOOTER -->

<div class="invoice-footer">

<div class="invoice-bank">

<h4>
Bank Details
</h4>

<br>

Bank:
${company.bank || "-"}

<br>

Account:
${company.account || "-"}

<br>

IFSC:
${company.ifsc || "-"}

<br><br>

${qr}

</div>

<div class="invoice-sign">

${sign}

<div class="sign-space"></div>

<b>
Authorized Signatory
</b>

</div>

</div>

<div class="invoice-declaration">

<b>
Declaration
</b>

<br><br>

We declare that this invoice
shows the actual price of the
goods described and all
particulars are true and correct.

</div>

</div>

`;
}

// ======================================
// PREVIEW
// ======================================

function previewInvoice() {

    if (
        invoiceItems.length === 0
    ) {
        return;
    }

    const invoice =
        buildInvoiceObject();

    const area =
        document.getElementById(
            "invoicePrintArea"
        );

    if (!area)
        return;

    area.innerHTML =
        generateInvoiceHTML(
            invoice
        );
}

// ======================================
// AUTO PREVIEW
// ======================================

setInterval(
    previewInvoice,
    1500
);

// ======================================
// EXPORTS
// ======================================

window.generateInvoiceHTML =
    generateInvoiceHTML;

window.numberToWords =
    numberToWords;

window.previewInvoice =
    previewInvoice;

