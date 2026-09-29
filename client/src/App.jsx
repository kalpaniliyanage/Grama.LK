import React, { useEffect, useMemo, useRef, useState } from "react";
import "./index.css";
// App.jsx හි නිවැරදි folder path එක ලබා දීම
import WelfarePortal from "./components/pages/WelfarePortal";

const API =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/* =========================================================
   TRANSLATIONS
========================================================= */

const words = {
  en: {
    home: "Home",
    services: "Services",
    announcements: "Announcements",
    portals: "Portals",
    offices: "Offices",
    forms: "Forms",
    complaint: "Complaint",
    officer: "GN Officer",
    map: "Map",
    language: "Language",
    login: "Login",

    quickServices: "Explore Services",
    activities: "Village Activities",
    viewMore: "View More",
    open: "Open",
    download: "Download",
    location: "Location",
    date: "Date",
    time: "Time",

    responsibleOfficer: "Responsible Officer",
    complaintType: "Complaint Type",
    description: "Description",
    submitComplaint: "Submit Complaint",
    photo: "Photo",
    optional: "Optional",

    name: "Name",
    phone: "Phone",
    email: "Email",

    officeDays: "Office Days",
    officeHours: "Office Hours",
    fieldDays: "Field Days",
    fieldHours: "Field Hours",
    serviceDays: "Service Days",
    holidays: "Holidays",

    chatbot: "GramaLK Assistant",
    chatbotPlaceholder: "Ask about village services...",
    send: "Send",
    exit: "Exit",
    close: "Close",

    choosePortal: "Choose Portal",
    username: "Username",
    password: "Password",
    houseNumber: "House Number",
    secureAccess: "Secure Portal Access",

    loginSuccess: "Login successful.",
    loginFailed: "Login failed. Please check your details.",

    complaintSuccess: "Complaint submitted successfully.",
    complaintFailed: "Unable to submit the complaint.",

    noAnnouncements: "No announcements available.",

    purposeTitle: "About GramaLK",
    purposeText:
      "GramaLK is a digital community service platform designed to connect residents with local information, government services, announcements and community support.",

    mapTitle: "Find Your GN Office",
    mapText:
      "Use the map to find the location of your local Grama Niladhari office.",

    portalFamily: "Family Portal",
    portalWelfare: "Welfare Portal",
    portalYouth: "Youth & Sports Portal",
    portalHealth: "Health Portal",
    portalGN: "GN Officer Portal",

    portalFamilyDesc:
      "Access family information and community-related services.",
    portalWelfareDesc:
      "Access welfare and assistance-related services.",
    portalYouthDesc:
      "Manage Youth and Sports related applications and information.",
    portalHealthDesc:
      "Access public health related services and information.",
    portalGNDesc:
      "GN officers can manage local community services and information.",

    anonymousNote:
      "Your information will be handled according to the service requirements.",

    aboutGramaLK: "About GramaLK",
    aboutGN: "About Grama Niladhari",
    quickLinks: "Quick Links",
    ourServices: "Our Services",
    contactDetails: "Contact Details",

    latestAnnouncements: "Latest Announcements",
    upcomingActivities: "Upcoming Activities",
    villageGallery: "Village Activities",
    localServices: "Local Services",
    communityPortals: "Community Portals",
    importantForms: "Important Forms",

    submit: "Submit",
    selectOfficer: "Select Officer",
    selectType: "Select Complaint Type",

    noForms: "No forms available.",
    noOffices: "No offices available.",

    fieldVisit: "Field Visit",
    officeVisit: "Office Visit",

    chatbotWelcome:
      "Hello! I am the GramaLK Assistant. Ask me about local services, offices, forms, announcements or complaints.",

    sampleAnnouncement1Title: "Community Service Day",
    sampleAnnouncement1Text:
      "A community service programme will be conducted at the village community centre.",
    sampleAnnouncement2Title: "GN Office Public Service",
    sampleAnnouncement2Text:
      "Residents can visit the GN office during the published office hours for local services.",
    sampleAnnouncement3Title: "Health Awareness Programme",
    sampleAnnouncement3Text:
      "A community health awareness programme will be conducted for residents.",
  },

  si: {
    home: "මුල් පිටුව",
    services: "සේවා",
    announcements: "නිවේදන",
    portals: "පෝර්ටල්",
    offices: "කාර්යාල",
    forms: "අයදුම්පත්",
    complaint: "පැමිණිලි",
    officer: "ග්‍රාම නිලධාරී",
    map: "සිතියම",
    language: "භාෂාව",
    login: "පිවිසීම",

    quickServices: "සේවා බලන්න",
    activities: "ගමේ ක්‍රියාකාරකම්",
    viewMore: "තවත් බලන්න",
    open: "විවෘත කරන්න",
    download: "බාගත කරන්න",
    location: "ස්ථානය",
    date: "දිනය",
    time: "වේලාව",

    responsibleOfficer: "වගකිවයුතු නිලධාරී",
    complaintType: "පැමිණිලි වර්ගය",
    description: "විස්තරය",
    submitComplaint: "පැමිණිල්ල ඉදිරිපත් කරන්න",
    photo: "ඡායාරූපය",
    optional: "විකල්ප",

    name: "නම",
    phone: "දුරකථනය",
    email: "විද්‍යුත් තැපෑල",

    officeDays: "කාර්යාල දින",
    officeHours: "කාර්යාල වේලාවන්",
    fieldDays: "ක්ෂේත්‍ර දින",
    fieldHours: "ක්ෂේත්‍ර වේලාවන්",
    serviceDays: "සේවා දින",
    holidays: "නිවාඩු දින",

    chatbot: "GramaLK සහායක",
    chatbotPlaceholder: "ගමේ සේවා පිළිබඳ විමසන්න...",
    send: "යවන්න",
    exit: "ඉවත් වන්න",
    close: "වසන්න",

    choosePortal: "පෝර්ටලය තෝරන්න",
    username: "පරිශීලක නාමය",
    password: "මුරපදය",
    houseNumber: "නිවාස අංකය",
    secureAccess: "ආරක්ෂිත පෝර්ටල් ප්‍රවේශය",

    loginSuccess: "සාර්ථකව පිවිසුණි.",
    loginFailed: "පිවිසීම අසාර්ථකයි. තොරතුරු පරීක්ෂා කරන්න.",

    complaintSuccess: "පැමිණිල්ල සාර්ථකව ඉදිරිපත් කරන ලදී.",
    complaintFailed: "පැමිණිල්ල ඉදිරිපත් කිරීමට නොහැකි විය.",

    noAnnouncements: "නිවේදන නොමැත.",

    purposeTitle: "GramaLK ගැන",
    purposeText:
      "GramaLK යනු ප්‍රදේශීය තොරතුරු, රාජ්‍ය සේවා, නිවේදන සහ ප්‍රජා සහාය ජනතාවට පහසුවෙන් ලබාදීමට නිර්මාණය කළ ඩිජිටල් ප්‍රජා සේවා වේදිකාවකි.",

    mapTitle: "ඔබේ ග්‍රාම නිලධාරී කාර්යාලය සොයන්න",
    mapText:
      "ඔබගේ ප්‍රදේශයේ ග්‍රාම නිලධාරී කාර්යාලය සොයා ගැනීමට සිතියම භාවිතා කරන්න.",

    portalFamily: "පවුල් පෝර්ටලය",
    portalWelfare: "සුභසාධන පෝර්ටලය",
    portalYouth: "යෞවන හා ක්‍රීඩා පෝර්ටලය",
    portalHealth: "සෞඛ්‍ය පෝර්ටලය",
    portalGN: "ග්‍රාම නිලධාරී පෝර්ටලය",

    portalFamilyDesc:
      "පවුල් තොරතුරු සහ ප්‍රජා සේවා සම්බන්ධ සේවා වෙත ප්‍රවේශ වන්න.",
    portalWelfareDesc:
      "සුභසාධන සහ ආධාර සම්බන්ධ සේවා වෙත ප්‍රවේශ වන්න.",
    portalYouthDesc:
      "යෞවන හා ක්‍රීඩා සම්බන්ධ අයදුම්පත් හා තොරතුරු කළමනාකරණය කරන්න.",
    portalHealthDesc:
      "මහජන සෞඛ්‍ය සම්බන්ධ සේවා සහ තොරතුරු ලබාගන්න.",
    portalGNDesc:
      "ග්‍රාම නිලධාරීන්ට ප්‍රදේශීය ප්‍රජා සේවා සහ තොරතුරු කළමනාකරණය කළ හැක.",

    anonymousNote:
      "ඔබගේ තොරතුරු සේවා අවශ්‍යතාවයට අනුව ආරක්ෂිතව භාවිතා කරනු ලැබේ.",

    aboutGramaLK: "GramaLK ගැන",
    aboutGN: "ග්‍රාම නිලධාරී ගැන",
    quickLinks: "ඉක්මන් සබැඳි",
    ourServices: "අපගේ සේවා",
    contactDetails: "සම්බන්ධතා තොරතුරු",

    latestAnnouncements: "නවතම නිවේදන",
    upcomingActivities: "ඉදිරි ක්‍රියාකාරකම්",
    villageGallery: "ගමේ ක්‍රියාකාරකම්",
    localServices: "ප්‍රදේශීය සේවා",
    communityPortals: "ප්‍රජා පෝර්ටල්",
    importantForms: "වැදගත් අයදුම්පත්",

    submit: "ඉදිරිපත් කරන්න",
    selectOfficer: "නිලධාරියා තෝරන්න",
    selectType: "පැමිණිලි වර්ගය තෝරන්න",

    noForms: "අයදුම්පත් නොමැත.",
    noOffices: "කාර්යාල නොමැත.",

    fieldVisit: "ක්ෂේත්‍ර සංචාරය",
    officeVisit: "කාර්යාල සේවය",

    chatbotWelcome:
      "ආයුබෝවන්! මම GramaLK සහායකයා. ප්‍රදේශීය සේවා, කාර්යාල, අයදුම්පත්, නිවේදන හෝ පැමිණිලි පිළිබඳ මගෙන් විමසන්න.",

    sampleAnnouncement1Title: "ප්‍රජා සේවා දිනය",
    sampleAnnouncement1Text:
      "ගම් ප්‍රජා මධ්‍යස්ථානයේ ප්‍රජා සේවා වැඩසටහනක් පැවැත්වේ.",
    sampleAnnouncement2Title: "ග්‍රාම නිලධාරී කාර්යාල මහජන සේවය",
    sampleAnnouncement2Text:
      "ප්‍රදේශීය සේවා සඳහා ප්‍රකාශිත කාර්යාල වේලාවන් තුළ ග්‍රාම නිලධාරී කාර්යාලයට පැමිණිය හැක.",
    sampleAnnouncement3Title: "සෞඛ්‍ය දැනුවත් කිරීමේ වැඩසටහන",
    sampleAnnouncement3Text:
      "ප්‍රදේශවාසීන් සඳහා ප්‍රජා සෞඛ්‍ය දැනුවත් කිරීමේ වැඩසටහනක් පැවැත්වේ.",
  },

  ta: {
    home: "முகப்பு",
    services: "சேவைகள்",
    announcements: "அறிவிப்புகள்",
    portals: "போர்டல்கள்",
    offices: "அலுவலகங்கள்",
    forms: "விண்ணப்பங்கள்",
    complaint: "முறைப்பாடு",
    officer: "கிராம நிலதாரி",
    map: "வரைபடம்",
    language: "மொழி",
    login: "உள்நுழைவு",

    quickServices: "சேவைகளைப் பார்க்க",
    activities: "கிராம நடவடிக்கைகள்",
    viewMore: "மேலும் பார்க்க",
    open: "திறக்க",
    download: "பதிவிறக்க",
    location: "இடம்",
    date: "திகதி",
    time: "நேரம்",

    responsibleOfficer: "பொறுப்பு அதிகாரி",
    complaintType: "முறைப்பாட்டு வகை",
    description: "விபரம்",
    submitComplaint: "முறைப்பாட்டை சமர்ப்பிக்க",
    photo: "புகைப்படம்",
    optional: "விருப்பம்",

    name: "பெயர்",
    phone: "தொலைபேசி",
    email: "மின்னஞ்சல்",

    officeDays: "அலுவலக நாட்கள்",
    officeHours: "அலுவலக நேரம்",
    fieldDays: "கள நாட்கள்",
    fieldHours: "கள நேரம்",
    serviceDays: "சேவை நாட்கள்",
    holidays: "விடுமுறை நாட்கள்",

    chatbot: "GramaLK உதவியாளர்",
    chatbotPlaceholder: "கிராம சேவைகள் பற்றி கேளுங்கள்...",
    send: "அனுப்புக",
    exit: "வெளியேறு",
    close: "மூடு",

    choosePortal: "போர்டலைத் தேர்ந்தெடுக்கவும்",
    username: "பயனர் பெயர்",
    password: "கடவுச்சொல்",
    houseNumber: "வீட்டு இலக்கம்",
    secureAccess: "பாதுகாப்பான போர்டல் அணுகல்",

    loginSuccess: "வெற்றிகரமாக உள்நுழைந்துள்ளீர்கள்.",
    loginFailed: "உள்நுழைவு தோல்வியடைந்தது. தகவல்களைச் சரிபார்க்கவும்.",

    complaintSuccess: "முறைப்பாடு வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது.",
    complaintFailed: "முறைப்பாட்டை சமர்ப்பிக்க முடியவில்லை.",

    noAnnouncements: "அறிவிப்புகள் எதுவும் இல்லை.",

    purposeTitle: "GramaLK பற்றி",
    purposeText:
      "GramaLK என்பது உள்ளூர் தகவல்கள், அரச சேவைகள், அறிவிப்புகள் மற்றும் சமூக ஆதரவை மக்களுக்கு எளிதாக வழங்க உருவாக்கப்பட்ட டிஜிட்டல் சமூக சேவை தளமாகும்.",

    mapTitle: "உங்கள் கிராம நிலதாரி அலுவலகத்தைத் தேடுங்கள்",
    mapText:
      "உங்கள் பகுதியில் உள்ள கிராம நிலதாரி அலுவலகத்தை கண்டறிய வரைபடத்தைப் பயன்படுத்தவும்.",

    portalFamily: "குடும்ப போர்டல்",
    portalWelfare: "நலன்புரி போர்டல்",
    portalYouth: "பிறப்பு மற்றும் இறப்பு போர்டல்",
    portalHealth: "சுகாதார போர்டல்",
    portalGN: "கிராம நிலதாரி போர்டல்",

    portalFamilyDesc:
      "குடும்பத் தகவல்கள் மற்றும் சமூக சேவைகளை அணுகவும்.",
    portalWelfareDesc:
      "நலன்புரி மற்றும் உதவி தொடர்பான சேவைகளை அணுகவும்.",
    portalYouthDesc:
      "பிறப்பு மற்றும் இறப்பு தொடர்பான விண்ணப்பங்கள் மற்றும் தகவல்களை நிர்வகிக்கவும்.",
    portalHealthDesc:
      "பொது சுகாதார சேவைகள் மற்றும் தகவல்களை அணுகவும்.",
    portalGNDesc:
      "கிராம நிலதாரிகள் உள்ளூர் சமூக சேவைகள் மற்றும் தகவல்களை நிர்வகிக்கலாம்.",

    anonymousNote:
      "உங்கள் தகவல்கள் சேவை தேவைகளுக்கு ஏற்ப பாதுகாப்பாக கையாளப்படும்.",

    aboutGramaLK: "GramaLK பற்றி",
    aboutGN: "கிராம நிலதாரி பற்றி",
    quickLinks: "விரைவு இணைப்புகள்",
    ourServices: "எங்கள் சேவைகள்",
    contactDetails: "தொடர்பு விபரங்கள்",

    latestAnnouncements: "சமீபத்திய அறிவிப்புகள்",
    upcomingActivities: "வரவிருக்கும் நடவடிக்கைகள்",
    villageGallery: "கிராம நடவடிக்கைகள்",
    localServices: "உள்ளூர் சேவைகள்",
    communityPortals: "சமூக போர்டல்கள்",
    importantForms: "முக்கிய விண்ணப்பங்கள்",

    submit: "சமர்ப்பிக்க",
    selectOfficer: "அதிகாரியைத் தேர்ந்தெடுக்கவும்",
    selectType: "முறைப்பாட்டு வகையைத் தேர்ந்தெடுக்கவும்",

    noForms: "விண்ணப்பங்கள் எதுவும் இல்லை.",
    noOffices: "அலுவலகங்கள் எதுவும் இல்லை.",

    fieldVisit: "களப் பயணம்",
    officeVisit: "அலுவலக சேவை",

    chatbotWelcome:
      "வணக்கம்! நான் GramaLK உதவியாளர். உள்ளூர் சேவைகள், அலுவலகங்கள், விண்ணப்பங்கள், அறிவிப்புகள் அல்லது முறைப்பாடுகள் பற்றி என்னிடம் கேளுங்கள்.",

    sampleAnnouncement1Title: "சமூக சேவை நாள்",
    sampleAnnouncement1Text:
      "கிராம சமூக மையத்தில் சமூக சேவை நிகழ்ச்சி நடைபெறும்.",
    sampleAnnouncement2Title: "கிராம நிலதாரி அலுவலக பொது சேவை",
    sampleAnnouncement2Text:
      "உள்ளூர் சேவைகளுக்காக அறிவிக்கப்பட்ட அலுவலக நேரங்களில் கிராம நிலதாரி அலுவலகத்தைப் பார்வையிடலாம்.",
    sampleAnnouncement3Title: "சுகாதார விழிப்புணர்வு நிகழ்ச்சி",
    sampleAnnouncement3Text:
      "கிராம மக்களுக்காக சமூக சுகாதார விழிப்புணர்வு நிகழ்ச்சி நடைபெறும்.",
  },
};

/* =========================================================
   STATIC DATA
========================================================= */

const heroImages = [
  "/images/village1.png",
  "/images/village2.png",
  "/images/village3.png",
  "/images/village4.png",
  "/images/village5.png",
];

/* =========================================================
   VILLAGE ACTIVITIES
========================================================= */

const activities = [
  {
    image: "/images/activity1.jpg",

    titleEn: "Village Clean-Up Programme",
    titleSi: "ගම් පිරිසිදු කිරීමේ වැඩසටහන",
    titleTa: "கிராம சுத்தப்படுத்தும் நிகழ்ச்சி",

    descriptionEn:
      "Residents work together to keep the village clean and beautiful.",
    descriptionSi:
      "ගමේ පිරිසිදුකම සහ අලංකාරය පවත්වා ගැනීමට ප්‍රදේශවාසීන් එක්ව කටයුතු කරයි.",
    descriptionTa:
      "கிராமத்தை சுத்தமாகவும் அழகாகவும் வைத்திருக்க மக்கள் ஒன்றிணைந்து செயல்படுகின்றனர்.",
  },

  {
    image: "/images/activity2.jpg",

    titleEn: "Community Health Programme",
    titleSi: "ප්‍රජා සෞඛ්‍ය වැඩසටහන",
    titleTa: "சமூக சுகாதார நிகழ்ச்சி",

    descriptionEn:
      "Local residents participate in community health activities.",
    descriptionSi:
      "ප්‍රදේශවාසීන් ප්‍රජා සෞඛ්‍ය කටයුතුවලට සහභාගී වේ.",
    descriptionTa:
      "உள்ளூர் மக்கள் சமூக சுகாதார நடவடிக்கைகளில் பங்கேற்கின்றனர்.",
  },

  {
    image: "/images/activity3.jpg",

    titleEn: "Village Cleaning Programme",
    titleSi: "ගම් පිරිසිදු කිරීමේ වැඩසටහන",
    titleTa: "கிராம சுத்தப்படுத்தும் நிகழ்ச்சி",

    descriptionEn:
      "Local residents work together to maintain the cleanliness of the village.",
    descriptionSi:
      "ගමේ පිරිසිදුකම පවත්වා ගැනීමට ප්‍රදේශවාසීන් එක්ව කටයුතු කරයි.",
    descriptionTa:
      "கிராமத்தின் தூய்மையைப் பராமரிக்க உள்ளூர் மக்கள் ஒன்றிணைந்து செயல்படுகின்றனர்.",
  },

  {
    image: "/images/activity4.jpg",

    titleEn: "Community Awareness Programme",
    titleSi: "ප්‍රජා දැනුවත් කිරීමේ වැඩසටහන",
    titleTa: "சமூக விழிப்புணர்வு நிகழ்ச்சி",

    descriptionEn:
      "Community members take part in programmes that improve village knowledge and awareness.",
    descriptionSi:
      "ගමේ දැනුම හා දැනුවත්භාවය වැඩිදියුණු කරන වැඩසටහන් සඳහා ප්‍රජා සාමාජිකයින් සහභාගී වේ.",
    descriptionTa:
      "கிராம மக்களின் அறிவையும் விழிப்புணர்வையும் மேம்படுத்தும் நிகழ்ச்சிகளில் சமூக உறுப்பினர்கள் பங்கேற்கின்றனர்.",
  },

  {
    image: "/images/activity5.png",

    titleEn: "Aid Distribution Programme",
    titleSi: "සහනාධාර ලබාදීමේ වැඩසටහන",
    titleTa: "நிவாரண உதவி வழங்கும் நிகழ்ச்சி",

    descriptionEn:
      "Aid and support are provided to families who need assistance.",
    descriptionSi:
      "ආධාර අවශ්‍ය පවුල් සඳහා සහනාධාර සහ උපකාර ලබා දේ.",
    descriptionTa:
      "உதவி தேவைப்படும் குடும்பங்களுக்கு நிவாரண உதவிகள் வழங்கப்படுகின்றன.",
  },

  {
    image: "/images/activity6.png",

    titleEn: "Women's Self-Employment Awareness Programme",
    titleSi: "කාන්තා ස්වයං රැකියා පිළිබඳ දැනුවත් කිරීමේ වැඩසටහන",
    titleTa: "பெண்களுக்கான சுயதொழில் விழிப்புணர்வு நிகழ்ச்சி",

    descriptionEn:
      "Awareness programmes on self-employment are conducted for women in the village.",
    descriptionSi:
      "ගමේ කාන්තාවන් සඳහා ස්වයං රැකියා පිළිබඳ දැනුවත් කිරීමේ වැඩසටහන් පැවැත්වේ.",
    descriptionTa:
      "கிராம பெண்களுக்காக சுயதொழில் தொடர்பான விழிப்புணர்வு நிகழ்ச்சிகள் நடத்தப்படுகின்றன.",
  },

  {
    image: "/images/activity7.png",

    titleEn: "Tree Planting Programme",
    titleSi: "රුක් රෝපණ වැඩසටහන",
    titleTa: "மர நடுகை நிகழ்ச்சி",

    descriptionEn:
      "Residents participate in tree planting activities to improve the village environment.",
    descriptionSi:
      "ගමේ පරිසරය වැඩිදියුණු කිරීම සඳහා ප්‍රදේශවාසීන් රුක් රෝපණ කටයුතුවලට සහභාගී වේ.",
    descriptionTa:
      "கிராம சுற்றுச்சூழலை மேம்படுத்த மக்கள் மர நடுகை நடவடிக்கைகளில் பங்கேற்கின்றனர்.",
  },
];

const complaintTypes = [
  {
    code: "roads",
    en: "Road / Drainage Issue",
    si: "මාර්ග / කාණු ගැටලුව",
    ta: "சாலை / வடிகால் பிரச்சினை",
    officer: "GN Officer",
  },
  {
    code: "waste",
    en: "Waste Management",
    si: "කසළ කළමනාකරණ ගැටලුව",
    ta: "கழிவு மேலாண்மை பிரச்சினை",
    officer: "Community / Welfare Officer",
  },
  {
    code: "lighting",
    en: "Street Lighting",
    si: "වීදි ආලෝක ගැටලුව",
    ta: "தெரு விளக்கு பிரச்சினை",
    officer: "GN Officer",
  },
  {
    code: "welfare",
    en: "Welfare / Assistance",
    si: "සුභසාධන / ආධාර ගැටලුව",
    ta: "நலன்புரி / உதவி பிரச்சினை",
    officer: "Welfare Officer",
  },
  {
    code: "documents",
    en: "Birth / Death Documents",
    si: "උපත් / මරණ ලේඛන",
    ta: "பிறப்பு / இறப்பு ஆவணங்கள்",
    officer: "GN Officer",
  },
  {
    code: "health",
    en: "Public Health",
    si: "මහජන සෞඛ්‍ය ගැටලුව",
    ta: "பொது சுகாதார பிரச்சினை",
    officer: "Health Officer",
  },
  {
    code: "other",
    en: "Other Community Issue",
    si: "වෙනත් ප්‍රජා ගැටලුවක්",
    ta: "மற்ற சமூக பிரச்சினை",
    officer: "GN Officer",
  },
];

const officers = [
  {
    en: "GN Officer",
    si: "ග්‍රාම නිලධාරී",
    ta: "கிராம நிலதாரி",
  },
  {
    en: "Community / Welfare Officer",
    si: "ප්‍රජා / සුභසාධන නිලධාරී",
    ta: "சமூக / நலன்புரி அதிகாரி",
  },
  {
    en: "Welfare Officer",
    si: "සුභසාධන නිලධාරී",
    ta: "நலன்புரி அதிகாரி",
  },
  {
    en: "Health Officer",
    si: "සෞඛ්‍ය නිලධාරී",
    ta: "சுகாதார அதிகாரி",
  },
  {
    en: "Public Health Midwife",
    si: "මහජන සෞඛ්‍ය පවුල් සෞඛ්‍ය සේවා නිලධාරිනී",
    ta: "பொது சுகாதார மருத்துவச்சி",
  },
  {
    en: "Divisional Secretariat Officer",
    si: "ප්‍රාදේශීය ලේකම් කාර්යාල නිලධාරී",
    ta: "பிரதேச செயலக அதிகாரி",
  },
];

const portals = [
  {
    id: "family",
    title: "portalFamily",
    description: "portalFamilyDesc",
    image: "/images/activity1.jpg",
    icon: "🏠",
  },
  {
    id: "welfare",
    title: "portalWelfare",
    description: "portalWelfareDesc",
    image: "/images/samurdhi-officer.jpg",
    icon: "🤝",
  },
  {
    id: "youth",
    title: "portalYouth",
    description: "portalYouthDesc",
    image: "/images/activity4.jpg",
    icon: "📄",
  },
  {
    id: "health",
    title: "portalHealth",
    description: "portalHealthDesc",
    image: "/images/health-office.jpg",
    icon: "🩺",
  },
  {
    id: "gn",
    title: "portalGN",
    description: "portalGNDesc",
    image: "/images/gn-officer.jpg",
    icon: "🧑‍💼",
  },
];

const fallbackForms = [
  {
    title: "Aswesuma Application",
    category: "Welfare",
    file: "/forms/aswesuma.pdf",
  },
  {
    title: "Healthcare Application",
    category: "Health",
    file: "/forms/healthcare.pdf",
  },
  {
    title: "Disaster Assistance Application",
    category: "Disaster",
    file: "/forms/disaster-application.pdf",
  },
];

const fallbackOffices = [
  {
    type: "GN Office",
    name: "Grama Niladhari Office",
    personName: "GN Officer",
    position: "Grama Niladhari",
    personImage: "/images/gn-officer.jpg",
    phone: "+94 XX XXX XXXX",
    email: "gn-office@example.lk",
    address: "Your GN Division, Sri Lanka",
    mapQuery: "Your GN Division, Sri Lanka",
    image: "/images/gn-office.jpg",
    officeDays: "Monday – Friday",
    officeHours: "8:30 AM – 4:15 PM",
    fieldDays: "According to field schedule",
    fieldHours: "Scheduled field visits",
    authorityDates: "Monday – Friday",
    holidays: "Saturday, Sunday & Government Holidays",
  },
  {
    type: "DS Office",
    name: "Divisional Secretariat",
    personName: "Divisional Secretariat Officer",
    position: "Divisional Secretariat",
    phone: "+94 XX XXX XXXX",
    email: "ds-office@example.lk",
    address: "Divisional Secretariat, Sri Lanka",
    mapQuery: "Divisional Secretariat, Sri Lanka",
    image: "/images/ds-office.jpg",
  },
  {
    type: "Health",
    name: "Health Office",
    personName: "Health Officer",
    position: "MOH / Health Office",
    phone: "+94 XX XXX XXXX",
    email: "health@example.lk",
    address: "MOH Office, Sri Lanka",
    mapQuery: "MOH Office, Sri Lanka",
    image: "/images/health-office.jpg",
  },
  {
    type: "Community",
    name: "Samurdhi Office",
    personName: "Samurdhi Officer",
    position: "Community / Welfare Officer",
    phone: "+94 XX XXX XXXX",
    email: "samurdhi@example.lk",
    address: "Samurdhi Office, Sri Lanka",
    mapQuery: "Samurdhi Office, Sri Lanka",
    image: "/images/samurdhi-officer.jpg",
  },
  {
    type: "Community",
    name: "Public Health Midwife",
    personName: "Public Health Midwife",
    position: "Public Health Midwife",
    phone: "+94 XX XXX XXXX",
    email: "phm@example.lk",
    address: "Local PHM Area, Sri Lanka",
    mapQuery: "Sri Lanka",
    image: "/images/midwife.jpg",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function localized(item, lang, field = "title") {
  const suffix =
    lang === "si"
      ? "Si"
      : lang === "ta"
      ? "Ta"
      : "En";

  return (
    item?.[`${field}${suffix}`] ||
    item?.[`${field}En`] ||
    item?.[field] ||
    ""
  );
}

function formatDateTime(value, lang) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const locale =
    lang === "si"
      ? "si-LK"
      : lang === "ta"
      ? "ta-LK"
      : "en-LK";

  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

/* =========================================================
   COMPONENT
========================================================= */

export default function App() {
  const [lang, setLang] = useState(
    localStorage.getItem("gramalk_lang") || "en"
  );

  const [dark, setDark] = useState(
    localStorage.getItem("gramalk_theme") === "dark"
  );

  const [offices, setOffices] = useState(fallbackOffices);
  const [forms, setForms] = useState(fallbackForms);
  const [announcements, setAnnouncements] = useState([]);

  const [heroImageIndex, setHeroImageIndex] = useState(0);

  const [imageViewer, setImageViewer] = useState(null);

  const [portalModal, setPortalModal] = useState(false);
  const [selectedPortal, setSelectedPortal] = useState(null);

  const [login, setLogin] = useState({
    username: "",
    password: "",
    houseNumber: "",
  });

  const [loginMessage, setLoginMessage] = useState("");

  const [complaint, setComplaint] = useState({
    type: "roads",
    officer: "GN Officer",
    location: "",
    description: "",
    photo: null,
  });

  const [complaintMessage, setComplaintMessage] = useState("");

  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatBusy, setChatBusy] = useState(false);

  /* =======================================================
     REFS
  ======================================================= */

  const galleryRef = useRef(null);
  const complaintFileRef = useRef(null);

  const t = (key) =>
    words[lang]?.[key] || words.en[key] || key;

  /* =======================================================
     LANGUAGE + THEME
  ======================================================= */

  useEffect(() => {
    localStorage.setItem("gramalk_lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem(
      "gramalk_theme",
      dark ? "dark" : "light"
    );

    document.documentElement.dataset.theme = dark
      ? "dark"
      : "light";
  }, [dark]);

  /* =======================================================
     HERO IMAGE PRELOAD
  ======================================================= */

  useEffect(() => {
    heroImages.forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  /* =======================================================
     HERO AUTO ROTATION
  ======================================================= */

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImageIndex(
        (current) =>
          (current + 1) % heroImages.length
      );
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  /* =======================================================
     VILLAGE GALLERY AUTO SIDE-BY-SIDE SCROLL
  ======================================================= */

  useEffect(() => {
    const timer = setInterval(() => {
      const element = galleryRef.current;

      if (!element) return;

      const card =
        element.querySelector(".gallery-card");

      const amount = card
        ? card.getBoundingClientRect().width + 18
        : 300;

      const maxScroll =
        element.scrollWidth -
        element.clientWidth;

      if (maxScroll <= 0) return;

      if (
        element.scrollLeft >=
        maxScroll - 5
      ) {
        element.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        element.scrollBy({
          left: amount,
          behavior: "smooth",
        });
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  /* =======================================================
     FETCH BACKEND DATA
  ======================================================= */

  useEffect(() => {
    async function loadData() {
      try {
        const [
          officesResponse,
          formsResponse,
          announcementsResponse,
        ] = await Promise.all([
          fetch(`${API}/offices`).catch(() => null),
          fetch(`${API}/forms`).catch(() => null),
          fetch(`${API}/announcements`).catch(() => null),
        ]);

        if (officesResponse?.ok) {
          const data =
            await officesResponse.json();

          if (Array.isArray(data)) {
            setOffices(data);
          } else if (
            Array.isArray(data?.offices)
          ) {
            setOffices(data.offices);
          }
        }

        if (formsResponse?.ok) {
          const data =
            await formsResponse.json();

          if (Array.isArray(data)) {
            setForms(data);
          } else if (
            Array.isArray(data?.forms)
          ) {
            setForms(data.forms);
          }
        }

        if (announcementsResponse?.ok) {
          const data =
            await announcementsResponse.json();

          if (Array.isArray(data)) {
            setAnnouncements(data);
          } else if (
            Array.isArray(data?.announcements)
          ) {
            setAnnouncements(
              data.announcements
            );
          }
        }
      } catch (error) {
        console.log(
          "Using GramaLK fallback data."
        );
      }
    }

    loadData();
  }, []);

  /* =======================================================
     SAMPLE ANNOUNCEMENTS
  ======================================================= */

  const sampleAnnouncements = useMemo(
    () => [
      {
        id: "sample-1",
        title: t(
          "sampleAnnouncement1Title"
        ),
        description: t(
          "sampleAnnouncement1Text"
        ),
        location:
          lang === "si"
            ? "ගම් ප්‍රජා මධ්‍යස්ථානය"
            : lang === "ta"
            ? "கிராம சமூக மையம்"
            : "Village Community Centre",
        date: "2026-10-05",
        time: "09:00 AM – 01:00 PM",
        image: "/images/activity1.jpg",
      },
      {
        id: "sample-2",
        title: t(
          "sampleAnnouncement2Title"
        ),
        description: t(
          "sampleAnnouncement2Text"
        ),
        location:
          lang === "si"
            ? "ග්‍රාම නිලධාරී කාර්යාලය"
            : lang === "ta"
            ? "கிராம நிலதாரி அலுவலகம்"
            : "Grama Niladhari Office",
        date: "2026-10-08",
        time: "08:30 AM – 04:15 PM",
        image: "/images/gn-office.jpg",
      },
      {
        id: "sample-3",
        title: t(
          "sampleAnnouncement3Title"
        ),
        description: t(
          "sampleAnnouncement3Text"
        ),
        location:
          lang === "si"
            ? "ප්‍රදේශීය සෞඛ්‍ය මධ්‍යස්ථානය"
            : lang === "ta"
            ? "உள்ளூர் சுகாதார மையம்"
            : "Local Health Centre",
        date: "2026-10-12",
        time: "09:30 AM – 12:30 PM",
        image: "/images/health-office.jpg",
      },
    ],
    [lang]
  );

  const displayedAnnouncements =
    announcements.length > 0
      ? announcements
      : sampleAnnouncements;

  /* =======================================================
     GN OFFICE
  ======================================================= */

  const gnOffice = useMemo(
    () =>
      offices.find(
        (office) =>
          String(
            office.type || ""
          ).toLowerCase() ===
          "gn office"
      ) || fallbackOffices[0],
    [offices]
  );

  /* =======================================================
     FUNCTIONS
  ======================================================= */

  const nextHero = () => {
    setHeroImageIndex(
      (current) =>
        (current + 1) %
        heroImages.length
    );
  };

  const previousHero = () => {
    setHeroImageIndex(
      (current) =>
        (current - 1 + heroImages.length) %
        heroImages.length
    );
  };

  const openImage = (
    src,
    title = ""
  ) => {
    setImageViewer({
      src,
      title,
    });
  };

  const scrollToSection = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const handleComplaintTypeChange = (
    value
  ) => {
    const type =
      complaintTypes.find(
        (item) =>
          item.code === value
      );

    setComplaint(
      (previous) => ({
        ...previous,
        type: value,
        officer:
          type?.officer ||
          "GN Officer",
      })
    );
  };

  const getComplaintLabel = (
    item
  ) => {
    if (lang === "si")
      return item.si;

    if (lang === "ta")
      return item.ta;

    return item.en;
  };

  const getOfficerLabel = (
    item
  ) => {
    if (lang === "si")
      return item.si;

    if (lang === "ta")
      return item.ta;

    return item.en;
  };

  /* =======================================================
     COMPLAINT
  ======================================================= */

  const submitComplaint = async (
    event
  ) => {
    event.preventDefault();

    setComplaintMessage("");

    try {
      const formData =
        new FormData();

      formData.append(
        "type",
        complaint.type
      );

      formData.append(
        "officer",
        complaint.officer
      );

      formData.append(
        "location",
        complaint.location
      );

      formData.append(
        "description",
        complaint.description
      );

      if (complaint.photo) {
        formData.append(
          "photo",
          complaint.photo
        );
      }

      const response =
        await fetch(
          `${API}/complaints`,
          {
            method: "POST",
            body: formData,
          }
        );

      const text =
        await response.text();

      let data = {};

      try {
        data = JSON.parse(text);
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Complaint failed"
        );
      }

      setComplaintMessage(
        data.referenceNo
          ? `${t(
              "complaintSuccess"
            )} Reference: ${
              data.referenceNo
            }`
          : t(
              "complaintSuccess"
            )
      );

      setComplaint({
        type: "roads",
        officer: "GN Officer",
        location: "",
        description: "",
        photo: null,
      });

      if (
        complaintFileRef.current
      ) {
        complaintFileRef.current.value =
          "";
      }
    } catch (error) {
      console.error(error);

      setComplaintMessage(
        t(
          "complaintFailed"
        )
      );
    }
  };

  /* =======================================================
   PORTAL LOGIN
======================================================= */

// Open the selected portal login modal
const selectPortal = (portal) => {
  setSelectedPortal(portal);
  setPortalModal(true);

  // Clear previous login message
  setLoginMessage("");

  // Clear previous login details
  setLogin({
    username: "",
    password: "",
    houseNumber: "",
  });
};

// Close the portal login modal
const closePortalModal = () => {
  setPortalModal(false);
  setSelectedPortal(null);
  setLoginMessage("");

  setLogin({
    username: "",
    password: "",
    houseNumber: "",
  });
};

// Handle portal login
const loginPortal = async (event) => {
  event.preventDefault();

  setLoginMessage("");

  if (!selectedPortal) {
    setLoginMessage("Please select a portal.");
    return;
  }

  // For Family Portal use house number.
  // For other portals use username.
  const loginValue =
    selectedPortal.id === "family"
      ? login.houseNumber.trim()
      : login.username.trim();

  if (!loginValue) {
    setLoginMessage(
      selectedPortal.id === "family"
        ? "Please enter your house number."
        : "Please enter your username."
    );
    return;
  }

  if (!login.password) {
    setLoginMessage("Please enter your password.");
    return;
  }

  try {
    const response = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username:
          selectedPortal.id === "family"
            ? ""
            : login.username.trim(),

        houseNumber:
          selectedPortal.id === "family"
            ? login.houseNumber.trim()
            : "",

        password: login.password,
      }),
    });

    const responseText = await response.text();

    let data = {};

    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch {
      data = {
        message:
          responseText ||
          "The server returned an invalid response.",
      };
    }

    if (!response.ok) {
      setLoginMessage(data.message || t("loginFailed"));
      return;
    }

    // DB එකේ 'role' field එකක් නැතිනම් 'username' එක role එක ලෙස ගන්න
    const role = data.role || data.user?.role || data.user?.username;

    if (!role) {
      setLoginMessage(
        "Login successful, but the server did not return the user role."
      );
      return;
    }

    // Portal → backend role mapping
    // Portal → backend role mapping (Arrays භාවිතයෙන්)
    const portalRoleMap = {
      family: ["family"],
      welfare: ["welfare"],
      youth: ["youthsports"],
      health: ["health"],
      gn: ["gnadmin"],
    };
const allowedRoles = portalRoleMap[selectedPortal.id] || [];

// Prevent an account from opening the wrong portal
if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
  setLoginMessage("This account does not belong to the selected portal.");
  return;
}

// දෙවන Duplicate / Bug එක සහිත if (expectedRole ...) කොටස සම්පූර්ණයෙන්ම ඉවත් කරන්න (Delete කරන්න).

    // Save JWT token & User Details
    if (data.token) {
      localStorage.setItem("gramalk_token", data.token);
    }

    if (data.user) {
      localStorage.setItem("gramalk_user", JSON.stringify(data.user));
    }

    setLoginMessage(data.message || t("loginSuccess"));

    // Redirect according to user role
    switch (role) {
      case "gnadmin":
        window.location.href = "/gn-portal";
        break;

      case "welfare":
        window.location.href = "/welfare-portal";
        break;

      case "health":
        window.location.href = "/health-portal";
        break;

      case "youthsports":
        window.location.href = "/youth-sports-portal";
        break;

      case "family":
        window.location.href = "/family-portal";
        break;

      default:
        setLoginMessage(
          "Login successful, but no portal is assigned to this account."
        );
    }
  } catch (error) {
    console.error("GramaLK login error:", error);

    setLoginMessage(
      "Cannot connect to the GramaLK server. Please make sure the backend server is running."
    );
  }
};

  
  /* =======================================================
     CHATBOT
  ======================================================= */

  useEffect(() => {
    if (
      chatOpen &&
      chatMessages.length === 0
    ) {
      setChatMessages([
        {
          role: "assistant",
          content:
            t("chatbotWelcome"),
        },
      ]);
    }
  }, [chatOpen, lang]);

  const sendChat = async () => {
    const message =
      chatInput.trim();

    if (
      !message ||
      chatBusy
    ) {
      return;
    }

    setChatMessages(
      (previous) => [
        ...previous,
        {
          role: "user",
          content: message,
        },
      ]
    );

    setChatInput("");
    setChatBusy(true);

    try {
      const websiteContext = {
        language: lang,

        gnOfficer: {
          name:
            gnOffice.personName,
          position:
            gnOffice.position,
          phone:
            gnOffice.phone,
          email:
            gnOffice.email,
          address:
            gnOffice.address,
          officeDays:
            gnOffice.officeDays,
          officeHours:
            gnOffice.officeHours,
          fieldDays:
            gnOffice.fieldDays,
          fieldHours:
            gnOffice.fieldHours,
        },

        offices,
        forms,
        announcements:
          displayedAnnouncements,
        complaintTypes,
      };

      const response =
        await fetch(
          `${API}/chat`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              message,
              language: lang,
              websiteContext,
            }),
          }
        );

      const text =
        await response.text();

      let data = {};

      try {
        data = JSON.parse(text);
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Chatbot error"
        );
      }

      const reply =
        data.reply ||
        data.message ||
        data.answer;

      if (!reply) {
        throw new Error(
          "No chatbot reply"
        );
      }

      setChatMessages(
        (previous) => [
          ...previous,
          {
            role: "assistant",
            content: reply,
          },
        ]
      );
    } catch (error) {
      console.error(error);

      const fallback =
        lang === "si"
          ? "සමාවන්න. දැනට සහායක සේවාව සම්බන්ධ කරගත නොහැක."
          : lang === "ta"
          ? "மன்னிக்கவும். தற்போது உதவியாளர் சேவையை அணுக முடியவில்லை."
          : "Sorry. The assistant is currently unavailable.";

      setChatMessages(
        (previous) => [
          ...previous,
          {
            role: "assistant",
            content:
              fallback,
          },
        ]
      );
    } finally {
      setChatBusy(false);
    }
  }; 
  

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="gramalk-app">

      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="main-header">
        <div className="header-inner">

          <button
            className="brand"
            onClick={() =>
              scrollToSection(
                "home"
              )
            }
          >
            <img
              src="/images/logo.png"
              alt="GramaLK"
              className="brand-logo"
            />

            <div className="brand-text">
              <strong>
                GramaLK
              </strong>

              <span>
                {lang === "si"
                  ? "ඩිජිටල් ප්‍රජා සේවා"
                  : lang === "ta"
                  ? "டிஜிட்டல் சமூக சேவைகள்"
                  : "Digital Community Services"}
              </span>
            </div>
          </button>

          <nav className="desktop-nav">
            <a href="#home">
              {t("home")}
            </a>

            <a href="#services">
              {t("services")}
            </a>

            <a href="#announcements">
              {t(
                "announcements"
              )}
            </a>

            <a href="#portals">
              {t("portals")}
            </a>

            <a href="#offices">
              {t("offices")}
            </a>

            <a href="#forms">
              {t("forms")}
            </a>

            <a href="#complaint">
              {t("complaint")}
            </a>
          </nav>

          <div className="header-controls">

            <select
              value={lang}
              onChange={(
                event
              ) =>
                setLang(
                  event.target
                    .value
                )
              }
              aria-label={t(
                "language"
              )}
              className="language-select"
            >
              <option value="en">
                English
              </option>

              <option value="si">
                සිංහල
              </option>

              <option value="ta">
                தமிழ்
              </option>
            </select>

            <button
              className="theme-button"
              onClick={() =>
                setDark(
                  (value) =>
                    !value
                )
              }
              aria-label="Toggle theme"
            >
              {dark
                ? "☀️"
                : "🌙"}
            </button>

            <button
              className="header-login"
              onClick={() =>
                scrollToSection(
                  "portals"
                )
              }
            >
              {t("login")}
            </button>

          </div>
        </div>
      </header>

      {/* ===================================================
          HERO
      =================================================== */}

      <section
        className="hero-banner"
        id="home"
      >
        <div
          className="hero-slider"
          aria-label="GramaLK village highlights"
        >

          {heroImages.map(
            (
              image,
              index
            ) => (
              <article
                key={image}
                className={`hero-slide ${
                  index ===
                  heroImageIndex
                    ? "active"
                    : ""
                }`}
                aria-hidden={
                  index !==
                  heroImageIndex
                }
              >

                <img
                  src={image}
                  alt={`Village ${
                    index + 1
                  }`}
                  onClick={() =>
                    index ===
                      heroImageIndex &&
                    openImage(
                      image,
                      `Village ${
                        index + 1
                      }`
                    )
                  }
                />

                <div className="hero-slide-shade" />

                {index ===
                  heroImageIndex && (
                  <div className="hero-slide-content">

                    <span className="hero-eyebrow">
                      {lang === "si"
                        ? "ප්‍රාදේශීය ඩිජිටල් සේවා"
                        : lang === "ta"
                        ? "உள்ளூர் டிஜிட்டல் சேவைகள்"
                        : "LOCAL DIGITAL COMMUNITY SERVICES"}
                    </span>

                    <h1 className="hero-title-shining">
                      {lang === "si"
                        ? "ඔබේ ගම, ඔබේ සේවා, එකම තැනක"
                        : lang === "ta"
                        ? "உங்கள் கிராமம், உங்கள் சேவைகள், ஒரே இடத்தில்"
                        : "Your Village, Your Services, One Place"}
                    </h1>

                    <p>
                      {lang === "si"
                        ? "ප්‍රදේශීය තොරතුරු, රාජ්‍ය සේවා, නිවේදන සහ ප්‍රජා සම්බන්ධතා පහසුවෙන් ලබාගන්න."
                        : lang === "ta"
                        ? "உள்ளூர் தகவல்கள், அரச சேவைகள், அறிவிப்புகள் மற்றும் சமூக தொடர்புகளை ஒரே இடத்தில் எளிதாக அணுகுங்கள்."
                        : "Access local information, government services, announcements and community support in one place."}
                    </p>

                    <div className="hero-actions">

                      <button
                        className="primary-button"
                        onClick={() =>
                          scrollToSection(
                            "services"
                          )
                        }
                      >
                        {t(
                          "quickServices"
                        )}
                      </button>

                      <button
                        className="secondary-button"
                        onClick={() =>
                          setChatOpen(
                            true
                          )
                        }
                      >
                        {t(
                          "chatbot"
                        )}
                      </button>

                    </div>

                  </div>
                )}

              </article>
            )
          )}

          <button
            className="hero-slider-arrow hero-prev"
            onClick={
              previousHero
            }
            aria-label="Previous slide"
          >
            ‹
          </button>

          <button
            className="hero-slider-arrow hero-next"
            onClick={
              nextHero
            }
            aria-label="Next slide"
          >
            ›
          </button>

          <div className="hero-dots">

            {heroImages.map(
              (
                image,
                index
              ) => (
                <button
                  key={image}
                  className={`hero-dot ${
                    index ===
                    heroImageIndex
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setHeroImageIndex(
                      index
                    )
                  }
                  aria-label={`Village image ${
                    index + 1
                  }`}
                />
              )
            )}

          </div>

          <div className="hero-slide-counter">
            {heroImageIndex +
              1}{" "}
            /{" "}
            {
              heroImages.length
            }
          </div>

        </div>
      </section>

      {/* ===================================================
          PURPOSE
      =================================================== */}

      <section className="content-section purpose-section">
        <div className="section-container purpose-grid">

          <div className="purpose-content">

            <span className="section-kicker">
              GramaLK
            </span>

            <h2>
              {t(
                "purposeTitle"
              )}
            </h2>

            <p>
              {t(
                "purposeText"
              )}
            </p>

            <div className="purpose-points">

              <div>
                <span>✓</span>

                <p>
                  {lang === "si"
                    ? "ප්‍රදේශීය තොරතුරු පහසුවෙන් ලබාගන්න"
                    : lang === "ta"
                    ? "உள்ளூர் தகவல்களை எளிதாகப் பெறுங்கள்"
                    : "Access local information easily"}
                </p>
              </div>

              <div>
                <span>✓</span>

                <p>
                  {lang === "si"
                    ? "රාජ්‍ය සේවා සහ අයදුම්පත් සොයන්න"
                    : lang === "ta"
                    ? "அரச சேவைகள் மற்றும் விண்ணப்பங்களைத் தேடுங்கள்"
                    : "Find government services and forms"}
                </p>
              </div>

              <div>
                <span>✓</span>

                <p>
                  {lang === "si"
                    ? "ප්‍රජා ගැටලු වාර්තා කරන්න"
                    : lang === "ta"
                    ? "சமூக பிரச்சினைகளைப் பதிவு செய்யுங்கள்"
                    : "Report community issues"}
                </p>
              </div>

            </div>
          </div>

          <div className="purpose-image-card">

            <img
              src="/images/gn-office2.jpg"
              alt="Village community"
              onClick={() =>
                openImage(
                  "/images/gn-office2.jpg",
                  t(
                    "purposeTitle"
                  )
                )
              }
            />

          </div>

        </div>
      </section>

      {/* ===================================================
          SERVICES
      =================================================== */}

      <section
        className="content-section"
        id="services"
      >
        <div className="section-container">

          <div className="section-heading">

            <span className="section-kicker">
              GramaLK
            </span>

            <h2>
              {t(
                "localServices"
              )}
            </h2>

          </div>

          <div className="service-grid">

            <button
              className="service-card"
              onClick={() =>
                scrollToSection(
                  "announcements"
                )
              }
            >
              <span className="service-icon">
                📢
              </span>

              <h3>
                {t(
                  "announcements"
                )}
              </h3>

              <p>
                {lang === "si"
                  ? "නවතම ප්‍රදේශීය නිවේදන බලන්න."
                  : lang === "ta"
                  ? "சமீபத்திய உள்ளூர் அறிவிப்புகளைப் பார்க்கவும்."
                  : "View the latest local announcements."}
              </p>
            </button>

            <button
              className="service-card"
              onClick={() =>
                scrollToSection(
                  "forms"
                )
              }
            >
              <span className="service-icon">
                📄
              </span>

              <h3>
                {t("forms")}
              </h3>

              <p>
                {lang === "si"
                  ? "වැදගත් අයදුම්පත් සොයා බාගත කරන්න."
                  : lang === "ta"
                  ? "முக்கிய விண்ணப்பங்களைத் தேடி பதிவிறக்கவும்."
                  : "Find and download important forms."}
              </p>
            </button>

            <button
              className="service-card"
              onClick={() =>
                scrollToSection(
                  "complaint"
                )
              }
            >
              <span className="service-icon">
                📝
              </span>

              <h3>
                {t(
                  "complaint"
                )}
              </h3>

              <p>
                {lang === "si"
                  ? "ප්‍රදේශීය ගැටලු සහ පැමිණිලි ඉදිරිපත් කරන්න."
                  : lang === "ta"
                  ? "உள்ளூர் பிரச்சினைகள் மற்றும் முறைப்பாடுகளைச் சமர்ப்பிக்கவும்."
                  : "Submit local issues and complaints."}
              </p>
            </button>

            <button
              className="service-card"
              onClick={() =>
                scrollToSection(
                  "offices"
                )
              }
            >
              <span className="service-icon">
                🏢
              </span>

              <h3>
                {t(
                  "offices"
                )}
              </h3>

              <p>
                {lang === "si"
                  ? "ප්‍රදේශීය කාර්යාල සහ සම්බන්ධතා තොරතුරු බලන්න."
                  : lang === "ta"
                  ? "உள்ளூர் அலுவலகங்கள் மற்றும் தொடர்பு விபரங்களைப் பார்க்கவும்."
                  : "Find local offices and contact details."}
              </p>
            </button>

          </div>
        </div>
      </section>

      {/* ===================================================
          ACTIVITY GALLERY
      =================================================== */}

      <section className="content-section gallery-section">
        <div className="section-container">

          <div className="section-heading">

            <span className="section-kicker">
              Community
            </span>

            <h2>
              {t(
                "villageGallery"
              )}
            </h2>

          </div>

          <div
            className="activity-gallery"
            ref={galleryRef}
          >

            {activities.map(
              (activity) => {
                const title =
                  lang === "si"
                    ? activity.titleSi
                    : lang === "ta"
                    ? activity.titleTa
                    : activity.titleEn;

                const description =
                  lang === "si"
                    ? activity.descriptionSi
                    : lang === "ta"
                    ? activity.descriptionTa
                    : activity.descriptionEn;

                return (
                  <article
                    className="gallery-card"
                    key={
                      activity.image
                    }
                  >

                    <div className="gallery-image-wrapper">

                      <img
                        src={
                          activity.image
                        }
                        alt={
                          title
                        }
                        onClick={() =>
                          openImage(
                            activity.image,
                            title
                          )
                        }
                      />

                    </div>

                    <div className="gallery-card-content">

                      <h3>
                        {title}
                      </h3>

                      <p>
                        {
                          description
                        }
                      </p>

                    </div>

                  </article>
                );
              }
            )}

          </div>

        </div>
      </section>

      {/* ===================================================
          ANNOUNCEMENTS
      =================================================== */}

      <section
        className="content-section"
        id="announcements"
      >
        <div className="section-container">

          <div className="section-heading">

            <span className="section-kicker">
              Updates
            </span>

            <h2>
              {t(
                "latestAnnouncements"
              )}
            </h2>

          </div>

          {displayedAnnouncements.length ===
          0 ? (
            <div className="empty-state">
              {t(
                "noAnnouncements"
              )}
            </div>
          ) : (
            <div className="announcement-grid">

              {displayedAnnouncements.map(
                (
                  announcement,
                  index
                ) => (
                  <article
                    className="announcement-card"
                    key={
                      announcement._id ||
                      announcement.id ||
                      index
                    }
                  >

                    <div className="announcement-image">

                      <img
                        src={
                          announcement.image ||
                          announcement.imageUrl ||
                          "/images/activity3.jpg"
                        }
                        alt={
                          localized(
                            announcement,
                            lang,
                            "title"
                          ) ||
                          announcement.title ||
                          "Announcement"
                        }
                      />

                    </div>

                    <div className="announcement-content">

                      <div className="announcement-badge">
                        📢{" "}
                        {t(
                          "announcements"
                        )}
                      </div>

                      <h3>
                        {localized(
                          announcement,
                          lang,
                          "title"
                        ) ||
                          announcement.title ||
                          announcement.titleEn ||
                          ""}
                      </h3>

                      <p>
                        {localized(
                          announcement,
                          lang,
                          "description"
                        ) ||
                          announcement.description ||
                          announcement.descriptionEn ||
                          ""}
                      </p>

                      <div className="announcement-meta">

                        <span>
                          📅{" "}
                          <strong>
                            {t(
                              "date"
                            )}
                            :
                          </strong>{" "}
                          {announcement.date
                            ? formatDateTime(
                                announcement.date,
                                lang
                              )
                            : "-"}
                        </span>

                        <span>
                          🕒{" "}
                          <strong>
                            {t(
                              "time"
                            )}
                            :
                          </strong>{" "}
                          {announcement.time ||
                            "-"}
                        </span>

                        <span>
                          📍{" "}
                          <strong>
                            {t(
                              "location"
                            )}
                            :
                          </strong>{" "}
                          {announcement.location ||
                            announcement.place ||
                            "-"}
                        </span>

                      </div>

                    </div>

                  </article>
                )
              )}

            </div>
          )}

        </div>
      </section>

      {/* ===================================================
          PORTALS
      =================================================== */}

      <section
        className="content-section"
        id="portals"
      >
        <div className="section-container">

          <div className="section-heading">

            <span className="section-kicker">
              Secure Access
            </span>

            <h2>
              {t(
                "communityPortals"
              )}
            </h2>

          </div>

          <div className="portal-grid">

            {portals.map(
              (portal) => (
                <article
                  className="portal-card"
                  key={portal.id}
                >

                  <div className="portal-image">

                    <img
                      src={
                        portal.image
                      }
                      alt={t(
                        portal.title
                      )}
                    />

                    <span className="portal-icon">
                      {
                        portal.icon
                      }
                    </span>

                  </div>

                  <div className="portal-content">

                    <h3>
                      {t(
                        portal.title
                      )}
                    </h3>

                    <p>
                      {t(
                        portal.description
                      )}
                    </p>

                    <button
                      className="primary-button small"
                      onClick={() =>
                        selectPortal(
                          portal
                        )
                      }
                    >
                      {t(
                        "login"
                      )}
                    </button>

                  </div>

                </article>
              )
            )}

          </div>

        </div>
      </section>

      {/* ===================================================
          OFFICES
      =================================================== */}

      <section
        className="content-section offices-section"
        id="offices"
      >
        <div className="section-container">

          <div className="section-heading">

            <span className="section-kicker">
              Local Government
            </span>

            <h2>
              {t(
                "offices"
              )}
            </h2>

          </div>

          <div className="office-grid">

            {offices.map(
              (
                office,
                index
              ) => {
                const isGN =
                  String(
                    office.type ||
                      ""
                  ).toLowerCase() ===
                  "gn office";

                return (
                  <article
                    className={`office-card ${
                      isGN
                        ? "gn-office-card"
                        : ""
                    }`}
                    key={
                      office._id ||
                      office.id ||
                      index
                    }
                  >

                    <div className="office-image">

                      <img
                        src={
                          office.image ||
                          office.personImage ||
                          "/images/gn-office.jpg"
                        }
                        alt={
                          office.name ||
                          office.position ||
                          "Office"
                        }
                      />

                    </div>

                    <div className="office-content">

                      <span className="office-type">
                        {office.type ||
                          "Community Office"}
                      </span>

                      <h3>
                        {office.name ||
                          office.position ||
                          "Local Office"}
                      </h3>

                      {office.personName && (
                        <p>
                          <strong>
                            {t(
                              "name"
                            )}
                            :
                          </strong>{" "}
                          {
                            office.personName
                          }
                        </p>
                      )}

                      {office.position && (
                        <p>
                          <strong>
                            {t(
                              "officer"
                            )}
                            :
                          </strong>{" "}
                          {
                            office.position
                          }
                        </p>
                      )}

                      {office.phone && (
                        <p>
                          <strong>
                            {t(
                              "phone"
                            )}
                            :
                          </strong>{" "}
                          {
                            office.phone
                          }
                        </p>
                      )}

                      {office.email && (
                        <p>
                          <strong>
                            {t(
                              "email"
                            )}
                            :
                          </strong>{" "}
                          {
                            office.email
                          }
                        </p>
                      )}

                      {office.address && (
                        <p>
                          <strong>
                            {t(
                              "location"
                            )}
                            :
                          </strong>{" "}
                          {
                            office.address
                          }
                        </p>
                      )}

                      {isGN && (
                        <div className="gn-schedule">

                          <p>
                            <strong>
                              {t(
                                "officeDays"
                              )}
                              :
                            </strong>{" "}
                            {office.officeDays ||
                              "-"}
                          </p>

                          <p>
                            <strong>
                              {t(
                                "officeHours"
                              )}
                              :
                            </strong>{" "}
                            {office.officeHours ||
                              "-"}
                          </p>

                          <p>
                            <strong>
                              {t(
                                "fieldDays"
                              )}
                              :
                            </strong>{" "}
                            {office.fieldDays ||
                              "-"}
                          </p>

                          <p>
                            <strong>
                              {t(
                                "fieldHours"
                              )}
                              :
                            </strong>{" "}
                            {office.fieldHours ||
                              "-"}
                          </p>

                          <p>
                            <strong>
                              {t(
                                "serviceDays"
                              )}
                              :
                            </strong>{" "}
                            {office.authorityDates ||
                              office.serviceDays ||
                              office.officeDays ||
                              "-"}
                          </p>

                          <p>
                            <strong>
                              {t(
                                "holidays"
                              )}
                              :
                            </strong>{" "}
                            {office.holidays ||
                              "-"}
                          </p>

                        </div>
                      )}

                      {office.mapQuery && (
                        <button
                          className="text-button"
                          onClick={() =>
                            scrollToSection(
                              "map"
                            )
                          }
                        >
                          📍{" "}
                          {t(
                            "map"
                          )}
                        </button>
                      )}

                    </div>

                  </article>
                );
              }
            )}

          </div>

        </div>
      </section>

      {/* ===================================================
          FORMS
      =================================================== */}

      <section
        className="content-section"
        id="forms"
      >
        <div className="section-container">

          <div className="section-heading">

            <span className="section-kicker">
              Documents
            </span>

            <h2>
              {t(
                "importantForms"
              )}
            </h2>

          </div>

          {forms.length ===
          0 ? (
            <div className="empty-state">
              {t(
                "noForms"
              )}
            </div>
          ) : (
            <div className="forms-grid">

              {forms.map(
                (
                  form,
                  index
                ) => (
                  <article
                    className="form-card"
                    key={
                      form._id ||
                      form.id ||
                      index
                    }
                  >

                    <div className="form-icon">
                      📄
                    </div>

                    <div>

                      <h3>
                        {localized(
                          form,
                          lang,
                          "title"
                        ) ||
                          form.title ||
                          form.name}
                      </h3>

                      <span>
                        {form.category ||
                          form.type ||
                          "Application"}
                      </span>

                    </div>

                    {form.file && (
                      <a
                        href={
                          form.file
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="primary-button small"
                      >
                        {t(
                          "download"
                        )}
                      </a>
                    )}

                  </article>
                )
              )}

            </div>
          )}

        </div>
      </section>

      {/* ===================================================
          COMPLAINT
      =================================================== */}

      <section
        className="content-section complaint-section"
        id="complaint"
      >
        <div className="section-container complaint-grid">

          <div className="complaint-preview">

            <img
              src="/images/complaint-preview.jpg"
              alt={t(
                "complaint"
              )}
            />

            <div className="complaint-preview-overlay">

              <span>
                {lang === "si"
                  ? "ප්‍රජා ගැටලු වාර්තා කරන්න"
                  : lang === "ta"
                  ? "சமூக பிரச்சினைகளைப் பதிவு செய்யுங்கள்"
                  : "Report Community Issues"}
              </span>

            </div>

          </div>

          <div className="complaint-form-wrapper">

            <div className="section-heading left">

              <span className="section-kicker">
                GramaLK
              </span>

              <h2>
                {t(
                  "complaint"
                )}
              </h2>

            </div>

            <form
              className="complaint-form"
              onSubmit={
                submitComplaint
              }
            >

              <label>
                {t(
                  "complaintType"
                )}

                <select
                  value={
                    complaint.type
                  }
                  onChange={(
                    event
                  ) =>
                    handleComplaintTypeChange(
                      event
                        .target
                        .value
                    )
                  }
                >
                  {complaintTypes.map(
                    (
                      item
                    ) => (
                      <option
                        value={
                          item.code
                        }
                        key={
                          item.code
                        }
                      >
                        {getComplaintLabel(
                          item
                        )}
                      </option>
                    )
                  )}
                </select>
              </label>

              <label>
                {t(
                  "responsibleOfficer"
                )}

                <select
                  value={
                    complaint.officer
                  }
                  onChange={(
                    event
                  ) =>
                    setComplaint(
                      (
                        previous
                      ) => ({
                        ...previous,
                        officer:
                          event
                            .target
                            .value,
                      })
                    )
                  }
                >
                  {officers.map(
                    (
                      item
                    ) => (
                      <option
                        key={
                          item.en
                        }
                        value={
                          item.en
                        }
                      >
                        {getOfficerLabel(
                          item
                        )}
                      </option>
                    )
                  )}
                </select>
              </label>

              <label>
                {t(
                  "location"
                )}

                <input
                  type="text"
                  value={
                    complaint.location
                  }
                  onChange={(
                    event
                  ) =>
                    setComplaint(
                      (
                        previous
                      ) => ({
                        ...previous,
                        location:
                          event
                            .target
                            .value,
                      })
                    )
                  }
                  placeholder={
                    lang === "si"
                      ? "ගැටලුව ඇති ස්ථානය"
                      : lang === "ta"
                      ? "பிரச்சினை ஏற்பட்ட இடம்"
                      : "Location of the issue"
                  }
                  required
                />
              </label>

              <label>
                {t(
                  "description"
                )}

                <textarea
                  value={
                    complaint.description
                  }
                  onChange={(
                    event
                  ) =>
                    setComplaint(
                      (
                        previous
                      ) => ({
                        ...previous,
                        description:
                          event
                            .target
                            .value,
                      })
                    )
                  }
                  placeholder={
                    lang === "si"
                      ? "ගැටලුව පිළිබඳ විස්තර කරන්න"
                      : lang === "ta"
                      ? "பிரச்சினையை விவரிக்கவும்"
                      : "Describe the issue"
                  }
                  rows="5"
                  required
                />
              </label>

              <label>
                {t(
                  "photo"
                )}{" "}
                <small>
                  (
                  {t(
                    "optional"
                  )}
                  )
                </small>

                <input
                  ref={
                    complaintFileRef
                  }
                  type="file"
                  accept="image/*"
                  onChange={(
                    event
                  ) =>
                    setComplaint(
                      (
                        previous
                      ) => ({
                        ...previous,
                        photo:
                          event
                            .target
                            .files?.[0] ||
                          null,
                      })
                    )
                  }
                />
              </label>

              {complaintMessage && (
                <div
                  className={`form-message ${
                    complaintMessage.includes(
                      t(
                        "complaintSuccess"
                      )
                    )
                      ? "success"
                      : "error"
                  }`}
                >
                  {
                    complaintMessage
                  }
                </div>
              )}

              <button
                className="primary-button"
                type="submit"
              >
                {t(
                  "submitComplaint"
                )}
              </button>

              <p className="form-note">
                {t(
                  "anonymousNote"
                )}
              </p>

            </form>

          </div>

        </div>
      </section>

      {/* ===================================================
          GN OFFICER FEATURE
      =================================================== */}

      <section
        className="content-section officer-feature"
        id="officer"
      >
        <div className="section-container">

          <div className="officer-feature-card">

            <div className="officer-feature-image">

              <img
                src={
                  gnOffice.personImage ||
                  "/images/gn-officer.jpg"
                }
                alt={
                  gnOffice.personName ||
                  "GN Officer"
                }
              />

            </div>

            <div className="officer-feature-content">

              <span className="section-kicker">
                {t(
                  "officer"
                )}
              </span>

              <h2>
                {gnOffice.personName ||
                  t("officer")}
              </h2>

              <p className="officer-position">
                {gnOffice.position ||
                  "Grama Niladhari"}
              </p>

              <div className="schedule-grid">

                <div>
                  <span>
                    📅{" "}
                    {t(
                      "officeDays"
                    )}
                  </span>

                  <strong>
                    {gnOffice.officeDays ||
                      "-"}
                  </strong>
                </div>

                <div>
                  <span>
                    🕒{" "}
                    {t(
                      "officeHours"
                    )}
                  </span>

                  <strong>
                    {gnOffice.officeHours ||
                      "-"}
                  </strong>
                </div>

                <div>
                  <span>
                    📍{" "}
                    {t(
                      "fieldDays"
                    )}
                  </span>

                  <strong>
                    {gnOffice.fieldDays ||
                      "-"}
                  </strong>
                </div>

                <div>
                  <span>
                    🕒{" "}
                    {t(
                      "fieldHours"
                    )}
                  </span>

                  <strong>
                    {gnOffice.fieldHours ||
                      "-"}
                  </strong>
                </div>

              </div>

              <div className="officer-contact">

                {gnOffice.phone && (
                  <a
                    href={`tel:${gnOffice.phone}`}
                  >
                    ☎{" "}
                    {
                      gnOffice.phone
                    }
                  </a>
                )}

                {gnOffice.email && (
                  <a
                    href={`mailto:${gnOffice.email}`}
                  >
                    ✉{" "}
                    {
                      gnOffice.email
                    }
                  </a>
                )}

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ===================================================
          MAP
      =================================================== */}

      <section
        className="content-section map-section"
        id="map"
      >
        <div className="section-container">

          <div className="section-heading">

            <span className="section-kicker">
              Location
            </span>

            <h2>
              {t(
                "mapTitle"
              )}
            </h2>

            <p>
              {t(
                "mapText"
              )}
            </p>

          </div>

          <div className="map-card">

            <iframe
              title="GN Office Map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                gnOffice.mapQuery ||
                  gnOffice.address ||
                  "Sri Lanka"
              )}&z=14&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

          </div>

        </div>
      </section>

      {/* ===================================================
          FOOTER
      =================================================== */}

      <footer className="site-footer gramalk-footer">

        <div className="gramalk-footer-grid">

          <div className="gramalk-footer-column">

            <div className="gramalk-footer-brand">

              <img
                src="/images/logo.png"
                alt="GramaLK"
              />

              <strong>
                GramaLK
              </strong>

            </div>

            <h3>
              {t(
                "aboutGramaLK"
              )}
            </h3>

            <p>
              {t(
                "purposeText"
              )}
            </p>

          </div>

          <div className="gramalk-footer-column">

            <h3>
              {t(
                "aboutGN"
              )}
            </h3>

            <p>
              <strong>
                {gnOffice.personName ||
                  t("officer")}
              </strong>
            </p>

            <p>
              {gnOffice.position ||
                "Grama Niladhari"}
            </p>

            {gnOffice.address && (
              <p>
                📍{" "}
                {
                  gnOffice.address
                }
              </p>
            )}

            <p>
              📅{" "}
              {gnOffice.officeDays ||
                "-"}
            </p>

            <p>
              🕒{" "}
              {gnOffice.officeHours ||
                "-"}
            </p>

            <p>
              📍{" "}
              {t(
                "fieldDays"
              )}
              :{" "}
              {gnOffice.fieldDays ||
                "-"}
            </p>

            <p>
              🕒{" "}
              {t(
                "fieldHours"
              )}
              :{" "}
              {gnOffice.fieldHours ||
                "-"}
            </p>

          </div>

          <div className="gramalk-footer-column">

            <h3>
              {t(
                "quickLinks"
              )}
            </h3>

            <div className="gramalk-footer-links">

              <a href="#home">
                {t(
                  "home"
                )}
              </a>

              <a href="#services">
                {t(
                  "services"
                )}
              </a>

              <a href="#announcements">
                {t(
                  "announcements"
                )}
              </a>

              <a href="#portals">
                {t(
                  "portals"
                )}
              </a>

              <a href="#offices">
                {t(
                  "offices"
                )}
              </a>

              <a href="#map">
                {t(
                  "map"
                )}
              </a>

            </div>

          </div>

          <div className="gramalk-footer-column">

            <h3>
              {t(
                "ourServices"
              )}
            </h3>

            <div className="gramalk-footer-links">

              <a href="#forms">
                {t(
                  "forms"
                )}
              </a>

              <a href="#officer">
                {t(
                  "officer"
                )}
              </a>

              <a href="#complaint">
                {t(
                  "complaint"
                )}
              </a>

              <a href="#announcements">
                {t(
                  "announcements"
                )}
              </a>

              <a href="#portals">
                {t(
                  "portals"
                )}
              </a>

            </div>

          </div>

          <div className="gramalk-footer-column gramalk-footer-contact">

            <h3>
              {t(
                "contactDetails"
              )}
            </h3>

            {gnOffice.phone && (
              <a
                href={`tel:${gnOffice.phone}`}
              >
                ☎{" "}
                {
                  gnOffice.phone
                }
              </a>
            )}

            {gnOffice.email && (
              <a
                href={`mailto:${gnOffice.email}`}
              >
                ✉{" "}
                {
                  gnOffice.email
                }
              </a>
            )}

            {gnOffice.address && (
              <p>
                📍{" "}
                {
                  gnOffice.address
                }
              </p>
            )}

            <p>
              📅{" "}
              {gnOffice.officeDays ||
                "-"}
            </p>

            <p>
              🕒{" "}
              {gnOffice.officeHours ||
                "-"}
            </p>

          </div>

        </div>

        <div className="gramalk-footer-bottom">

          <span>
            {lang === "si"
              ? "ඩිජිටල් ප්‍රජා සේවා · © 2026"
              : lang === "ta"
              ? "டிஜிட்டல் சமூக சேவைகள் · © 2026"
              : "Digital Community Services · © 2026"}
          </span>

          <span>
            GramaLK ·{" "}
            {gnOffice.name ||
              "Grama Niladhari Office"}
          </span>

        </div>

      </footer>

      {/* ===================================================
          CHATBOT
      =================================================== */}

      {!chatOpen && (
        <button
          className="chatbot-floating-button"
          onClick={() =>
            setChatOpen(true)
          }
          aria-label={t(
            "chatbot"
          )}
        >

          <img
            src="/images/chatbot-logo.jpg"
            alt="GramaLK Assistant"
          />

          <span className="chatbot-floating-label">
            {t(
              "chatbot"
            )}
          </span>

        </button>
      )}

      {chatOpen && (
        <div className="chatbot-panel">

          <div className="chatbot-header">

            <div className="chatbot-title">

              <img
                src="/images/chatbot-logo.jpg"
                alt="GramaLK Assistant"
              />

              <div>

                <strong>
                  {t(
                    "chatbot"
                  )}
                </strong>

                <span>
                  {lang === "si"
                    ? "ඔබට සහාය වීමට සූදානම්"
                    : lang === "ta"
                    ? "உங்களுக்கு உதவ தயாராக உள்ளது"
                    : "Ready to help"}
                </span>

              </div>

            </div>

            <button
              onClick={() =>
                setChatOpen(
                  false
                )
              }
              aria-label={t(
                "close"
              )}
            >
              ×
            </button>

          </div>

          <div className="chatbot-messages">

            {chatMessages.map(
              (
                message,
                index
              ) => (
                <div
                  className={`chat-message ${
                    message.role ===
                    "user"
                      ? "user"
                      : "assistant"
                  }`}
                  key={index}
                >
                  {
                    message.content
                  }
                </div>
              )
            )}

            {chatBusy && (
              <div className="chat-message assistant typing">

                <span />
                <span />
                <span />

              </div>
            )}

          </div>

          <div className="chatbot-input-area">

            <input
              type="text"
              value={
                chatInput
              }
              onChange={(
                event
              ) =>
                setChatInput(
                  event.target
                    .value
                )
              }
              onKeyDown={(
                event
              ) => {
                if (
                  event.key ===
                  "Enter"
                ) {
                  sendChat();
                }
              }}
              placeholder={t(
                "chatbotPlaceholder"
              )}
            />

            <button
              onClick={
                sendChat
              }
              disabled={
                chatBusy
              }
            >
              {t("send")}
            </button>

          </div>

          <button
            className="chatbot-exit"
            onClick={() =>
              setChatOpen(
                false
              )
            }
          >
            {t("exit")}
          </button>

        </div>
      )}

      {/* ===================================================
          IMAGE VIEWER
      =================================================== */}

      {imageViewer && (
        <div
          className="image-modal"
          onClick={() =>
            setImageViewer(
              null
            )
          }
        >

          <button
            className="image-modal-close"
            onClick={() =>
              setImageViewer(
                null
              )
            }
          >
            ×
          </button>

          <img
            src={
              imageViewer.src
            }
            alt={
              imageViewer.title
            }
            onClick={(
              event
            ) =>
              event.stopPropagation()
            }
          />

          {imageViewer.title && (
            <div className="image-modal-title">
              {
                imageViewer.title
              }
            </div>
          )}

        </div>
      )}

      {/* ===================================================
          PORTAL LOGIN MODAL
      =================================================== */}

      {portalModal &&
        selectedPortal && (
          <div
            className="modal-backdrop"
            onClick={() =>
              setPortalModal(
                false
              )
            }
          >

            <div
              className="login-modal"
              onClick={(
                event
              ) =>
                event.stopPropagation()
              }
            >

              <button
                className="modal-close"
                onClick={() =>
                  setPortalModal(
                    false
                  )
                }
              >
                ×
              </button>

              <img
                src={
                  selectedPortal.image
                }
                alt={t(
                  selectedPortal.title
                )}
                className="login-modal-image"
              />

              <div className="login-modal-content">

                <span className="section-kicker">
                  {t(
                    "secureAccess"
                  )}
                </span>

                <h2>
                  {t(
                    selectedPortal.title
                  )}
                </h2>

                <p>
                  {t(
                    selectedPortal.description
                  )}
                </p>

                <form
                  className="login-form"
                  onSubmit={
                    loginPortal
                  }
                >

                  {selectedPortal.id ===
                  "family" ? (
                    <>
                      <label>
                        {t(
                          "houseNumber"
                        )}

                        <input
                          type="text"
                          value={
                            login.houseNumber
                          }
                          onChange={(
                            event
                          ) =>
                            setLogin(
                              (
                                previous
                              ) => ({
                                ...previous,
                                houseNumber:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                          required
                        />
                      </label>

                      <label>
                        {t(
                          "password"
                        )}

                        <input
                          type="password"
                          value={
                            login.password
                          }
                          onChange={(
                            event
                          ) =>
                            setLogin(
                              (
                                previous
                              ) => ({
                                ...previous,
                                password:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                          required
                        />
                      </label>
                    </>
                  ) : (
                    <>
                      <label>
                        {t(
                          "username"
                        )}

                        <input
                          type="text"
                          value={
                            login.username
                          }
                          onChange={(
                            event
                          ) =>
                            setLogin(
                              (
                                previous
                              ) => ({
                                ...previous,
                                username:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                          required
                        />
                      </label>

                      <label>
                        {t(
                          "password"
                        )}

                        <input
                          type="password"
                          value={
                            login.password
                          }
                          onChange={(
                            event
                          ) =>
                            setLogin(
                              (
                                previous
                              ) => ({
                                ...previous,
                                password:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                          required
                        />
                      </label>
                    </>
                  )}

                  {loginMessage && (
                    <div className="form-message">
                      {
                        loginMessage
                      }
                    </div>
                  )}

                  <button
                    className="primary-button"
                    type="submit"
                  >
                    {t(
                      "login"
                    )}
                  </button>

                </form>

              </div>

            </div>

          </div>
        )}

    </div>
  );
}
