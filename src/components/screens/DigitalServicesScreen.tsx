import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  CheckCircle2,
  FileCheck2,
  Lock,
  MapPin,
  Clock,
  Landmark,
  IndianRupee,
  CreditCard,
  Camera,
  ChevronRight,
  AlertCircle,
  FileText,
  Warehouse,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { Language } from '../../types';
import { LanguageSelector } from '../ui/LanguageSelector';

interface DigitalServicesScreenProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onBack: () => void;
}

const SERVICES_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    title: 'Trust & Digital Agri Services',
    subtitle: 'KYC identity, live GPS logistics, quality grading & crop loans',
    tabKyc: 'Identity & KYC',
    tabLogistics: 'GPS Logistics',
    tabGrading: 'Quality Grading',
    tabFinance: 'Crop Loans & Finance',
    back: 'Back',
    kycTitle: 'Farmer & Buyer Identity Verification',
    kycDesc: 'Government Aadhaar and Land Record validation ensures 100% fraud-free transactions.',
    aadhaarVerified: 'Aadhaar Verified',
    landVerified: 'Land Record Verified (7/12 / RoR)',
    reputationScore: 'Trust & Reputation Score',
    viewCertificate: 'Digital Farmer ID Certificate',
    logisticsTitle: 'Real-time Transport & Transit Tracking',
    logisticsDesc: 'GPS vehicle tracking and milestone escrow payouts protect produce from farm gate to mandi.',
    activeShipment: 'Active Consignment #TRK-88219',
    route: 'Palakkad Farm Gate ➔ Vashi Wholesale Mandi',
    vehicleNumber: 'Vehicle: KL-09-CB-4521 (Reefer Truck, 4.5 MT)',
    driverName: 'Driver: Rajesh Kumar (Verified)',
    temperature: 'Cargo Temp: 4.2°C (Optimal for Tomatoes)',
    statusInTransit: 'In Transit — Estimated Arrival in 3h 45m',
    proofDelivery: 'Geotagged Delivery Proof & OTP Release',
    gradingTitle: 'Digital Crop Quality Inspection',
    gradingDesc: 'AI machine vision inspection analyzes size, color uniformity, and defect rate.',
    sampleTomato: 'Sample Lot: Premium Hybrid Tomato (500 kg)',
    gradeA: 'Grade: A+ (Premium Export Quality)',
    sizeMetric: 'Average Fruit Size: 65mm ± 3mm',
    colorMetric: 'Color Uniformity: 94% (Ripe Red)',
    defectMetric: 'Defect / Blemish Rate: 1.8% (Under 3% threshold)',
    suggestedRate: 'Recommended Premium Price: ₹38/kg (+15% above average)',
    inspectNewLot: 'Inspect New Batch',
    financeTitle: 'Financial Services & Crop Credit',
    financeDesc: 'Instant digital loans, PM Kisan Credit Card (KCC) and warehouse receipt financing.',
    kccLoan: 'Kisan Credit Card (KCC) Instant Loan',
    kccSub: 'Up to ₹3,00,000 at subsidized 4% interest rate',
    warehouseTitle: 'Cold Storage & Warehouse Receipt Loan',
    warehouseSub: 'Store produce at nearby accredited warehouse and get 70% advance liquidity',
    applyCredit: 'Apply in 2 Minutes',
  },
  ml: {
    title: 'വിശ്വാസ്യതയും ഡിജിറ്റൽ സേവനങ്ങളും',
    subtitle: 'KYC തിരിച്ചറിയൽ, ലൈവ് ജിപിഎസ് ലോജിസ്റ്റിക്സ്, ഗുണനിലവാര പരിശോധന & കാർഷിക വായ്പകൾ',
    tabKyc: 'തിരിച്ചറിയൽ & KYC',
    tabLogistics: 'ജിപിഎസ് ലോജിസ്റ്റിക്സ്',
    tabGrading: 'ഗുണനിലവാര ഗ്രേഡിംഗ്',
    tabFinance: 'വായ്പകളും ധനകാര്യവും',
    back: 'തിരികെ',
    kycTitle: 'കർഷക & വാങ്ങുന്നയാളുടെ തിരിച്ചറിയൽ പരിശോധന',
    kycDesc: 'ആധാർ, ഭൂമി രേഖകൾ എന്നിവ വഴി തട്ടിപ്പുകളില്ലാത്ത ഇടപാടുകൾ ഉറപ്പാക്കുന്നു.',
    aadhaarVerified: 'ആധാർ പരിശോധിച്ചു',
    landVerified: 'ഭൂമി രേഖ പരിശോധിച്ചു',
    reputationScore: 'വിശ്വാസ്യത സ്കോർ',
    viewCertificate: 'ഡിജിറ്റൽ കർഷക ഐഡി',
    logisticsTitle: 'തത്സമയ ഗതാഗത ട്രാക്കിംഗ്',
    logisticsDesc: 'ജിപിഎസ് വാഹന ട്രാക്കിംഗും സുരക്ഷിത പേയ്‌മെന്റും വിളകളുടെ സുരക്ഷ ഉറപ്പാക്കുന്നു.',
    activeShipment: 'സജീവ ചരക്ക് #TRK-88219',
    route: 'പാലക്കാട് ഫാം ➔ വാഷി മാർക്കറ്റ്',
    vehicleNumber: 'വാഹനം: KL-09-CB-4521 (റീഫർ ട്രക്ക്)',
    driverName: 'ഡ്രൈവർ: രാജേഷ് കുമാർ',
    temperature: 'താപനില: 4.2°C',
    statusInTransit: 'യാത്രയിലാണ് — എത്തുവാൻ ബാക്കി 3h 45m',
    proofDelivery: 'ജിയോടാഗ് ചെയ്ത ഡെലിവറി തെളിവ്',
    gradingTitle: 'വിള ഗുണനിലവാര പരിശോധന',
    gradingDesc: 'AI ക്യാമറ പരിശോധന വഴി വലിപ്പവും ഗുണനിലവാരവും തിട്ടപ്പെടുത്തുന്നു.',
    sampleTomato: 'സാമ്പിൾ: ഹൈബ്രിഡ് തക്കാളി (500 kg)',
    gradeA: 'ഗ്രേഡ്: A+ (പ്രീമിയം ഗുണനിലവാരം)',
    sizeMetric: 'ശരാശരി വലിപ്പം: 65mm',
    colorMetric: 'നിറം: 94% അനുയോജ്യം',
    defectMetric: 'തകരാറ്: 1.8%',
    suggestedRate: 'ശുപാർശ ചെയ്യുന്ന വില: ₹38/kg',
    inspectNewLot: 'പുതിയ ബാച്ച് പരിശോധിക്കുക',
    financeTitle: 'ധനകാര്യ സേവനങ്ങളും വായ്പകളും',
    financeDesc: 'തത്സമയ ഡിജിറ്റൽ വായ്പകളും കിസാൻ ക്രെഡിറ്റ് കാർഡും.',
    kccLoan: 'കിസാൻ ക്രെഡിറ്റ് കാർഡ് (KCC) വായ്പ',
    kccSub: '4% പലിശ നിരക്കിൽ ₹3,00,000 വരെ',
    warehouseTitle: 'കോൾഡ് സ്റ്റോറേജ് വായ്പ',
    warehouseSub: 'വിളകൾ സൂക്ഷിക്കാനും 70% തുക മുൻകൂറായി നേടാനും സൌകര്യം',
    applyCredit: 'അപേക്ഷിക്കുക',
  },
  hi: {
    title: 'भरोसा और डिजिटल कृषि सेवाएं',
    subtitle: 'केवाईसी पहचान, लाइव जीपीएस लॉजिस्टिक्स, गुणवत्ता ग्रेडिंग और फसली ऋण',
    tabKyc: 'पहचान और केवाईसी',
    tabLogistics: 'जीपीएस लॉजिस्टिक्स',
    tabGrading: 'गुणवत्ता ग्रेडिंग',
    tabFinance: 'ऋण एवं वित्त',
    back: 'वापस',
    kycTitle: 'किसान और खरीदार पहचान सत्यापन',
    kycDesc: 'आधार और भूमि रिकॉर्ड सत्यापन से 100% सुरक्षित और पारदर्शी लेनदेन सुनिश्चित होता है।',
    aadhaarVerified: 'आधार सत्यापित',
    landVerified: 'भूमि रिकॉर्ड (खतौनी) सत्यापित',
    reputationScore: 'भरोसा और प्रतिष्ठा स्कोर',
    viewCertificate: 'डिजिटल किसान प्रमाण पत्र',
    logisticsTitle: 'रीयल-टाइम वाहन एवं परिवहन ट्रैकिंग',
    logisticsDesc: 'जीपीएस ट्रैकिंग और एस्क्रो पेमेंट से खेत से मंडी तक उपज सुरक्षित रहती है।',
    activeShipment: 'सक्रिय खेप #TRK-88219',
    route: 'पालक्काड फार्म ➔ वाशी थोक मंडी',
    vehicleNumber: 'वाहन: KL-09-CB-4521 (रीफर ट्रक)',
    driverName: 'चालक: राजेश कुमार',
    temperature: 'तापमान: 4.2°C (टमाटर हेतु उपयुक्त)',
    statusInTransit: 'मार्ग में — पहुंचने में अनुमानित समय 3 घंटे 45 मिनट',
    proofDelivery: 'जियोटैग्ड डिलीवरी प्रमाण और ओटीपी',
    gradingTitle: 'डिजिटल फसल गुणवत्ता निरीक्षण',
    gradingDesc: 'मशीन विजन से आकार, रंग एकरूपता और गुणवत्ता स्कोर की सटीक जांच।',
    sampleTomato: 'नमूना लॉट: हाइब्रिड टमाटर (500 किग्रा)',
    gradeA: 'ग्रेड: A+ (प्रीमियम गुणवत्ता)',
    sizeMetric: 'औसत फल का आकार: 65 मिमी',
    colorMetric: 'रंग एकरूपता: 94%',
    defectMetric: 'दोष दर: 1.8% (मानक सीमा से कम)',
    suggestedRate: 'अनुशंसित प्रीमियम मूल्य: ₹38/किग्रा (+15% अधिक)',
    inspectNewLot: 'नए लॉट का निरीक्षण करें',
    financeTitle: 'वित्तीय सेवाएं और फसली ऋण',
    financeDesc: 'त्वरित डिजिटल ऋण, किसान क्रेडिट कार्ड (KCC) और वेयरहाउस रसीद वित्तपोषण।',
    kccLoan: 'किसान क्रेडिट कार्ड (KCC) त्वरित ऋण',
    kccSub: '4% ब्याज दर पर ₹3,00,000 तक की सहायता',
    warehouseTitle: 'कोल्ड स्टोरेज एवं वेयरहाउस रसीद ऋण',
    warehouseSub: 'नजदीकी कोल्ड स्टोरेज में फसल रखें और 70% अग्रिम प्राप्त करें',
    applyCredit: '2 मिनट में आवेदन करें',
  },
  te: {
    title: 'విశ్వసనీయత & డిజిటల్ వ్యవసాయ సేవలు',
    subtitle: 'KYC గుర్తింపు, లైవ్ GPS లాజిస్టిక్స్, నాణ్యత గ్రేడింగ్ & పంట రుణాలు',
    tabKyc: 'గుర్తింపు & KYC',
    tabLogistics: 'GPS లాజిస్టిక్స్',
    tabGrading: 'నాణ్యత గ్రేడింగ్',
    tabFinance: 'రుణాలు & ఫైనాన్స్',
    back: 'వెనుకకు',
    kycTitle: 'రైతు & కొనుగోలుదారు గుర్తింపు ధృవీకరణ',
    kycDesc: 'ఆధార్ మరియు భూమి రికార్డుల ధృవీకరణ ద్వారా సురక్షిత లావాదేవీలు.',
    aadhaarVerified: 'ఆధార్ ధృవీకరించబడింది',
    landVerified: 'భూమి రికార్డు (పట్టాదారు పాస్‌బుక్) ధృవీకరించబడింది',
    reputationScore: 'విశ్వసనీయత స్కోర్',
    viewCertificate: 'డిజిటల్ రైతు ఐడీ సర్టిఫికెట్',
    logisticsTitle: 'రియల్ టైమ్ రవాణా ట్రాకింగ్',
    logisticsDesc: 'GPS ట్రాకింగ్ మరియు ఎస్క్రో పేమెంట్ ద్వారా సరుకు రక్షణ.',
    activeShipment: 'రవాణా ఆర్డర్ #TRK-88219',
    route: 'పాలక్కాడ్ ఫామ్ ➔ వాషి మార్కెట్',
    vehicleNumber: 'వాహనం: KL-09-CB-4521 (రీఫర్ ట్రక్)',
    driverName: 'డ్రైవర్: రాజేష్ కుమార్',
    temperature: 'ఉష్ణోగ్రత: 4.2°C',
    statusInTransit: 'దారిలో ఉంది — చేరడానికి సమయం 3 గం. 45 ని.',
    proofDelivery: 'జియోట్యాగ్ చేయబడిన డెలివరీ ప్రూఫ్',
    gradingTitle: 'డిజిటల్ పంట నాణ్యత తనిఖీ',
    gradingDesc: 'మెషిన్ విజన్ సాంకేతికతతో సైజు, రంగు మరియు నాణ్యత లెక్కింపు.',
    sampleTomato: 'నమూనా: హైబ్రిడ్ టమాటా (500 కిలోలు)',
    gradeA: 'గ్రేడ్: A+ (ప్రీమియం నాణ్యత)',
    sizeMetric: 'సగటు సైజు: 65mm',
    colorMetric: 'రంగు: 94%',
    defectMetric: 'లోపాల శాతం: 1.8%',
    suggestedRate: 'సిఫార్సు ధర: ₹38/కిలో',
    inspectNewLot: 'కొత్త బ్యాచ్ తనిఖీ చేయండి',
    financeTitle: 'ఆర్థిక సేవలు & పంట రుణాలు',
    financeDesc: 'తక్షణ డిజిటల్ రుణాలు మరియు కిసాన్ క్రెడిట్ కార్డు (KCC).',
    kccLoan: 'కిసాన్ క్రెడిట్ కార్డ్ (KCC) రుణం',
    kccSub: '4% వడ్డీతో ₹3,00,000 వరకు రుణం',
    warehouseTitle: 'కోల్డ్ స్టోరేజ్ & రశీదు రుణాలు',
    warehouseSub: 'కోల్డ్ స్టోరేజ్‌లో ఉంచి 70% ముందస్తు రుణం పొందండి',
    applyCredit: 'దరఖాస్తు చేసుకోండి',
  },
};

type ActiveTab = 'kyc' | 'logistics' | 'grading' | 'finance';

export function DigitalServicesScreen({
  language,
  onLanguageChange,
  onBack,
}: DigitalServicesScreenProps) {
  const t = SERVICES_TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<ActiveTab>('kyc');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/70 to-emerald-50/40 pb-12 text-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-900 text-white p-4 md:p-6 shadow-md">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                  <ShieldCheck className="h-7 w-7 text-emerald-400" />
                  {t.title}
                </h1>
                <p className="text-emerald-100/80 text-sm mt-0.5">{t.subtitle}</p>
              </div>
            </div>
            <LanguageSelector language={language} onLanguageChange={onLanguageChange} variant="glass" />
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 mt-4 no-scrollbar">
            {[
              { key: 'kyc', label: t.tabKyc, icon: <FileCheck2 className="h-4 w-4" /> },
              { key: 'logistics', label: t.tabLogistics, icon: <Truck className="h-4 w-4" /> },
              { key: 'grading', label: t.tabGrading, icon: <Camera className="h-4 w-4" /> },
              { key: 'finance', label: t.tabFinance, icon: <IndianRupee className="h-4 w-4" /> },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as ActiveTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.key
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
        {/* Tab 1: Identity & KYC */}
        {activeTab === 'kyc' && (
          <div className="space-y-4">
            <Card className="border-emerald-200 shadow-md bg-white">
              <CardHeader className="bg-emerald-50/60 pb-3 border-b border-emerald-100">
                <CardTitle className="text-base text-emerald-950 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  {t.kycTitle}
                </CardTitle>
                <p className="text-xs text-gray-500 mt-1">{t.kycDesc}</p>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-gray-800">Govt Aadhaar ID</span>
                      <Badge className="bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                        <CheckCircle2 className="h-3 w-3 mr-1" /> {t.aadhaarVerified}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 font-mono">UIDAI: XXXX-XXXX-5829 (Biometric Authenticated)</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-gray-800">Land Title / RoR</span>
                      <Badge className="bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                        <CheckCircle2 className="h-3 w-3 mr-1" /> {t.landVerified}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 font-mono">Survey No: 142/3A, 2.8 Acres (Palakkad Dist)</p>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
                  <div>
                    <span className="text-xs font-bold text-emerald-200 block">{t.reputationScore}</span>
                    <span className="text-3xl font-black">98 / 100</span>
                    <p className="text-xs text-emerald-100 mt-1">
                      Based on 42 completed escrow sales, zero disputes, and 100% on-time delivery.
                    </p>
                  </div>
                  <Button className="bg-white text-emerald-900 font-bold hover:bg-emerald-50 text-xs px-4 h-10 shadow">
                    {t.viewCertificate}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tab 2: GPS Logistics */}
        {activeTab === 'logistics' && (
          <div className="space-y-4">
            <Card className="border-blue-200 shadow-md bg-white">
              <CardHeader className="bg-blue-50/60 pb-3 border-b border-blue-100">
                <CardTitle className="text-base text-blue-950 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  {t.logisticsTitle}
                </CardTitle>
                <p className="text-xs text-gray-500 mt-1">{t.logisticsDesc}</p>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                <div className="border border-blue-200 rounded-2xl p-4 bg-gradient-to-b from-blue-50/30 to-white">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-sm text-blue-900">{t.activeShipment}</span>
                    <Badge className="bg-blue-600 text-white text-[11px] animate-pulse">
                      {t.statusInTransit}
                    </Badge>
                  </div>

                  <p className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
                    <MapPin className="h-4 w-4 text-emerald-600" /> {t.route}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
                    <div className="bg-white p-3 rounded-xl border border-gray-200 text-xs text-gray-700 font-medium">
                      {t.vehicleNumber}
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-gray-200 text-xs text-gray-700 font-medium">
                      {t.driverName}
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-gray-200 text-xs text-emerald-700 font-bold">
                      {t.temperature}
                    </div>
                  </div>

                  {/* Tracking Milestones */}
                  <div className="space-y-2 mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-xs">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span className="font-semibold text-gray-800">Farm pickup verified & weighed (08:30 AM)</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span className="font-semibold text-gray-800">Highway Toll & Cold Chain Checkpoint #2 passed</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-blue-700 font-bold">
                      <Clock className="h-4 w-4 text-blue-600 animate-spin" />
                      <span>Approaching Mandi Transit Hub (ETA 3h 45m)</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-emerald-700" />
                    <span className="text-xs font-bold text-emerald-900">{t.proofDelivery}</span>
                  </div>
                  <Badge className="bg-emerald-600 text-white text-[10px]">Escrow Protected</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tab 3: Crop Quality Inspection */}
        {activeTab === 'grading' && (
          <div className="space-y-4">
            <Card className="border-amber-200 shadow-md bg-white">
              <CardHeader className="bg-amber-50/60 pb-3 border-b border-amber-100">
                <CardTitle className="text-base text-amber-950 flex items-center gap-2">
                  <Camera className="h-5 w-5 text-amber-600" />
                  {t.gradingTitle}
                </CardTitle>
                <p className="text-xs text-gray-500 mt-1">{t.gradingDesc}</p>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-black text-sm text-gray-900">{t.sampleTomato}</span>
                    <Badge className="bg-amber-500 text-white font-black text-xs px-2.5 py-0.5">
                      {t.gradeA}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-3">
                    <div className="bg-white p-3 rounded-xl border border-gray-200">
                      <span className="text-gray-400 block mb-0.5">Size Analysis</span>
                      <span className="font-bold text-gray-800">{t.sizeMetric}</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-gray-200">
                      <span className="text-gray-400 block mb-0.5">Ripeness</span>
                      <span className="font-bold text-gray-800">{t.colorMetric}</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-gray-200">
                      <span className="text-gray-400 block mb-0.5">Defects</span>
                      <span className="font-bold text-emerald-700">{t.defectMetric}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900">{t.suggestedRate}</span>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold h-8">
                      {t.inspectNewLot}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tab 4: Finance & Loans */}
        {activeTab === 'finance' && (
          <div className="space-y-4">
            <Card className="border-teal-200 shadow-md bg-white">
              <CardHeader className="bg-teal-50/60 pb-3 border-b border-teal-100">
                <CardTitle className="text-base text-teal-950 flex items-center gap-2">
                  <Landmark className="h-5 w-5 text-teal-700" />
                  {t.financeTitle}
                </CardTitle>
                <p className="text-xs text-gray-500 mt-1">{t.financeDesc}</p>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                <div className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-black text-sm text-teal-950 flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-teal-700" />
                      {t.kccLoan}
                    </h4>
                    <p className="text-xs text-teal-800 mt-1">{t.kccSub}</p>
                    <p className="text-[11px] text-teal-600 mt-0.5">Partnered with SBI & NABARD</p>
                  </div>
                  <Button className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs h-9 px-4">
                    {t.applyCredit}
                  </Button>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-black text-sm text-indigo-950 flex items-center gap-2">
                      <Warehouse className="h-4 w-4 text-indigo-700" />
                      {t.warehouseTitle}
                    </h4>
                    <p className="text-xs text-indigo-800 mt-1">{t.warehouseSub}</p>
                    <p className="text-[11px] text-indigo-600 mt-0.5">WDRA Accredited Warehouses</p>
                  </div>
                  <Button className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs h-9 px-4">
                    {t.applyCredit}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Button onClick={onBack} variant="outline" className="w-full h-12 text-gray-600 border-gray-300">
          <ArrowLeft className="h-4 w-4 mr-2" /> {t.back}
        </Button>
      </div>
    </div>
  );
}
