document.addEventListener("DOMContentLoaded", function () {

let jobData = {};


// ---------------------
// LOAD JOB DATA
// ---------------------

fetch("jobs.json")
.then(res => res.json())
.then(data => {

jobData = data;

const designationList = document.getElementById("designations");

Object.keys(jobData).forEach(job => {

const option = document.createElement("option");

option.value = job;

designationList.appendChild(option);

});

});


// ---------------------
// DESIGNATION CHANGE
// ---------------------

document.getElementById("designation").addEventListener("input", function(){

const selected = this.value;

const jobDescription = document.getElementById("jobDescription");

jobDescription.innerHTML = '<option value="">Select Job Description</option>';

if(jobData[selected]){

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

document.getElementById("profilePic").addEventListener("change", function(){

const file = this.files[0];

if(file){

const reader = new FileReader();

reader.onload = function(e){

document.getElementById("previewPic").src = e.target.result;

};

reader.readAsDataURL(file);

}

});


// ---------------------
// GENERATE CV PREVIEW
// ---------------------

document.getElementById("generateBtn").addEventListener("click", function(){

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
"Job Description: " +
document.getElementById("jobDescription").value;

});


// ---------------------
// DOWNLOAD PDF
// ---------------------

document.getElementById("downloadBtn").addEventListener("click", function(){

const element = document.getElementById("cvPreview");

html2pdf().from(element).save("CV-BUILDER.pdf");

});


// ---------------------
// PI AUTHENTICATION
// ---------------------

if(window.Pi){

Pi.init({ version: "2.0" });

Pi.authenticate([], function(auth){

console.log("User authenticated", auth);

});

}


// ---------------------
// PI PAYMENT
// ---------------------

document.getElementById("piPayBtn").addEventListener("click", function(){

if(!window.Pi){

alert("Open this app in Pi Browser");

return;

}

Pi.createPayment({

amount: 0.01,

memo: "CV-BUILDER Test Payment",

metadata: { app: "CV-BUILDER" }

},

{

onReadyForServerApproval: function(paymentId){

console.log(paymentId);

},

onReadyForServerCompletion: function(paymentId, txid){

alert("Payment Successful");

},

onCancel: function(){

alert("Payment Cancelled");

},

onError: function(error){

console.error(error);

alert("Payment Error");

}

});

});

});
