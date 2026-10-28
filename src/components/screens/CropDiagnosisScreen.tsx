import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Camera,
  Upload,
  Scan,
  AlertTriangle,
  CheckCircle2,
  Leaf,
  Bug,
  Droplets,
  ShieldCheck,
  HelpCircle,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Language } from '../../types';
import { LanguageSelector } from '../ui/LanguageSelector';

interface CropDiagnosisScreenProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onBack: () => void;
}

const DIAGNOSIS_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    title: 'Crop Disease Diagnosis',
    subtitle: 'Upload leaf/fruit image for AI-powered disease detection',
    uploadTitle: 'Upload Crop Image',
    uploadDesc: 'Take a photo or upload an image of the affected leaf, fruit, or plant',
    takePhoto: 'Take Photo',
    uploadImage: 'Upload Image',
    analyzing: 'Analyzing with AI...',
    results: 'Diagnosis Results',
    confidence: 'Confidence',
    treatment: 'Recommended Treatment',
    prevention: 'Prevention Tips',
    symptoms: 'Symptom Questionnaire',
    symptomsDesc: 'Answer these questions for better accuracy',
    commonDiseases: 'Common Disease Library',
    back: 'Back',
    tryAgain: 'Scan Another Crop',
    yellowing: 'Are leaves yellowing?',
    spots: 'Are there dark spots?',
    wilting: 'Is the plant wilting?',
    insects: 'Do you see insects?',
    yes: 'Yes',
    no: 'No',
    submit: 'Get Diagnosis',
  },
  ml: {
    title: 'വിള രോഗ നിർണയം',
    subtitle: 'AI-പവർഡ് രോഗ നിർണയത്തിന് ഇലയുടെ/ഫലത്തിന്റെ ചിത്രം അപ്ലോഡ് ചെയ്യുക',
    uploadTitle: 'വിള ചിത്രം അപ്ലോഡ് ചെയ്യുക',
    uploadDesc: 'ബാധിച്ച ഇല, ഫലം അല്ലെങ്കിൽ ചെടിയുടെ ഫോട്ടോ എടുക്കുക',
    takePhoto: 'ഫോട്ടോ എടുക്കുക',
    uploadImage: 'ചിത്രം അപ്ലോഡ്',
    analyzing: 'AI ഉപയോഗിച്ച് വിശകലനം...',
    results: 'നിർണയ ഫലങ്ങൾ',
    confidence: 'വിശ്വാസ്യത',
    treatment: 'ശുപാർശിത ചികിത്സ',
    prevention: 'പ്രതിരോധ നുറുങ്ങുകൾ',
    symptoms: 'ലക്ഷണ ചോദ്യാവലി',
    symptomsDesc: 'മെച്ചപ്പെട്ട കൃത്യതയ്ക്ക് ഈ ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകുക',
    commonDiseases: 'സാധാരണ രോഗ ലൈബ്രറി',
    back: 'തിരികെ',
    tryAgain: 'മറ്റൊരു വിള സ്കാൻ ചെയ്യുക',
    yellowing: 'ഇലകൾ മഞ്ഞളിക്കുന്നുണ്ടോ?',
    spots: 'ഇരുണ്ട പാടുകൾ ഉണ്ടോ?',
    wilting: 'ചെടി വാടുന്നുണ്ടോ?',
    insects: 'പ്രാണികളെ കാണുന്നുണ്ടോ?',
    yes: 'അതെ',
    no: 'ഇല്ല',
    submit: 'നിർണയം നേടുക',
  },
  hi: {
    title: 'फसल रोग निदान',
    subtitle: 'AI-संचालित रोग पहचान के लिए पत्ती/फल की छवि अपलोड करें',
    uploadTitle: 'फसल छवि अपलोड करें',
    uploadDesc: 'प्रभावित पत्ती, फल या पौधे की फोटो लें',
    takePhoto: 'फोटो लें',
    uploadImage: 'छवि अपलोड',
    analyzing: 'AI से विश्लेषण...',
    results: 'निदान परिणाम',
    confidence: 'विश्वसनीयता',
    treatment: 'अनुशंसित उपचार',
    prevention: 'रोकथाम सुझाव',
    symptoms: 'लक्षण प्रश्नावली',
    symptomsDesc: 'बेहतर सटीकता के लिए इन प्रश्नों का उत्तर दें',
    commonDiseases: 'सामान्य रोग पुस्तकालय',
    back: 'वापस',
    tryAgain: 'दूसरी फसल स्कैन करें',
    yellowing: 'क्या पत्तियां पीली हो रही हैं?',
    spots: 'क्या काले धब्बे हैं?',
    wilting: 'क्या पौधा मुरझा रहा है?',
    insects: 'क्या कीड़े दिखते हैं?',
    yes: 'हां',
    no: 'नहीं',
    submit: 'निदान प्राप्त करें',
  },
  te: {
    title: 'పంట వ్యాధి నిర్ధారణ',
    subtitle: 'AI-ఆధారిత వ్యాధి గుర్తింపు కోసం ఆకు/పండు చిత్రాన్ని అప్‌లోడ్ చేయండి',
    uploadTitle: 'పంట చిత్రాన్ని అప్‌లోడ్ చేయండి',
    uploadDesc: 'ప్రభావిత ఆకు, పండు లేదా మొక్క ఫోటో తీయండి',
    takePhoto: 'ఫోటో తీయండి',
    uploadImage: 'చిత్రం అప్‌లోడ్',
    analyzing: 'AI తో విశ్లేషణ...',
    results: 'నిర్ధారణ ఫలితాలు',
    confidence: 'విశ్వసనీయత',
    treatment: 'సిఫార్సు చేయబడిన చికిత్స',
    prevention: 'నివారణ చిట్కాలు',
    symptoms: 'లక్షణాల ప్రశ్నావళి',
    symptomsDesc: 'మెరుగైన ఖచ్చితత్వం కోసం ఈ ప్రశ్నలకు సమాధానం ఇవ్వండి',
    commonDiseases: 'సాధారణ వ్యాధి లైబ్రరీ',
    back: 'వెనుకకు',
    tryAgain: 'మరో పంటను స్కాన్ చేయండి',
    yellowing: 'ఆకులు పసుపు రంగులోకి మారుతున్నాయా?',
    spots: 'నల్ల మచ్చలు ఉన్నాయా?',
    wilting: 'మొక్క వాడిపోతోందా?',
    insects: 'కీటకాలు కనిపిస్తున్నాయా?',
    yes: 'అవును',
    no: 'లేదు',
    submit: 'నిర్ధారణ పొందండి',
  },
};

const COMMON_DISEASES = [
  {
    name: { en: 'Late Blight (Tomato)', ml: 'ലേറ്റ് ബ്ലൈറ്റ് (തക്കാളി)', hi: 'झुलसा रोग (टमाटर)', te: 'ఆలస్య బ్లైట్ (టమాటా)' },
    crop: 'Tomato',
    image: '🍅',
    severity: 'high',
  },
  {
    name: { en: 'Powdery Mildew (Okra)', ml: 'പൗഡറി മിൽഡ്യൂ (വെണ്ട)', hi: 'चूर्णिल आसिता (भिंडी)', te: 'తెల్ల తెగులు (బెండ)' },
    crop: 'Okra',
    image: '🫑',
    severity: 'medium',
  },
  {
    name: { en: 'Bacterial Wilt (Brinjal)', ml: 'ബാക്ടീരിയൽ വിൽറ്റ് (വഴുതിനങ്ങ)', hi: 'जीवाणु म्लानि (बैंगन)', te: 'బాక్టీరియల్ విల్ట్ (వంకాయ)' },
    crop: 'Brinjal',
    image: '🍆',
    severity: 'high',
  },
  {
    name: { en: 'Yellow Mosaic (Green Beans)', ml: 'യെല്ലോ മൊസൈക് (പയർ)', hi: 'पीला मोजैक (फलियां)', te: 'పసుపు మొజాయిక్ (బీన్స్)' },
    crop: 'Green Beans',
    image: '🫘',
    severity: 'medium',
  },
  {
    name: { en: 'Leaf Curl (Chili)', ml: 'ലീഫ് കേൾ (മുളക്)', hi: 'पत्ता मरोड़ (मिर्च)', te: 'ఆకు ముడత (మిరప)' },
    crop: 'Chili',
    image: '🌶️',
    severity: 'high',
  },
];

export function CropDiagnosisScreen({
  language,
  onLanguageChange,
  onBack,
}: CropDiagnosisScreenProps) {
  const t = DIAGNOSIS_TRANSLATIONS[language];
  const [step, setStep] = useState<'upload' | 'questionnaire' | 'analyzing' | 'results'>('upload');
  const [symptoms, setSymptoms] = useState({ yellowing: false, spots: false, wilting: false, insects: false });

  const handleUpload = () => {
    setStep('questionnaire');
  };

  const handleSubmitDiagnosis = () => {
    setStep('analyzing');
    setTimeout(() => setStep('results'), 2500);
  };

  const handleReset = () => {
    setStep('upload');
    setSymptoms({ yellowing: false, spots: false, wilting: false, insects: false });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/60 to-emerald-50/40 pb-12 text-gray-900">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white p-4 md:p-6 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <Scan className="h-7 w-7 text-emerald-300" />
                {t.title}
              </h1>
              <p className="text-emerald-100 text-sm mt-0.5">{t.subtitle}</p>
            </div>
          </div>
          <LanguageSelector language={language} onLanguageChange={onLanguageChange} variant="glass" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        <AnimatePresence mode="wait">
          {step === 'upload' && (
            <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              {/* Upload Section */}
              <Card className="shadow-lg border-emerald-100 overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="h-12 w-12 text-emerald-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{t.uploadTitle}</h2>
                    <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">{t.uploadDesc}</p>

                    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={handleUpload}
                          className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex flex-col items-center justify-center gap-1 shadow-md"
                        >
                          <Camera className="h-6 w-6" />
                          <span className="text-xs">{t.takePhoto}</span>
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={handleUpload}
                          variant="outline"
                          className="w-full h-16 border-2 border-emerald-600 text-emerald-700 font-bold rounded-xl flex flex-col items-center justify-center gap-1"
                        >
                          <Upload className="h-6 w-6" />
                          <span className="text-xs">{t.uploadImage}</span>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Common Diseases Library */}
              <Card className="shadow-md border-gray-100 mt-6">
                <CardHeader className="border-b border-gray-100 pb-3">
                  <CardTitle className="text-base flex items-center gap-2 text-gray-900">
                    <Bug className="h-5 w-5 text-red-500" />
                    {t.commonDiseases}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  {COMMON_DISEASES.map((disease, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-red-50/50 transition-colors border border-gray-100">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{disease.image}</span>
                        <div>
                          <h4 className="font-bold text-sm text-gray-900">{disease.name[language]}</h4>
                          <p className="text-xs text-gray-500">{disease.crop}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-[10px] ${disease.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                          {disease.severity === 'high' ? t.yes : t.no}
                        </Badge>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 'questionnaire' && (
            <motion.div key="questionnaire" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Card className="shadow-lg border-emerald-100">
                <CardHeader className="border-b border-gray-100 pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                    {t.symptoms}
                  </CardTitle>
                  <p className="text-xs text-gray-500 mt-1">{t.symptomsDesc}</p>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {/* Simulated image preview */}
                  <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl flex items-center justify-center border-2 border-dashed border-emerald-400">
                    <div className="text-center">
                      <Leaf className="h-16 w-16 text-emerald-500 mx-auto mb-2" />
                      <p className="text-sm font-bold text-emerald-700">📷 Crop Image Captured</p>
                      <p className="text-xs text-emerald-600">Tomato leaf sample</p>
                    </div>
                  </div>

                  {[
                    { key: 'yellowing' as const, label: t.yellowing, icon: <Leaf className="h-4 w-4 text-yellow-500" /> },
                    { key: 'spots' as const, label: t.spots, icon: <AlertTriangle className="h-4 w-4 text-gray-600" /> },
                    { key: 'wilting' as const, label: t.wilting, icon: <Droplets className="h-4 w-4 text-blue-500" /> },
                    { key: 'insects' as const, label: t.insects, icon: <Bug className="h-4 w-4 text-red-500" /> },
                  ].map((q) => (
                    <div key={q.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        {q.icon}
                        <span className="font-medium text-sm text-gray-900">{q.label}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSymptoms(s => ({ ...s, [q.key]: true }))}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            symptoms[q.key] ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                        >
                          {t.yes}
                        </button>
                        <button
                          onClick={() => setSymptoms(s => ({ ...s, [q.key]: false }))}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            !symptoms[q.key] ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                        >
                          {t.no}
                        </button>
                      </div>
                    </div>
                  ))}

                  <Button
                    onClick={handleSubmitDiagnosis}
                    className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-xl shadow-md mt-4"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    {t.submit}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 'analyzing' && (
            <motion.div key="analyzing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <Card className="shadow-lg border-emerald-100">
                <CardContent className="p-12 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-20 h-20 border-4 border-emerald-200 border-t-emerald-600 rounded-full mx-auto mb-6"
                  />
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{t.analyzing}</h2>
                  <p className="text-sm text-gray-500">AI Model: MobileNet v3 + Custom Agriculture CNN</p>
                  <div className="flex justify-center gap-1 mt-4">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        className="w-3 h-3 bg-emerald-600 rounded-full"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 'results' && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {/* Diagnosis Result */}
              <Card className="shadow-lg border-red-200 overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-rose-600 p-4 text-white">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-8 w-8 text-yellow-300" />
                    <div>
                      <h2 className="font-black text-lg">
                        {language === 'en' ? 'Late Blight Detected' : language === 'hi' ? 'झुलसा रोग पाया गया' : language === 'ml' ? 'ലേറ്റ് ബ്ലൈറ്റ് കണ്ടെത്തി' : 'ఆలస్య బ్లైట్ గుర్తించబడింది'}
                      </h2>
                      <p className="text-rose-100 text-sm">Phytophthora infestans</p>
                    </div>
                  </div>
                  <div className="mt-3 bg-white/20 rounded-xl p-3 flex items-center justify-between">
                    <span className="text-sm font-medium">{t.confidence}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-white/30 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '87%' }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full bg-yellow-300 rounded-full"
                        />
                      </div>
                      <span className="font-black text-lg">87%</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-5 space-y-5">
                  {/* Treatment */}
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2 mb-3">
                      <ShieldCheck className="h-5 w-5 text-emerald-600" /> {t.treatment}
                    </h3>
                    <div className="space-y-2">
                      {[
                        language === 'en' ? '1. Apply Mancozeb 75% WP @ 2.5g/L immediately' : language === 'hi' ? '1. तुरंत मैंकोज़ेब 75% WP @ 2.5g/L लगाएं' : language === 'ml' ? '1. ഉടൻ മാൻകോസെബ് 75% WP @ 2.5g/L ഇടുക' : '1. వెంటనే మాంకోజెబ్ 75% WP @ 2.5g/L వేయండి',
                        language === 'en' ? '2. Remove and destroy infected leaves' : language === 'hi' ? '2. संक्रमित पत्तियां हटाकर नष्ट करें' : language === 'ml' ? '2. രോഗബാധിത ഇലകൾ നീക്കം ചെയ്ത് നശിപ്പിക്കുക' : '2. వ్యాధి సోకిన ఆకులను తొలగించి నాశనం చేయండి',
                        language === 'en' ? '3. Improve air circulation between plants' : language === 'hi' ? '3. पौधों के बीच हवा का संचार सुधारें' : language === 'ml' ? '3. ചെടികൾ തമ്മിലുള്ള വായു സഞ്ചാരം മെച്ചപ്പെടുത്തുക' : '3. మొక్కల మధ్య గాలి ప్రసరణ మెరుగుపరచండి',
                        language === 'en' ? '4. Repeat fungicide after 7 days if symptoms persist' : language === 'hi' ? '4. लक्षण बने रहने पर 7 दिन बाद फफूंदनाशक दोहराएं' : language === 'ml' ? '4. ലക്ഷണങ്ങൾ തുടർന്നാൽ 7 ദിവസത്തിന് ശേഷം കുമിൾനാശിനി ആവർത്തിക്കുക' : '4. లక్షణాలు కొనసాగితే 7 రోజుల తర్వాత బూజు నిరోధకం మళ్ళీ వేయండి',
                      ].map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2.5 bg-emerald-50 rounded-lg border border-emerald-100">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-gray-700 leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prevention */}
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2 mb-3">
                      <Leaf className="h-5 w-5 text-blue-600" /> {t.prevention}
                    </h3>
                    <div className="space-y-2">
                      {[
                        language === 'en' ? '• Use disease-resistant tomato varieties' : language === 'hi' ? '• रोग प्रतिरोधी टमाटर की किस्में उपयोग करें' : language === 'ml' ? '• രോഗ പ്രതിരോധ ശേഷിയുള്ള തക്കാളി ഇനങ്ങൾ ഉപയോഗിക്കുക' : '• వ్యాధి నిరోధక టమాటా రకాలను ఉపయోగించండి',
                        language === 'en' ? '• Avoid overhead irrigation during monsoon' : language === 'hi' ? '• मानसून के दौरान ऊपरी सिंचाई से बचें' : language === 'ml' ? '• മഴക്കാലത്ത് മുകളിൽ നിന്നുള്ള ജലസേചനം ഒഴിവാക്കുക' : '• వర్షాకాలంలో పై నుండి నీటిపారుదల మానుకోండి',
                        language === 'en' ? '• Practice crop rotation every season' : language === 'hi' ? '• हर मौसम में फसल चक्र अपनाएं' : language === 'ml' ? '• എല്ലാ സീസണിലും വിള ഭ്രമണം പ്രയോഗിക്കുക' : '• ప్రతి సీజన్ పంట మార్పిడి చేయండి',
                      ].map((tip, idx) => (
                        <p key={idx} className="text-xs text-gray-600 pl-2 leading-relaxed">{tip}</p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handleReset}
                className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-xl shadow-md mt-4"
              >
                <Camera className="h-5 w-5 mr-2" /> {t.tryAgain}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <Button onClick={onBack} variant="outline" className="w-full h-12 text-gray-600 border-gray-300">
          <ArrowLeft className="h-4 w-4 mr-2" /> {t.back}
        </Button>
      </div>
    </div>
  );
}
