// ======================================
// SS TEXTILE ERP V3
// COMPANY MODULE
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    loadCompanyProfile
);

// ======================================
// LOAD COMPANY
// ======================================

function loadCompanyProfile() {

    const company =
        getCompany();

    if (!company)
        return;

    setValue(
        "companyName",
        company.name
    );

    setValue(
        "companyGST",
        company.gst
    );

    setValue(
        "companyAddress",
        company.address
    );

    setValue(
        "companyEmail",
        company.email
    );

    setValue(
        "companyPhone",
        company.phone
    );

    setValue(
        "bankName",
        company.bank
    );

    setValue(
        "accountNumber",
        company.account
    );

    setValue(
        "ifscCode",
        company.ifsc
    );
}

// ======================================
// SAVE COMPANY
// ======================================

function saveCompanyProfile() {

    const company = {

        name:
            getValue(
                "companyName"
            ),

        gst:
            getValue(
                "companyGST"
            ),

        address:
            getValue(
                "companyAddress"
            ),

        email:
            getValue(
                "companyEmail"
            ),

        phone:
            getValue(
                "companyPhone"
            ),

        bank:
            getValue(
                "bankName"
            ),

        account:
            getValue(
                "accountNumber"
            ),

        ifsc:
            getValue(
                "ifscCode"
            ),

        logo:
            getLogo(),

        qr:
            getQR(),

        signature:
            getSignature()
    };

    saveCompany(company);

    alert(
        "Company profile saved successfully"
    );
}

// ======================================
// LOGO
// ======================================

function saveLogo(base64) {

    const company =
        getCompany();

    company.logo =
        base64;

    saveCompany(company);
}

function getLogo() {

    const company =
        getCompany();

    return company.logo || "";
}

// ======================================
// QR
// ======================================

function saveQR(base64) {

    const company =
        getCompany();

    company.qr =
        base64;

    saveCompany(company);
}

function getQR() {

    const company =
        getCompany();

    return company.qr || "";
}

// ======================================
// SIGNATURE
// ======================================

function saveSignature(base64) {

    const company =
        getCompany();

    company.signature =
        base64;

    saveCompany(company);
}

function getSignature() {

    const company =
        getCompany();

    return company.signature || "";
}

// ======================================
// FILE TO BASE64
// ======================================

function fileToBase64(file) {

    return new Promise(
        (resolve, reject) => {

        const reader =
            new FileReader();

        reader.onload =
            () =>
                resolve(
                    reader.result
                );

        reader.onerror =
            reject;

        reader.readAsDataURL(
            file
        );
    });
}

// ======================================
// LOGO UPLOAD
// ======================================

async function uploadLogo(file) {

    if (!file)
        return;

    const base64 =
        await fileToBase64(
            file
        );

    saveLogo(base64);

    alert(
        "Logo uploaded"
    );
}

// ======================================
// QR UPLOAD
// ======================================

async function uploadQR(file) {

    if (!file)
        return;

    const base64 =
        await fileToBase64(
            file
        );

    saveQR(base64);

    alert(
        "QR uploaded"
    );
}

// ======================================
// SIGNATURE UPLOAD
// ======================================

async function uploadSignature(file) {

    if (!file)
        return;

    const base64 =
        await fileToBase64(
            file
        );

    saveSignature(base64);

    alert(
        "Signature uploaded"
    );
}

// ======================================
// HELPERS
// ======================================

function getValue(id) {

    const el =
        document.getElementById(
            id
        );

    return el
        ? el.value.trim()
        : "";
}

function setValue(
    id,
    value
) {

    const el =
        document.getElementById(
            id
        );

    if (el)
        el.value =
            value || "";
}

// ======================================
// EXPORTS
// ======================================

window.saveCompanyProfile =
    saveCompanyProfile;

window.uploadLogo =
    uploadLogo;

window.uploadQR =
    uploadQR;

window.uploadSignature =
    uploadSignature;
