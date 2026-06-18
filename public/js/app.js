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

function canDownload() {
  return downloadUnlocked || isDownloadUnlocked();
}

function setDownloadButtons(enabled) {
  downloadUnlocked = enabled;
  if (enabled) setDownloadUnlocked(true);
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
    return new Date(value + "T00:00:00").toLocaleDateString(getDateLocale(), {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  } catch {
    return value;
  }
}

function hasContent(value) {
  return Boolean(value && value.trim() && value.trim() !== "—");
}

function toggleSection(sectionId, visible) {
  const el = document.getElementById(sectionId);
  if (el) el.classList.toggle("is-hidden", !visible);
}

function renderTags(containerId, text, soft) {
  const container = document.getElementById(containerId);
  if (!container) return false;

  container.innerHTML = "";
  if (!hasContent(text)) return false;

  const items = text
    .split(/[,;\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (!items.length) {
    const span = document.createElement("span");
    span.className = "cv-prose";
    span.textContent = text.trim();
    container.appendChild(span);
    return true;
  }

  items.forEach((item) => {
    const tag = document.createElement("span");
    tag.className = "cv-tag";
    tag.textContent = item;
    container.appendChild(tag);
  });

  if (soft) container.classList.add("cv-tags--soft");
  return true;
}

function setProse(id, text) {
  const el = document.getElementById(id);
  const value = text.trim() || "—";
  el.textContent = value;
  return hasContent(value);
}

function updatePhotoWrap() {
  const pic = document.getElementById("previewPic");
  const wrap = document.getElementById("previewPhotoWrap");
  const hasPhoto = pic && pic.src && pic.src.startsWith("data:");
  if (wrap) wrap.classList.toggle("is-empty", !hasPhoto);
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
  if (!validateForm()) return false;

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
  const respItems = responsibilities.filter(Boolean);
  respItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
  toggleSection("sectionResponsibilities", respItems.length > 0);

  const hasExperience = setProse(
    "previewExperience",
    document.getElementById("experience").value
  );
  toggleSection("sectionExperience", hasExperience);

  const hasEducation = setProse(
    "previewEducation",
    document.getElementById("education").value
  );
  toggleSection("sectionEducation", hasEducation);

  const hasSkills = renderTags("previewSkills", document.getElementById("skills").value);
  toggleSection("sectionSkills", hasSkills);

  const hasLanguages = renderTags(
    "previewLanguages",
    document.getElementById("languages").value,
    true
  );
  toggleSection("sectionLanguages", hasLanguages);

  updatePhotoWrap();
  saveDraft();
  draftStatus.textContent = t("draftSaved");

  if (!canDownload()) {
    setDownloadButtons(false);
  }

  document.getElementById("cvPreview").scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

function runExport(exportFn, button) {
  if (!canDownload()) return;
  if (!validateForm()) return;
  if (!generatePreview()) return;

  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = t("exportPreparing");

  exportFn()
    .catch(() => {
      alert(t("exportFailed"));
    })
    .finally(() => {
      button.disabled = !canDownload();
      button.textContent = originalText;
    });
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

  document.getElementById("langSelect").addEventListener("change", (e) => {
    setLanguage(e.target.value);
    const designation = document.getElementById("designation").value;
    if (designation) populateJobSelects(designation);
    if (document.getElementById("previewName").textContent) generatePreview();
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
      updatePhotoWrap();
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
      devUnlockBtn.textContent = "✓ " + t("downloadUnlocked");
    }
  });

  downloadPngBtn.addEventListener("click", () => {
    runExport(downloadPng, downloadPngBtn);
  });

  downloadPdfBtn.addEventListener("click", () => {
    runExport(downloadPdf, downloadPdfBtn);
  });

  document.getElementById("clearDraftBtn").addEventListener("click", () => {
    clearDraft();
    document.getElementById("cvForm").reset();
    document.getElementById("previewPic").removeAttribute("src");
    updatePhotoWrap();
    [
      "previewName",
      "previewDesignation",
      "previewDOB",
      "previewNationality",
      "previewPassport",
      "previewVisa"
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = "";
    });
    document.getElementById("previewResponsibilities").innerHTML = "";
    document.getElementById("previewSkills").innerHTML = "";
    document.getElementById("previewLanguages").innerHTML = "";
    ["previewExperience", "previewEducation"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = "";
    });
    [
      "sectionResponsibilities",
      "sectionExperience",
      "sectionEducation",
      "sectionSkills",
      "sectionLanguages"
    ].forEach((id) => toggleSection(id, false));
    draftStatus.textContent = "";
    document.getElementById("exportStatus").textContent = "";
    setDownloadButtons(false);
    setDownloadUnlocked(false);
  });

  setupAutoSave(() => {
    draftStatus.textContent = t("draftSaved");
  });

  if (loadDraft()) {
    draftStatus.textContent = t("draftSaved");
    updatePhotoWrap();
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
