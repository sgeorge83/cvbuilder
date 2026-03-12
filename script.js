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
// PI AUTHENTICATION + PAYMENT
// ---------------------
if (window.Pi) {
    Pi.init({ version: "2.0" });

    // Authenticate with payments scope
    Pi.authenticate(['payments'])
      .then(auth => {
          console.log("Authenticated with payments:", auth);
      })
      .catch(error => {
          console.error("Authentication error:", error);
      });
}

// Trigger Pi payment
function triggerPiPayment() {
    if (!window.Pi) {
        alert("Please open this app inside the Pi Browser");
        return;
    }

    const paymentData = {
        amount: 0.01,
        memo: "CV-BUILDER test payment",
        metadata: { app: "CV-BUILDER" }
    };

    const paymentCallbacks = {
        onReadyForServerApproval: paymentId => {
            console.log("Ready for server approval:", paymentId);
        },
        onReadyForServerCompletion: (paymentId, txid) => {
            console.log("Payment completed:", paymentId, txid);
            alert("Payment Successful");
        },
        onCancel: paymentId => {
            alert("Payment Cancelled");
        },
        onError: (error) => {
            console.error("Payment Error:", error);
            alert("Payment Error");
        }
    };

    Pi.createPayment(paymentData, paymentCallbacks)
        .then(payment => console.log("createPayment result:", payment))
        .catch(error => console.error("createPayment catch:", error));
}

// Attach payment function to button
document.getElementById("piPayBtn").addEventListener("click", triggerPiPayment);

});
