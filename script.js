document.addEventListener("DOMContentLoaded", () => {

  // ---------------------------
  // Load job data
  // ---------------------------
  let jobData = {};

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


  // ---------------------------
  // Update job descriptions
  // ---------------------------
  document.getElementById("designation").addEventListener("input", function () {

    const jobDescription = document.getElementById("jobDescription");
    jobDescription.innerHTML = '<option value="">Select Job Description</option>';

    const selected = this.value;

    if (jobData[selected]) {
      jobData[selected].forEach(desc => {
        const option = document.createElement("option");
        option.value = desc;
        option.textContent = desc;
        jobDescription.appendChild(option);
      });
    }

  });


  // ---------------------------
  // Profile image preview
  // ---------------------------
  document.getElementById("profilePic").addEventListener("change", function () {

    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = e => {
      document.getElementById("previewPic").src = e.target.result;
    };

    reader.readAsDataURL(file);

  });


  // ---------------------------
  // Generate CV Preview
  // ---------------------------
  document.getElementById("generateBtn").addEventListener("click", () => {

    document.getElementById("previewName").textContent =
      document.getElementById("fullName").value;

    document.getElementById("previewDOB").textContent =
      "DOB: " + document.getElementById("dob").value;

    document.getElementById("previewNationality").textContent =
      "Nationality: " + document.getElementById("nationality").value;

    document.getElementById("previewPassport").textContent =
      "Passport: " +
      document.getElementById("passportNumber").value +
      " | Exp: " +
      document.getElementById("passportExpiry").value;

    document.getElementById("previewVisa").textContent =
      "Visa: " +
      document.getElementById("visaStatus").value +
      " | Exp: " +
      document.getElementById("visaExpiry").value;

    document.getElementById("previewDesignation").textContent =
      "Designation: " +
      document.getElementById("designation").value;

    document.getElementById("previewJobDescription").textContent =
      "Job: " +
      document.getElementById("jobDescription").value;

  });


  // ---------------------------
  // Download PDF
  // ---------------------------
  document.getElementById("downloadBtn").addEventListener("click", () => {

    const element = document.getElementById("cvPreview");

    html2pdf().from(element).save("CV-BUILDER.pdf");

  });


  // ---------------------------
  // Pi Payment
  // ---------------------------
  const payBtn = document.getElementById("piPayBtn");

  payBtn.addEventListener("click", () => {

    if (!window.Pi) {
      alert("Open this app inside Pi Browser");
      return;
    }

    Pi.init({ version: "2.0" });

    Pi.createPayment(
      {
        amount: 0.01,
        memo: "CV-BUILDER Test Payment",
        metadata: { app: "CV-BUILDER" }
      },
      {
        onReadyForServerApproval: paymentId => {
          console.log(paymentId);
        },

        onReadyForServerCompletion: (paymentId, txid) => {
          alert("Payment Successful");
        },

        onCancel: () => {
          alert("Payment Cancelled");
        },

        onError: err => {
          console.error(err);
          alert("Payment Error");
        }
      }
    );

  });

});
