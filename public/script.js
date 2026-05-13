Pi.init({ version: "2.0" });

let currentUser = null;

Pi.authenticate(['payments'])
.then(auth => {
    currentUser = auth.user;
    console.log("Authenticated user:", currentUser);
})
.catch(error => {
    console.error("Pi Authentication failed:", error);
});

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
});

document.getElementById("designation").addEventListener("input", function(){
    const selected = this.value;
    const selects = [
        document.getElementById("jobDescription1"),
        document.getElementById("jobDescription2"),
        document.getElementById("jobDescription3")
    ];
    selects.forEach(select => {
        select.innerHTML = "";
        if(jobData[selected]){
            jobData[selected].forEach(desc => {
                const option = document.createElement("option");
                option.value = desc;
                option.textContent = desc;
                select.appendChild(option);
            });
        }
    });
});

document.getElementById("profilePic").addEventListener("change", function(){
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function(e){
        document.getElementById("previewPic").src = e.target.result;
    };
    reader.readAsDataURL(file);
});

document.getElementById("generateBtn").addEventListener("click", function(){
    document.getElementById("previewName").innerText = document.getElementById("fullName").value;
    document.getElementById("previewDesignation").innerText = document.getElementById("designation").value;
    document.getElementById("previewDOB").innerText = document.getElementById("dob").value;
    document.getElementById("previewNationality").innerText = document.getElementById("nationality").value;
    document.getElementById("previewPassport").innerText =
        document.getElementById("passportNumber").value + " Exp " + document.getElementById("passportExpiry").value;
    document.getElementById("previewVisa").innerText =
        document.getElementById("visaStatus").value + " Exp " + document.getElementById("visaExpiry").value;

    let responsibilities = [];
    responsibilities.push(document.getElementById("jobDescription1").value);
    responsibilities.push(document.getElementById("jobDescription2").value);
    responsibilities.push(document.getElementById("jobDescription3").value);
    let extra = document.getElementById("extraResponsibilities").value;
    if(extra.trim()!="") responsibilities.push(extra);

    const list = document.getElementById("previewResponsibilities");
    list.innerHTML = "";
    responsibilities.forEach(item => {
        if(item){
            let li = document.createElement("li");
            li.innerText = item;
            list.appendChild(li);
        }
    });

    document.getElementById("previewEducation").innerText = document.getElementById("education").value;
    document.getElementById("previewExperience").innerText = document.getElementById("experience").value;
    document.getElementById("previewSkills").innerText = document.getElementById("skills").value;
    document.getElementById("previewLanguages").innerText = document.getElementById("languages").value;

    document.getElementById("downloadImageBtn").disabled = true; // download remains disabled until payment
});

document.getElementById("downloadImageBtn").addEventListener("click", function(){
    html2canvas(document.getElementById("cvPreview"), { scale: 2 })
    .then(canvas => {
        const link = document.createElement("a");
        link.download = "UAE-CV.png";
        link.href = canvas.toDataURL();
        link.click();
    });
});

document.getElementById("piPayBtn").addEventListener("click", function(){
    if(!currentUser){
        alert("Please authenticate in Pi Browser first.");
        return;
    }
    const paymentData = {
        amount: 0.01,
        memo: "UAE CV Builder Payment",
        metadata: { product: "CV-BUILDER" }
    };
    const callbacks = {
        onReadyForServerApproval: function(paymentId){
            console.log("Payment approval ready:", paymentId);
        },
        onReadyForServerCompletion: function(paymentId, txid){
            alert("Payment Successful! Download unlocked.");
            document.getElementById("downloadImageBtn").disabled = false;
        },
        onCancel: function(paymentId){
            console.log("Payment cancelled:", paymentId);
        },
        onError: function(error){
            console.error("Payment error:", error);
        }
    };
    Pi.createPayment(paymentData, callbacks);
});
