import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Search,
  MapPin,
  Calendar,
  Sparkles,
  BarChart3,
  Filter,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Clock,
  Compass,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { Language } from '../../types';
import { LanguageSelector } from '../ui/LanguageSelector';

interface MandiPricesScreenProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onBack: () => void;
}

const MANDI_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    title: 'Mandi Live Prices & Forecast',
    subtitle: 'Real-time APMC mandi prices, price discovery & AI forecast',
    search: 'Search crop or market...',
    allMandis: 'All Mandis',
    crop: 'Crop',
    market: 'Market / Mandi',
    minPrice: 'Min Price',
    maxPrice: 'Max Price',
    modalPrice: 'Modal Price',
    trend: '7-Day Trend',
    aiForecast: 'AI Price Forecast',
    priceDiscovery: 'Best Market Linkage',
    nearbyMandis: 'Nearby Markets',
    priceAlert: 'Price Spike Alert',
    updatedToday: 'Updated Today',
    back: 'Back',
    sellHere: 'Find Buyers Here',
    highDemand: 'High Demand',
    moderateDemand: 'Moderate Demand',
    expectedTrend: 'Expected 14-day trend',
    pricePerQuintal: '₹ / Quintal',
    pricePerKg: '₹ / kg',
  },
  ml: {
    title: 'തത്സമയ വിപണി വിലകൾ & പ്രവചനം',
    subtitle: 'തത്സമയ APMC വിപണി വിലകൾ, വില കണ്ടെത്തൽ & AI പ്രവചനം',
    search: 'വിള അല്ലെങ്കിൽ മാർക്കറ്റ് തിരയുക...',
    allMandis: 'എല്ലാ വിപണികളും',
    crop: 'വിള',
    market: 'മാർക്കറ്റ് / മണ്ടി',
    minPrice: 'കുറഞ്ഞ വില',
    maxPrice: 'കൂടിയ വില',
    modalPrice: 'ശരാശരി വില',
    trend: '7 ദിവസത്തെ ട്രെൻഡ്',
    aiForecast: 'AI വില പ്രവചനം',
    priceDiscovery: 'മികച്ച വിപണി ബന്ധം',
    nearbyMandis: 'സമീപത്തെ വിപണികൾ',
    priceAlert: 'വില വർദ്ധനവ് മുന്നറിയിപ്പ്',
    updatedToday: 'ഇന്ന് അപ്‌ഡേറ്റ് ചെയ്തത്',
    back: 'തിരികെ',
    sellHere: 'ഇവിടെ വാങ്ങുന്നവരെ കണ്ടെത്തുക',
    highDemand: 'കൂടിയ ഡിമാൻഡ്',
    moderateDemand: 'സാധാരണ ഡിമാൻഡ്',
    expectedTrend: '14 ദിവസത്തെ പ്രതീക്ഷിക്കുന്ന ട്രെൻഡ്',
    pricePerQuintal: '₹ / ക്വിന്റൽ',
    pricePerKg: '₹ / കിലോ',
  },
  hi: {
    title: 'मंडी लाइव भाव और पूर्वानुमान',
    subtitle: 'वास्तविक समय एपीएमसी मंडी भाव, मूल्य निर्धारण और एआई पूर्वानुमान',
    search: 'फसल या मंडी खोजें...',
    allMandis: 'सभी मंडियां',
    crop: 'फसल',
    market: 'मंडी / बाजार',
    minPrice: 'न्यूनतम भाव',
    maxPrice: 'अधिकतम भाव',
    modalPrice: 'मॉडल भाव',
    trend: '7 दिन का रुझान',
    aiForecast: 'एआई मूल्य पूर्वानुमान',
    priceDiscovery: 'सर्वोत्तम बाजार लिंकेज',
    nearbyMandis: 'निकटतम मंडियां',
    priceAlert: 'मूल्य वृद्धि अलर्ट',
    updatedToday: 'आज अपडेट किया गया',
    back: 'वापस',
    sellHere: 'खरीदार खोजें',
    highDemand: 'अधिक मांग',
    moderateDemand: 'मध्यम मांग',
    expectedTrend: '14 दिवसीय अनुमानित रुझान',
    pricePerQuintal: '₹ / क्विंटल',
    pricePerKg: '₹ / किग्रा',
  },
  te: {
    title: 'మార్కెట్ ప్రత్యక్ష ధరలు & అంచనా',
    subtitle: 'నిజ సమయ మార్కెట్ ధరలు, ధర గుర్తింపు మరియు AI అంచనా',
    search: 'పంట లేదా మార్కెట్ శోధించండి...',
    allMandis: 'అన్ని మార్కెట్లు',
    crop: 'పంట',
    market: 'మార్కెట్',
    minPrice: 'కనిష్ట ధర',
    maxPrice: 'గరిష్ట ధర',
    modalPrice: 'సగటు ధర',
    trend: '7 రోజుల ధోరణి',
    aiForecast: 'AI ధర అంచనా',
    priceDiscovery: 'ఉత్తమ మార్కెట్ లింకేజ్',
    nearbyMandis: 'సమీప మార్కెట్లు',
    priceAlert: 'ధర హెచ్చరిక',
    updatedToday: 'నేడు నవీకరించబడింది',
    back: 'వెనుకకు',
    sellHere: 'కొనుగోలుదారులను కనుగొనండి',
    highDemand: 'అధిక డిమాండ్',
    moderateDemand: 'మితమైన డిమాండ్',
    expectedTrend: '14 రోజుల అంచనా ధోరణి',
    pricePerQuintal: '₹ / క్వింటాల్',
    pricePerKg: '₹ / కిలో',
  },
};

interface MandiRecord {
  id: string;
  crop: { en: string; ml: string; hi: string; te: string };
  emoji: string;
  mandi: string;
  state: string;
  distanceKm: number;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  change: number; // percentage in last 24h
  demand: 'high' | 'moderate' | 'low';
  forecastText: { en: string; ml: string; hi: string; te: string };
  forecastDirection: 'up' | 'down' | 'stable';
  bestTime: string;
}

const MOCK_MANDI_DATA: MandiRecord[] = [
  {
    id: '1',
    crop: { en: 'Tomato (Hybrid)', ml: 'തക്കാളി', hi: 'टमाटर', te: 'టమాట' },
    emoji: '🍅',
    mandi: 'Kolar Mandi',
    state: 'Karnataka',
    distanceKm: 42,
    minPrice: 2800,
    maxPrice: 3600,
    modalPrice: 3200,
    change: 8.5,
    demand: 'high',
    forecastText: {
      en: 'Expected to rise +12% in next 10 days due to supply constraint in north districts',
      ml: 'വടക്കൻ ജില്ലകളിലെ കുറവ് കാരണം അടുത്ത 10 ദിവസത്തിൽ +12% വർദ്ധിക്കുമെന്ന് പ്രതീക്ഷിക്കുന്നു',
      hi: 'आपूर्ति में कमी के कारण अगले 10 दिनों में +12% बढ़ने की उम्मीद है',
      te: 'సరఫరా తగ్గడం వల్ల రాబోయే 10 రోజుల్లో +12% పెరుగుతుందని అంచనా',
    },
    forecastDirection: 'up',
    bestTime: 'Sell within 3-5 days',
  },
  {
    id: '2',
    crop: { en: 'Shallot / Small Onion', ml: 'ചെറിയ ഉള്ളി', hi: 'छोटा प्याज', te: 'చిన్న ఉల్లిపాయ' },
    emoji: '🧅',
    mandi: 'Palakkad APMC',
    state: 'Kerala',
    distanceKm: 18,
    minPrice: 4200,
    maxPrice: 5100,
    modalPrice: 4800,
    change: 4.2,
    demand: 'high',
    forecastText: {
      en: 'Strong festival season demand; stable to bullish trend',
      ml: 'ഉത്സവ സീസണിലെ മികച്ച ഡിമാൻഡ്; വില ഉയരാൻ സാധ്യത',
      hi: 'त्योहारी सीजन में अच्छी मांग; मूल्य स्थिर से तेज रहने की संभावना',
      te: 'పండుగల సీజన్ డిమాండ్ బలంగా ఉంది; పెరుగుదల ధోరణి',
    },
    forecastDirection: 'up',
    bestTime: 'Good time to harvest and ship',
  },
  {
    id: '3',
    crop: { en: 'Green Chili', ml: 'പച്ചമുളക്', hi: 'हरी मिर्च', te: 'పచ్చి మిర్చి' },
    emoji: '🌶️',
    mandi: 'Guntur Market Yard',
    state: 'Andhra Pradesh',
    distanceKm: 85,
    minPrice: 3100,
    maxPrice: 3900,
    modalPrice: 3500,
    change: -2.8,
    demand: 'moderate',
    forecastText: {
      en: 'Fresh arrivals arriving next week may slightly cool down wholesale rates',
      ml: 'അടുത്ത ആഴ്ച പുതിയ വരവ് കൂടുന്നതിനാൽ മൊത്തവിലയിൽ നേരിയ ഇടിവുണ്ടായേക്കാം',
      hi: 'अगले सप्ताह नई आवक बढ़ने से थोक भाव में मामूली गिरावट आ सकती है',
      te: 'వచ్చే వారం కొత్త రాకతో టోకు ధరలు కాస్త తగ్గే అవకాశం ఉంది',
    },
    forecastDirection: 'down',
    bestTime: 'Sell immediately to lock peak rate',
  },
  {
    id: '4',
    crop: { en: 'Potato (Jyoti)', ml: 'ഉരുളക്കിഴങ്ങ്', hi: 'आलू (ज्योति)', te: 'బంగాళాదుంప' },
    emoji: '🥔',
    mandi: 'Vashi Wholesale Market',
    state: 'Maharashtra',
    distanceKm: 110,
    minPrice: 1600,
    maxPrice: 2100,
    modalPrice: 1900,
    change: 1.1,
    demand: 'moderate',
    forecastText: {
      en: 'Cold storage stock steady; prices expected to hover ±3%',
      ml: 'കോൾഡ് സ്റ്റോറേജ് സ്റ്റോക്ക് സ്ഥിരമാണ്; വില വലിയ വ്യത്യാസമില്ലാതെ തുടരും',
      hi: 'कोल्ड स्टोरेज स्टॉक स्थिर; कीमतें ±3% के दायरे में रहने की संभावना',
      te: 'కోల్డ్ స్టోరేజ్ నిల్వలు నిలకడగా ఉన్నాయి; ధరలలో స్వల్ప మార్పులే ఉంటాయి',
    },
    forecastDirection: 'stable',
    bestTime: 'Hold or sell regular batches',
  },
  {
    id: '5',
    crop: { en: 'Cardamom (Small)', ml: 'ഏലം', hi: 'इलायची', te: 'ఏలకులు' },
    emoji: '🌿',
    mandi: 'Vandanmedu Spices Park',
    state: 'Kerala',
    distanceKm: 65,
    minPrice: 195000,
    maxPrice: 245000,
    modalPrice: 220000,
    change: 6.8,
    demand: 'high',
    forecastText: {
      en: 'Export auctions showing bullish bidding; prices rising by 7-10%',
      ml: 'കയറ്റുമതി ലേലങ്ങളിൽ മികച്ച ആവശ്യക്കാർ; വില 7-10% ഉയരുന്നു',
      hi: 'निर्यात नीलामियों में मजबूत मांग; कीमतों में 7-10% तेजी',
      te: 'ఎగుమతి వేలంలో బలమైన కొనుగోళ్లు; ధరలు 7-10% పెరుగుతున్నాయి',
    },
    forecastDirection: 'up',
    bestTime: 'Premium quality commanding record bids',
  },
];

export function MandiPricesScreen({
  language,
  onLanguageChange,
  onBack,
}: MandiPricesScreenProps) {
  const t = MANDI_TRANSLATIONS[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<MandiRecord | null>(MOCK_MANDI_DATA[0]);

  const filteredMandis = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return MOCK_MANDI_DATA;
    return MOCK_MANDI_DATA.filter(
      (m) =>
        m.crop[language].toLowerCase().includes(q) ||
        m.crop.en.toLowerCase().includes(q) ||
        m.mandi.toLowerCase().includes(q) ||
        m.state.toLowerCase().includes(q)
    );
  }, [searchQuery, language]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/60 to-emerald-50/40 pb-12 text-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-emerald-700 text-white p-4 md:p-6 shadow-md">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                  <BarChart3 className="h-7 w-7 text-amber-300" />
                  {t.title}
                </h1>
                <p className="text-blue-100 text-sm mt-0.5">{t.subtitle}</p>
              </div>
            </div>
            <LanguageSelector language={language} onLanguageChange={onLanguageChange} variant="glass" />
          </div>

          {/* Search bar */}
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
        {/* Featured Price Discovery & Forecast Card */}
        {selectedCrop && (
          <Card className="border-blue-200 shadow-lg overflow-hidden bg-white">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 bg-white/10 rounded-xl">{selectedCrop.emoji}</span>
                <div>
                  <h3 className="text-lg font-black">{selectedCrop.crop[language]}</h3>
                  <p className="text-xs text-blue-100 flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" /> {selectedCrop.mandi}, {selectedCrop.state} ({selectedCrop.distanceKm} km away)
                  </p>
                </div>
              </div>
              <Badge className="bg-amber-400 text-blue-950 font-bold text-xs px-2.5 py-1">
                <Sparkles className="h-3.5 w-3.5 mr-1" /> {t.aiForecast}
              </Badge>
            </div>

            <CardContent className="p-4 md:p-6 space-y-4">
              {/* Price Numbers Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-100 text-center">
                  <span className="text-[11px] text-gray-500 font-bold block">{t.minPrice}</span>
                  <span className="text-base md:text-xl font-bold text-gray-800">₹{selectedCrop.minPrice.toLocaleString()}</span>
                  <span className="text-[10px] text-gray-400 block">{t.pricePerQuintal}</span>
                </div>

                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-center shadow-sm">
                  <span className="text-[11px] text-emerald-800 font-bold block">{t.modalPrice}</span>
                  <span className="text-lg md:text-2xl font-black text-emerald-700">₹{selectedCrop.modalPrice.toLocaleString()}</span>
                  <span className="text-[10px] text-emerald-600 font-semibold block">₹{(selectedCrop.modalPrice / 100).toFixed(1)} / kg</span>
                </div>

                <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-100 text-center">
                  <span className="text-[11px] text-gray-500 font-bold block">{t.maxPrice}</span>
                  <span className="text-base md:text-xl font-bold text-gray-800">₹{selectedCrop.maxPrice.toLocaleString()}</span>
                  <span className="text-[10px] text-gray-400 block">{t.pricePerQuintal}</span>
                </div>
              </div>

              {/* 24h Trend + AI Forecast Insight */}
              <div className="bg-amber-50 rounded-xl p-3.5 border border-amber-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${selectedCrop.change >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {selectedCrop.change >= 0 ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-500">{t.trend}</span>
                    <p className={`text-sm font-black ${selectedCrop.change >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                      {selectedCrop.change >= 0 ? `+${selectedCrop.change}% Today` : `${selectedCrop.change}% Today`}
                    </p>
                  </div>
                </div>

                <div className="flex-1 md:pl-4 md:border-l md:border-amber-200">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                    {t.expectedTrend}
                  </span>
                  <p className="text-xs text-amber-800 font-medium mt-0.5">
                    {selectedCrop.forecastText[language]}
                  </p>
                </div>

                <Badge className="bg-emerald-600 text-white self-end md:self-center font-bold text-xs py-1 px-3">
                  {selectedCrop.bestTime}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* List of Mandis / Crops */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Compass className="h-5 w-5 text-blue-600" />
              {t.nearbyMandis}
            </h2>
            <span className="text-xs text-gray-500 font-medium">{t.updatedToday}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredMandis.map((item) => {
              const isSelected = selectedCrop?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedCrop(item)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-500 shadow-md ring-1 ring-blue-500'
                      : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 bg-gray-50 rounded-lg border border-gray-100">{item.emoji}</span>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{item.crop[language]}</h4>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3 text-gray-400" /> {item.mandi} • {item.distanceKm} km
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-black text-gray-900">₹{item.modalPrice.toLocaleString()}</span>
                      <span className="text-[10px] text-gray-500 block">/ qtl</span>
                      <span
                        className={`text-[10px] font-bold flex items-center justify-end gap-0.5 ${
                          item.change >= 0 ? 'text-emerald-600' : 'text-red-500'
                        }`}
                      >
                        {item.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {item.change > 0 ? `+${item.change}%` : `${item.change}%`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Button onClick={onBack} variant="outline" className="w-full h-12 text-gray-600 border-gray-300">
          <ArrowLeft className="h-4 w-4 mr-2" /> {t.back}
        </Button>
      </div>
    </div>
  );
}
