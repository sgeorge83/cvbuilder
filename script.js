document.addEventListener("DOMContentLoaded", () => {

let jobData = {};

// ---------------------
// Load jobs.json
// ---------------------
fetch("jobs.json")
.then(res => res.json())
.then(data => {
    jobData = data;
    const datalist = document.getElementById("designations");
    Object.keys(jobData).forEach(job => {
        const option = document.createElement("option");
        option.value = job;
        datalist.appendChild(option);
    });
})
.catch(err => console.error("jobs.json error:", err));

// ---------------------
// Update job descriptions dynamically
// ---------------------
document.getElementById("designation").addEventListener("input", function() {
    const selected = this.value;
    const jobDescription = document.getElementById("jobDescription");
    jobDescription.innerHTML = '<option value="">Select Job Description</option>';
    if(jobData[selected]) {
        jobData[selected].forEach(desc => {
            const option = document.createElement("option");
            option.value = desc;
            option.textContent = desc;
            jobDescription.appendChild(option);
        });
    }
});

// ---------------------
// Profile photo preview
// ---------------------
document.getElementById("profilePic").addEventListener("change", function() {
    const file = this.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = e => document.getElementById("previewPic").src = e.target.result;
    reader.readAsDataURL(file);
});

// ---------------------
// Generate CV Preview
// ---------------------
document.getElementById("generateBtn").addEventListener("click", () => {
    document.getElementById("previewName").textContent = document.getElementById("fullName").value;
    document.getElementById("previewDOB").textContent = "DOB: " + document.getElementById("dob").value;
    document.getElementById("previewNationality").textContent = "Nationality: " + document.getElementById("nationality").value;
    document.getElementById("previewPassport").textContent =
        "Passport: " + document.getElementById("passportNumber").value +
        " | Exp: " + document.getElementById("passportExpiry").value;
    document.getElementById("previewVisa").textContent =
        "Visa: " + document.getElementById("visaStatus").value +
        " | Exp: " + document.getElementById("visaExpiry").value;
    document.getElementById("previewDesignation").textContent = "Designation: " + document.getElementById("designation").value;
    document.getElementById("previewJobDescription").textContent = "Job Description: " + document.getElementById("jobDescription").value;
});

// ---------------------
// Download CV as Image
// ---------------------
document.getElementById("downloadImageBtn").addEventListener("click", () => {
    const cv = document.getElementById("cvPreview");
    html2canvas(cv).then(canvas => {
        canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "CV-BUILDER.png";
            a.click();
            URL.revokeObjectURL(url);
        });
    });
});

// ---------------------
// Pi Payment
// ---------------------
if(window.Pi) {
    Pi.init({ version: "2.0" });
    Pi.authenticate(['payments'], auth => console.log("Authenticated:", auth), err => console.error(err));
}

document.getElementById("piPayBtn").addEventListener("click", () => {
    if(!window.Pi) { alert("Open this app in Pi Browser"); return; }

    Pi.createPayment({
        amount: 0.01,
        memo: "CV-BUILDER Test Payment",
        metadata: { app: "CV-BUILDER" }
    }, {
        onReadyForServerApproval: paymentId => console.log("Approval ID:", paymentId),
        onReadyForServerCompletion: (paymentId, txid) => alert("Payment Successful"),
        onCancel: () => alert("Payment Cancelled"),
        onError: err => { console.error(err); alert("Payment Error"); }
    });
});

});
