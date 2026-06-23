// ======================================
// SS TEXTILE ERP V3
// CUSTOMER MODULE
// ======================================

// ======================================
// SAVE CURRENT CUSTOMER
// ======================================

function saveCurrentCustomer() {

    const customer = {

        id:
            Date.now()
            .toString(),

        name:
            getCustomerValue(
                "customerName"
            ),

        mobile:
            getCustomerValue(
                "customerMobile"
            ),

        gst:
            getCustomerValue(
                "customerGST"
            ),

        address:
            getCustomerValue(
                "customerAddress"
            ),

        createdAt:
            new Date()
            .toISOString()
    };

    if (!customer.name) {

        alert(
            "Customer name required"
        );

        return;
    }

    const exists =
        getCustomers().find(

            c =>
                c.mobile ===
                customer.mobile

        );

    if (!exists) {

        saveCustomer(customer);

    }

    alert(
        "Customer saved successfully"
    );

    renderCustomerDropdown();
}

// ======================================
// GET FIELD
// ======================================

function getCustomerValue(id) {

    const el =
        document.getElementById(id);

    return el
        ? el.value.trim()
        : "";
}

// ======================================
// LOAD CUSTOMER
// ======================================

function fillCustomerForm(customer) {

    if (!customer)
        return;

    setCustomerValue(
        "customerName",
        customer.name
    );

    setCustomerValue(
        "customerMobile",
        customer.mobile
    );

    setCustomerValue(
        "customerGST",
        customer.gst
    );

    setCustomerValue(
        "customerAddress",
        customer.address
    );
}

// ======================================
// SET FIELD
// ======================================

function setCustomerValue(
    id,
    value
) {

    const el =
        document.getElementById(id);

    if (el)
        el.value =
            value || "";
}

// ======================================
// SEARCH CUSTOMER
// ======================================

function searchCustomer(keyword) {

    keyword =
        keyword
        .toLowerCase()
        .trim();

    return getCustomers().filter(

        customer =>

            (customer.name || "")
            .toLowerCase()
            .includes(keyword)

            ||

            (customer.mobile || "")
            .toLowerCase()
            .includes(keyword)

            ||

            (customer.gst || "")
            .toLowerCase()
            .includes(keyword)
    );
}

// ======================================
// FIND BY MOBILE
// ======================================

function findCustomerByMobile(
    mobile
) {

    return getCustomers().find(

        customer =>
            customer.mobile ===
            mobile
    );
}

// ======================================
// AUTO FILL
// ======================================

function autoFillCustomer() {

    const mobile =
        getCustomerValue(
            "customerMobile"
        );

    if (
        !mobile ||
        mobile.length < 5
    )
        return;

    const customer =
        findCustomerByMobile(
            mobile
        );

    if (customer) {

        fillCustomerForm(
            customer
        );
    }
}

// ======================================
// DELETE CUSTOMER
// ======================================

function removeCustomer(id) {

    const ok =
        confirm(
            "Delete customer?"
        );

    if (!ok)
        return;

    deleteCustomer(id);

    renderCustomerDropdown();
}

// ======================================
// RECENT CUSTOMER DROPDOWN
// ======================================

function renderCustomerDropdown() {

    const select =
        document.getElementById(
            "customerSelect"
        );

    if (!select)
        return;

    const customers =
        getCustomers();

    select.innerHTML =
        `<option value="">
        Select Customer
        </option>`;

    customers.forEach(customer => {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            customer.id;

        option.textContent =
            `${customer.name} (${customer.mobile})`;

        select.appendChild(
            option
        );
    });
}

// ======================================
// SELECT CUSTOMER
// ======================================

function loadSelectedCustomer() {

    const select =
        document.getElementById(
            "customerSelect"
        );

    if (!select)
        return;

    const id =
        select.value;

    const customer =
        getCustomers().find(

            c =>
                c.id === id
        );

    fillCustomerForm(
        customer
    );
}

// ======================================
// INIT
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

    renderCustomerDropdown();

    const mobileBox =
        document.getElementById(
            "customerMobile"
        );

    if (mobileBox) {

        mobileBox.addEventListener(

            "keyup",

            autoFillCustomer
        );
    }

    const select =
        document.getElementById(
            "customerSelect"
        );

    if (select) {

        select.addEventListener(

            "change",

            loadSelectedCustomer
        );
    }
});

// ======================================
// EXPORTS
// ======================================

window.saveCurrentCustomer =
    saveCurrentCustomer;

window.loadSelectedCustomer =
    loadSelectedCustomer;

window.removeCustomer =
    removeCustomer;

window.searchCustomer =
    searchCustomer;
