import { useEffect, useState } from 'react';
import api from '../api/axios';
import { FaClock, FaQuran, FaPray } from 'react-icons/fa';

interface PrayerTime {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  location: string;
}

interface Content {
  title: string;
  arabicText: string;
  transliteration?: string;
  translation: string;
  reference?: string;
}

const Home = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime | null>(null);
  const [currentQuote, setCurrentQuote] = useState(0);

  // Islamic Quotations
  const quotations = [
    {
      text: "Indeed, with hardship comes ease.",
      arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
      reference: "Quran 94:6"
    },
    {
      text: "And He is with you wherever you are.",
      arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
      reference: "Quran 57:4"
    },
    {
      text: "Verily, in the remembrance of Allah do hearts find rest.",
      arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
      reference: "Quran 13:28"
    },
    {
      text: "Allah does not burden a soul beyond that it can bear.",
      arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
      reference: "Quran 2:286"
    },
    {
      text: "So remember Me; I will remember you.",
      arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",
      reference: "Quran 2:152"
    },
    {
      text: "And whoever fears Allah - He will make for him a way out.",
      arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
      reference: "Quran 65:2"
    },
    {
      text: "The best among you are those who have the best manners.",
      arabic: "خَيْرُكُمْ أَحْسَنُكُمْ أَخْلَاقًا",
      reference: "Hadith - Bukhari"
    },
    {
      text: "Kindness is a mark of faith, and whoever is not kind has no faith.",
      arabic: "الرِّفْقُ لَا يَكُونُ فِي شَيْءٍ إِلَّا زَانَهُ",
      reference: "Hadith - Muslim"
    },
    {
      text: "The strong person is not the one who can wrestle, but the one who controls himself in anger.",
      arabic: "لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ",
      reference: "Hadith - Bukhari"
    },
    {
      text: "Whoever believes in Allah and the Last Day should speak good or remain silent.",
      arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
      reference: "Hadith - Bukhari & Muslim"
    },
    {
      text: "The believer does not slander, curse, or speak in an obscene or foul manner.",
      arabic: "لَيْسَ الْمُؤْمِنُ بِالطَّعَّانِ وَلَا اللَّعَّانِ وَلَا الْفَاحِشِ وَلَا الْبَذِيءِ",
      reference: "Hadith - Tirmidhi"
    },
    {
      text: "The most beloved deeds to Allah are those done consistently, even if they are small.",
      arabic: "أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ",
      reference: "Hadith - Bukhari & Muslim"
    },
    {
      text: "None of you truly believes until he loves for his brother what he loves for himself.",
      arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
      reference: "Hadith - Bukhari & Muslim"
    }
  ];

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  // Rotate quotations every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotations.length);
    }, 20000); // 20 seconds

    return () => clearInterval(interval);
  }, [quotations.length]);

  const fetchPrayerTimes = async () => {
    try {
      const { data } = await api.get('/prayer-times/today');
      setPrayerTimes(data.data);
    } catch (error) {
      // Use fallback prayer times for Ghana (West Africa)
      setPrayerTimes({
        fajr: '04:45',
        sunrise: '05:55',
        dhuhr: '12:05',
        asr: '15:25',
        maghrib: '18:15',
        isha: '19:25',
        location: 'Accra, Ghana'
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section with Background */}
      <div 
        className="relative bg-gradient-to-r from-islamic-green to-islamic-teal text-white rounded-2xl p-8 mb-8 overflow-hidden"
        style={{
          backgroundImage: 'url(/images/masjid.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-islamic-green/90 to-islamic-teal/90"></div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center gap-6">
          <div className="flex gap-3 hidden sm:flex">
            <img 
              src="/images/udslogo.jpg" 
              alt="UDS Logo" 
              className="h-24 w-24 object-contain bg-white rounded-full p-2 shadow-lg"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <img 
              src="/images/gmsalogo.jpg" 
              alt="GMSA Logo" 
              className="h-24 w-24 object-contain bg-white rounded-full p-2 shadow-lg"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Welcome to Our Mosque</h1>
            <p className="text-xl md:text-2xl font-medium drop-shadow-md">A place of worship, learning, and community</p>
          </div>
        </div>
      </div>

      {/* Rotating Quotations */}
      <div className="card mb-8 bg-gradient-to-br from-islamic-navy/5 to-islamic-teal/5 dark:from-islamic-navy/20 dark:to-islamic-teal/20 border-2 border-islamic-green/30 dark:border-islamic-green/50">
        <div className="flex items-center mb-6">
          <FaQuran className="text-islamic-green dark:text-emerald-400 text-4xl mr-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Islamic Wisdom</h2>
        </div>
        <div className="min-h-[200px] flex flex-col justify-center">
          <div className="transition-opacity duration-1000">
            <p className="arabic-text text-3xl md:text-4xl mb-6 text-islamic-green dark:text-emerald-400 font-bold">
              {quotations[currentQuote].arabic}
            </p>
            <p className="text-xl md:text-2xl mb-4 font-semibold text-gray-800 dark:text-white leading-relaxed">
              {quotations[currentQuote].text}
            </p>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-bold">
              — {quotations[currentQuote].reference}
            </p>
          </div>
        </div>
        {/* Progress Indicator */}
        <div className="flex gap-2 mt-6 justify-center">
          {quotations.map((_, index) => (
            <div
              key={index}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentQuote 
                  ? 'w-10 bg-islamic-green dark:bg-emerald-400' 
                  : 'w-2.5 bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Prayer Times */}
      {prayerTimes && (
        <div className="card mb-8">
          <div className="flex items-center mb-6">
            <FaClock className="text-islamic-green dark:text-emerald-400 text-3xl mr-4" />
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Today's Prayer Times</h2>
              <p className="text-lg font-semibold text-gray-600 dark:text-gray-300 mt-1">{prayerTimes.location}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { name: 'Fajr', time: prayerTimes.fajr, icon: '🌅' },
              { name: 'Sunrise', time: prayerTimes.sunrise, icon: '☀️' },
              { name: 'Dhuhr', time: prayerTimes.dhuhr, icon: '🌞' },
              { name: 'Asr', time: prayerTimes.asr, icon: '🌤️' },
              { name: 'Maghrib', time: prayerTimes.maghrib, icon: '🌆' },
              { name: 'Isha', time: prayerTimes.isha, icon: '🌙' }
            ].map((prayer) => (
              <div key={prayer.name} className="text-center p-5 bg-gradient-to-br from-islamic-green/10 to-islamic-teal/10 dark:from-islamic-green/20 dark:to-islamic-teal/20 rounded-xl hover:shadow-lg transition-all border-2 border-emerald-100 dark:border-emerald-700">
                <div className="text-4xl mb-3">{prayer.icon}</div>
                <p className="font-bold text-lg text-islamic-green dark:text-emerald-300 mb-1">{prayer.name}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{prayer.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card hover:shadow-lg transition-shadow cursor-pointer group">
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🎥</div>
          <h3 className="text-xl font-bold mb-2">Islamic Lectures</h3>
          <p className="text-gray-600 dark:text-gray-400">Watch and learn from our collection of Islamic lectures</p>
        </div>
        <div className="card hover:shadow-lg transition-shadow cursor-pointer group">
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📚</div>
          <h3 className="text-xl font-bold mb-2">Online Courses</h3>
          <p className="text-gray-600 dark:text-gray-400">Enroll in courses to deepen your Islamic knowledge</p>
        </div>
        <div className="card hover:shadow-lg transition-shadow cursor-pointer group">
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🏗️</div>
          <h3 className="text-xl font-bold mb-2">Community Projects</h3>
          <p className="text-gray-600 dark:text-gray-400">Support our ongoing community initiatives</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
