"use client";

import { motion } from "framer-motion";
import { Thermometer } from "lucide-react";
import WeatherFx from "./WeatherFx";

interface WeatherDisplayProps {
  weather: {
    weather: { emoji: string; text: string; verdict: string };
    tempMax: number;
    tempMin: number;
    sunset: string;
  };
  weatherCode?: number;
}

export default function WeatherDisplay({ weather, weatherCode }: WeatherDisplayProps) {
  const isRainy = ["🌧️", "🌦️", "⛈️", "🌨️"].includes(weather.weather.emoji);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ type: "spring", duration: 1 }}
      className="mt-6"
    >
      <div
        className={`rounded-2xl p-5 border shadow-sm relative overflow-hidden ${
          isRainy
            ? "bg-blue-50/60 border-blue-200/50"
            : "bg-amber-50/60 border-amber-200/50"
        }`}
      >
        {weatherCode !== undefined && <WeatherFx weatherCode={weatherCode} />}
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <motion.span
            className="text-lg"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🧚
          </motion.span>
          <h4 className="font-display text-sm font-bold text-emerald-800">
            Feen-Wetterbericht
          </h4>
          <div className="ml-auto flex gap-0.5">
            {["✨", "🌸", "✨"].map((e, i) => (
              <motion.span
                key={i}
                className="text-[10px]"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                {e}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Main weather info */}
        <div className="flex items-center gap-4">
          {/* Big emoji */}
          <motion.div
            className="text-4xl md:text-5xl"
            animate={
              weather.weather.emoji === "☀️"
                ? { rotate: [0, 5, -5, 0] }
                : isRainy
                ? { y: [0, -3, 0] }
                : { scale: [1, 1.05, 1] }
            }
            transition={{ duration: 3, repeat: Infinity }}
          >
            {weather.weather.emoji}
          </motion.div>

          {/* Text */}
          <div className="flex-1">
            <p className="text-lg font-semibold text-emerald-800">
              {weather.weather.text}
            </p>

            {/* Temperature */}
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1 text-sm">
                <Thermometer className="w-3.5 h-3.5 text-rose-500" />
                <span className="text-rose-600 font-medium">
                  {Math.round(weather.tempMax)}°
                </span>
                <span className="text-emerald-500">/</span>
                <span className="text-blue-500 font-medium">
                  {Math.round(weather.tempMin)}°
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sunset info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 flex items-center gap-2 bg-white/50 rounded-xl px-4 py-2.5"
        >
          <motion.span
            className="text-lg"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🌅
          </motion.span>
          <div>
            <p className="text-xs text-emerald-600 font-medium">
              Sonnenuntergang
            </p>
            <p className="text-sm font-bold text-amber-600">
              {weather.sunset} Uhr
            </p>
          </div>
          <span className="ml-auto text-xs text-emerald-500 italic">
            Perfekt für die Gipfel-Ankunft! 🌅
          </span>
        </motion.div>

        {/* Fairy verdict */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 flex items-start gap-2"
        >
          <span className="text-sm mt-0.5">💚</span>
          <p className="text-sm text-emerald-700 italic leading-relaxed">
            {weather.weather.verdict}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
