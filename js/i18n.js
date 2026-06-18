const I18N = {
  en: {
    appTitle: "UAE CV Builder",
    appSubtitle: "Create a professional CV for UAE jobs",
    langToggle: "हिंदी / اردو",
    sectionPersonal: "Personal Details",
    sectionProfessional: "Professional Details",
    sectionAdditional: "Additional Information",
    fullName: "Full Name",
    dob: "Date of Birth",
    nationality: "Nationality",
    passportNumber: "Passport Number",
    passportExpiry: "Passport Expiry",
    visaStatus: "UAE Visa Status",
    visaExpiry: "Visa Expiry",
    designation: "Designation / Job Title",
    jobResponsibilities: "Job Responsibilities",
    extraResponsibilities: "Additional responsibilities (optional)",
    education: "Education",
    experience: "Work Experience",
    skills: "Skills",
    languages: "Languages",
    uploadPhoto: "Upload Photo",
    generateBtn: "Generate CV Preview",
    piPayBtn: "Pay with Pi to Unlock Download",
    downloadPngBtn: "Download PNG",
    downloadPdfBtn: "Download PDF",
    devUnlockBtn: "Dev: Unlock Download (non-Pi Browser)",
    clearDraftBtn: "Clear Saved Draft",
    draftSaved: "Draft saved automatically",
    paymentSuccess: "Payment successful! You can now download your CV.",
    paymentCancelled: "Payment cancelled.",
    paymentError: "Payment failed. Please try again.",
    piAuthRequired: "Please open this app in Pi Browser to pay.",
    validationName: "Please enter your full name.",
    validationDesignation: "Please enter a designation.",
    validationDob: "Please enter your date of birth.",
    previewPersonal: "Personal Information",
    previewResponsibilities: "Professional Responsibilities",
    previewEducation: "Education",
    previewExperience: "Work Experience",
    previewSkills: "Skills",
    previewLanguages: "Languages",
    previewDob: "Date of Birth",
    previewNationality: "Nationality",
    previewPassport: "Passport",
    previewVisa: "Visa Status",
    exp: "Exp",
    selectResponsibility: "Select responsibility",
    poweredBy: "UAE CV Builder — Pi Network App"
  },
  hi: {
    appTitle: "यूएई सीवी बिल्डर",
    appSubtitle: "यूएई नौकरी के लिए प्रोफेशनल सीवी बनाएं",
    langToggle: "English",
    sectionPersonal: "व्यक्तिगत विवरण",
    sectionProfessional: "पेशेवर विवरण",
    sectionAdditional: "अतिरिक्त जानकारी",
    fullName: "पूरा नाम",
    dob: "जन्म तिथि",
    nationality: "राष्ट्रीयता",
    passportNumber: "पासपोर्ट नंबर",
    passportExpiry: "पासपोर्ट समाप्ति",
    visaStatus: "यूएई वीज़ा स्थिति",
    visaExpiry: "वीज़ा समाप्ति",
    designation: "पदनाम / नौकरी का शीर्षक",
    jobResponsibilities: "कार्य जिम्मेदारियाँ",
    extraResponsibilities: "अतिरिक्त जिम्मेदारियाँ (वैकल्पिक)",
    education: "शिक्षा",
    experience: "कार्य अनुभव",
    skills: "कौशल",
    languages: "भाषाएँ",
    uploadPhoto: "फोटो अपलोड करें",
    generateBtn: "सीवी पूर्वावलोकन बनाएं",
    piPayBtn: "डाउनलोड अनलॉक करने के लिए Pi से भुगतान करें",
    downloadPngBtn: "PNG डाउनलोड",
    downloadPdfBtn: "PDF डाउनलोड",
    devUnlockBtn: "डेव: डाउनलोड अनलॉक (गैर-Pi ब्राउज़र)",
    clearDraftBtn: "सहेजा गया ड्राफ्ट हटाएं",
    draftSaved: "ड्राफ्ट स्वचालित रूप से सहेजा गया",
    paymentSuccess: "भुगतान सफल! अब आप अपना सीवी डाउनलोड कर सकते हैं।",
    paymentCancelled: "भुगतान रद्द किया गया।",
    paymentError: "भुगतान विफल। कृपया पुनः प्रयास करें।",
    piAuthRequired: "भुगतान के लिए कृपया Pi Browser में खोलें।",
    validationName: "कृपया अपना पूरा नाम दर्ज करें।",
    validationDesignation: "कृपया पदनाम दर्ज करें।",
    validationDob: "कृपया जन्म तिथि दर्ज करें।",
    previewPersonal: "व्यक्तिगत जानकारी",
    previewResponsibilities: "पेशेवर जिम्मेदारियाँ",
    previewEducation: "शिक्षा",
    previewExperience: "कार्य अनुभव",
    previewSkills: "कौशल",
    previewLanguages: "भाषाएँ",
    previewDob: "जन्म तिथि",
    previewNationality: "राष्ट्रीयता",
    previewPassport: "पासपोर्ट",
    previewVisa: "वीज़ा स्थिति",
    exp: "समाप्ति",
    selectResponsibility: "जिम्मेदारी चुनें",
    poweredBy: "यूएई सीवी बिल्डर — Pi Network ऐप"
  }
};

let currentLang = localStorage.getItem("cvbuilder-lang") || "en";

function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || I18N.en[key] || key;
}

function setLanguage(lang) {
  currentLang = lang === "hi" ? "hi" : "en";
  localStorage.setItem("cvbuilder-lang", currentLang);
  applyTranslations();
}

function applyTranslations() {
  document.documentElement.lang = currentLang === "hi" ? "hi" : "en";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key) el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (key) el.placeholder = t(key);
  });
  const langBtn = document.getElementById("langToggle");
  if (langBtn) langBtn.textContent = t("langToggle");
}
