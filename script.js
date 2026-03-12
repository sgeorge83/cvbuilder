// -----------------------------
// PI NETWORK INITIALIZATION
// -----------------------------

Pi.init({ version: "2.0" });

let authData = null;

Pi.authenticate([], function(auth) {
    console.log("User authenticated");
    authData = auth;
});


// -----------------------------
// LOAD JOB DATA
// -----------------------------

let jobData = {};

fetch('jobs.json')
.then(response => response.json())
.then(data => {

    jobData = data;

    const designationList = document.getElementById("designations");

    for (let title in jobData) {

        const option = document.createElement("option");

        option.value = title;

        designationList.appendChild(option);

    }

});


// -----------------------------
// UPDATE JOB DESCRIPTIONS
// -----------------------------

document.getElementById("designation").addEventListener("input", function(){

    const jobDescriptionSelect = document.getElementById("jobDescription");

    jobDescriptionSelect.innerHTML = '<option value="">Select Job Description</option>';

    const selected = this.value.trim();

    if(jobData[selected]){

        jobData[selected].forEach(function(desc){

            const option = document.createElement("option");

            option.value = desc;

            option.textContent = desc;

            jobDescriptionSelect.appendChild(option);

        });

    } else if(selected !== ""){

        const option = document.createElement("option");

        option.value = "";

        option.textContent = "Enter your own job description";

        jobDescriptionSelect.appendChild(option);

    }

});


// -----------------------------
// PROFILE PHOTO UPLOAD
// -----------------------------

const profileInput = document.getElementById("profilePic");

profileInput.addEventListener("change", function(){

    const file = this.files[0];

    if(file){

        const reader = new FileReader();

        reader.onload = function(e){

            document.getElementById("previewPic").src = e.target.result;

        };

        reader.readAsDataURL(file);

    }

});


// -----------------------------
// GENERATE CV PREVIEW
// -----------------------------

document.getElementById("generateBtn").addEventListener("click", function(){

    const fullName = document.getElementById("fullName").value;

    const dob = document.getElementById("dob").value;

    const nationality = document.getElementById("nationality").value;

    const passportNumber = document.getElementById("passportNumber").value;

    const passportExpiry = document.getElementById("passportExpiry").value;

    const visaStatus = document.getElementById("visaStatus").value;

    const visaExpiry = document.getElementById("visaExpiry").value;

    const designation = document.getElementById("designation").value;

    let jobDescription = document.getElementById("jobDescription").value;


    if(jobDescription === ""){

        jobDescription = prompt("Please enter your job description:");

    }

    document.getElementById("previewName").textContent = fullName;

    document.getElementById("previewDOB").textContent = "DOB: " + dob;

    document.getElementById("previewNationality").textContent = "Nationality: " + nationality;

    document.getElementById("previewPassport").textContent =
        "Passport No: " + passportNumber + " | Expiry: " + passportExpiry;

    document.getElementById("previewVisa").textContent =
        "Visa Status: " + visaStatus + " | Expiry: " + visaExpiry;

    document.getElementById("previewDesignation").textContent =
        "Designation: " + designation;

    document.getElementById("previewJobDescription").textContent =
        "Job Description: " + jobDescription;

});


// -----------------------------
// DOWNLOAD PDF
// -----------------------------

document.getElementById("downloadBtn").addEventListener("click", function(){

    const element = document.getElementById("cvPreview");

    html2pdf().from(element).save("CV-BUILDER.pdf");

});


// -----------------------------
// PI PAYMENT TEST
// -----------------------------

document.getElementById("piPayBtn").addEventListener("click", function(){

    Pi.createPayment({

        amount: 0.1,

        memo: "CV-BUILDER Test Payment",

        metadata: {
            app: "CV-BUILDER"
        }

    },

    {

        onReadyForServerApproval: function(paymentId){

            console.log("Ready for server approval", paymentId);

        },

        onReadyForServerCompletion: function(paymentId, txid){

            console.log("Ready for server completion", paymentId, txid);

            alert("Payment Successful!");

        },

        onCancel: function(paymentId){

            alert("Payment Cancelled");

        },

        onError: function(error){

            console.error(error);

            alert("Payment Error");

        }

    });

});
