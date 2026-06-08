"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Sparkles, Heart } from "lucide-react";
import { fetchWeather } from "@/lib/weather";
import WeatherDisplay from "@/components/WeatherDisplay";

interface DatePickerProps {
  date: string;
  time: string;
  altDate: string;
  altTime: string;
  onDateChange: (val: string) => void;
  onTimeChange: (val: string) => void;
  onAltDateChange: (val: string) => void;
  onAltTimeChange: (val: string) => void;
}

export default function DatePicker({
  date,
  time,
  altDate,
  altTime,
  onDateChange,
  onTimeChange,
  onAltDateChange,
  onAltTimeChange,
}: DatePickerProps) {
  const [weather, setWeather] = useState<{
    weather: { emoji: string; text: string; verdict: string };
    tempMax: number;
    tempMin: number;
    sunset: string;
    weatherCode: number;
  } | null>(null);
  const [weatherFailed, setWeatherFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!date) {
      setWeather(null);
      setWeatherFailed(false);
      return;
    }

    let cancelled = false;
    setWeather(null);
    setLoading(true);
    setWeatherFailed(false);

    fetchWeather(date).then((data) => {
      if (!cancelled) {
        if (data) {
          setWeather(data);
        } else {
          setWeatherFailed(true);
        }
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [date]);

  return (
    <div>
      {/* Primary date */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-emerald-200/60 shadow-lg mb-6 relative overflow-hidden"
      >
        {/* Decorative */}
        <div className="absolute top-0 right-0 text-4xl opacity-10 rotate-12">🌙</div>
        <div className="absolute bottom-0 left-0 text-4xl opacity-10 -rotate-12">⭐</div>

        <div className="flex items-center gap-3 mb-5">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-6 h-6 text-emerald-500" />
          </motion.div>
          <h3 className="text-xl font-display font-bold text-emerald-800">
            Erster Vorschlag
          </h3>
          <Heart className="w-5 h-5 text-rose-400 fill-rose-400/50 ml-auto" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-emerald-600 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              Datum
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border border-emerald-200/80 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:scale-[1.01] focus:shadow-lg focus:shadow-emerald-200/50 text-emerald-800 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-600 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              Uhrzeit
            </label>
            <div className="relative">
              <input
                type="time"
                value={time}
                onChange={(e) => onTimeChange(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl border border-emerald-200/80 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:scale-[1.01] focus:shadow-lg focus:shadow-emerald-200/50 text-emerald-800 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Weather display */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 flex items-center justify-center gap-2 py-3 bg-emerald-50/50 rounded-xl"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="text-lg"
            >
              🧚
            </motion.span>
            <span className="text-sm text-emerald-600">
              Wetterfeen befragen...
            </span>
          </motion.div>
        )}

        {weather && !loading && (
          <WeatherDisplay weather={weather} weatherCode={weather.weatherCode} />
        )}

        {weatherFailed && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-amber-200/40 text-center"
          >
            <span className="text-3xl block mb-2">🔮</span>
            <p className="text-sm text-emerald-700">
              Die Wetterfeen sind noch am Zaubern...<br />
              <span className="text-emerald-500/70">
                Das Wetter für dieses Datum ist noch nicht vorhersagbar
              </span>
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Alternative date */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-amber-200/40 shadow-md relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 text-3xl opacity-10">🌿</div>
        <div className="absolute bottom-0 left-0 text-3xl opacity-10">🌸</div>

        <div className="flex items-center gap-3 mb-5">
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
          </motion.div>
          <h3 className="text-lg font-display font-bold text-emerald-700">
            Alternativer Vorschlag
          </h3>
          <span className="text-xs text-emerald-500 italic ml-auto">
            falls es nicht klappt
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-emerald-600 mb-2 flex items-center gap-2 opacity-70">
              <Calendar className="w-4 h-4 text-amber-400" />
              Datum
            </label>
            <input
              type="date"
              value={altDate}
              onChange={(e) => onAltDateChange(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-amber-200/60 bg-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:scale-[1.01] focus:shadow-lg focus:shadow-amber-200/30 text-emerald-800 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-600 mb-2 flex items-center gap-2 opacity-70">
              <Clock className="w-4 h-4 text-amber-400" />
              Uhrzeit
            </label>
            <input
              type="time"
              value={altTime}
              onChange={(e) => onAltTimeChange(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-amber-200/60 bg-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:scale-[1.01] focus:shadow-lg focus:shadow-amber-200/30 text-emerald-800 transition-all duration-300"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
