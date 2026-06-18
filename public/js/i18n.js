const SUPPORTED_LANGS = ["en", "hi", "ur", "ne"];

const I18N = {
  en: {
    appTitle: "UAE CV Builder",
    appSubtitle: "Create a professional CV for UAE jobs",
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
  },
  ur: {
    appTitle: "یو اے ای سی وی بلڈر",
    appSubtitle: "یو اے ای کی نوکری کے لیے پیشہ ورانہ سی وی بنائیں",
    sectionPersonal: "ذاتی تفصیلات",
    sectionProfessional: "پیشہ ورانہ تفصیلات",
    sectionAdditional: "اضافی معلومات",
    fullName: "مکمل نام",
    dob: "تاریخ پیدائش",
    nationality: "قومیت",
    passportNumber: "پاسپورٹ نمبر",
    passportExpiry: "پاسپورٹ کی میعاد",
    visaStatus: "یو اے ای ویزا کی حیثیت",
    visaExpiry: "ویزا کی میعاد",
    designation: "عہدہ / نوکری کا عنوان",
    jobResponsibilities: "کام کی ذمہ داریاں",
    extraResponsibilities: "اضافی ذمہ داریاں (اختیاری)",
    education: "تعلیم",
    experience: "کام کا تجربہ",
    skills: "مہارتیں",
    languages: "زبانیں",
    uploadPhoto: "تصویر اپ لوڈ کریں",
    generateBtn: "سی وی کا پیش نظارہ بنائیں",
    piPayBtn: "ڈاؤن لوڈ کھولنے کے لیے Pi سے ادائیگی کریں",
    downloadPngBtn: "PNG ڈاؤن لوڈ",
    downloadPdfBtn: "PDF ڈاؤن لوڈ",
    devUnlockBtn: "ڈیو: ڈاؤن لوڈ کھولیں (غیر Pi براؤزر)",
    clearDraftBtn: "محفوظ ڈرافٹ صاف کریں",
    draftSaved: "ڈرافٹ خودکار طور پر محفوظ ہو گیا",
    paymentSuccess: "ادائیگی کامیاب! اب آپ اپنی سی وی ڈاؤن لوڈ کر سکتے ہیں۔",
    paymentCancelled: "ادائیگی منسوخ ہو گئی۔",
    paymentError: "ادائیگی ناکام۔ براہ کرم دوبارہ کوشش کریں۔",
    piAuthRequired: "ادائیگی کے لیے براہ کرم Pi Browser میں کھولیں۔",
    validationName: "براہ کرم اپنا مکمل نام درج کریں۔",
    validationDesignation: "براہ کرم عہدہ درج کریں۔",
    validationDob: "براہ کرم تاریخ پیدائش درج کریں۔",
    previewPersonal: "ذاتی معلومات",
    previewResponsibilities: "پیشہ ورانہ ذمہ داریاں",
    previewEducation: "تعلیم",
    previewExperience: "کام کا تجربہ",
    previewSkills: "مہارتیں",
    previewLanguages: "زبانیں",
    previewDob: "تاریخ پیدائش",
    previewNationality: "قومیت",
    previewPassport: "پاسپورٹ",
    previewVisa: "ویزا کی حیثیت",
    exp: "میعاد",
    selectResponsibility: "ذمہ داری منتخب کریں",
    poweredBy: "یو اے ای سی وی بلڈر — Pi Network ایپ"
  },
  ne: {
    appTitle: "युएई सिभी निर्माता",
    appSubtitle: "युएई रोजगारका लागि व्यावसायिक सिभी बनाउनुहोस्",
    sectionPersonal: "व्यक्तिगत विवरण",
    sectionProfessional: "व्यावसायिक विवरण",
    sectionAdditional: "थप जानकारी",
    fullName: "पूरा नाम",
    dob: "जन्म मिति",
    nationality: "राष्ट्रियता",
    passportNumber: "राहदानी नम्बर",
    passportExpiry: "राहदानी म्याद",
    visaStatus: "युएई भिसा स्थिति",
    visaExpiry: "भिसा म्याद",
    designation: "पद / रोजगार शीर्षक",
    jobResponsibilities: "कामका जिम्मेवारीहरू",
    extraResponsibilities: "थप जिम्मेवारीहरू (वैकल्पिक)",
    education: "शिक्षा",
    experience: "कामको अनुभव",
    skills: "सीपहरू",
    languages: "भाषाहरू",
    uploadPhoto: "फोटो अपलोड गर्नुहोस्",
    generateBtn: "सिभी पूर्वावलोकन बनाउनुहोस्",
    piPayBtn: "डाउनलोड खोल्न Pi बाट भुक्तानी गर्नुहोस्",
    downloadPngBtn: "PNG डाउनलोड",
    downloadPdfBtn: "PDF डाउनलोड",
    devUnlockBtn: "डेभ: डाउनलोड खोल्नुहोस् (गैर-Pi ब्राउजर)",
    clearDraftBtn: "सुरक्षित ड्राफ्ट मेटाउनुहोस्",
    draftSaved: "ड्राफ्ट स्वचालित रूपमा सुरक्षित भयो",
    paymentSuccess: "भुक्तानी सफल! अब तपाईं आफ्नो सिभी डाउनलोड गर्न सक्नुहुन्छ।",
    paymentCancelled: "भुक्तानी रद्द भयो।",
    paymentError: "भुक्तानी असफल। कृपया फेरि प्रयास गर्नुहोस्।",
    piAuthRequired: "भुक्तानीका लागि कृपया Pi Browser मा खोल्नुहोस्।",
    validationName: "कृपया आफ्नो पूरा नाम लेख्नुहोस्।",
    validationDesignation: "कृपया पद लेख्नुहोस्।",
    validationDob: "कृपया जन्म मिति लेख्नुहोस्।",
    previewPersonal: "व्यक्तिगत जानकारी",
    previewResponsibilities: "व्यावसायिक जिम्मेवारीहरू",
    previewEducation: "शिक्षा",
    previewExperience: "कामको अनुभव",
    previewSkills: "सीपहरू",
    previewLanguages: "भाषाहरू",
    previewDob: "जन्म मिति",
    previewNationality: "राष्ट्रियता",
    previewPassport: "राहदानी",
    previewVisa: "भिसा स्थिति",
    exp: "म्याद",
    selectResponsibility: "जिम्मेवारी छान्नुहोस्",
    poweredBy: "युएई सिभी निर्माता — Pi Network एप"
  }
};

const DATE_LOCALES = {
  en: "en-GB",
  hi: "hi-IN",
  ur: "ur-PK",
  ne: "ne-NP"
};

let currentLang = localStorage.getItem("cvbuilder-lang") || "en";
if (!SUPPORTED_LANGS.includes(currentLang)) {
  currentLang = "en";
}

function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || I18N.en[key] || key;
}

function getDateLocale() {
  return DATE_LOCALES[currentLang] || "en-GB";
}

function setLanguage(lang) {
  currentLang = SUPPORTED_LANGS.includes(lang) ? lang : "en";
  localStorage.setItem("cvbuilder-lang", currentLang);
  applyTranslations();
}

function applyTranslations() {
  const isRtl = currentLang === "ur";
  document.documentElement.lang = currentLang;
  document.documentElement.dir = isRtl ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key) el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (key) el.placeholder = t(key);
  });

  const langSelect = document.getElementById("langSelect");
  if (langSelect) langSelect.value = currentLang;
}
