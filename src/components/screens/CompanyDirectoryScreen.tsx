import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Building2,
  Search,
  ShieldCheck,
  CheckCircle,
  PlusCircle,
  Truck,
  Sprout,
  Store,
  Layers,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Upload,
  FileCheck,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { Language } from '../../types';
import { LanguageSelector } from '../ui/LanguageSelector';

interface CompanyDirectoryScreenProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onBack: () => void;
}

const COMPANY_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    title: 'Agri Business & Company Directory',
    subtitle: 'Verified agribusinesses, buyers, processors & logistics partners',
    search: 'Search company, brand, or sector...',
    allCategories: 'All Categories',
    buyers: 'Institutional Buyers',
    inputs: 'Seeds & Fertilizers',
    processors: 'Food Processors',
    logistics: 'Transport & Logistics',
    tech: 'Agritech & Services',
    verifiedPartner: 'Verified Partner',
    gstVerified: 'GST & License Verified',
    contact: 'Contact Company',
    registerCompany: 'Register Your Company',
    back: 'Back',
    submitApplication: 'Submit for Verification',
    companyName: 'Company / Business Name',
    categoryLabel: 'Business Category',
    gstLabel: 'GSTIN / Registration Number',
    phoneLabel: 'Business Phone Number',
    emailLabel: 'Business Email',
    locationLabel: 'Headquarters / Operational District',
    uploadDocs: 'Upload Registration / License Document',
    successTitle: 'Application Submitted!',
    successDesc: 'Our verification team will review your business credentials within 24-48 hours.',
  },
  ml: {
    title: 'കാർഷിക ബിസിനസ്സ് ഡയറക്ടറി',
    subtitle: 'പരിശോധിച്ച അഗ്രിബിസിനസുകൾ, വാങ്ങുന്നവർ, പ്രോസസ്സറുകൾ & ലോജിസ്റ്റിക്സ് പങ്കാളികൾ',
    search: 'കമ്പനി, ബ്രാൻഡ് അല്ലെങ്കിൽ മേഖല തിരയുക...',
    allCategories: 'എല്ലാ വിഭാഗങ്ങളും',
    buyers: 'വാങ്ങുന്നവർ',
    inputs: 'വിത്തുകളും വളങ്ങളും',
    processors: 'ഫുഡ് പ്രോസസ്സറുകൾ',
    logistics: 'ട്രാൻസ്പോർട്ട് & ലോജിസ്റ്റിക്സ്',
    tech: 'അഗ്രിടെക് സേവനങ്ങൾ',
    verifiedPartner: 'പരിശോധിച്ച പങ്കാളി',
    gstVerified: 'GST പരിശോധിച്ചു',
    contact: 'ബന്ധപ്പെടുക',
    registerCompany: 'നിങ്ങളുടെ കമ്പനി രജിസ്റ്റർ ചെയ്യുക',
    back: 'തിരികെ',
    submitApplication: 'പരിശോധനയ്ക്കായി സമർപ്പിക്കുക',
    companyName: 'കമ്പനിയുടെ പേര്',
    categoryLabel: 'ബിസിനസ്സ് വിഭാഗം',
    gstLabel: 'GSTIN / രജിസ്ട്രേഷൻ നമ്പർ',
    phoneLabel: 'ഫോൺ നമ്പർ',
    emailLabel: 'ഇമെയിൽ',
    locationLabel: 'ആസ്ഥാനം / ജില്ല',
    uploadDocs: 'രേഖകൾ അപ്‌ലോഡ് ചെയ്യുക',
    successTitle: 'അപേക്ഷ സമർപ്പിച്ചു!',
    successDesc: 'ഞങ്ങളുടെ ടീം 24-48 മണിക്കൂറിനുള്ളിൽ നിങ്ങളുടെ രേഖകൾ പരിശോധിക്കും.',
  },
  hi: {
    title: 'कृषि व्यवसाय एवं कंपनी निर्देशिका',
    subtitle: 'सत्यापित कृषि व्यवसाय, खरीदार, खाद्य प्रसंस्करण और लॉजिस्टिक्स भागीदार',
    search: 'कंपनी, ब्रांड या क्षेत्र खोजें...',
    allCategories: 'सभी श्रेणियां',
    buyers: 'संस्थागत खरीदार',
    inputs: 'बीज एवं उर्वरक',
    processors: 'खाद्य प्रसंस्करण',
    logistics: 'परिवहन और लॉजिस्टिक्स',
    tech: 'एग्रीटेक और सेवाएं',
    verifiedPartner: 'सत्यापित भागीदार',
    gstVerified: 'जीएसटी और लाइसेंस सत्यापित',
    contact: 'कंपनी से संपर्क करें',
    registerCompany: 'अपनी कंपनी पंजीकृत करें',
    back: 'वापस',
    submitApplication: 'सत्यापन हेतु जमा करें',
    companyName: 'कंपनी / व्यवसाय का नाम',
    categoryLabel: 'व्यवसाय श्रेणी',
    gstLabel: 'जीएसटीआईएन / पंजीकरण संख्या',
    phoneLabel: 'व्यावसायिक फोन',
    emailLabel: 'व्यावसायिक ईमेल',
    locationLabel: 'मुख्यालय / जिला',
    uploadDocs: 'पंजीकरण दस्तावेज अपलोड करें',
    successTitle: 'आवेदन सफलतापूर्वक जमा!',
    successDesc: 'हमारी टीम 24-48 घंटों के भीतर आपके व्यवसाय का सत्यापन करेगी।',
  },
  te: {
    title: 'వ్యవసాయ వ్యాపార & కంపెనీ డైరెక్టరీ',
    subtitle: 'ధృవీకరించిన వ్యవసాయ సంస్థలు, కొనుగోలుదారులు & రవాణా భాగస్వాములు',
    search: 'కంపెనీ, బ్రాండ్ లేదా రంగాన్ని శోధించండి...',
    allCategories: 'అన్ని వర్గాలు',
    buyers: 'సంస్థాగత కొనుగోలుదారులు',
    inputs: 'విత్తనాలు & ఎరువులు',
    processors: 'ఫుడ్ ప్రాసెసర్లు',
    logistics: 'రవాణా & లాజిస్టిక్స్',
    tech: 'అగ్రిటెక్ & సేవలు',
    verifiedPartner: 'ధృవీకరించిన భాగస్వామి',
    gstVerified: 'GST ధృవీకరించబడింది',
    contact: 'సంప్రదించండి',
    registerCompany: 'మీ కంపెనీని నమోదు చేసుకోండి',
    back: 'వెనుకకు',
    submitApplication: 'ధృవీకరణ కోసం సమర్పించండి',
    companyName: 'కంపెనీ పేరు',
    categoryLabel: 'వ్యాపార వర్గం',
    gstLabel: 'GSTIN / నమోదు సంఖ్య',
    phoneLabel: 'ఫోన్ నంబర్',
    emailLabel: 'ఇమెయిల్',
    locationLabel: 'ప్రధాన కార్యాలయం / జిల్లా',
    uploadDocs: 'పత్రాలను అప్‌లోడ్ చేయండి',
    successTitle: 'దరఖాస్తు సమర్పించబడింది!',
    successDesc: 'మా బృందం 24-48 గంటల్లో మీ వివరాలను ధృవీకరిస్తుంది.',
  },
};

type BusinessCategory = 'all' | 'buyers' | 'inputs' | 'processors' | 'logistics' | 'tech';

interface Company {
  id: string;
  name: string;
  category: BusinessCategory;
  description: { en: string; ml: string; hi: string; te: string };
  location: string;
  gstin: string;
  verified: boolean;
  phone: string;
  email: string;
  rating: number;
  dealVolume: string;
  icon: string;
}

const MOCK_COMPANIES: Company[] = [
  {
    id: 'c1',
    name: 'ITC Agri Business Division',
    category: 'buyers',
    description: {
      en: 'Direct institutional procurement of wheat, chili, coffee, and farm produce at MSP+ rates.',
      ml: 'ഗോതമ്പ്, മുളക്, കാപ്പി എന്നിവയുടെ നേരിട്ടുള്ള സംഭരണം.',
      hi: 'गेहूं, मिर्च, कॉफी और कृषि उपज की सीधी संस्थागत खरीद।',
      te: 'గోధుమలు, మిర్చి, కాఫీ నేరుగా కొనుగోలు చేసే సంస్థాగత భాగస్వామి.',
    },
    location: 'Hyderabad, Telangana',
    gstin: '36AAACI1681G1Z0',
    verified: true,
    phone: '+91 800-425-1212',
    email: 'procurement@itcagri.in',
    rating: 4.9,
    dealVolume: '10,000+ tons/yr',
    icon: '🏢',
  },
  {
    id: 'c2',
    name: 'IFFCO Farmer Supply Co-operative',
    category: 'inputs',
    description: {
      en: 'World leading fertilizer co-operative delivering Nano Urea, DAP, and subsidized bio-nutrients.',
      ml: 'നാനോ യൂറിയ, ഡിഎപി, സബ്സിഡി ലഭിക്കുന്ന ജൈവ വളങ്ങൾ.',
      hi: 'नैनो यूरिया, डीएपी और सब्सिडी वाले जैव पोषक तत्व प्रदान करने वाला विश्व प्रसिद्ध सहकारी संघ।',
      te: 'నానో యూరియా, డీఏపీ మరియు రాయితీ జీవ ఎరువులను అందించే సహకార సంస్థ.',
    },
    location: 'New Delhi / Pan India',
    gstin: '07AAACI0271H1Z1',
    verified: true,
    phone: '+91 1800-103-1967',
    email: 'support@iffco.in',
    rating: 4.8,
    dealVolume: '500,000+ farmers served',
    icon: '🌱',
  },
  {
    id: 'c3',
    name: 'FreshCold Agri Logistics & Fleet',
    category: 'logistics',
    description: {
      en: 'Temperature-controlled reefer trucks and GPS-tracked farm-to-mandi transit across South India.',
      ml: 'ജിപിഎസ് ട്രാക്കിങ് ഉള്ള റഫ്രിജറേറ്റഡ് ട്രാൻസ്പോർട്ട്.',
      hi: 'तापमान नियंत्रित रीफर ट्रक और खेत से मंडी तक जीपीएस ट्रैक परिवहन।',
      te: 'జీపీఎస్ ట్రాకింగ్‌తో కూడిన కోల్డ్ చైన్ రవాణా సదుపాయం.',
    },
    location: 'Kochi & Bengaluru',
    gstin: '32AABCF4590L1ZU',
    verified: true,
    phone: '+91 944-712-3456',
    email: 'ops@freshcoldlogistics.com',
    rating: 4.7,
    dealVolume: '250+ active fleet vehicles',
    icon: '🚚',
  },
  {
    id: 'c4',
    name: 'Eastern Spices & Foods Ltd',
    category: 'processors',
    description: {
      en: 'Bulk procurement of cardamom, turmeric, black pepper, and ginger directly from farmer clusters.',
      ml: 'ഏലം, മഞ്ഞൾ, കുരുമുളക് എന്നിവ കർഷകരിൽ നിന്ന് നേരിട്ട് സംഭരിക്കുന്നു.',
      hi: 'इलायची, हल्दी, काली मिर्च और अदरक की किसानों से सीधी थोक खरीद।',
      te: 'ఏలకులు, పసుపు, మిరియాలు నేరుగా రైతు సమూహాల నుండి కొనుగోలు చేస్తారు.',
    },
    location: 'Kottayam, Kerala',
    gstin: '32AAACE3112B1Z8',
    verified: true,
    phone: '+91 481-256-7890',
    email: 'agrisourcing@easternfoods.in',
    rating: 4.8,
    dealVolume: '5,000+ tons/yr',
    icon: '🌶️',
  },
];

export function CompanyDirectoryScreen({
  language,
  onLanguageChange,
  onBack,
}: CompanyDirectoryScreenProps) {
  const t = COMPANY_TRANSLATIONS[language];
  const [selectedCat, setSelectedCat] = useState<BusinessCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'buyers',
    gstin: '',
    phone: '',
    email: '',
    location: '',
  });

  const filteredCompanies = useMemo(() => {
    return MOCK_COMPANIES.filter((c) => {
      const matchCat = selectedCat === 'all' || c.category === selectedCat;
      const q = searchQuery.toLowerCase();
      const matchQ =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.description[language].toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [selectedCat, searchQuery, language]);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setShowRegisterModal(false);
      setFormSubmitted(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/60 to-emerald-50/40 pb-12 text-gray-900">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-indigo-800 via-blue-800 to-teal-800 text-white p-4 md:p-6 shadow-md">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                  <Building2 className="h-7 w-7 text-indigo-300" />
                  {t.title}
                </h1>
                <p className="text-indigo-100 text-sm mt-0.5">{t.subtitle}</p>
              </div>
            </div>
            <LanguageSelector language={language} onLanguageChange={onLanguageChange} variant="glass" />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.search}
                className="pl-11 bg-white text-gray-900 h-12 rounded-xl border-0 shadow-sm"
              />
            </div>
            <Button
              onClick={() => setShowRegisterModal(true)}
              className="bg-amber-400 hover:bg-amber-500 text-indigo-950 font-bold h-12 rounded-xl px-4 flex items-center gap-2 flex-shrink-0 shadow-md"
            >
              <PlusCircle className="h-5 w-5" />
              {t.registerCompany}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
        {/* Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {[
            { key: 'all', label: t.allCategories, icon: <Layers className="h-4 w-4" /> },
            { key: 'buyers', label: t.buyers, icon: <Store className="h-4 w-4" /> },
            { key: 'inputs', label: t.inputs, icon: <Sprout className="h-4 w-4" /> },
            { key: 'processors', label: t.processors, icon: <Building2 className="h-4 w-4" /> },
            { key: 'logistics', label: t.logistics, icon: <Truck className="h-4 w-4" /> },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCat(cat.key as BusinessCategory)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCat === cat.key
                  ? 'bg-indigo-700 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-300'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Company Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCompanies.map((c) => (
            <Card key={c.id} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2.5 bg-indigo-50 rounded-xl border border-indigo-100">{c.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">{c.name}</h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 text-gray-400" /> {c.location}
                      </p>
                    </div>
                  </div>
                  {c.verified && (
                    <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5" /> {t.verifiedPartner}
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">{c.description[language]}</p>

                <div className="flex items-center justify-between text-[11px] text-gray-500 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  <span className="font-semibold flex items-center gap-1">
                    <FileCheck className="h-3.5 w-3.5 text-indigo-600" /> GST: {c.gstin}
                  </span>
                  <span className="font-bold text-indigo-700">{c.dealVolume}</span>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <Button
                    size="sm"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-9"
                    onClick={() => alert(`Calling ${c.name}: ${c.phone}`)}
                  >
                    <Phone className="h-3.5 w-3.5 mr-1.5" /> {t.contact}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-9 px-3 text-gray-600 border-gray-200 hover:bg-gray-50 text-xs"
                    onClick={() => alert(`Email inquiry to ${c.email}`)}
                  >
                    <Mail className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button onClick={onBack} variant="outline" className="w-full h-12 text-gray-600 border-gray-300">
          <ArrowLeft className="h-4 w-4 mr-2" /> {t.back}
        </Button>
      </div>

      {/* Company Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {formSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="h-14 w-14 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-bold text-xl text-gray-900 mb-2">{t.successTitle}</h3>
                <p className="text-sm text-gray-600">{t.successDesc}</p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-indigo-600" />
                    {t.registerCompany}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowRegisterModal(false)}
                    className="text-gray-400 hover:text-gray-600 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">{t.companyName}</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Malabar Agro Exporters Ltd"
                    className="h-10 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">{t.categoryLabel}</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full h-10 rounded-lg border border-gray-200 px-3 text-xs bg-white text-gray-900"
                    >
                      <option value="buyers">{t.buyers}</option>
                      <option value="inputs">{t.inputs}</option>
                      <option value="processors">{t.processors}</option>
                      <option value="logistics">{t.logistics}</option>
                      <option value="tech">{t.tech}</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">{t.gstLabel}</label>
                    <Input
                      required
                      value={formData.gstin}
                      onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                      placeholder="e.g. 32AAAAA0000A1Z5"
                      className="h-10 text-sm uppercase"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">{t.phoneLabel}</label>
                    <Input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="h-10 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">{t.emailLabel}</label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contact@company.com"
                      className="h-10 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">{t.locationLabel}</label>
                  <Input
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Palakkad, Kerala"
                    className="h-10 text-sm"
                  />
                </div>

                <div className="p-3 border-2 border-dashed border-gray-300 rounded-xl text-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                  <Upload className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-gray-600 block">{t.uploadDocs}</span>
                  <span className="text-[10px] text-gray-400">PDF, PNG, JPG up to 10MB</span>
                </div>

                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-11 rounded-xl">
                  {t.submitApplication}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
