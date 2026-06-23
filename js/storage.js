// ======================================
// SS TEXTILE ERP V3
// STORAGE LAYER
// ======================================

// Storage Keys

const STORAGE_KEYS = {

    COMPANY: "ss_company",

    CUSTOMERS: "ss_customers",

    INVOICES: "ss_invoices"

};

// ======================================
// COMPANY
// ======================================

function saveCompany(company) {

    localStorage.setItem(
        STORAGE_KEYS.COMPANY,
        JSON.stringify(company)
    );
}

function getCompany() {

    return JSON.parse(

        localStorage.getItem(
            STORAGE_KEYS.COMPANY
        )

    ) || {};
}

// ======================================
// CUSTOMERS
// ======================================

function getCustomers() {

    return JSON.parse(

        localStorage.getItem(
            STORAGE_KEYS.CUSTOMERS
        )

    ) || [];
}

function saveCustomer(customer) {

    const customers =
        getCustomers();

    customers.unshift({

        id:
            Date.now()
            .toString(),

        ...customer

    });

    localStorage.setItem(

        STORAGE_KEYS.CUSTOMERS,

        JSON.stringify(customers)

    );
}

function deleteCustomer(id) {

    const customers =
        getCustomers().filter(

            customer =>
                customer.id !== id

        );

    localStorage.setItem(

        STORAGE_KEYS.CUSTOMERS,

        JSON.stringify(customers)

    );
}

// ======================================
// INVOICES
// ======================================

function getInvoices() {

    return JSON.parse(

        localStorage.getItem(
            STORAGE_KEYS.INVOICES
        )

    ) || [];
}

function saveInvoice(invoice) {

    const invoices =
        getInvoices();

    invoices.unshift(invoice);

    localStorage.setItem(

        STORAGE_KEYS.INVOICES,

        JSON.stringify(invoices)

    );
}

function getInvoiceById(id) {

    return getInvoices().find(

        invoice =>
            invoice.id === id

    );
}

function deleteInvoice(id) {

    const invoices =
        getInvoices().filter(

            invoice =>
                invoice.id !== id

        );

    localStorage.setItem(

        STORAGE_KEYS.INVOICES,

        JSON.stringify(invoices)

    );
}

// ======================================
// DASHBOARD
// ======================================

function getDashboardStats() {

    const invoices =
        getInvoices();

    const customers =
        getCustomers();

    let totalSales = 0;

    let totalGST = 0;

    invoices.forEach(invoice => {

        totalSales +=
            Number(invoice.total || 0);

        totalGST +=
            Number(invoice.cgst || 0) +
            Number(invoice.sgst || 0) +
            Number(invoice.igst || 0);
    });

    return {

        totalInvoices:
            invoices.length,

        totalCustomers:
            customers.length,

        totalSales,

        totalGST

    };
}

// ======================================
// INVOICE NUMBER
// ======================================

function generateInvoiceNumber() {

    const invoices =
        getInvoices();

    const nextNumber =
        invoices.length + 1;

    return `SST-${String(nextNumber)
        .padStart(5, "0")}`;
}

// ======================================
// BACKUP
// ======================================

function createBackup() {

    const backup = {

        company:
            getCompany(),

        customers:
            getCustomers(),

        invoices:
            getInvoices(),

        exportedAt:
            new Date()
            .toISOString()
    };

    const blob = new Blob(

        [
            JSON.stringify(
                backup,
                null,
                2
            )
        ],

        {
            type:
                "application/json"
        }

    );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =

        `ss-textile-backup-${Date.now()}.json`;

    document.body.appendChild(
        link
    );

    link.click();

    document.body.removeChild(
        link
    );

    URL.revokeObjectURL(url);
}

// ======================================
// RESTORE
// ======================================

async function restoreBackup(file) {

    const text =
        await file.text();

    const backup =
        JSON.parse(text);

    if (backup.company) {

        localStorage.setItem(

            STORAGE_KEYS.COMPANY,

            JSON.stringify(
                backup.company
            )
        );
    }

    if (backup.customers) {

        localStorage.setItem(

            STORAGE_KEYS.CUSTOMERS,

            JSON.stringify(
                backup.customers
            )
        );
    }

    if (backup.invoices) {

        localStorage.setItem(

            STORAGE_KEYS.INVOICES,

            JSON.stringify(
                backup.invoices
            )
        );
    }

    return true;
}

// ======================================
// SEARCH
// ======================================

function searchInvoices(keyword) {

    keyword =
        keyword
        .toLowerCase();

    return getInvoices().filter(
        invoice =>

            (invoice.invoiceNo || "")
            .toLowerCase()
            .includes(keyword)

            ||

            (invoice.customerName || "")
            .toLowerCase()
            .includes(keyword)

            ||

            (invoice.customerMobile || "")
            .toLowerCase()
            .includes(keyword)
    );
}

// ======================================
// RESET
// ======================================

function resetDatabase() {

    const ok =
        confirm(

            "Delete all ERP data?"

        );

    if (!ok)
        return;

    localStorage.removeItem(
        STORAGE_KEYS.COMPANY
    );

    localStorage.removeItem(
        STORAGE_KEYS.CUSTOMERS
    );

    localStorage.removeItem(
        STORAGE_KEYS.INVOICES
    );

    location.reload();
}
