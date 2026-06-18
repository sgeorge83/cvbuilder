const DRAFT_KEY = "uae-cvbuilder-draft";
const UNLOCK_KEY = "uae-cvbuilder-unlocked";

const FIELD_IDS = [
  "fullName",
  "dob",
  "nationality",
  "passportNumber",
  "passportExpiry",
  "visaStatus",
  "visaExpiry",
  "designation",
  "jobDescription1",
  "jobDescription2",
  "jobDescription3",
  "extraResponsibilities",
  "education",
  "experience",
  "skills",
  "languages"
];

function collectDraft() {
  const draft = {};
  FIELD_IDS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) draft[id] = el.value;
  });
  const pic = document.getElementById("previewPic");
  if (pic && pic.src && pic.src.startsWith("data:")) {
    draft.profilePicData = pic.src;
  }
  return draft;
}

function saveDraft() {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(collectDraft()));
    return true;
  } catch (e) {
    console.warn("Draft save failed:", e);
    return false;
  }
}

function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return false;
    const draft = JSON.parse(raw);
    FIELD_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el && draft[id] !== undefined) el.value = draft[id];
    });
    if (draft.profilePicData) {
      document.getElementById("previewPic").src = draft.profilePicData;
    }
    if (draft.designation) {
      document.getElementById("designation").dispatchEvent(new Event("input"));
    }
    return true;
  } catch (e) {
    console.warn("Draft load failed:", e);
    return false;
  }
}

function clearDraft() {
  localStorage.removeItem(DRAFT_KEY);
}

function isDownloadUnlocked() {
  return localStorage.getItem(UNLOCK_KEY) === "true";
}

function setDownloadUnlocked(unlocked) {
  if (unlocked) {
    localStorage.setItem(UNLOCK_KEY, "true");
  } else {
    localStorage.removeItem(UNLOCK_KEY);
  }
}

function setupAutoSave(onSaved) {
  let timer;
  const schedule = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (saveDraft() && onSaved) onSaved();
    }, 600);
  };
  FIELD_IDS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", schedule);
      el.addEventListener("change", schedule);
    }
  });
}
