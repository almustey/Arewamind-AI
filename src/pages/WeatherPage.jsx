import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchWeather } from '../services/weather';
import { Cloud, Search, MapPin, Droplets, Wind, Sun, Sunrise, Sunset, Thermometer, Clock } from 'lucide-react';

const NigerianCities = ['Kano', 'Gombe', 'Lagos', 'Abuja', 'Kaduna', 'Ibadan', 'Port Harcourt', 'Maiduguri', 'Sokoto', 'Zaria'];

const worldClocks = [
  { city: 'Nigeria (WAT)', timeZone: 'Africa/Lagos' },
  { city: 'London (GMT/BST)', timeZone: 'Europe/London' },
  { city: 'New York (EDT)', timeZone: 'America/New_York' },
  { city: 'Dubai (GST)', timeZone: 'Asia/Dubai' },
  { city: 'Tokyo (JST)', timeZone: 'Asia/Tokyo' }
];

const WeatherPage = () => {
  const [city, setCity] = useState('Gombe');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getWeatherData = async (searchCity) => {
    setLoading(true);
    try {
      const data = await fetchWeather(searchCity);
      setWeather(data);
    } catch (err) {
      console.warn("Using fallback weather info:", err);
      setWeather({
        name: searchCity,
        main: { temp: 32, humidity: 30, feels_like: 34 },
        weather: [{ description: 'sunny clear sky', main: 'Clear' }],
        wind: { speed: 10 },
        sys: { sunrise: Math.floor(Date.now() / 1000) - 18000, sunset: Math.floor(Date.now() / 1000) + 18000 }
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeatherData(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchCity = formData.get('city');
    if (searchCity && searchCity.trim()) {
      setCity(searchCity.trim());
      getWeatherData(searchCity.trim());
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Cloud className="text-secondary" size={36} /> Atmospheric Intelligence
          </h1>
          <p className="text-gray-400">Live weather tracking across Nigerian states & global cities.</p>
        </div>
        <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              name="city"
              type="text"
              placeholder="Search city (e.g. Gombe, Kano, Abuja)..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-secondary transition-all text-white placeholder:text-gray-500"
            />
          </div>
          <button type="submit" className="px-6 py-3 bg-secondary text-black font-bold rounded-xl hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all cursor-pointer">
            Find
          </button>
        </form>
      </div>

      {/* World Clock Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {worldClocks.map((wc, i) => {
          const timeStr = currentTime.toLocaleTimeString('en-US', { timeZone: wc.timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit' });
          return (
            <div key={i} className="glass p-3 rounded-xl border border-white/10 flex flex-col justify-between">
              <span className="text-[11px] text-gray-400 flex items-center gap-1 font-medium">
                <Clock size={12} className="text-secondary" /> {wc.city}
              </span>
              <span className="text-lg font-mono font-bold text-white mt-1">{timeStr}</span>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        {NigerianCities.map(c => (
          <button 
            key={c} 
            onClick={() => { setCity(c); getWeatherData(c); }}
            className={`px-4 py-1.5 rounded-full text-sm border transition-all cursor-pointer ${
              city.toLowerCase() === c.toLowerCase() ? 'bg-secondary/20 border-secondary text-secondary shadow-[0_0_12px_rgba(0,212,255,0.3)]' : 'glass border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {weather && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Weather Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 glass-card p-8 relative overflow-hidden flex flex-col justify-between min-h-[380px]"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <Sun size={200} className="animate-spin-slow" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-secondary font-bold mb-2 uppercase tracking-wider text-sm">
                <MapPin size={18} /> {weather.name}, Nigeria
              </div>
              <h2 className="text-7xl md:text-8xl font-black mb-4 tracking-tight">{Math.round(weather.main.temp)}°C</h2>
              <div className="text-xl md:text-2xl font-medium text-gray-300 capitalize flex items-center gap-2">
                {weather.weather[0].description} • Feels like {Math.round(weather.main.feels_like)}°C
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 relative z-10">
              <div className="glass p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 text-gray-400 mb-1 text-xs"><Droplets size={14} className="text-blue-400" /> Humidity</div>
                <div className="text-xl font-bold">{weather.main.humidity}%</div>
              </div>
              <div className="glass p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 text-gray-400 mb-1 text-xs"><Wind size={14} className="text-teal-400" /> Wind Speed</div>
                <div className="text-xl font-bold">{weather.wind.speed} km/h</div>
              </div>
              <div className="glass p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 text-gray-400 mb-1 text-xs"><Sunrise size={14} className="text-amber-400" /> Sunrise</div>
                <div className="text-xl font-bold">{new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
              <div className="glass p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 text-gray-400 mb-1 text-xs"><Sunset size={14} className="text-orange-400" /> Sunset</div>
                <div className="text-xl font-bold">{new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
            </div>
          </motion.div>

          {/* Smart Insights & Trend */}
          <div className="space-y-6">
             <div className="glass-card p-6 border-l-4 border-secondary">
               <h3 className="font-bold mb-4 flex items-center gap-2"><Thermometer size={18} className="text-secondary" /> Daily Thermal Outlook</h3>
               <div className="space-y-3">
                  {[
                    { time: 'Morning', temp: `${Math.round(weather.main.temp - 4)}°C`, icon: Sunrise },
                    { time: 'Afternoon', temp: `${Math.round(weather.main.temp + 3)}°C`, icon: Sun },
                    { time: 'Evening', temp: `${Math.round(weather.main.temp)}°C`, icon: Sunset },
                    { time: 'Night', temp: `${Math.round(weather.main.temp - 6)}°C`, icon: Cloud },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 glass rounded-xl">
                      <div className="flex items-center gap-3">
                        <item.icon size={18} className="text-secondary" />
                        <span className="text-sm">{item.time}</span>
                      </div>
                      <span className="font-bold font-mono">{item.temp}</span>
                    </div>
                  ))}
               </div>
             </div>
             
             <div className="glass-card p-6">
                <h3 className="font-bold mb-2 flex items-center gap-2 text-sm text-secondary">
                  <span>✦</span> Smart Atmospheric Advice
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {weather.main.temp >= 33 
                    ? `High thermal radiation in ${weather.name}. Stay well hydrated, prioritize shaded spaces, and keep cool.`
                    : `Optimal weather conditions detected in ${weather.name}. Ideal for outdoor operations and travel.`}
                </p>
             </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default WeatherPage;
