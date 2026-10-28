import { motion } from 'motion/react';
import {
  IndianRupee,
  TrendingUp,
  Plus,
  Package,
  LogOut,
  Calendar,
  Sparkles,
  CloudSun,
  ScanLine,
  BarChart3,
  ShoppingBag,
  Building2,
  ShieldCheck,
  ChevronRight,
  Bot,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Language, User, Produce, Screen } from '../../types';
import { farmerDashTranslations } from '../../data/translations';
import { LanguageSelector } from '../ui/LanguageSelector';

const HUB_LABELS: Record<Language, {
  sectionTitle: string;
  medhaTitle: string;
  medhaDesc: string;
  weatherTitle: string;
  weatherDesc: string;
  diagnosisTitle: string;
  diagnosisDesc: string;
  mandiTitle: string;
  mandiDesc: string;
  inputTitle: string;
  inputDesc: string;
  directoryTitle: string;
  directoryDesc: string;
  servicesTitle: string;
  servicesDesc: string;
}> = {
  en: {
    sectionTitle: 'Smart Farming Hub & Advisory',
    medhaTitle: 'Medha AI Advisor',
    medhaDesc: 'Multilingual voice assistant for crops & diseases',
    weatherTitle: 'Weather & Planning',
    weatherDesc: 'Rainfall, alerts & crop calendar advisory',
    diagnosisTitle: 'Crop Diagnosis AI',
    diagnosisDesc: 'Scan leaves to detect plant diseases & pests',
    mandiTitle: 'Mandi Live Rates',
    mandiDesc: 'APMC wholesale prices & AI forecasting',
    inputTitle: 'Agri Store & Subsidies',
    inputDesc: 'Genuine inputs & PM-KISAN schemes',
    directoryTitle: 'Agri Directory',
    directoryDesc: 'Verified buyers, mills & logistics partners',
    servicesTitle: 'Trust & Digital Services',
    servicesDesc: 'Aadhaar KYC, GPS transit & KCC loans',
  },
  ml: {
    sectionTitle: 'സ്മാർട്ട് കാർഷിക സേവനങ്ങളും ഉപദേശങ്ങളും',
    medhaTitle: 'മേധ AI ഉപദേശക',
    medhaDesc: 'ശബ്ദത്തിലൂടെ സംസാരിക്കാവുന്ന സഹായി',
    weatherTitle: 'കാലാവസ്ഥ & ആസൂത്രണം',
    weatherDesc: 'മഴ, രോഗ മുന്നറിയിപ്പുകൾ, കാർഷിക കലണ്ടർ',
    diagnosisTitle: 'വിള രോഗ നിർണയം',
    diagnosisDesc: 'ഫോട്ടോ എടുത്ത് രോഗങ്ങൾ കണ്ടെത്തുക',
    mandiTitle: 'വിപണി തത്സമയ വിലകൾ',
    mandiDesc: 'APMC വിലകളും AI പ്രവചനവും',
    inputTitle: 'ഇൻപുട്ട് സ്റ്റോർ & സബ്സിഡികൾ',
    inputDesc: 'വിത്തുകൾ, വളങ്ങൾ, സർക്കാർ സഹായങ്ങൾ',
    directoryTitle: 'ബിസിനസ്സ് ഡയറക്ടറി',
    directoryDesc: 'പരിശോധിച്ച വാങ്ങുന്നവരും ലോജിസ്റ്റിക്സും',
    servicesTitle: 'വിശ്വാസ്യതയും സേവനങ്ങളും',
    servicesDesc: 'ആധാർ KYC, GPS ട്രാക്കിംഗ്, വായ്പകൾ',
  },
  hi: {
    sectionTitle: 'स्मार्ट कृषि हब और विशेषज्ञ सलाह',
    medhaTitle: 'मेधा एआई सलाहकार',
    medhaDesc: 'आवाज से संचालित बहुभाषी कृषि साथी',
    weatherTitle: 'मौसम एवं योजना',
    weatherDesc: 'बारिश का पूर्वानुमान एवं फसल कैलेंडर',
    diagnosisTitle: 'फसल रोग निदान',
    diagnosisDesc: 'पत्ते की फोटो खींचकर रोग व उपचार जानें',
    mandiTitle: 'मंडी लाइव भाव',
    mandiDesc: 'एपीएमसी थोक दरें एवं मूल्य रुझान',
    inputTitle: 'कृषि स्टोर व सब्सिडी',
    inputDesc: 'प्रमाणित बीज, खाद व सरकारी योजनाएं',
    directoryTitle: 'कृषि निर्देशिका',
    directoryDesc: 'सत्यापित खरीदार व परिवहन भागीदार',
    servicesTitle: 'भरोसा और डिजिटल सेवाएं',
    servicesDesc: 'आधार सत्यापन, जीपीएस ट्रैकिंग, किसान ऋण',
  },
  te: {
    sectionTitle: 'స్మార్ట్ వ్యవసాయ సేవలు & సలహాలు',
    medhaTitle: 'మేధ AI సలహాదారు',
    medhaDesc: 'వాయిస్ ఆధారిత బహుభాషా వ్యవసాయ సహాయకురాలు',
    weatherTitle: 'వాతావరణం & ప్రణాళిక',
    weatherDesc: 'వర్షపాతం, హెచ్చరికలు & పంట సలహాలు',
    diagnosisTitle: 'పంట తెగుళ్ల నిర్ధారణ',
    diagnosisDesc: 'ఫోటో తీసి తెగుళ్లు మరియు చికిత్స తెలుసుకోండి',
    mandiTitle: 'మార్కెట్ లైవ్ ధరలు',
    mandiDesc: 'APMC టోకు ధరలు మరియు భవిష్యత్తు అంచనాలు',
    inputTitle: 'ఇన్‌పుట్ స్టోర్ & సబ్సిడీలు',
    inputDesc: 'అసలైన విత్తనాలు, ఎరువులు & ప్రభుత్వ పథకాలు',
    directoryTitle: 'వ్యాపార డైరెక్టరీ',
    directoryDesc: 'ధృవీకరించిన కొనుగోలుదారులు & రవాణా',
    servicesTitle: 'విశ్వసనీయత & సేవలు',
    servicesDesc: 'ఆధార్ ధృవీకరణ, GPS ట్రాకింగ్, పంట రుణాలు',
  },
};

interface FarmerDashboardScreenProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  user: User;
  produce: Produce[];
  onNavigate: (screen: Screen, listing?: Produce, partner?: User) => void;
  onLogout: () => void;
  getTranslatedCropName: (crop: string, lang: Language) => string;
  getTranslatedUserName: (name: string, lang: Language) => string;
  getTranslatedVillageName: (village: string, lang: Language) => string;
}

export function FarmerDashboardScreen({
  language,
  onLanguageChange,
  user,
  produce,
  onNavigate,
  onLogout,
  getTranslatedCropName,
  getTranslatedUserName,
  getTranslatedVillageName,
}: FarmerDashboardScreenProps) {
  const t = farmerDashTranslations[language];
  const hub = HUB_LABELS[language];

  // Calculate earnings
  const soldEarnings = produce
    .filter((p) => p.status === 'sold')
    .reduce((sum, p) => sum + p.quantity * p.pricePerKg, 0);

  const activeValue = produce
    .filter((p) => p.status === 'available')
    .reduce((sum, p) => sum + p.quantity * p.pricePerKg, 0);

  const totalEarnings = soldEarnings > 0 ? soldEarnings * 3 + activeValue : activeValue;

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'sold':
        return 'secondary';
      case 'pending':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return t.available || 'Available';
      case 'sold':
        return t.sold || 'Sold';
      case 'pending':
        return t.pending || 'Pending';
      default:
        return status;
    }
  };

  const featureCards = [
    {
      screen: 'medha-ai' as Screen,
      title: hub.medhaTitle,
      desc: hub.medhaDesc,
      icon: <Bot className="h-6 w-6 text-emerald-600" />,
      color: 'bg-emerald-50 hover:bg-emerald-100/70 border-emerald-200',
      badge: 'Voice AI',
    },
    {
      screen: 'weather-advisory' as Screen,
      title: hub.weatherTitle,
      desc: hub.weatherDesc,
      icon: <CloudSun className="h-6 w-6 text-sky-600" />,
      color: 'bg-sky-50 hover:bg-sky-100/70 border-sky-200',
      badge: 'Live',
    },
    {
      screen: 'crop-diagnosis' as Screen,
      title: hub.diagnosisTitle,
      desc: hub.diagnosisDesc,
      icon: <ScanLine className="h-6 w-6 text-teal-600" />,
      color: 'bg-teal-50 hover:bg-teal-100/70 border-teal-200',
      badge: 'Vision AI',
    },
    {
      screen: 'mandi-prices' as Screen,
      title: hub.mandiTitle,
      desc: hub.mandiDesc,
      icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
      color: 'bg-blue-50 hover:bg-blue-100/70 border-blue-200',
      badge: 'APMC',
    },
    {
      screen: 'input-marketplace' as Screen,
      title: hub.inputTitle,
      desc: hub.inputDesc,
      icon: <ShoppingBag className="h-6 w-6 text-orange-600" />,
      color: 'bg-orange-50 hover:bg-orange-100/70 border-orange-200',
      badge: 'Subsidies',
    },
    {
      screen: 'company-directory' as Screen,
      title: hub.directoryTitle,
      desc: hub.directoryDesc,
      icon: <Building2 className="h-6 w-6 text-indigo-600" />,
      color: 'bg-indigo-50 hover:bg-indigo-100/70 border-indigo-200',
      badge: 'B2B',
    },
    {
      screen: 'digital-services' as Screen,
      title: hub.servicesTitle,
      desc: hub.servicesDesc,
      icon: <ShieldCheck className="h-6 w-6 text-slate-700" />,
      color: 'bg-slate-50 hover:bg-slate-100/70 border-slate-200',
      badge: 'KYC & Loans',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/60 to-emerald-100/40 pb-12 text-gray-900">
      {/* Top Banner */}
      <div className="bg-emerald-600 text-white p-4 md:p-6 shadow-md">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">{t.dashboard}</h1>
                <span className="text-xs bg-emerald-700/80 text-emerald-100 px-2 py-0.5 rounded-full font-medium">
                  {getTranslatedVillageName(user.village, language)}
                </span>
              </div>
              <p className="text-emerald-100 text-sm mt-0.5">
                {t.welcome}, <span className="font-semibold">{getTranslatedUserName(user.name, language)}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <LanguageSelector
                language={language}
                onLanguageChange={onLanguageChange}
                variant="glass"
              />

              <Button
                onClick={onLogout}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-emerald-700 text-xs px-2.5 h-8 gap-1 border border-emerald-500/50"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>

          {/* Earnings Stats Cards */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 mt-2">
            <div className="bg-white/15 backdrop-blur-md rounded-xl p-3.5 md:p-4 border border-white/20 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white/20 rounded-lg text-emerald-100">
                  <IndianRupee className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-emerald-100 font-medium">{t.earnings}</p>
                  <p className="text-xl md:text-2xl font-extrabold tracking-tight">
                    ₹{soldEarnings.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-md rounded-xl p-3.5 md:p-4 border border-white/20 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white/20 rounded-lg text-emerald-100">
                  <TrendingUp className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-emerald-100 font-medium">{t.totalEarnings}</p>
                  <p className="text-xl md:text-2xl font-extrabold tracking-tight">
                    ₹{totalEarnings.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        {/* Add Produce Action Button */}
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <Button
            onClick={() => onNavigate('add-produce')}
            className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold shadow-lg shadow-emerald-600/20 rounded-xl flex items-center justify-center gap-3"
          >
            <Plus className="h-6 w-6" />
            <span>{t.addProduce}</span>
          </Button>
        </motion.div>

        {/* Smart Farming Hub & Advisory Services Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base md:text-lg font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-600" />
              {hub.sectionTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {featureCards.map((card) => (
              <motion.div
                key={card.screen}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate(card.screen)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all shadow-sm ${card.color} flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg bg-white/80 shadow-xs border border-white">
                      {card.icon}
                    </div>
                    <Badge className="bg-white/90 text-gray-700 border-gray-200 text-[10px] font-bold">
                      {card.badge}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-sm text-gray-900">{card.title}</h3>
                  <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{card.desc}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-black/5 flex items-center justify-end text-xs font-bold text-gray-700">
                  <span className="flex items-center">Open <ChevronRight className="h-3.5 w-3.5 ml-0.5" /></span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* My Listings Card */}
        <Card className="shadow-md border-emerald-100">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
              <Package className="h-5 w-5 text-emerald-600" />
              <span>{t.myListings}</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full ml-auto font-medium">
                {produce.length} {produce.length === 1 ? 'crop' : 'crops'}
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-4 md:p-6">
            {produce.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Package className="h-14 w-14 mx-auto mb-3 text-emerald-200" />
                <p className="text-base font-semibold text-gray-700 mb-1">{t.noListings}</p>
                <p className="text-sm text-gray-500">{t.startSelling}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {produce.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onNavigate('listing-detail', item)}
                    className="border border-gray-100 rounded-xl p-4 hover:border-emerald-200 hover:bg-emerald-50/40 transition-all cursor-pointer bg-white shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-3"
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={item.imageUrl}
                        alt={item.cropName}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-gray-100"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg text-gray-900">
                            {getTranslatedCropName(item.cropName, language)}
                          </h3>
                          <Badge
                            variant={getStatusBadgeVariant(item.status) as any}
                            className={
                              item.status === 'available'
                                ? 'bg-emerald-100 text-emerald-800'
                                : item.status === 'sold'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }
                          >
                            {getStatusLabel(item.status)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                          <span className="font-semibold text-emerald-700">
                            ₹{item.pricePerKg} {t.perKg}
                          </span>
                          <span>•</span>
                          <span>
                            {item.quantity} {t.kg}
                          </span>
                          <span>•</span>
                          <span className="text-gray-500 text-xs flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {item.postedDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                      <div className="text-right">
                        <span className="text-xs text-gray-500 block">Total Batch Value</span>
                        <span className="text-base font-extrabold text-gray-900">
                          ₹{(item.quantity * item.pricePerKg).toLocaleString()}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-8 text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
