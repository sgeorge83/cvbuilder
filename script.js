document.addEventListener("DOMContentLoaded", () => {

let jobData = {};

// ---------------------
// LOAD JOB DATA
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
// UPDATE JOB DESCRIPTIONS
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
// PROFILE IMAGE
// ---------------------
document.getElementById("profilePic").addEventListener("change", function() {
  const file = this.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = e => document.getElementById("previewPic").src = e.target.result;
  reader.readAsDataURL(file);
});

// ---------------------
// GENERATE CV PREVIEW
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
// DOWNLOAD PDF (Pi Browser safe)
// ---------------------
document.getElementById("downloadBtn").addEventListener("click", () => {
  const element = document.getElementById("cvPreview");
  html2pdf().from(element).outputPdf("bloburl").then(url => window.open(url));
});

// ---------------------
// PI AUTHENTICATION (with payments scope)
// ---------------------
let authData = null;
if(window.Pi) {
  Pi.init({ version: "2.0" });
  const scopes = ['payments'];
  Pi.authenticate(scopes, auth => {
    console.log("User authenticated:", auth);
    authData = auth;
  }, error => console.error("Authentication error:", error));
}

// ---------------------
// PI PAYMENT BUTTON
// ---------------------
document.getElementById("piPayBtn").addEventListener("click", () => {
  if(!window.Pi) {
    alert("Open this app in Pi Browser");
    return;
  }

  Pi.createPayment({
    amount: 0.01,
    memo: "CV-BUILDER test payment",
    metadata: { app: "CV-BUILDER" }
  }, {
    onReadyForServerApproval: paymentId => console.log("Approval ID:", paymentId),
    onReadyForServerCompletion: (paymentId, txid) => alert("Payment Successful"),
    onCancel: () => alert("Payment Cancelled"),
    onError: error => {
      console.error(error);
      alert("Payment Error");
    }
  });
});
