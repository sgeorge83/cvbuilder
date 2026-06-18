let jobData = {};
let downloadUnlocked = false;

const formError = document.getElementById("formError");
const draftStatus = document.getElementById("draftStatus");
const downloadPngBtn = document.getElementById("downloadPngBtn");
const downloadPdfBtn = document.getElementById("downloadPdfBtn");
const devUnlockBtn = document.getElementById("devUnlockBtn");

function showError(message) {
  formError.textContent = message;
  formError.hidden = !message;
}

function setDownloadButtons(enabled) {
  downloadUnlocked = enabled;
  downloadPngBtn.disabled = !enabled;
  downloadPdfBtn.disabled = !enabled;
}

function validateForm() {
  const name = document.getElementById("fullName").value.trim();
  const dob = document.getElementById("dob").value;
  const designation = document.getElementById("designation").value.trim();

  if (!name) {
    showError(t("validationName"));
    document.getElementById("fullName").focus();
    return false;
  }
  if (!dob) {
    showError(t("validationDob"));
    document.getElementById("dob").focus();
    return false;
  }
  if (!designation) {
    showError(t("validationDesignation"));
    document.getElementById("designation").focus();
    return false;
  }
  showError("");
  return true;
}

function formatDate(value) {
  if (!value) return "—";
  try {
    return new Date(value + "T00:00:00").toLocaleDateString(
      currentLang === "hi" ? "hi-IN" : "en-GB",
      { day: "numeric", month: "short", year: "numeric" }
    );
  } catch {
    return value;
  }
}

function populateJobSelects(designation) {
  const selects = [
    document.getElementById("jobDescription1"),
    document.getElementById("jobDescription2"),
    document.getElementById("jobDescription3")
  ];
  const descriptions = jobData[designation] || [];

  selects.forEach((select, index) => {
    const current = select.value;
    select.innerHTML = "";
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = `${t("selectResponsibility")} ${index + 1}`;
    select.appendChild(placeholder);

    descriptions.forEach((desc) => {
      const option = document.createElement("option");
      option.value = desc;
      option.textContent = desc;
      select.appendChild(option);
    });

    if (current && descriptions.includes(current)) {
      select.value = current;
    }
  });
}

function generatePreview() {
  if (!validateForm()) return;

  document.getElementById("previewName").textContent =
    document.getElementById("fullName").value.trim();
  document.getElementById("previewDesignation").textContent =
    document.getElementById("designation").value.trim();
  document.getElementById("previewDOB").textContent = formatDate(
    document.getElementById("dob").value
  );
  document.getElementById("previewNationality").textContent =
    document.getElementById("nationality").value.trim() || "—";

  const passportNum = document.getElementById("passportNumber").value.trim();
  const passportExp = document.getElementById("passportExpiry").value;
  document.getElementById("previewPassport").textContent = passportNum
    ? `${passportNum} (${t("exp")} ${formatDate(passportExp)})`
    : "—";

  const visaStatus = document.getElementById("visaStatus").value.trim();
  const visaExp = document.getElementById("visaExpiry").value;
  document.getElementById("previewVisa").textContent = visaStatus
    ? `${visaStatus} (${t("exp")} ${formatDate(visaExp)})`
    : "—";

  const responsibilities = [
    document.getElementById("jobDescription1").value,
    document.getElementById("jobDescription2").value,
    document.getElementById("jobDescription3").value
  ];
  const extra = document.getElementById("extraResponsibilities").value.trim();
  if (extra) responsibilities.push(extra);

  const list = document.getElementById("previewResponsibilities");
  list.innerHTML = "";
  responsibilities.filter(Boolean).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });

  document.getElementById("previewEducation").textContent =
    document.getElementById("education").value.trim() || "—";
  document.getElementById("previewExperience").textContent =
    document.getElementById("experience").value.trim() || "—";
  document.getElementById("previewSkills").textContent =
    document.getElementById("skills").value.trim() || "—";
  document.getElementById("previewLanguages").textContent =
    document.getElementById("languages").value.trim() || "—";

  saveDraft();
  draftStatus.textContent = t("draftSaved");

  if (!downloadUnlocked) {
    setDownloadButtons(false);
  }

  document.getElementById("cvPreview").scrollIntoView({ behavior: "smooth", block: "start" });
}

function loadJobs() {
  return fetch("data/jobs.json")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load jobs");
      return res.json();
    })
    .then((data) => {
      jobData = data;
      const datalist = document.getElementById("designations");
      Object.keys(jobData).sort().forEach((job) => {
        const option = document.createElement("option");
        option.value = job;
        datalist.appendChild(option);
      });
      const designation = document.getElementById("designation").value;
      if (designation) populateJobSelects(designation);
    })
    .catch((err) => {
      console.error(err);
      showError("Could not load job descriptions. Check your connection.");
    });
}

function initApp() {
  applyTranslations();

  document.getElementById("langToggle").addEventListener("click", () => {
    setLanguage(currentLang === "en" ? "hi" : "en");
    const designation = document.getElementById("designation").value;
    if (designation) populateJobSelects(designation);
  });

  document.getElementById("designation").addEventListener("input", (e) => {
    populateJobSelects(e.target.value);
  });

  document.getElementById("profilePic").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      document.getElementById("previewPic").src = ev.target.result;
      saveDraft();
    };
    reader.readAsDataURL(file);
  });

  document.getElementById("generateBtn").addEventListener("click", generatePreview);

  document.getElementById("piPayBtn").addEventListener("click", () => {
    if (!validateForm()) return;
    generatePreview();
    createPiPayment(
      () => {
        setDownloadButtons(true);
        alert(t("paymentSuccess"));
      },
      (err) => {
        const key = err.message;
        if (key === "piAuthRequired") alert(t("piAuthRequired"));
        else if (key === "paymentCancelled") alert(t("paymentCancelled"));
        else alert(t("paymentError"));
      }
    );
  });

  devUnlockBtn.addEventListener("click", () => {
    if (devUnlockDownloads()) {
      setDownloadButtons(true);
      devUnlockBtn.textContent = "✓ " + t("downloadPngBtn").replace("Download ", "");
    }
  });

  downloadPngBtn.addEventListener("click", () => {
    if (!downloadUnlocked) return;
    downloadPng().catch((e) => console.error(e));
  });

  downloadPdfBtn.addEventListener("click", () => {
    if (!downloadUnlocked) return;
    downloadPdf().catch((e) => console.error(e));
  });

  document.getElementById("clearDraftBtn").addEventListener("click", () => {
    clearDraft();
    document.getElementById("cvForm").reset();
    document.getElementById("previewPic").removeAttribute("src");
    [
      "previewName",
      "previewDesignation",
      "previewDOB",
      "previewNationality",
      "previewPassport",
      "previewVisa",
      "previewEducation",
      "previewExperience",
      "previewSkills",
      "previewLanguages"
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = "";
    });
    document.getElementById("previewResponsibilities").innerHTML = "";
    draftStatus.textContent = "";
    setDownloadButtons(false);
    setDownloadUnlocked(false);
  });

  setupAutoSave(() => {
    draftStatus.textContent = t("draftSaved");
  });

  if (loadDraft()) {
    draftStatus.textContent = t("draftSaved");
  }

  if (isDownloadUnlocked()) {
    setDownloadButtons(true);
  }

  if (isPiBrowser()) {
    devUnlockBtn.style.display = "none";
  }

  loadJobs();
  initPiAuth();
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}

document.addEventListener("DOMContentLoaded", initApp);
