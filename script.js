// Load job data
let jobData = {};
fetch('jobs.json')
    .then(response => response.json())
    .then(data => {
        jobData = data;
        const designationList = document.getElementById('designations');
        for (let title in jobData) {
            const option = document.createElement('option');
            option.value = title;
            designationList.appendChild(option);
        }
    });

// Update job descriptions based on designation
document.getElementById('designation').addEventListener('input', function() {
    const jobDescriptionSelect = document.getElementById('jobDescription');
    jobDescriptionSelect.innerHTML = '<option value="">Select Job Description</option>';
    const selected = this.value.trim();

    if (jobData[selected]) {
        // Predefined job descriptions
        jobData[selected].forEach(desc => {
            const option = document.createElement('option');
            option.value = desc;
            option.textContent = desc;
            jobDescriptionSelect.appendChild(option);
        });
    } else if (selected !== "") {
        // Allow user to enter custom job description
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Enter your own job description';
        jobDescriptionSelect.appendChild(option);
    }
});

// Preview and image upload
const profileInput = document.getElementById('profilePic');
profileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('previewPic').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// Generate preview
document.getElementById('generateBtn').addEventListener('click', function() {
    const fullName = document.getElementById('fullName').value;
    const dob = document.getElementById('dob').value;
    const nationality = document.getElementById('nationality').value;
    const passportNumber = document.getElementById('passportNumber').value;
    const passportExpiry = document.getElementById('passportExpiry').value;
    const visaStatus = document.getElementById('visaStatus').value;
    const visaExpiry = document.getElementById('visaExpiry').value;
    const designation = document.getElementById('designation').value;
    let jobDescription = document.getElementById('jobDescription').value;

    // If jobDescription is empty, allow user input
    if (jobDescription === '') {
        jobDescription = prompt("Please enter your job description:");
    }

    document.getElementById('previewName').textContent = fullName;
    document.getElementById('previewDOB').textContent = 'DOB: ' + dob;
    document.getElementById('previewNationality').textContent = 'Nationality: ' + nationality;
    document.getElementById('previewPassport').textContent = 'Passport No: ' + passportNumber + ', Expiry: ' + passportExpiry;
    document.getElementById('previewVisa').textContent = 'Visa Status: ' + visaStatus + ', Expiry: ' + visaExpiry;
    document.getElementById('previewDesignation').textContent = 'Designation: ' + designation;
    document.getElementById('previewJobDescription').textContent = 'Job Description: ' + jobDescription;
});

// Download PDF
document.getElementById('downloadBtn').addEventListener('click', function() {
    const element = document.getElementById('cvPreview');
    html2pdf().from(element).save('UAE_CV.pdf');
});