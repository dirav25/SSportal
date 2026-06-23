// ======================================
// SS TEXTILE ERP V3
// MAIN APPLICATION
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    initApp
);

// ======================================
// INIT
// ======================================

function initApp() {

    setupDefaults();

    bindEvents();

    refreshDashboard();

    renderInvoiceHistory();

    loadCompanyProfile();
}

// ======================================
// DEFAULT VALUES
// ======================================

function setupDefaults() {

    const invoiceNoBox =
        document.getElementById(
            "invoiceNo"
        );

    if (
        invoiceNoBox &&
        !invoiceNoBox.value
    ) {

        invoiceNoBox.value =
            generateInvoiceNumber();
    }

    const dateBox =
        document.getElementById(
            "invoiceDate"
        );

    if (
        dateBox &&
        !dateBox.value
    ) {

        dateBox.value =
            new Date()
            .toISOString()
            .split("T")[0];
    }

    const dueDateBox =
        document.getElementById(
            "dueDate"
        );

    if (
        dueDateBox &&
        !dueDateBox.value
    ) {

        const d =
            new Date();

        d.setDate(
            d.getDate() + 15
        );

        dueDateBox.value =
            d.toISOString()
            .split("T")[0];
    }
}

// ======================================
// EVENTS
// ======================================

function bindEvents() {

    // Company

    document
    .getElementById(
        "saveCompanyBtn"
    )
    ?.addEventListener(
        "click",
        saveCompanyProfile
    );

    // Customer

    document
    .getElementById(
        "saveCustomerBtn"
    )
    ?.addEventListener(
        "click",
        saveCurrentCustomer
    );

    // Items

    document
    .getElementById(
        "addItemBtn"
    )
    ?.addEventListener(
        "click",
        addInvoiceItem
    );

    // Invoice

    document
    .getElementById(
        "saveInvoiceBtn"
    )
    ?.addEventListener(
        "click",
        saveCurrentInvoice
    );

    document
    .getElementById(
        "pdfInvoiceBtn"
    )
    ?.addEventListener(
        "click",
        downloadInvoicePDF
    );

    document
    .getElementById(
        "printInvoiceBtn"
    )
    ?.addEventListener(
        "click",
        printInvoice
    );

    document
    .getElementById(
        "whatsappBtn"
    )
    ?.addEventListener(
        "click",
        shareOnWhatsApp
    );

    document
    .getElementById(
        "newInvoiceBtn"
    )
    ?.addEventListener(
        "click",
        createNewInvoice
    );

    // Backup

    document
    .getElementById(
        "backupBtn"
    )
    ?.addEventListener(
        "click",
        createBackup
    );

    // Restore

    document
    .getElementById(
        "restoreBtn"
    )
    ?.addEventListener(
        "click",
        handleRestore
    );
}

// ======================================
// DASHBOARD
// ======================================

function refreshDashboard() {

    const stats =
        getDashboardStats();

    setDashboardValue(
        "totalSalesCard",
        formatINR(
            stats.totalSales
        )
    );

    setDashboardValue(
        "totalInvoicesCard",
        stats.totalInvoices
    );

    setDashboardValue(
        "totalCustomersCard",
        stats.totalCustomers
    );

    setDashboardValue(
        "totalGSTCard",
        formatINR(
            stats.totalGST
        )
    );
}

function setDashboardValue(
    id,
    value
) {

    const el =
        document.getElementById(
            id
        );

    if (el)
        el.textContent =
            value;
}

// ======================================
// NEW INVOICE
// ======================================

function createNewInvoice() {

    clearInvoiceForm();

    setTimeout(() => {

        document.getElementById(
            "invoiceDate"
        ).value =

            new Date()
            .toISOString()
            .split("T")[0];

    }, 50);

    alert(
        "New Invoice Ready"
    );
}

// ======================================
// RESTORE
// ======================================

function handleRestore() {

    const input =
        document.createElement(
            "input"
        );

    input.type = "file";

    input.accept =
        ".json";

    input.onchange =
        async (event) => {

        const file =
            event.target.files[0];

        if (!file)
            return;

        try {

            await restoreBackup(
                file
            );

            alert(
                "Backup Restored"
            );

            location.reload();

        } catch (error) {

            console.error(
                error
            );

            alert(
                "Invalid Backup File"
            );
        }
    };

    input.click();
}

// ======================================
// INR FORMAT
// ======================================

function formatINR(value) {

    return new Intl.NumberFormat(

        "en-IN",

        {

            style:
                "currency",

            currency:
                "INR",

            maximumFractionDigits:
                2

        }

    ).format(
        value || 0
    );
}

// ======================================
// AUTO REFRESH PREVIEW
// ======================================

setInterval(() => {

    try {

        if (
            typeof previewInvoice
            === "function"
        ) {

            previewInvoice();
        }

    } catch (e) {

        console.log(e);
    }

}, 2000);

// ======================================
// KEYBOARD SHORTCUTS
// ======================================

document.addEventListener(
    "keydown",
    function(e){

    // Ctrl + S

    if (
        e.ctrlKey &&
        e.key === "s"
    ) {

        e.preventDefault();

        saveCurrentInvoice();
    }

    // Ctrl + P

    if (
        e.ctrlKey &&
        e.key === "p"
    ) {

        e.preventDefault();

        printInvoice();
    }

    // Ctrl + D

    if (
        e.ctrlKey &&
        e.key === "d"
    ) {

        e.preventDefault();

        downloadInvoicePDF();
    }

});
