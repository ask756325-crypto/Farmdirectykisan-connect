import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Search,
  ShoppingBag,
  Leaf,
  Bug,
  Droplets,
  Sprout,
  ShieldCheck,
  QrCode,
  Star,
  Building,
  BadgePercent,
  ChevronRight,
  CheckCircle2,
  Landmark,
  IndianRupee,
  FileText,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { Language } from '../../types';
import { LanguageSelector } from '../ui/LanguageSelector';

interface InputMarketplaceScreenProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onBack: () => void;
}

const INPUT_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    title: 'Agri Input Store',
    subtitle: 'Seeds, fertilizers, pesticides & govt subsidies',
    search: 'Search seeds, fertilizers, pesticides...',
    categories: 'Categories',
    seeds: 'Seeds',
    fertilizers: 'Fertilizers',
    pesticides: 'Pesticides',
    bioProducts: 'Bio Products',
    equipment: 'Equipment',
    subsidies: 'Govt Subsidies',
    allProducts: 'All Products',
    verified: 'Verified Supplier',
    genuine: 'Genuine Product',
    scanQR: 'Scan QR to Verify',
    addToCart: 'Add to Cart',
    viewDetails: 'View Details',
    perUnit: 'per unit',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    recommended: 'Recommended for your crops',
    subsidy: 'Govt Subsidy',
    subsidyAvailable: 'Subsidy Available',
    back: 'Back',
    applyNow: 'Apply Now',
    eligibility: 'Check Eligibility',
    scheme: 'Scheme',
    benefit: 'Benefit',
    deadline: 'Deadline',
  },
  ml: {
    title: 'കാർഷിക ഇൻപുട്ട് സ്റ്റോർ',
    subtitle: 'വിത്തുകൾ, വളങ്ങൾ, കീടനാശിനികൾ & സർക്കാർ സബ്സിഡികൾ',
    search: 'വിത്തുകൾ, വളങ്ങൾ, കീടനാശിനികൾ തിരയുക...',
    categories: 'വിഭാഗങ്ങൾ',
    seeds: 'വിത്തുകൾ',
    fertilizers: 'വളങ്ങൾ',
    pesticides: 'കീടനാശിനികൾ',
    bioProducts: 'ജൈവ ഉൽപ്പന്നങ്ങൾ',
    equipment: 'ഉപകരണങ്ങൾ',
    subsidies: 'സർക്കാർ സബ്സിഡികൾ',
    allProducts: 'എല്ലാ ഉൽപ്പന്നങ്ങളും',
    verified: 'പരിശോധിച്ച വിതരണക്കാരൻ',
    genuine: 'യഥാർത്ഥ ഉൽപ്പന്നം',
    scanQR: 'സ്ഥിരീകരിക്കാൻ QR സ്കാൻ ചെയ്യുക',
    addToCart: 'കാർട്ടിൽ ചേർക്കുക',
    viewDetails: 'വിശദാംശങ്ങൾ',
    perUnit: 'യൂണിറ്റിന്',
    inStock: 'സ്റ്റോക്കിൽ ഉണ്ട്',
    outOfStock: 'സ്റ്റോക്കിൽ ഇല്ല',
    recommended: 'നിങ്ങളുടെ വിളകൾക്ക് ശുപാർശ',
    subsidy: 'സർക്കാർ സബ്സിഡി',
    subsidyAvailable: 'സബ്സിഡി ലഭ്യമാണ്',
    back: 'തിരികെ',
    applyNow: 'ഇപ്പോൾ അപേക്ഷിക്കുക',
    eligibility: 'യോഗ്യത പരിശോധിക്കുക',
    scheme: 'പദ്ധതി',
    benefit: 'ആനുകൂല്യം',
    deadline: 'അവസാന തീയതി',
  },
  hi: {
    title: 'कृषि इनपुट स्टोर',
    subtitle: 'बीज, उर्वरक, कीटनाशक और सरकारी सब्सिडी',
    search: 'बीज, उर्वरक, कीटनाशक खोजें...',
    categories: 'श्रेणियां',
    seeds: 'बीज',
    fertilizers: 'उर्वरक',
    pesticides: 'कीटनाशक',
    bioProducts: 'जैव उत्पाद',
    equipment: 'उपकरण',
    subsidies: 'सरकारी सब्सिडी',
    allProducts: 'सभी उत्पाद',
    verified: 'सत्यापित आपूर्तिकर्ता',
    genuine: 'असली उत्पाद',
    scanQR: 'सत्यापन के लिए QR स्कैन करें',
    addToCart: 'कार्ट में जोड़ें',
    viewDetails: 'विवरण देखें',
    perUnit: 'प्रति यूनिट',
    inStock: 'स्टॉक में',
    outOfStock: 'स्टॉक में नहीं',
    recommended: 'आपकी फसलों के लिए अनुशंसित',
    subsidy: 'सरकारी सब्सिडी',
    subsidyAvailable: 'सब्सिडी उपलब्ध',
    back: 'वापस',
    applyNow: 'अभी आवेदन करें',
    eligibility: 'पात्रता जांचें',
    scheme: 'योजना',
    benefit: 'लाभ',
    deadline: 'अंतिम तिथि',
  },
  te: {
    title: 'వ్యవసాయ ఇన్‌పుట్ స్టోర్',
    subtitle: 'విత్తనాలు, ఎరువులు, పురుగుమందులు & ప్రభుత్వ రాయితీలు',
    search: 'విత్తనాలు, ఎరువులు, పురుగుమందులు శోధించండి...',
    categories: 'వర్గాలు',
    seeds: 'విత్తనాలు',
    fertilizers: 'ఎరువులు',
    pesticides: 'పురుగుమందులు',
    bioProducts: 'జీవ ఉత్పత్తులు',
    equipment: 'పరికరాలు',
    subsidies: 'ప్రభుత్వ రాయితీలు',
    allProducts: 'అన్ని ఉత్పత్తులు',
    verified: 'ధృవీకరించిన సరఫరాదారు',
    genuine: 'అసలైన ఉత్పత్తి',
    scanQR: 'ధృవీకరించడానికి QR స్కాన్ చేయండి',
    addToCart: 'కార్ట్‌కు జోడించండి',
    viewDetails: 'వివరాలు చూడండి',
    perUnit: 'యూనిట్‌కు',
    inStock: 'స్టాక్‌లో ఉంది',
    outOfStock: 'స్టాక్‌లో లేదు',
    recommended: 'మీ పంటలకు సిఫార్సు',
    subsidy: 'ప్రభుత్వ రాయితీ',
    subsidyAvailable: 'రాయితీ అందుబాటులో ఉంది',
    back: 'వెనుకకు',
    applyNow: 'ఇప్పుడు దరఖాస్తు చేయండి',
    eligibility: 'అర్హత తనిఖీ చేయండి',
    scheme: 'పథకం',
    benefit: 'ప్రయోజనం',
    deadline: 'చివరి తేదీ',
  },
};

type Category = 'all' | 'seeds' | 'fertilizers' | 'pesticides' | 'bio' | 'equipment' | 'subsidies';

const MOCK_PRODUCTS = [
  { id: '1', name: { en: 'Hybrid Tomato Seeds (Arka Rakshak)', ml: 'ഹൈബ്രിഡ് തക്കാളി വിത്ത്', hi: 'हाइब्रिड टमाटर बीज', te: 'హైబ్రిడ్ టమాటా విత్తనాలు' }, category: 'seeds', price: 350, unit: '50g', supplier: 'Indo-American Seeds', verified: true, inStock: true, rating: 4.6, image: '🌱', forCrops: ['Tomato'], subsidyPercent: 0 },
  { id: '2', name: { en: 'NPK 19:19:19 Fertilizer', ml: 'NPK 19:19:19 വളം', hi: 'NPK 19:19:19 उर्वरक', te: 'NPK 19:19:19 ఎరువు' }, category: 'fertilizers', price: 480, unit: '1kg', supplier: 'IFFCO', verified: true, inStock: true, rating: 4.8, image: '🧪', forCrops: ['All Crops'], subsidyPercent: 25 },
  { id: '3', name: { en: 'Mancozeb 75% WP Fungicide', ml: 'മാൻകോസെബ് 75% കുമിൾനാശിനി', hi: 'मैंकोज़ेब 75% फफूंदनाशक', te: 'మాంకోజెబ్ 75% బూజు నిరోధకం' }, category: 'pesticides', price: 220, unit: '500g', supplier: 'UPL Limited', verified: true, inStock: true, rating: 4.5, image: '🛡️', forCrops: ['Tomato', 'Potato'], subsidyPercent: 0 },
  { id: '4', name: { en: 'Trichoderma Viride Bio-Fungicide', ml: 'ട്രൈക്കോഡെർമ ജൈവ-കുമിൾനാശിനി', hi: 'ट्राइकोडर्मा जैव-फफूंदनाशक', te: 'ట్రైకోడెర్మా జీవ-బూజు నిరోధకం' }, category: 'bio', price: 180, unit: '1kg', supplier: 'IARI Bio Lab', verified: true, inStock: true, rating: 4.7, image: '🦠', forCrops: ['All Crops'], subsidyPercent: 50 },
  { id: '5', name: { en: 'Neem Oil Organic Pesticide', ml: 'വേപ്പെണ്ണ ജൈവ കീടനാശിനി', hi: 'नीम तेल जैविक कीटनाशक', te: 'వేప నూనె సేంద్రీయ పురుగుమందు' }, category: 'bio', price: 250, unit: '500ml', supplier: 'Nature Bio', verified: true, inStock: true, rating: 4.4, image: '🌿', forCrops: ['All Crops'], subsidyPercent: 30 },
  { id: '6', name: { en: 'Drip Irrigation Kit (1/4 acre)', ml: 'ഡ്രിപ്പ് ഇറിഗേഷൻ കിറ്റ്', hi: 'ड्रिप सिंचाई किट', te: 'డ్రిప్ ఇరిగేషన్ కిట్' }, category: 'equipment', price: 4500, unit: 'kit', supplier: 'Jain Irrigation', verified: true, inStock: true, rating: 4.9, image: '💧', forCrops: ['All Crops'], subsidyPercent: 55 },
  { id: '7', name: { en: 'DAP Fertilizer (Di-Ammonium Phosphate)', ml: 'DAP വളം', hi: 'DAP उर्वरक', te: 'DAP ఎరువు' }, category: 'fertilizers', price: 1350, unit: '50kg', supplier: 'IFFCO', verified: true, inStock: true, rating: 4.7, image: '🧫', forCrops: ['Rice', 'Wheat', 'Corn'], subsidyPercent: 40 },
  { id: '8', name: { en: 'Imidacloprid 17.8% SL Insecticide', ml: 'ഇമിഡാക്ലോപ്രിഡ് കീടനാശിനി', hi: 'इमिडाक्लोप्रिड कीटनाशक', te: 'ఇమిడాక్లోప్రిడ్ పురుగుమందు' }, category: 'pesticides', price: 320, unit: '250ml', supplier: 'Bayer CropScience', verified: true, inStock: false, rating: 4.3, image: '🔬', forCrops: ['Okra', 'Chili', 'Brinjal'], subsidyPercent: 0 },
];

const GOVT_SUBSIDIES = [
  {
    name: { en: 'PM-KISAN Samman Nidhi', ml: 'PM-KISAN സമ്മാൻ നിധി', hi: 'PM-KISAN सम्मान निधि', te: 'PM-KISAN సమ్మాన్ నిధి' },
    benefit: { en: '₹6,000/year direct to farmer account', ml: '₹6,000/വർഷം നേരിട്ട് കർഷക അക്കൗണ്ടിൽ', hi: '₹6,000/वर्ष सीधे किसान खाते में', te: '₹6,000/సంవత్సరం నేరుగా రైతు ఖాతాకు' },
    deadline: '2025-03-31',
    icon: <IndianRupee className="h-5 w-5" />,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    name: { en: 'Soil Health Card Scheme', ml: 'മണ്ണ് ആരോഗ്യ കാർഡ് പദ്ധതി', hi: 'मृदा स्वास्थ्य कार्ड योजना', te: 'నేల ఆరోగ్య కార్డు పథకం' },
    benefit: { en: 'Free soil testing + fertilizer recommendation', ml: 'സൗജന്യ മണ്ണ് പരിശോധന + വള ശുപാർശ', hi: 'मुफ्त मिट्टी परीक्षण + उर्वरक सिफारिश', te: 'ఉచిత నేల పరీక్ష + ఎరువు సిఫార్సు' },
    deadline: '2025-06-30',
    icon: <FileText className="h-5 w-5" />,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    name: { en: 'PM Fasal Bima Yojana (Crop Insurance)', ml: 'PM ഫസൽ ബീമ യോജന (വിള ഇൻഷുറൻസ്)', hi: 'PM फसल बीमा योजना', te: 'PM ఫసల్ బీమా యోజన (పంట భీమా)' },
    benefit: { en: 'Crop insurance at 2% premium (Kharif)', ml: '2% പ്രീമിയത്തിൽ വിള ഇൻഷുറൻസ്', hi: '2% प्रीमियम पर फसल बीमा', te: '2% ప్రీమియంలో పంట భీమా' },
    deadline: '2025-07-31',
    icon: <ShieldCheck className="h-5 w-5" />,
    color: 'from-amber-500 to-orange-600',
  },
  {
    name: { en: 'Micro Irrigation Subsidy (PMKSY)', ml: 'സൂക്ഷ്മ ജലസേചന സബ്സിഡി', hi: 'सूक्ष्म सिंचाई सब्सिडी', te: 'సూక్ష్మ నీటిపారుదల రాయితీ' },
    benefit: { en: '55% subsidy on drip/sprinkler systems', ml: 'ഡ്രിപ്/സ്പ്രിങ്ക്ളർ സിസ്റ്റങ്ങളിൽ 55% സബ്സിഡി', hi: 'ड्रिप/स्प्रिंकलर पर 55% सब्सिडी', te: 'డ్రిప్/స్ప్రింక్లర్‌పై 55% రాయితీ' },
    deadline: '2025-12-31',
    icon: <Droplets className="h-5 w-5" />,
    color: 'from-cyan-500 to-blue-600',
  },
  {
    name: { en: 'National Mission on Oilseeds & Oil Palm', ml: 'എണ്ണക്കുരു & ഓയിൽ പാം ദേശീയ ദൗത്യം', hi: 'तिलहन और ऑयल पाम राष्ट्रीय मिशन', te: 'నూనె గింజలు & ఆయిల్ పాం జాతీయ మిషన్' },
    benefit: { en: 'Up to ₹30,000/ha for oil palm cultivation', ml: 'ഓയിൽ പാം കൃഷിക്ക് ₹30,000/ഹെക്ടർ വരെ', hi: 'ऑयल पाम खेती के लिए ₹30,000/हेक्टेयर तक', te: 'ఆయిల్ పాం సాగుకు ₹30,000/హెక్టారు వరకు' },
    deadline: '2025-09-30',
    icon: <Landmark className="h-5 w-5" />,
    color: 'from-green-500 to-emerald-600',
  },
];

const CATEGORIES: { key: Category; icon: React.ReactNode; labelKey: string }[] = [
  { key: 'all', icon: <ShoppingBag className="h-5 w-5" />, labelKey: 'allProducts' },
  { key: 'seeds', icon: <Sprout className="h-5 w-5" />, labelKey: 'seeds' },
  { key: 'fertilizers', icon: <Droplets className="h-5 w-5" />, labelKey: 'fertilizers' },
  { key: 'pesticides', icon: <Bug className="h-5 w-5" />, labelKey: 'pesticides' },
  { key: 'bio', icon: <Leaf className="h-5 w-5" />, labelKey: 'bioProducts' },
  { key: 'equipment', icon: <Building className="h-5 w-5" />, labelKey: 'equipment' },
  { key: 'subsidies', icon: <Landmark className="h-5 w-5" />, labelKey: 'subsidies' },
];

export function InputMarketplaceScreen({
  language,
  onLanguageChange,
  onBack,
}: InputMarketplaceScreenProps) {
  const t = INPUT_TRANSLATIONS[language];
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showQRModal, setShowQRModal] = useState(false);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => {
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || p.name[language].toLowerCase().includes(q) || p.supplier.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery, language]);

  const showSubsidies = selectedCategory === 'subsidies' || selectedCategory === 'all';

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/60 to-emerald-50/40 pb-12 text-gray-900">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-4 md:p-6 shadow-md">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                  <ShoppingBag className="h-7 w-7 text-amber-200" />
                  {t.title}
                </h1>
                <p className="text-orange-100 text-sm mt-0.5">{t.subtitle}</p>
              </div>
            </div>
            <LanguageSelector language={language} onLanguageChange={onLanguageChange} variant="glass" />
          </div>

          {/* Search */}
          <div className="relative mt-2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.search}
              className="pl-11 bg-white text-gray-900 h-12 rounded-xl border-0 shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.key
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300'
              }`}
            >
              {cat.icon}
              {t[cat.labelKey as keyof typeof t] || cat.labelKey}
            </button>
          ))}
        </div>

        {/* Government Subsidies Section */}
        {showSubsidies && (
          <Card className="shadow-md border-green-200 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-green-100 pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-emerald-900">
                <Landmark className="h-5 w-5 text-emerald-600" />
                {t.subsidies}
                <Badge className="bg-emerald-600 text-white text-[10px] ml-2">{GOVT_SUBSIDIES.length} {t.scheme}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {GOVT_SUBSIDIES.map((subsidy, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className={`bg-gradient-to-r ${subsidy.color} p-3 flex items-center gap-3 text-white`}>
                    <div className="p-2 bg-white/20 rounded-lg">{subsidy.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{subsidy.name[language]}</h4>
                    </div>
                    <Badge className="bg-white/20 text-white text-[10px] border-white/30">
                      {t.subsidyAvailable}
                    </Badge>
                  </div>
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-gray-500 font-medium">{t.benefit}</p>
                        <p className="text-sm font-bold text-gray-900 mt-0.5">{subsidy.benefit[language]}</p>
                        <p className="text-[11px] text-gray-400 mt-1">{t.deadline}: {subsidy.deadline}</p>
                      </div>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8 px-3 font-bold flex-shrink-0">
                        {t.applyNow}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Products Grid */}
        {selectedCategory !== 'subsidies' && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">{selectedCategory === 'all' ? t.allProducts : t[selectedCategory as keyof typeof t] || t.allProducts}</h2>
              <span className="text-xs text-gray-500 font-medium">{filteredProducts.length} products</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all border-gray-100">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border border-orange-100">
                        {product.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm text-gray-900 leading-tight">{product.name[language]}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-0.5 text-amber-500">
                            <Star className="h-3 w-3 fill-amber-400" />
                            <span className="text-xs font-bold">{product.rating}</span>
                          </div>
                          {product.verified && (
                            <span className="flex items-center gap-0.5 text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full font-bold">
                              <ShieldCheck className="h-3 w-3" /> {t.verified}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-black text-orange-700">₹{product.price}</span>
                        <span className="text-xs text-gray-500 ml-1">/ {product.unit}</span>
                      </div>
                      <Badge className={`text-[10px] ${product.inStock ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {product.inStock ? t.inStock : t.outOfStock}
                      </Badge>
                    </div>

                    {product.subsidyPercent > 0 && (
                      <div className="mt-2 p-2 bg-green-50 rounded-lg border border-green-200 flex items-center gap-2">
                        <BadgePercent className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-[11px] text-green-800 font-bold">
                          {t.subsidy}: {product.subsidyPercent}% ({language === 'en' ? 'Save' : '–'} ₹{Math.round(product.price * product.subsidyPercent / 100)})
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => setShowQRModal(true)}
                        className="flex items-center gap-1 text-[11px] text-blue-600 font-medium hover:underline"
                      >
                        <QrCode className="h-3.5 w-3.5" /> {t.scanQR}
                      </button>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white text-xs h-8 px-3 font-bold">
                        {t.addToCart}
                      </Button>
                    </div>

                    <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
                      <Building className="h-3 w-3" /> {product.supplier}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        <Button onClick={onBack} variant="outline" className="w-full h-12 text-gray-600 border-gray-300">
          <ArrowLeft className="h-4 w-4 mr-2" /> {t.back}
        </Button>
      </div>

      {/* QR Verification Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center"
          >
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCode className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-1">{t.genuine}</h3>
            <p className="text-xs text-gray-500 mb-4">{t.scanQR}</p>

            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 mb-4">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-emerald-800">
                {language === 'en' ? '✓ Product Authentic — Verified by Manufacturer' : language === 'hi' ? '✓ उत्पाद प्रमाणित — निर्माता द्वारा सत्यापित' : language === 'ml' ? '✓ ഉൽപ്പന്നം യഥാർത്ഥം — നിർമ്മാതാവ് പരിശോധിച്ചത്' : '✓ ఉత్పత్తి ప్రామాణికం — తయారీదారు ధృవీకరించింది'}
              </p>
              <p className="text-[11px] text-emerald-600 mt-1">Batch: MNC-2024-87654 | Mfg: Oct 2024 | Exp: Oct 2026</p>
            </div>

            <Button onClick={() => setShowQRModal(false)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
              {language === 'en' ? 'Close' : language === 'hi' ? 'बंद करें' : language === 'ml' ? 'അടയ്ക്കുക' : 'మూసివేయండి'}
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
