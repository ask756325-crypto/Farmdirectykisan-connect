import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  Thermometer,
  AlertTriangle,
  Sprout,
  Calendar,
  CloudSun,
  CloudDrizzle,
  CloudLightning,
  Cloudy,
  ShieldCheck,
  Bug,
  Leaf,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Language, Screen } from '../../types';
import { LanguageSelector } from '../ui/LanguageSelector';

interface WeatherAdvisoryScreenProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onBack: () => void;
}

const WEATHER_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    title: 'Weather Advisory',
    subtitle: 'Plan your farming activities with real-time weather data',
    today: 'Today',
    forecast: '7-Day Forecast',
    alerts: 'Weather Alerts',
    recommendations: 'Agronomic Recommendations',
    humidity: 'Humidity',
    wind: 'Wind',
    rainfall: 'Rainfall',
    temperature: 'Temperature',
    feelsLike: 'Feels Like',
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    cropAdvisory: 'Crop Advisory',
    soilMoisture: 'Soil Moisture',
    irrigationNeeded: 'Irrigation Needed',
    sprayDelay: 'Delay Spraying',
    fungalRisk: 'Fungal Disease Risk',
    pestAlert: 'Pest Activity Alert',
    high: 'HIGH',
    medium: 'MEDIUM',
    low: 'LOW',
    back: 'Back',
  },
  ml: {
    title: 'കാലാവസ്ഥ ഉപദേശം',
    subtitle: 'തത്സമയ കാലാവസ്ഥ ഡാറ്റ ഉപയോഗിച്ച് കൃഷി പ്രവർത്തനങ്ങൾ ആസൂത്രണം ചെയ്യുക',
    today: 'ഇന്ന്',
    forecast: '7 ദിവസ പ്രവചനം',
    alerts: 'കാലാവസ്ഥ അലേർട്ടുകൾ',
    recommendations: 'കാർഷിക ശുപാർശകൾ',
    humidity: 'ഈർപ്പം',
    wind: 'കാറ്റ്',
    rainfall: 'മഴ',
    temperature: 'താപനില',
    feelsLike: 'അനുഭവപ്പെടുന്ന താപനില',
    sunrise: 'സൂര്യോദയം',
    sunset: 'സൂര്യാസ്തമയം',
    cropAdvisory: 'വിള ഉപദേശം',
    soilMoisture: 'മണ്ണിലെ ഈർപ്പം',
    irrigationNeeded: 'ജലസേചനം ആവശ്യമാണ്',
    sprayDelay: 'സ്‌പ്രേ ചെയ്യുന്നത് വൈകിപ്പിക്കുക',
    fungalRisk: 'ഫംഗൽ രോഗ സാധ്യത',
    pestAlert: 'കീടനാശിനി അലേർട്ട്',
    high: 'ഉയർന്നത്',
    medium: 'ഇടത്തരം',
    low: 'കുറവ്',
    back: 'തിരികെ',
  },
  hi: {
    title: 'मौसम सलाह',
    subtitle: 'रीयल-टाइम मौसम डेटा के साथ खेती की गतिविधियों की योजना बनाएं',
    today: 'आज',
    forecast: '7 दिन का पूर्वानुमान',
    alerts: 'मौसम अलर्ट',
    recommendations: 'कृषि सिफारिशें',
    humidity: 'नमी',
    wind: 'हवा',
    rainfall: 'बारिश',
    temperature: 'तापमान',
    feelsLike: 'महसूस होता है',
    sunrise: 'सूर्योदय',
    sunset: 'सूर्यास्त',
    cropAdvisory: 'फसल सलाह',
    soilMoisture: 'मिट्टी की नमी',
    irrigationNeeded: 'सिंचाई आवश्यक',
    sprayDelay: 'छिड़काव में देरी करें',
    fungalRisk: 'फफूंद रोग का खतरा',
    pestAlert: 'कीट गतिविधि अलर्ट',
    high: 'उच्च',
    medium: 'मध्यम',
    low: 'कम',
    back: 'वापस',
  },
  te: {
    title: 'వాతావరణ సలహా',
    subtitle: 'రియల్-టైమ్ వాతావరణ డేటాతో వ్యవసాయ కార్యకలాపాలు ప్లాన్ చేయండి',
    today: 'ఈ రోజు',
    forecast: '7 రోజుల ముందస్తు సమాచారం',
    alerts: 'వాతావరణ హెచ్చరికలు',
    recommendations: 'వ్యవసాయ సిఫార్సులు',
    humidity: 'తేమ',
    wind: 'గాలి',
    rainfall: 'వర్షపాతం',
    temperature: 'ఉష్ణోగ్రత',
    feelsLike: 'అనుభవం',
    sunrise: 'సూర్యోదయం',
    sunset: 'సూర్యాస్తమయం',
    cropAdvisory: 'పంట సలహా',
    soilMoisture: 'నేల తేమ',
    irrigationNeeded: 'నీటిపారుదల అవసరం',
    sprayDelay: 'పిచికారీ ఆలస్యం చేయండి',
    fungalRisk: 'ఫంగల్ వ్యాధి ప్రమాదం',
    pestAlert: 'కీటక కార్యకలాపాల హెచ్చరిక',
    high: 'అధిక',
    medium: 'మధ్యస్థ',
    low: 'తక్కువ',
    back: 'వెనుకకు',
  },
};

const MOCK_FORECAST = [
  { day: 'Mon', icon: 'sun', temp: 32, low: 24, rain: 0, humidity: 55 },
  { day: 'Tue', icon: 'cloud-sun', temp: 30, low: 23, rain: 10, humidity: 65 },
  { day: 'Wed', icon: 'cloud-rain', temp: 27, low: 22, rain: 80, humidity: 85 },
  { day: 'Thu', icon: 'cloud-rain', temp: 26, low: 21, rain: 90, humidity: 90 },
  { day: 'Fri', icon: 'cloud-drizzle', temp: 28, low: 22, rain: 40, humidity: 75 },
  { day: 'Sat', icon: 'cloud-sun', temp: 30, low: 23, rain: 15, humidity: 60 },
  { day: 'Sun', icon: 'sun', temp: 33, low: 25, rain: 5, humidity: 50 },
];

const WeatherIcon = ({ type, className }: { type: string; className?: string }) => {
  switch (type) {
    case 'sun': return <Sun className={className} />;
    case 'cloud-sun': return <CloudSun className={className} />;
    case 'cloud-rain': return <CloudRain className={className} />;
    case 'cloud-drizzle': return <CloudDrizzle className={className} />;
    case 'cloud-lightning': return <CloudLightning className={className} />;
    case 'cloudy': return <Cloudy className={className} />;
    default: return <Sun className={className} />;
  }
};

export function WeatherAdvisoryScreen({
  language,
  onLanguageChange,
  onBack,
}: WeatherAdvisoryScreenProps) {
  const t = WEATHER_TRANSLATIONS[language];
  const [selectedDay, setSelectedDay] = useState(0);

  const alerts = [
    {
      severity: 'high' as const,
      icon: <CloudRain className="h-5 w-5" />,
      title: language === 'en' ? 'Heavy Rain Expected Wed-Thu' : language === 'hi' ? 'बुध-गुरु को भारी बारिश' : language === 'ml' ? 'ബുധൻ-വ്യാഴം കനത്ത മഴ' : 'బుధ-గురు భారీ వర్షం',
      desc: language === 'en' ? 'Rain expected → delay spraying fertilizers and pesticides' : language === 'hi' ? 'बारिश → उर्वरक और कीटनाशक छिड़काव में देरी करें' : language === 'ml' ? 'മഴ → വളം, കീടനാശിനി സ്‌പ്രേ വൈകിപ്പിക്കുക' : 'వర్షం → ఎరువులు, పురుగుమందుల పిచికారీ ఆలస్యం',
    },
    {
      severity: 'high' as const,
      icon: <Bug className="h-5 w-5" />,
      title: language === 'en' ? 'High humidity for 3 days → Fungal disease risk' : language === 'hi' ? '3 दिन उच्च नमी → फफूंद रोग का खतरा' : language === 'ml' ? '3 ദിവസം ഉയർന്ന ഈർപ്പം → ഫംഗൽ രോഗ സാധ്യത' : '3 రోజులు అధిక తేమ → ఫంగల్ వ్యాధి ప్రమాదం',
      desc: language === 'en' ? 'Apply preventive fungicide before Wednesday. Check tomato and potato crops.' : language === 'hi' ? 'बुधवार से पहले रोगनिवारक फफूंदनाशक लगाएं।' : language === 'ml' ? 'ബുധനാഴ്ചയ്ക്ക് മുമ്പ് പ്രതിരോധ കുമിൾനാശിനി പ്രയോഗിക്കുക.' : 'బుధవారం ముందు నివారణ బూజు నిరోధకం వేయండి.',
    },
    {
      severity: 'medium' as const,
      icon: <Droplets className="h-5 w-5" />,
      title: language === 'en' ? 'Low soil moisture detected → Irrigation warning' : language === 'hi' ? 'कम मिट्टी नमी → सिंचाई चेतावनी' : language === 'ml' ? 'കുറഞ്ഞ മണ്ണ് ഈർപ്പം → ജലസേചന മുന്നറിയിപ്പ്' : 'తక్కువ నేల తేమ → నీటిపారుదల హెచ్చరిక',
      desc: language === 'en' ? 'Irrigate crops before Tuesday noon. Drip irrigation recommended.' : language === 'hi' ? 'मंगलवार दोपहर से पहले सिंचाई करें।' : language === 'ml' ? 'ചൊവ്വാഴ്ച ഉച്ചയ്ക്ക് മുമ്പ് ജലസേചനം ചെയ്യുക.' : 'మంగళవారం మధ్యాహ్నం ముందు నీటిపారుదల చేయండి.',
    },
  ];

  const recommendations = [
    {
      icon: <Sprout className="h-5 w-5 text-emerald-600" />,
      title: language === 'en' ? 'Crop Stage: Flowering Phase' : language === 'hi' ? 'फसल चरण: फूलने का चरण' : language === 'ml' ? 'വിള ഘട്ടം: പൂവിടൽ' : 'పంట దశ: పూత దశ',
      desc: language === 'en' ? 'Apply potassium-rich fertilizer (MOP/SOP). Avoid nitrogen excess during flowering.' : language === 'hi' ? 'पोटैशियम समृद्ध उर्वरक (MOP/SOP) डालें।' : language === 'ml' ? 'പൊട്ടാസ്യം സമ്പുഷ്ട വളം (MOP/SOP) ഇടുക.' : 'పొటాషియం అధికంగా ఉన్న ఎరువు (MOP/SOP) వేయండి.',
      color: 'bg-emerald-50 border-emerald-200',
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-blue-600" />,
      title: language === 'en' ? 'Disease Prevention: Pre-monsoon spray' : language === 'hi' ? 'रोग निवारण: मानसून पूर्व छिड़काव' : language === 'ml' ? 'രോഗ പ്രതിരോധം: മഴക്ക് മുമ്പുള്ള സ്‌പ്രേ' : 'వ్యాధి నివారణ: వర్షాకాలం ముందు పిచికారీ',
      desc: language === 'en' ? 'Apply Mancozeb or Copper Oxychloride before rain starts. Protects against late blight.' : language === 'hi' ? 'बारिश शुरू होने से पहले मैंकोज़ेब या कॉपर ऑक्सीक्लोराइड लगाएं।' : language === 'ml' ? 'മഴ ആരംഭിക്കുന്നതിന് മുമ്പ് മാൻകോസെബ് അല്ലെങ്കിൽ കോപ്പർ ഓക്സിക്ലോറൈഡ് പ്രയോഗിക്കുക.' : 'వర్షం ప్రారంభానికి ముందు మాంకోజెబ్ లేదా కాపర్ ఆక్సీక్లోరైడ్ వేయండి.',
      color: 'bg-blue-50 border-blue-200',
    },
    {
      icon: <Leaf className="h-5 w-5 text-amber-600" />,
      title: language === 'en' ? 'Harvest Window: Saturday-Sunday' : language === 'hi' ? 'कटाई समय: शनिवार-रविवार' : language === 'ml' ? 'വിളവെടുപ്പ് സമയം: ശനി-ഞായർ' : 'కోత సమయం: శనివారం-ఆదివారం',
      desc: language === 'en' ? 'Dry weather expected on weekend. Best time to harvest tomatoes and beans for market.' : language === 'hi' ? 'सप्ताहांत में सूखा मौसम। टमाटर और बीन्स की कटाई का सबसे अच्छा समय।' : language === 'ml' ? 'വാരാന്ത്യത്തിൽ വരണ്ട കാലാവസ്ഥ. തക്കാളിയും ബീൻസും വിളവെടുക്കാൻ മികച്ച സമയം.' : 'వారాంతంలో పొడి వాతావరణం. టమాటాలు, బీన్స్ కోతకు ఉత్తమ సమయం.',
      color: 'bg-amber-50 border-amber-200',
    },
  ];

  const selected = MOCK_FORECAST[selectedDay];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/60 to-emerald-50/40 pb-12 text-gray-900">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white p-4 md:p-6 shadow-md">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                  <CloudSun className="h-7 w-7 text-yellow-300" />
                  {t.title}
                </h1>
                <p className="text-sky-100 text-sm mt-0.5">{t.subtitle}</p>
              </div>
            </div>
            <LanguageSelector language={language} onLanguageChange={onLanguageChange} variant="glass" />
          </div>

          {/* Today's weather hero */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20 mt-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sky-200 text-sm font-medium">{t.today} • Kerala</p>
                <div className="flex items-end gap-2 mt-1">
                  <span className="text-5xl font-black">{selected.temp}°</span>
                  <span className="text-sky-200 text-lg mb-1">/{selected.low}°C</span>
                </div>
                <p className="text-sky-100 text-sm mt-1">{t.feelsLike}: {selected.temp + 2}°C</p>
              </div>
              <div className="text-right">
                <WeatherIcon type={selected.icon} className="h-16 w-16 text-yellow-300 mx-auto" />
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs">
                  <div className="flex items-center gap-1 text-sky-100">
                    <Droplets className="h-3.5 w-3.5" /> {selected.humidity}%
                  </div>
                  <div className="flex items-center gap-1 text-sky-100">
                    <Wind className="h-3.5 w-3.5" /> 12 km/h
                  </div>
                  <div className="flex items-center gap-1 text-sky-100">
                    <CloudRain className="h-3.5 w-3.5" /> {selected.rain}%
                  </div>
                  <div className="flex items-center gap-1 text-sky-100">
                    <Thermometer className="h-3.5 w-3.5" /> UV: 6
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        {/* 7-Day Forecast */}
        <Card className="shadow-md border-sky-100">
          <CardHeader className="border-b border-gray-100 pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-gray-900">
              <Calendar className="h-5 w-5 text-sky-600" />
              {t.forecast}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-7 gap-2">
              {MOCK_FORECAST.map((day, idx) => (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDay(idx)}
                  className={`flex flex-col items-center p-2 rounded-xl transition-all text-xs ${
                    selectedDay === idx
                      ? 'bg-sky-600 text-white shadow-md'
                      : 'bg-gray-50 hover:bg-sky-50 text-gray-700'
                  }`}
                >
                  <span className="font-bold">{day.day}</span>
                  <WeatherIcon
                    type={day.icon}
                    className={`h-5 w-5 my-1.5 ${selectedDay === idx ? 'text-yellow-300' : 'text-sky-500'}`}
                  />
                  <span className="font-black text-sm">{day.temp}°</span>
                  <span className={`text-[10px] ${selectedDay === idx ? 'text-sky-200' : 'text-gray-400'}`}>
                    {day.low}°
                  </span>
                  {day.rain > 50 && (
                    <div className={`mt-1 flex items-center gap-0.5 ${selectedDay === idx ? 'text-sky-200' : 'text-blue-500'}`}>
                      <Droplets className="h-3 w-3" />
                      <span className="text-[10px] font-bold">{day.rain}%</span>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weather Alerts */}
        <Card className="shadow-md border-red-100">
          <CardHeader className="border-b border-gray-100 pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-gray-900">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              {t.alerts}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {alerts.map((alert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-4 rounded-xl border flex items-start gap-3 ${
                  alert.severity === 'high'
                    ? 'bg-red-50 border-red-200'
                    : 'bg-amber-50 border-amber-200'
                }`}
              >
                <div className={`p-2 rounded-lg flex-shrink-0 ${
                  alert.severity === 'high' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {alert.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-sm text-gray-900">{alert.title}</h4>
                    <Badge className={`text-[10px] px-1.5 py-0 ${
                      alert.severity === 'high' ? 'bg-red-600 text-white' : 'bg-amber-500 text-white'
                    }`}>
                      {alert.severity === 'high' ? t.high : t.medium}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{alert.desc}</p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Agronomic Recommendations */}
        <Card className="shadow-md border-emerald-100">
          <CardHeader className="border-b border-gray-100 pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-gray-900">
              <Sprout className="h-5 w-5 text-emerald-600" />
              {t.recommendations}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {recommendations.map((rec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-4 rounded-xl border ${rec.color}`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm flex-shrink-0">{rec.icon}</div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{rec.title}</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{rec.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Button onClick={onBack} variant="outline" className="w-full h-12 text-gray-600 border-gray-300">
          <ArrowLeft className="h-4 w-4 mr-2" /> {t.back}
        </Button>
      </div>
    </div>
  );
}
