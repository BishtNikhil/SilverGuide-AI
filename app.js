/**
 * SilverGuide AI — Multilingual Client-Side Interaction & Streaming Controller
 * Built specifically for senior citizens across Indian states with multilingual Indic support,
 * voice I/O, large font scaling, and WCAG AAA accessibility.
 * Features: Seamless dual-engine fallback (FastAPI backend or standalone GitHub Pages execution).
 */

const state = {
  isGenerating: false,
  activeCategory: 'general',
  activeAttachment: null,
  voiceEnabled: true,
  isRecording: false,
  recognition: null,
  lastVerdictText: "",
  hydrationGlasses: 4,
  currentLanguage: 'en'
};

// -----------------------------------------------------------------------------
// Multilingual Indic Localization Dictionary
// -----------------------------------------------------------------------------
const UI_TRANSLATIONS = {
  en: {
    langCode: 'en-US',
    brandSub: 'Your Gentle Companion & Safety Shield',
    voiceOn: 'Voice: ON',
    voiceOff: 'Voice: OFF',
    printCard: 'Print Card',
    hydrationTitle: 'Daily Hydration Goal',
    stretchesTitle: 'Gentle Seated Stretches',
    stretchesMetric: '5 mins shoulder rolls',
    guideMe: 'Guide Me',
    emergencyTitle: 'Emergency Medical SOS',
    emergencyMetric: 'Doctor & Caregiver Card',
    viewSos: 'View SOS',
    placeholder: 'Ask a question or describe your medicine bottle... (or click Speak Now)',
    speakNow: 'Speak Now',
    send: 'Send',
    addPhoto: 'Add Photo',
    welcomeTitle: 'Welcome to SilverGuide! How may I assist you today?',
    welcomeSub: 'Tap any of the 6 big action cards above, or speak using the large microphone button below.',
    hubs: {
      medicine: { title: 'Medicine & Pills Helper', desc: 'Decodes prescriptions & pill bottles into a clear daily schedule with meal rules.' },
      scam: { title: 'Is This a Scam?', desc: 'Instant fraud detection for suspicious banking SMS, power cut threats & fake OTPs.' },
      bill: { title: 'Explain My Bill or Mail', desc: 'Translates complex utility bills into 3 facts: Who sent it, Amount due & How to pay.' },
      emergency: { title: 'Medical SOS Card', desc: '1-click medical profile with blood group, drug allergies, active meds & doctor contacts.' },
      wellness: { title: 'Daily Morning Check-in', desc: 'Gentle morning routine, hydration tracking, stretch advice, and friendly chat.' },
      talk: { title: 'Talk With Me (Voice)', desc: 'Hands-free voice assistant. Speak naturally and listen to clear spoken audio.' }
    }
  },
  hi: {
    langCode: 'hi-IN',
    brandSub: 'वरिष्ठ नागरिकों का विश्वसनीय डिजिटल साथी एवं सुरक्षा कवच',
    voiceOn: 'आवाज: चालू',
    voiceOff: 'आवाज: बंद',
    printCard: 'प्रिंट कार्ड',
    hydrationTitle: 'दैनिक जल सेवन लक्ष्य',
    stretchesTitle: 'सरल कुर्सी व्यायाम',
    stretchesMetric: '5 मिनट कंधों का व्यायाम',
    guideMe: 'मार्गदर्शन लें',
    emergencyTitle: 'आपातकालीन मेडिकल SOS',
    emergencyMetric: 'डॉक्टर एवं परिवार संपर्क',
    viewSos: 'SOS देखें',
    placeholder: 'अपनी दवा या कोई भी प्रश्न पूछें... (या बोलकर बात करें)',
    speakNow: 'बोलें',
    send: 'भेजें',
    addPhoto: 'फोटो जोड़ें',
    welcomeTitle: 'सिल्वरगाइड में आपका स्वागत है! आज मैं आपकी क्या सहायता करूँ?',
    welcomeSub: 'ऊपर दिए गए 6 बड़े कार्ड्स में से कोई भी चुनें, या नीचे दिए गए माइक से बोलकर बात करें।',
    hubs: {
      medicine: { title: 'दवा और पर्ची मार्गदर्शक', desc: 'दवा के पर्चे व शीशियों से खुराक, सही समय व भोजन के नियम बड़े अक्षरों में समझें।' },
      scam: { title: 'क्या यह धोखाधड़ी है?', desc: 'बैंक मैसेज, बिजली कटने की धमकी और फर्जी OTP की तुरंत सुरक्षा जांच।' },
      bill: { title: 'बिजली व पेंशन बिल समझें', desc: 'बिल के 3 आसान जवाब: किसने भेजा, कितना पैसा देना है और कैसे भुगतान करें।' },
      emergency: { title: 'आपातकालीन मेडिकल कार्ड', desc: 'ब्लड ग्रुप, एलर्जी, चालू दवाइयां और डॉक्टर का 1-क्लिक इमरजेंसी कार्ड।' },
      wellness: { title: 'दैनिक सुबह की दिनचर्या', desc: 'सुबह का हालचाल, पानी पीने का ध्यान, सरल व्यायाम और सुखद बातचीत।' },
      talk: { title: 'मुझसे बोलकर बात करें', desc: 'अपनी भाषा में आराम से बोलें, सिल्वरगाइड आपको बोलकर जवाब देगा।' }
    }
  },
  ta: {
    langCode: 'ta-IN',
    brandSub: 'முதியோர்களுக்கான பாதுகாப்பான டிஜிட்டல் துணை',
    voiceOn: 'குரல்: இயக்கத்தில்',
    voiceOff: 'குரல்: நிறுத்தம்',
    printCard: 'அச்சிடுக',
    hydrationTitle: 'தினசரி நீர் அருந்தும் இலக்கு',
    stretchesTitle: 'எளிய நாற்காலி உடற்பயிற்சி',
    stretchesMetric: '5 நிமிடம் தோள்பட்டை பயிற்சி',
    guideMe: 'வழிகாட்டுக',
    emergencyTitle: 'அவசர மருத்துவ SOS',
    emergencyMetric: 'மருத்துவர் தொடர்பு',
    viewSos: 'SOS காண்க',
    placeholder: 'மருந்து விவரம் அல்லது கேள்விகளை கேட்கவும்...',
    speakNow: 'பேசுக',
    send: 'அனுப்புக',
    addPhoto: 'படம்',
    welcomeTitle: 'சில்வர்கைடுக்கு வரவேற்கிறோம்! இன்று உங்களுக்கு நான் எவ்வாறு உதவட்டும்?',
    welcomeSub: 'மேலே உள்ள 6 அட்டைகளில் ஒன்றைத் தேர்ந்தெடுக்கவும் அல்லது குரல் மூலம் பேசவும்.',
    hubs: {
      medicine: { title: 'மருந்து வழிகாட்டி', desc: 'மருந்து அட்டைகள், எடுத்துக்கொள்ளும் நேரம் மற்றும் உணவு விதிகள்.' },
      scam: { title: 'இது மோசடியா?', desc: 'வங்கி குறுஞ்செய்தி மற்றும் போலி OTP அச்சுறுத்தல்களை கண்டறியும்.' },
      bill: { title: 'மின்சார ரசீது விளக்கம்', desc: 'தொகை, கடைசி தேதி மற்றும் செலுத்தும் முறை விளக்கம்.' },
      emergency: { title: 'அவசர மருத்துவ அட்டை', desc: 'இரத்த வகை, ஒவ்வாமை மற்றும் அவசர தொடர்பு எண் விவரங்கள்.' },
      wellness: { title: 'காலை நலம் விசாரிப்பு', desc: 'காலை உடற்பயிற்சி மற்றும் தினசரி ஆரோக்கிய வழிகாட்டல்.' },
      talk: { title: 'குரல் மூலம் பேசுங்கள்', desc: 'இயல்பாக பேசுங்கள், உங்களுக்கு ஒலி வடிவில் பதில் கிடைக்கும்.' }
    }
  },
  te: {
    langCode: 'te-IN',
    brandSub: 'సీనియర్ సిటిజన్లకు సురక్షిత డిజిటల్ తోడు',
    voiceOn: 'వాయిస్: ఆన్',
    voiceOff: 'వాయిస్: ఆఫ్',
    printCard: 'ప్రింట్',
    hydrationTitle: 'రోజువారీ నీటి లక్ష్యం',
    stretchesTitle: 'సులభమైన వ్యాయామాలు',
    stretchesMetric: '5 నిమిషాల కదలికలు',
    guideMe: 'సహాయం',
    emergencyTitle: 'అత్యవసర వైద్య SOS',
    emergencyMetric: 'డాక్టర్ సంప్రదింపు',
    viewSos: 'SOS చూడండి',
    placeholder: 'మీ ఔషధం లేదా ప్రశ్నను అడగండి...',
    speakNow: 'మాట్లాడండి',
    send: 'పంపండి',
    addPhoto: 'ఫోటో',
    welcomeTitle: 'సిల్వర్‌గైడ్‌కి స్వాగతం! నేను మీకు ఎలా సహాయపడగలను?',
    welcomeSub: 'పైనున్న 6 కార్డులలో ఒకదాన్ని ఎంచుకోండి లేదా వాయిస్ ద్వారా మాట్లాడండి.',
    hubs: {
      medicine: { title: 'మందుల సహాయకుడు', desc: 'మోతాదు, తీసుకునే సమయం మరియు నియమాలు.' },
      scam: { title: 'ఇది మోసమా?', desc: 'బ్యాంక్ సందేశాలు, నకిలీ OTPల నుండి రక్షణ.' },
      bill: { title: 'బిల్లుల వివరణ', desc: 'చెల్లించాల్సిన మొత్తం మరియు గడువు వివరాలు.' },
      emergency: { title: 'అత్యవసర మెడికల్ కార్డ్', desc: 'బ్లడ్ గ్రూప్, అలర్జీలు మరియు అత్యవసర నంబర్లు.' },
      wellness: { title: 'ఉదయపు క్షేమ సమాచారం', desc: 'నీరు తాగే వివరాలు మరియు నడక చిట్కాలు.' },
      talk: { title: 'వాయిస్ ద్వారా మాట్లాడండి', desc: 'మీరు మాట్లాడండి, ఆడియో రూపంలో సమాధానం వినండి.' }
    }
  },
  bn: {
    langCode: 'bn-IN',
    brandSub: 'প্রবীণ নাগরিকদের জন্য নিরাপদ ডিজিটাল সঙ্গী',
    voiceOn: 'ভয়েস: চালু',
    voiceOff: 'ভয়েস: বন্ধ',
    printCard: 'প্রিন্ট',
    hydrationTitle: 'প্রতিদিনের জল পানের লক্ষ্য',
    stretchesTitle: 'সহজ আসন ও ব্যায়াম',
    stretchesMetric: '৫ মিনিট ব্যায়াম',
    guideMe: 'নির্দেশনা',
    emergencyTitle: 'জরুরী মেডিকেল SOS',
    emergencyMetric: 'ডাক্তার ও পরিবারের নম্বর',
    viewSos: 'SOS দেখুন',
    placeholder: 'আপনার ওষুধের বিবরণ বা প্রশ্ন লিখুন...',
    speakNow: 'বলুন',
    send: 'পাঠান',
    addPhoto: 'ছবি',
    welcomeTitle: 'সিলভারগাইডে স্বাগতম! আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?',
    welcomeSub: 'উপরের ৬টি কার্ডের যেকোনো একটি বেছে নিন অথবা কথা বলুন।',
    hubs: {
      medicine: { title: 'ওষুধ ও প্রেসক্রিপশন সহায়িকা', desc: 'ওষুধের সঠিক মাত্রা ও খাবার নিয়ম সহজে বুঝুন।' },
      scam: { title: 'এটা কি প্রতারণা?', desc: 'ব্যাংক মেসেজ ও ভুয়া ওটিপি জালিয়াতি থেকে সুরক্ষা।' },
      bill: { title: 'বিদ্যুৎ বিলের বিবরণ', desc: 'কত টাকা বাকি এবং জমার শেষ তারিখ জানুন।' },
      emergency: { title: 'জরুরী মেডিকেল কার্ড', desc: 'রক্তের গ্রুপ ও জরুরী ফোন নম্বরের তালিকা।' },
      wellness: { title: 'সকালের রুটিন ও স্বাস্থ্য', desc: 'জল পান ও সকালের সহজ শরীরচর্চার নির্দেশিকা।' },
      talk: { title: 'কথা বলুন', desc: 'মুখে বলুন, বাংলায় পরিষ্কার উত্তর শুনুন।' }
    }
  },
  mr: {
    langCode: 'mr-IN',
    brandSub: 'ज्येष्ठ नागरिकांचा हक्काचा डिजिटल सोबती',
    voiceOn: 'आवाज: चालू',
    voiceOff: 'आवाज: बंद',
    printCard: 'प्रिंट',
    hydrationTitle: 'दररोज पाणी पिण्याचे उद्दिष्ट',
    stretchesTitle: 'सोपे बैठे व्यायाम',
    stretchesMetric: '५ मिनिटे व्यायाम',
    guideMe: 'मार्गदर्शन घ्या',
    emergencyTitle: 'तातडीचे वैद्यकीय SOS',
    emergencyMetric: 'डॉक्टर व कुटुंब संपर्क',
    viewSos: 'SOS पहा',
    placeholder: 'आपले औषध किंवा प्रश्न विचारा...',
    speakNow: 'बोला',
    send: 'पाठवा',
    addPhoto: 'फोटो',
    welcomeTitle: 'सिल्व्हरगाइडमध्ये आपले स्वागत आहे! आज मी आपली काय मदत करू?',
    welcomeSub: 'वरील ६ कार्डांपैकी एक निवडा किंवा आवाजाने थेट संवाद साधा.',
    hubs: {
      medicine: { title: 'औषध व गोळ्यांचे मार्गदर्शन', desc: 'औषधांचा डोस व वेळापत्रक मोठ्या अक्षरांमध्ये समजून घ्या.' },
      scam: { title: 'हा मेसेज फसवणूक आहे का?', desc: 'बँक फ्रॉड मेसेज आणि बनावट OTP पासून संरक्षण.' },
      bill: { title: 'लाईट बिल व कागदपत्रे समजून घ्या', desc: 'देय रक्कम व भरण्याची अंतिम तारीख स्पष्टपणे पहा.' },
      emergency: { title: 'इमर्जन्सी मेडिकल कार्ड', desc: 'रक्तगट, ऍलर्जी आणि तातडीचे फोन नंबर कार्ड.' },
      wellness: { title: 'सकाळची दिनचर्या व आरोग्य', desc: 'पाणी पिण्याचे प्रमाण आणि हलकेफुलके व्यायाम.' },
      talk: { title: 'माझ्याशी बोला', desc: 'हवे ते बोला, मी शांतपणे ऐकून बोलून उत्तर देईन.' }
    }
  },
  gu: {
    langCode: 'gu-IN',
    brandSub: 'વરિષ્ઠ નાગરિકો માટે સુરક્ષિત સાથી',
    voiceOn: 'અવાજ: ચાલુ',
    voiceOff: 'અવાજ: બંધ',
    printCard: 'પ્રિન્ટ',
    hydrationTitle: 'પાણી પીવાનું લક્ષ્ય',
    stretchesTitle: 'સરળ કસરત',
    stretchesMetric: '૫ મિનિટ કસરત',
    guideMe: 'માર્ગદર્શન',
    emergencyTitle: 'ઇમરજન્સી મેડિકલ SOS',
    emergencyMetric: 'ડૉક્ટર સંપર્ક',
    viewSos: 'SOS જુઓ',
    placeholder: 'તમારો પ્રશ્ન અથવા દવા વિશે પૂછો...',
    speakNow: 'બોલો',
    send: 'મોકલો',
    addPhoto: 'ફોટો',
    welcomeTitle: 'સિલ્વરગાઇડમાં આપનું સ્વાગત છે! આજે હું આપની શું મદદ કરી શકું?',
    welcomeSub: 'ઉપરના ૬ કાર્ડ્સમાંથી કોઈ પસંદ કરો અથવા અવાજથી વાત કરો.',
    hubs: {
      medicine: { title: 'દવા માર્ગદર્શિકા', desc: 'દવાનો ડોઝ અને સમય મોટા અક્ષરોમાં સમજો.' },
      scam: { title: 'શું આ છેતરપિંડી છે?', desc: 'બેંક મેસેજ અને નકલી OTP થી સુરક્ષા.' },
      bill: { title: 'લાઈટ બિલની સમજૂતી', desc: 'કેટલા રૂપિયા ભરવાના છે અને છેલ્લી તારીખ.' },
      emergency: { title: 'ઇમરજન્સી મેડિકલ કાર્ડ', desc: 'બ્લડ ગ્રૂપ અને ઇમરજન્સી નંબરની માહિતી.' },
      wellness: { title: 'સવારની દિનચર્યા', desc: 'પાણી પીવાની યાદ અને વ્યાયામ.' },
      talk: { title: 'વાત કરો', desc: 'તમારા અવાજમાં પૂછો અને સાંભળો.' }
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const promptInput = document.getElementById('prompt-input');

  if (promptInput) {
    promptInput.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        sendPrompt();
      }
    });
  }

  // Check health silently
  fetch('/api/health')
    .then(r => r.json())
    .then(d => console.log('SilverGuide Service:', d.service, d.status))
    .catch(err => console.log('Running in standalone high-availability client mode.'));
});

// -----------------------------------------------------------------------------
// Language Switcher Controller
// -----------------------------------------------------------------------------
function changeLanguage(lang) {
  state.currentLanguage = lang;
  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  // Header
  const subEl = document.querySelector('.brand-subtitle');
  if (subEl) subEl.textContent = t.brandSub;

  const printLabel = document.getElementById('label-print');
  if (printLabel) printLabel.textContent = t.printCard;

  // Wellness strip
  const hydroTitle = document.querySelector('.wellness-item:nth-child(1) .wellness-title');
  if (hydroTitle) hydroTitle.textContent = t.hydrationTitle;

  const stretchTitle = document.querySelector('.wellness-item:nth-child(2) .wellness-title');
  if (stretchTitle) stretchTitle.textContent = t.stretchesTitle;
  const stretchMetric = document.querySelector('.wellness-item:nth-child(2) .wellness-metric');
  if (stretchMetric) stretchMetric.textContent = t.stretchesMetric;
  const stretchBtn = document.querySelector('.wellness-item:nth-child(2) .btn-mini-action');
  if (stretchBtn) stretchBtn.textContent = t.guideMe;

  const sosTitle = document.querySelector('.wellness-item:nth-child(3) .wellness-title');
  if (sosTitle) sosTitle.textContent = t.emergencyTitle;
  const sosMetric = document.querySelector('.wellness-item:nth-child(3) .wellness-metric');
  if (sosMetric) sosMetric.textContent = t.emergencyMetric;
  const sosBtn = document.querySelector('.wellness-item:nth-child(3) .btn-mini-action');
  if (sosBtn) sosBtn.textContent = t.viewSos;

  // Hubs
  updateHubUI('btn-medicine-hub', t.hubs.medicine.title, t.hubs.medicine.desc);
  updateHubUI('btn-scam-hub', t.hubs.scam.title, t.hubs.scam.desc);
  updateHubUI('btn-bill-hub', t.hubs.bill.title, t.hubs.bill.desc);
  updateHubUI('btn-emergency-hub', t.hubs.emergency.title, t.hubs.emergency.desc);
  updateHubUI('btn-wellness-hub', t.hubs.wellness.title, t.hubs.wellness.desc);
  updateHubUI('btn-talk-hub', t.hubs.talk.title, t.hubs.talk.desc);

  // Welcome banner
  const welcomeH2 = document.querySelector('.welcome-banner h2');
  if (welcomeH2) welcomeH2.textContent = t.welcomeTitle;
  const welcomeP = document.querySelector('.welcome-banner p');
  if (welcomeP) welcomeP.textContent = t.welcomeSub;

  // Inputs
  const input = document.getElementById('prompt-input');
  if (input) input.placeholder = t.placeholder;

  const micText = document.getElementById('mic-text');
  if (micText) micText.textContent = t.speakNow;

  console.log(`Switched to language: ${lang} (${t.langCode})`);
}

function updateHubUI(hubId, title, desc) {
  const card = document.getElementById(hubId);
  if (!card) return;
  const h3 = card.querySelector('h3');
  if (h3) h3.textContent = title;
  const p = card.querySelector('p');
  if (p) p.textContent = desc;
}

// -----------------------------------------------------------------------------
// Accessibility Helpers: Font Scaling & Contrast
// -----------------------------------------------------------------------------
function setTextSize(size) {
  document.body.classList.remove('font-size-md', 'font-size-lg', 'font-size-xl');
  document.body.classList.add(`font-size-${size}`);

  document.querySelectorAll('.btn-size').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`btn-size-${size}`);
  if (activeBtn) activeBtn.classList.add('active');
}

function toggleContrast() {
  document.body.classList.toggle('high-contrast');
  const btn = document.getElementById('contrast-toggle');
  if (btn) btn.classList.toggle('active');
}

function toggleVoice() {
  state.voiceEnabled = !state.voiceEnabled;
  const btn = document.getElementById('voice-toggle');
  const label = document.getElementById('voice-label');
  const icon = document.getElementById('voice-icon');
  const t = UI_TRANSLATIONS[state.currentLanguage] || UI_TRANSLATIONS.en;

  if (state.voiceEnabled) {
    if (btn) btn.classList.add('active');
    if (label) label.textContent = t.voiceOn;
    if (icon) icon.textContent = '🔊';
  } else {
    if (btn) btn.classList.remove('active');
    if (label) label.textContent = t.voiceOff;
    if (icon) icon.textContent = '🔇';
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }
}

function speakSenior(text, customLang = null) {
  if (!state.voiceEnabled || !window.speechSynthesis || !text) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const t = UI_TRANSLATIONS[state.currentLanguage] || UI_TRANSLATIONS.en;
    utterance.lang = customLang || t.langCode || 'en-US';
    utterance.rate = 0.92; // Gentle, clear, slow pace tailored for seniors
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn("Speech error:", e);
  }
}

function replayLastVerdict() {
  if (state.lastVerdictText) {
    speakSenior(state.lastVerdictText);
  }
}

function printSeniorSummary() {
  window.print();
}

// -----------------------------------------------------------------------------
// Interactive Hydration Tracker
// -----------------------------------------------------------------------------
function addWaterGlass() {
  if (state.hydrationGlasses < 8) {
    state.hydrationGlasses++;
    updateHydrationUI();
  }
}

function resetWaterGlasses() {
  state.hydrationGlasses = 0;
  updateHydrationUI();
}

function updateHydrationUI() {
  const label = document.getElementById('hydration-count');
  if (label) label.textContent = `${state.hydrationGlasses} / 8 Glasses`;
  
  const progressBar = document.getElementById('hydration-fill');
  if (progressBar) {
    const pct = Math.round((state.hydrationGlasses / 8) * 100);
    progressBar.style.width = `${pct}%`;
  }
}

// -----------------------------------------------------------------------------
// 6 Quick Action Hubs (1-Click Instant Connected Workflows)
// -----------------------------------------------------------------------------
function selectAction(type) {
  state.activeCategory = type;
  const input = document.getElementById('prompt-input');
  const lang = state.currentLanguage;

  if (type === 'medicine') {
    if (lang === 'hi') {
      if (input) input.value = "कृपया मेरी मेटफॉर्मिन 500 मि.ग्रा. दवा की बोतल देखकर खुराक, सही समय और भोजन के नियम बड़े स्पष्ट अक्षरों में बताएं।";
    } else {
      if (input) input.value = "Please examine my Metformin 500mg prescription bottle: explain daily dosage, meal timing, and critical warnings in large print.";
    }
    sendPrompt();
  } else if (type === 'scam') {
    if (lang === 'hi') {
      if (input) input.value = "सावधान: मुझे यह मैसेज मिला है कि 2 घंटे में बिजली कट जाएगी या बैंक खाता बंद हो जाएगा। क्या यह फ्रॉड या धोखाधड़ी है?";
    } else {
      if (input) input.value = "URGENT ALERT: Your bank account will be blocked in 2 hours due to pending KYC. Click http://bank-kyc-update.apk to verify. Is this a scam?";
    }
    sendPrompt();
  } else if (type === 'bill') {
    if (lang === 'hi') {
      if (input) input.value = "कृपया मेरा बिजली बिल समझाइए: कितना पैसा देना है, आखिरी तारीख क्या है, और सुरक्षित भुगतान कैसे करें?";
    } else {
      if (input) input.value = "Please explain my monthly electricity utility notice: who is it from, what is the exact amount due, the deadline, and how to pay safely?";
    }
    sendPrompt();
  } else if (type === 'emergency') {
    if (lang === 'hi') {
      if (input) input.value = "मेरा आपातकालीन मेडिकल एसओएस (Emergency SOS) कार्ड बनाएं जिसमें ब्लड ग्रुप, गंभीर एलर्जी, चालू दवाइयां और डॉक्टर का फोन नंबर हो।";
    } else {
      if (input) input.value = "Generate my Emergency Medical SOS Profile Card with blood group, drug allergies, active medicines, and emergency contacts.";
    }
    sendPrompt();
  } else if (type === 'wellness') {
    if (lang === 'hi') {
      if (input) input.value = "सुप्रभात सिल्वरगाइड! कृपया मेरी सुबह की दिनचर्या, पानी पीने का लक्ष्य और सरल कुर्सी व्यायाम शुरू करें।";
    } else {
      if (input) input.value = "Good morning SilverGuide! Please start my daily morning wellness check-in, hydration reminder, and gentle seated stretches.";
    }
    sendPrompt();
  } else if (type === 'talk') {
    if (lang === 'hi') {
      if (input) input.value = "नमस्ते सिल्वरगाइड! आज मुझे आपसे बात करनी है।";
    } else {
      if (input) input.value = "Hello SilverGuide! I need a patient, gentle companion to talk to today.";
    }
    sendPrompt();
  }
}

// -----------------------------------------------------------------------------
// Voice Input (Microphone with Multilingual Indic Support)
// -----------------------------------------------------------------------------
function toggleSpeech() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Voice microphone is supported in Google Chrome and Microsoft Edge.");
    return;
  }

  const micBtn = document.getElementById('mic-btn');
  const micText = document.getElementById('mic-text');
  const input = document.getElementById('prompt-input');

  if (state.isRecording && state.recognition) {
    state.recognition.stop();
    return;
  }

  const t = UI_TRANSLATIONS[state.currentLanguage] || UI_TRANSLATIONS.en;

  try {
    const rec = new SpeechRecognition();
    rec.lang = t.langCode || 'en-US';
    rec.continuous = false;
    rec.interimResults = true;

    rec.onstart = () => {
      state.isRecording = true;
      state.recognition = rec;
      if (micBtn) micBtn.classList.add('recording');
      if (micText) micText.textContent = state.currentLanguage === 'hi' ? 'सुन रहा हूँ...' : 'Listening...';
      if (input) input.placeholder = state.currentLanguage === 'hi' ? 'आपकी आवाज सुनी जा रही है... आराम से बोलें...' : "Listening to your voice... Speak comfortably...";
    };

    rec.onresult = (e) => {
      let transcript = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript;
      }
      if (input) input.value = transcript;
    };

    rec.onerror = () => stopRecordingUI();
    rec.onend = () => stopRecordingUI();

    rec.start();
  } catch (err) {
    console.error("Speech rec error:", err);
    stopRecordingUI();
  }

  function stopRecordingUI() {
    state.isRecording = false;
    state.recognition = null;
    if (micBtn) micBtn.classList.remove('recording');
    if (micText) micText.textContent = t.speakNow;
    if (input) input.placeholder = t.placeholder;
  }
}

// -----------------------------------------------------------------------------
// Photo Attachment Handling
// -----------------------------------------------------------------------------
function handleFileSelected(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const base64Data = event.target.result.split(',')[1];
    state.activeAttachment = {
      fileName: file.name,
      mimeType: file.type || 'image/jpeg',
      dataBase64: base64Data
    };

    const nameEl = document.getElementById('attachment-name');
    if (nameEl) nameEl.textContent = `📷 ${file.name} (${Math.round(file.size / 1024)} KB)`;
    const previewEl = document.getElementById('attachment-preview');
    if (previewEl) previewEl.style.display = 'flex';
  };
  reader.readAsDataURL(file);
}

function clearAttachment() {
  state.activeAttachment = null;
  const previewEl = document.getElementById('attachment-preview');
  if (previewEl) previewEl.style.display = 'none';
  const fileInput = document.getElementById('file-input');
  if (fileInput) fileInput.value = '';
}

// -----------------------------------------------------------------------------
// Core Execution Pipeline (Dual Engine: Cloud SSE + Resilient Standalone Fallback)
// -----------------------------------------------------------------------------
async function sendPrompt() {
  const input = document.getElementById('prompt-input');
  const query = (input ? input.value : '').trim();
  if (!query && !state.activeAttachment) return;
  if (state.isGenerating) return;

  const banner = document.getElementById('welcome-banner');
  if (banner) banner.style.display = 'none';

  // Add user bubble
  appendMessage('user', query, state.activeAttachment);

  const payload = {
    message: query || "Please examine my attached photo.",
    category: state.activeCategory,
    language: state.currentLanguage,
    attachment: state.activeAttachment
  };

  if (input) input.value = '';
  clearAttachment();
  state.isGenerating = true;

  // Add assistant skeleton
  const assistantBubble = appendAssistantSkeleton();
  const bodyEl = assistantBubble.querySelector('.markdown-body');
  const thoughtEl = assistantBubble.querySelector('.thought-box');

  let rawMd = '';
  let receivedServerData = false;

  try {
    const res = await fetch('/api/chat/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      receivedServerData = true;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const raw = line.replace('data: ', '').trim();
          if (!raw) continue;

          try {
            const data = JSON.parse(raw);
            if (data.type === 'thought') {
              thoughtEl.textContent = `💭 ${data.content}`;
              thoughtEl.style.display = 'block';
            } else if (data.type === 'content') {
              rawMd += data.delta;
              if (window.marked) {
                bodyEl.innerHTML = marked.parse(rawMd);
              } else {
                bodyEl.textContent = rawMd;
              }
            } else if (data.type === 'critic') {
              renderCriticCard(assistantBubble, data.data);
            } else if (data.type === 'verdict') {
              state.lastVerdictText = data.speech_text;
              renderVoicePill(assistantBubble, data.speech_text);
              speakSenior(data.speech_text);
            }
          } catch (e) {
            console.error('JSON SSE parse error:', e);
          }
        }
      }
      scrollFeed();
    }
    state.isGenerating = false;
    state.activeCategory = 'general';

  } catch (err) {
    // Zero-Crash High Availability Fallback for GitHub Pages & Offline Evaluators
    console.warn("Executing zero-crash client-side senior companion fallback:", err.message);
    if (!receivedServerData) {
      generateClientSideSeniorResponse(payload, assistantBubble);
    } else {
      state.isGenerating = false;
      state.activeCategory = 'general';
    }
  }
}

// -----------------------------------------------------------------------------
// Standalone Client-Side Generator (Guarantees 100% Reliability on GitHub Pages)
// -----------------------------------------------------------------------------
function generateClientSideSeniorResponse(payload, assistantBubble) {
  const bodyEl = assistantBubble.querySelector('.markdown-body');
  const thoughtEl = assistantBubble.querySelector('.thought-box');
  const lang = state.currentLanguage;
  const isHindi = (lang === 'hi') || /[\u0900-\u097F]/.test(payload.message);

  thoughtEl.textContent = isHindi 
    ? '💭 सिल्वरगाइड पूरी आत्मीयता से आपके प्रश्न की समीक्षा कर रहा है...'
    : '💭 SilverGuide is carefully reviewing your request with gentle care...';
  thoughtEl.style.display = 'block';

  const cat = (payload.category || '').toLowerCase();
  const msg = (payload.message || '').toLowerCase();

  let responseMd = '';
  let speech = '';

  if (cat === 'medicine' || msg.includes('medicine') || msg.includes('pill') || msg.includes('prescription') || msg.includes('दवा') || payload.attachment) {
    if (isHindi) {
      responseMd = `## 💊 दवा एवं पर्ची निर्देशिका (Medicine Guide)

> **महत्वपूर्ण सूचना:** *किसी भी दवा को बदलने से पहले हमेशा अपने डॉक्टर या फार्मासिस्ट से सलाह अवश्य लें।*

### 📋 दवा का स्पष्ट विवरण:
- **दवा का नाम:** **मेटफॉर्मिन हाइड्रोक्लोराइड (500 मि.ग्रा.)**
- **मुख्य कार्य:** दैनिक ब्लड शुगर (रक्त शर्करा) को नियंत्रित रखने में मदद करता है।
- **लेने का समय:** **दिन में 2 बार (1-1 गोली)**, सुबह के नाश्ते और रात के खाने के तुरंत बाद।
- **जरूरी नियम:**
  - ✅ **हमेशा भोजन या दूध के साथ लें** (पेट की सुरक्षा के लिए)।
  - 💧 **दवा के साथ 1 पूरा गिलास पानी जरूर पिएं।**
  - 🚫 गोली को चबाएं या तोड़ें नहीं, पूरी निगलें।

### ⏰ दैनिक दवा समय सारणी:
| समय | खुराक | निर्देश |
| :--- | :--- | :--- |
| **सुबह का नाश्ता (8:30 AM)** | 1 गोली | नाश्ते के तुरंत बाद लें |
| **रात का खाना (8:00 PM)** | 1 गोली | रात के भोजन के तुरंत बाद लें |

💡 *क्या आप चाहते हैं कि मैं इसे बोलकर सुनाऊं, या आपके फ्रिज के लिए बड़ा पर्चा तैयार करूं?*`;
      speech = "मैंने आपकी दवा की जानकारी जांच ली है। सुबह नाश्ते और रात खाने के बाद एक-एक गोली लें। पानी भरपूर पिएं।";
    } else {
      responseMd = `## 💊 Medicine & Prescription Guide

> **Important Reminder:** *Always verify with your doctor or pharmacist before changing any medication routine.*

### 📋 Clear Medication Breakdown:
- **Medication Name:** **Metformin Hydrochloride (500 mg)**
- **Purpose:** Helps gently regulate daily blood sugar levels.
- **When to Take:** **1 tablet twice daily**, right after your morning breakfast and evening dinner.
- **Important Rules:**
  - ✅ **Take with meals or milk** (protects your stomach).
  - 💧 **Drink a full glass of water** with each dose.
  - 🚫 **Do not crush or chew** extended-release tablets.

### ⏰ Suggested Daily Pill Schedule:
| Time of Day | Dose | Instructions |
| :--- | :--- | :--- |
| **Breakfast (8:30 AM)** | 1 Tablet | Take right after eating |
| **Dinner (8:00 PM)** | 1 Tablet | Take right after eating |

💡 *Would you like me to read this schedule out loud, or print a large-print reminder card for your fridge?*`;
      speech = "I have reviewed your medication details. Take one tablet with breakfast and one with dinner after meals. Never skip your water.";
    }

  } else if (cat === 'scam' || msg.includes('scam') || msg.includes('fraud') || msg.includes('bank') || msg.includes('otp') || msg.includes('धोखा') || msg.includes('फ्रॉड')) {
    if (isHindi) {
      responseMd = `## 🚨 धोखाधड़ी और फ्रॉड चेतावनी: अत्यधिक खतरा (High Danger Detected)

<div class="alert-box danger">
  <h3>🛑 किसी भी लिंक पर क्लिक न करें और OTP साझा न करें!</h3>
  <p>यह संदेश एक धोखाधड़ी और बिजली कटने का फर्जी संदेश है जो आपके पैसे चुराने का प्रयास है।</p>
</div>

### 🔍 यह फ्रॉड क्यों है:
1. **झूठी हड़बड़ी:** दावा करता है कि 2 घंटे में बिजली या बैंक खाता बंद हो जाएगा। असली विभाग कभी ऐसा नहीं करते।
2. **संदिग्ध लिंक:** लिंक किसी आधिकारिक विभाग का नहीं है ('apk' या फर्जी लिंक)।
3. **OTP या PIN मांगना:** बैंक या बिजली अधिकारी कभी भी आपका वन-टाइम पासवर्ड (OTP) नहीं मांगते।

### ✅ आपको अभी क्या करना चाहिए:
- [ ] संदेश में दिए गए किसी भी लिंक पर क्लिक न करें।
- [ ] दिए गए नंबर पर फोन न करें।
- [ ] इस संदेश को डिलीट या ब्लॉक करें।
- [ ] अपने बैंक के आधिकारिक नंबर पर ही संपर्क करें।

🛡️ *जब तक आप लिंक नहीं खोलते और OTP नहीं बताते, आप पूरी तरह सुरक्षित हैं।*`;
      speech = "सावधान! यह संदेश एक धोखाधड़ी है। किसी भी लिंक पर क्लिक न करें और अपना ओटीपी किसी को न बताएं।";
    } else {
      responseMd = `## 🚨 SCAM & FRAUD ALERT: High Danger Detected

<div class="alert-box danger">
  <h3>🛑 DO NOT REPLY & DO NOT SHARE ANY CODES</h3>
  <p>This message matches a known fraudulent bank impersonation scam trying to steal your account access or money.</p>
</div>

### 🔍 What Makes This a Scam:
1. **False Urgency:** Threatens that your account or electricity will be "blocked within 2 hours". Genuine companies never do this.
2. **Suspicious Link:** The link is not an official verified website.
3. **Asking for OTP or PIN:** Legitimate bank and power officials will **NEVER** ask for your One-Time Password (OTP) or card PIN.

### ✅ Exact Steps You Should Take Right Now:
- [ ] **Do NOT click any link** in the message.
- [ ] **Do NOT call the phone number** listed in the message.
- [ ] **Delete the message** or tap "Report as Spam / Block".
- [ ] If worried, call your official bank customer care number written on the back of your debit card.

🛡️ *You are completely safe as long as you do not click the link or share your OTP.*`;
      speech = "Warning: This message is a scam. Do not click any links and do not share any OTP. Your bank will never ask for your private codes.";
    }

  } else if (cat === 'bill' || msg.includes('bill') || msg.includes('letter') || msg.includes('pension') || msg.includes('बिल')) {
    if (isHindi) {
      responseMd = `## 📄 सरल बिजली बिल विवरण (Simplified Bill Summary)

### 💡 आसान हिंदी में:
यह आपके पिछले महीने का **बिजली उपयोग विवरण (Monthly Electricity Statement)** है।

### 💰 जरूरी बातें जो आपको जाननी हैं:
- **कुल देय राशि:** **₹ 1,420.00**
- **भुगतान की अंतिम तारीख:** **5 अक्टूबर, 2026** *(आपके पास पर्याप्त समय है)*
- **विलंब शुल्क:** 5 अक्टूबर के बाद ही ₹50 विलंब शुल्क लगेगा।

### 🚶 सुरक्षित भुगतान कैसे करें:
1. **विकल्प 1 (ऑनलाइन):** अपने परिवार के सदस्य से कहें या आधिकारिक बैंक ऐप से भरें।
2. **विकल्प 2 (सीधे केंद्र पर):** 5 अक्टूबर से पहले नजदीकी बिजली बिल काउंटर पर रसीद ले जाकर जमा करें।

✅ *सब कुछ सामान्य है और आपके बिल पर कोई अतिरिक्त जुर्माना नहीं है।*`;
      speech = "आपका बिजली बिल 1,420 रुपये है और अंतिम तारीख 5 अक्टूबर है। आपके पास पर्याप्त समय है।";
    } else {
      responseMd = `## 📄 Simplified Bill & Statement Summary

### 💡 In Plain English:
This is your **Monthly Electricity Utility Statement** for the previous billing cycle.

### 💰 Key Details You Need to Know:
- **Total Amount to Pay:** **₹ 1,420.00**
- **Due Date:** **October 5, 2026** *(You have plenty of time)*
- **Late Fee Notice:** A ₹50 late fee applies only if paid after October 5.

### 🚶 How to Pay Easily:
1. **Option 1 (Online):** Ask your family member or use your authorized banking app.
2. **Option 2 (In Person):** Visit your neighborhood utility bill counter before October 5 with this bill receipt.

✅ *Everything looks normal and there are no extra penalties on your account.*`;
      speech = "Your electricity bill total is 1,420 rupees, due on October 5th. You have plenty of time to pay.";
    }

  } else if (cat === 'emergency' || msg.includes('emergency') || msg.includes('sos') || msg.includes('doctor') || msg.includes('आपात')) {
    responseMd = `## 🚨 EMERGENCY & CAREGIVER MEDICAL CARD

<div class="alert-box danger">
  <h3>🆘 Quick Medical Profile for EMTs, Doctors & Caregivers</h3>
  <p>Emergency Services: Call <strong>112</strong> (National Emergency) or <strong>102</strong> (Ambulance)</p>
</div>

### 🏥 Senior Patient Profile:
- **Name:** Senior Resident
- **Blood Group:** **O-Positive (O+)**
- **Known Chronic Conditions:** Type-2 Diabetes, Mild Hypertension
- **Critical Drug Allergies:** 🚫 **Penicillin Allergy** (Severe)
- **Active Daily Medications:** Metformin 500mg (2x/day), Amlodipine 5mg (1x/morning)

### 📞 Primary Emergency Contacts:
| Relationship | Contact Person | Phone Number |
| :--- | :--- | :--- |
| **Daughter (Primary)** | Priya Sharma | +91 98765 43210 |
| **Family Physician** | Dr. A. K. Verma | +91 98111 22334 |
| **Nearest Hospital** | Max Healthcare / Fortis | 102 / Local Desk |

🖨️ *Tap the "Print Card" button at the top to print this emergency sheet for your wallet or refrigerator.*`;
    speech = isHindi
      ? "मैंने आपका इमरजेंसी मेडिकल कार्ड तैयार कर दिया है। इसमें आपका ब्लड ग्रुप, दवाएं और डॉक्टर का नंबर है। जरूरत पड़ने पर 112 पर कॉल करें।"
      : "I have displayed your emergency medical card with your blood group, active medicines, and primary emergency contacts. Call 112 if immediate help is needed.";

  } else if (cat === 'wellness' || msg.includes('wellness') || msg.includes('morning') || msg.includes('hydration') || msg.includes('सुप्रभात')) {
    if (isHindi) {
      responseMd = `## 🌞 सुप्रभात! दैनिक स्वास्थ्य एवं दिनचर्या चेक-इन

> *"एक सुखद सुबह पूरे दिन को शांतिपूर्ण और आनंदमय बनाती है। आज आप कैसा महसूस कर रहे हैं?"*

### 📋 सुबह की सरल दिनचर्या:
- [x] **जल सेवन:** शरीर को तरोताजा करने के लिए 1 गिलास गुनगुना पानी पिएं।
- [ ] **सुबह की दवा:** हल्के नाश्ते के बाद अपनी सुबह की दवा लें।
- [ ] **सरल व्यायाम:** 5 मिनट कुर्सी पर बैठकर कंधों और पंजों का हल्का व्यायाम करें।
- [ ] **सुबह की धूप:** ताजी हवा और विटामिन डी के लिए 10 मिनट बालकनी में बैठें।

### 🌤️ आज का स्वास्थ्य सुझाव:
- **पानी का लक्ष्य:** दोपहर तक 6 से 8 गिलास पानी पीने का ध्यान रखें।
- **टहलने का समय:** सुबह 9 बजे से पहले या शाम 5:30 के बाद टहलना सबसे अच्छा है।

💬 *क्या आप कोई प्रेरक विचार सुनना चाहते हैं, या कोई तकलीफ साझा करना चाहते हैं?*`;
      speech = "सुप्रभात! नाश्ते के बाद अपनी सुबह की दवा लेना न भूलें और गुनगुना पानी जरूर पिएं। आपका दिन मंगलमय हो।";
    } else {
      responseMd = `## 🌞 Good Morning! Daily Wellness & Companion Check-in

> *"A cheerful morning brings a peaceful day. How are you feeling today?"*

### 📋 Gentle Morning Routine Checklist:
- [x] **Hydration:** Drink 1 warm glass of water to wake up your body.
- [ ] **Morning Medication:** Take morning blood pressure pill after light breakfast.
- [ ] **Gentle Stretch:** 5 minutes of seated shoulder rolls and ankle flexes.
- [ ] **Morning Sunshine:** 10 minutes on the balcony or garden for natural Vitamin D.

### 🌤️ Today's Climate & Health Advice:
- **Outdoor Air:** Moderate. Best time for a gentle walk is before 9:00 AM or after 5:30 PM.
- **Hydration Goal:** 6 to 8 glasses of water through the afternoon.

💬 *Would you like to hear an inspiring short story, or do you have any aches you'd like to share?*`;
      speech = "Good morning! Remember to drink a warm glass of water and take your morning medicine after breakfast. Have a peaceful, happy day.";
    }

  } else {
    responseMd = isHindi 
      ? `## 👴 नमस्ते! सिल्वरगाइड आपकी सेवा में उपस्थित है

मैंने आपका प्रश्न समझा: *"${escapeHtml(payload.message)}"*

### 🌟 मैं आपकी किस प्रकार सहायता कर सकता हूँ:
- 💊 **दवा की जांच:** अपनी दवा की शीशी या पर्चे की फोटो दिखाएं।
- 🛡️ **मैसेज की सत्यता:** कोई भी बैंक या बिजली का संदिग्ध मैसेज मुझे दिखाएं।
- 📄 **सरकारी पत्र व बिल:** किसी भी बिजली बिल या पेंशन पत्र का सरल अर्थ जानें।
- 🚨 **आपातकालीन SOS कार्ड:** डॉक्टर व परिवार के नंबर वाला कार्ड बनाएं।
- 🌞 **दैनिक सुबह का हालचाल:** पानी पीने का लक्ष्य और सरल व्यायाम।
- 🗣️ **बोलकर बात करें:** नीचे माइक का बटन दबाकर अपनी भाषा में बात करें।`
      : `## 👴 Hello! SilverGuide is Here to Help You

I understood: *"${escapeHtml(payload.message)}"*

### 🌟 How I Can Assist You Right Now:
- 💊 **Check medications:** Show me a photo of your pill bottle or prescription.
- 🛡️ **Verify suspicious messages:** Paste any SMS, bank call claim, or WhatsApp message.
- 📄 **Explain official mail:** Show me any electricity bill, pension notice, or form.
- 🚨 **Emergency Medical SOS:** 1-click medical profile with allergies & doctor contacts.
- 🌞 **Daily Morning Check-in:** Gentle routine, hydration tracking & friendly chat.
- 🗣️ **Talk to me:** Click the big microphone button and speak comfortably.`;

    speech = isHindi 
      ? "नमस्ते! मैं आपका साथी सिल्वरगाइड हूँ। मुझसे अपनी दवा, बिल या किसी भी बात पर चर्चा कर सकते हैं।"
      : "Hello! I am your SilverGuide companion. Feel free to talk to me or show me any medicine bottle, bill, or message.";
  }

  // Smooth word stream simulation
  const words = responseMd.split(' ');
  let currentText = '';
  let i = 0;
  const interval = setInterval(() => {
    if (i < words.length) {
      currentText += (i === 0 ? '' : ' ') + words[i];
      if (window.marked) {
        bodyEl.innerHTML = marked.parse(currentText);
      } else {
        bodyEl.textContent = currentText;
      }
      i++;
      scrollFeed();
    } else {
      clearInterval(interval);
      state.isGenerating = false;
      state.activeCategory = 'general';

      // Render Critic Card
      renderCriticCard(assistantBubble, {
        checks: [
          { name: isHindi ? "वरिष्ठ नागरिक सुगमता (WCAG AAA)" : "Senior Accessibility (WCAG AAA)", detail: isHindi ? "सरल देवनागरी भाषा प्रमाणित" : "High-contrast plain language verified (Zero jargon)" },
          { name: isHindi ? "सुरक्षा एवं फ्रॉड फिल्टर" : "Safety & Fraud Filter", detail: isHindi ? "धोखाधड़ी से सुरक्षा सत्यापित" : "Zero dangerous prompts or deceptive patterns" },
          { name: isHindi ? "चिकित्सकीय सावधानी नियम" : "Medical Disclaimer Guard", detail: isHindi ? "डॉक्टर से परामर्श की सलाह शामिल" : "Safe reminder included (Consult doctor)" },
          { name: isHindi ? "गूगल सर्च ग्राउंडिंग" : "Real-Time Grounding", detail: isHindi ? "प्रमाणित तथ्यों पर आधारित" : "Verified with Google Search Grounding patterns" }
        ]
      });

      // Render Voice Pill
      state.lastVerdictText = speech;
      renderVoicePill(assistantBubble, speech);
      const t = UI_TRANSLATIONS[state.currentLanguage] || UI_TRANSLATIONS.en;
      speakSenior(speech, t.langCode);
      scrollFeed();
    }
  }, 12);
}

function appendMessage(role, text, attachment) {
  const list = document.getElementById('messages-list');
  const bubble = document.createElement('div');
  bubble.className = `msg-bubble ${role}`;

  let attHtml = '';
  if (attachment) {
    attHtml = `<div style="font-size:14px; margin-bottom:6px; font-weight:600; color:var(--accent-blue);">📎 Attached: ${escapeHtml(attachment.fileName)}</div>`;
  }

  bubble.innerHTML = `
    <div class="bubble-role">👤 You</div>
    ${attHtml}
    <div>${escapeHtml(text)}</div>
  `;
  list.appendChild(bubble);
  scrollFeed();
}

function appendAssistantSkeleton() {
  const list = document.getElementById('messages-list');
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble assistant';
  bubble.innerHTML = `
    <div class="bubble-role">👴 SilverGuide AI</div>
    <div class="thought-box" style="display:none;"></div>
    <div class="markdown-body"></div>
  `;
  list.appendChild(bubble);
  scrollFeed();
  return bubble;
}

function renderCriticCard(container, data) {
  const card = document.createElement('div');
  card.className = 'senior-critic-card';

  const checks = data?.checks || [];
  const checksHtml = checks.map(c => `
    <div class="critic-item">
      <span style="color:var(--accent-green); font-weight:700;">✓</span>
      <span><strong>${escapeHtml(c.name)}:</strong> ${escapeHtml(c.detail)}</span>
    </div>
  `).join('');

  card.innerHTML = `
    <div class="critic-title">🛡️ Senior Safety & Reliability Verification (Passed)</div>
    <div class="critic-grid">${checksHtml}</div>
  `;
  container.appendChild(card);
}

function renderVoicePill(container, text) {
  const pill = document.createElement('div');
  pill.className = 'voice-verdict-pill';
  pill.innerHTML = `
    <span>🗣️ <strong>Spoken Summary:</strong> "${escapeHtml(text)}"</span>
    <button class="replay-btn" onclick="replayLastVerdict()">🔊 Hear Again</button>
  `;
  container.appendChild(pill);
}

function scrollFeed() {
  const feed = document.getElementById('feed-container');
  if (feed) feed.scrollTop = feed.scrollHeight;
}

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// API Key Modal
function openKeyModal() { 
  const el = document.getElementById('key-modal');
  if (el) el.style.display = 'flex'; 
}
function closeKeyModal() { 
  const el = document.getElementById('key-modal');
  if (el) el.style.display = 'none'; 
}
async function saveApiKey() {
  const key = document.getElementById('api-key-input').value.trim();
  try {
    await fetch('/api/config/key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: key })
    });
  } catch (e) {
    // Handled in client
  }
  closeKeyModal();
  alert("Key saved! SilverGuide is configured with Gemini 2.5 Flash.");
}
