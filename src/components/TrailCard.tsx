"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Trail } from "@/types";
import { MapPin, Clock, Footprints, Sun } from "lucide-react";

interface TrailCardProps {
  trail: Trail;
  isSelected: boolean;
  onSelect: () => void;
}

export default function TrailCard({
  trail,
  isSelected,
  onSelect,
}: TrailCardProps) {
  const [hoverSparkles] = useState(() =>
    Array.from({ length: 3 }, () => ({
      x: 15 + Math.random() * 70,
      y: 15 + Math.random() * 60,
      size: 8 + Math.random() * 12,
      delay: Math.random() * 2,
    }))
  );

  return (
    <motion.div
      onClick={onSelect}
      className={`relative cursor-pointer rounded-3xl p-6 border-2 transition-all duration-300 ${
        isSelected
          ? "border-amber-400 bg-amber-50/80 shadow-xl shadow-amber-200/40 ring-2 ring-amber-300/50"
          : "border-emerald-200/60 bg-white/60 backdrop-blur-sm hover:border-emerald-300 hover:shadow-lg hover:bg-white/80"
      }`}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Top decorative corners */}
      <div className="absolute -top-1 -left-1 text-xs opacity-30">🌸</div>
      <div className="absolute -top-1 -right-1 text-xs opacity-30">🌿</div>
      <div className="absolute -bottom-1 -left-1 text-xs opacity-30">🍃</div>
      <div className="absolute -bottom-1 -right-1 text-xs opacity-30">✨</div>

      {isSelected && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute -top-3 -right-3 bg-gradient-to-br from-amber-400 to-rose-400 text-white rounded-full p-1.5 shadow-lg shadow-amber-300/50 z-10"
        >
          <motion.span
            className="block text-base"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🌟
          </motion.span>
        </motion.div>
      )}

      {/* Map Placeholder with fairy frame */}
      <div
        className={`w-full h-44 rounded-2xl bg-gradient-to-br ${trail.imageColor} mb-4 flex items-center justify-center relative overflow-hidden group`}
      >
        {/* Decorative overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

        {/* Hover sparkles */}
        {hoverSparkles.map((s, i) => (
          <motion.div
            key={i}
            className="absolute text-white/50 pointer-events-none"
            style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: s.size }}
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{ opacity: [0, 0.7, 0], scale: [0, 1, 0] }}
            transition={{ duration: 1.5, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            ✦
          </motion.div>
        ))}

        {/* Trail path SVG */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 400 160">
            <path
              d="M0,80 Q50,35 100,65 T200,55 T300,75 T400,45"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeDasharray="8 4"
            />
            <path
              d="M0,110 Q50,95 100,105 T200,85 T300,125 T400,95"
              fill="none"
              stroke="white"
              strokeWidth="2"
              opacity="0.4"
              strokeDasharray="6 3"
            />
          </svg>
        </div>

        {/* Sun/moon */}
        <motion.div
          className="absolute top-3 right-4 text-2xl"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {trail.sunsetRating >= 5 ? "🌅" : "🌄"}
        </motion.div>

        {/* Center icon */}
        <motion.div
          className="relative z-10"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <MapPin className="w-12 h-12 text-white/80" />
        </motion.div>

        {/* Region badge */}
        <div className="absolute bottom-3 right-3 bg-white/40 backdrop-blur-md rounded-full px-3 py-1 text-xs text-white font-medium shadow-sm">
          {trail.region}
        </div>
      </div>

      <h3 className="text-xl font-bold font-display text-emerald-800 mb-2">
        {trail.name}
      </h3>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="inline-flex items-center gap-1 bg-emerald-100/80 text-emerald-700 px-2.5 py-1 rounded-full text-xs">
          <Footprints className="w-3 h-3" />
          {trail.distance}
        </span>
        <span className="inline-flex items-center gap-1 bg-amber-100/80 text-amber-700 px-2.5 py-1 rounded-full text-xs">
          <Clock className="w-3 h-3" />
          {trail.duration}
        </span>
        <span className="inline-flex items-center gap-1 bg-rose-100/80 text-rose-700 px-2.5 py-1 rounded-full text-xs">
          <Sun className="w-3 h-3" />
          {trail.difficulty}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-2">
        {trail.description}
      </p>

      {/* Cute facts accordion style */}
      <div className="space-y-1">
        <h4 className="font-semibold text-emerald-600 text-xs uppercase tracking-wider mb-1.5">
          ✧ Zauberhafte Fakten ✧
        </h4>
        <ul className="space-y-1">
          {trail.facts.map((fact, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.12 }}
              className="flex items-start gap-2 text-xs text-gray-500 leading-relaxed"
            >
              <span className="text-amber-500 mt-0.5 shrink-0">
                {["🌿", "🍃", "✨", "🌸"][index % 4]}
              </span>
              <span>{fact}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
