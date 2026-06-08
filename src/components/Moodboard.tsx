/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface MoodboardProps {
  excitement: number;
  onExcitementChange: (val: number) => void;
}

const gifs = [
  "https://media.giphy.com/media/SggILpMXO7Xt6/giphy.gif",
];

const anteaterImages = [
  "https://images.unsplash.com/photo-1632584519332-67b3cbfa659e?w=200&q=80",
  "https://images.unsplash.com/photo-1590423952177-7c60e4acb716?w=200&q=80",
];

const catReactions = [
  { emoji: "😊", text: "Na klar!" },
  { emoji: "😍", text: "Oh jaa!" },
  { emoji: "🥰", text: "Ich platze fast!" },
  { emoji: "🤩", text: "Richtig gute Laune! 🎉" },
  { emoji: "🎉", text: "ÜBERWÄLTIGT!" },
];

export default function Moodboard({ excitement, onExcitementChange }: MoodboardProps) {
  const [sparkleHearts, setSparkleHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const hearts: { id: number; x: number; y: number }[] = [];
    for (let i = 0; i < 15; i++) {
      hearts.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
      });
    }
    setSparkleHearts(hearts);
  }, []);

  const reaction = catReactions[Math.min(Math.floor(excitement / 2), catReactions.length - 1)];

  return (
    <div className="relative">
      {/* Decorative heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex justify-center gap-2 text-2xl mb-2">
          <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>💖</motion.span>
          <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>✨</motion.span>
          <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>🌟</motion.span>
          <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>✨</motion.span>
          <motion.span animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}>💖</motion.span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-emerald-800 mb-2">
          Deine Zauberstimmung 🌟
        </h2>
        <p className="text-emerald-600 text-lg font-light italic">
          Ein bisschen Inspiration fürs Abenteuer...
        </p>
      </motion.div>

      {/* Cat GIF row */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 max-w-lg mx-auto">
        {gifs.slice(0, 3).map((gif, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.15 }}
            className="relative rounded-2xl overflow-hidden aspect-square group shadow-md hover:shadow-xl transition-all duration-500"
          >
            {/* Decorative border */}
            <div className="absolute inset-0 border-2 border-pink-200/40 rounded-2xl z-10 pointer-events-none" />
            <img
              src={gif}
              alt="Cute cat"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-400/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              >
                <Heart className="w-8 h-8 text-pink-300 fill-pink-300" />
              </motion.div>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-amber-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      {/* Anteaters row with fairy styling */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-6 mb-8 bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-amber-200/50 max-w-xl mx-auto"
      >
        {anteaterImages.map((img, index) => (
          <div
            key={index}
            className="relative group"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-amber-200 shadow-md ring-2 ring-amber-50">
              <img
                src={img}
                alt="Ameisenbär"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <motion.div
              className="absolute -top-1 -right-1 text-sm"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
            >
              💕
            </motion.div>
          </div>
        ))}
        <div className="flex flex-col items-center">
          <span className="text-3xl mb-1">🐜</span>
          <span className="text-amber-700 text-sm font-medium bg-amber-50 rounded-full px-3 py-1">
            Ameisenbär-Freunde
          </span>
        </div>
      </motion.div>

      {/* Second row of gifs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {gifs.slice(4, 8).map((gif, index) => (
          <motion.div
            key={index + 4}
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="relative rounded-2xl overflow-hidden aspect-square shadow-md hover:shadow-xl transition-all group"
          >
            <div className="absolute inset-0 border-2 border-purple-200/40 rounded-2xl z-10 pointer-events-none" />
            <img
              src={gif}
              alt="Cute cat"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </motion.div>
        ))}
      </div>

      {/* Excitement Slider - Fairy styled */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-white/80 via-rose-50/60 to-amber-50/60 backdrop-blur-md rounded-3xl p-8 border border-rose-200/50 shadow-lg max-w-lg mx-auto"
      >
        <h3 className="text-2xl font-display font-bold text-emerald-800 mb-6 text-center">
          Wie sehr kribbelt&apos;s schon? ✨
        </h3>

        <div className="flex items-center gap-4 max-w-md mx-auto mb-4">
          <motion.span
            className="text-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            🐛
          </motion.span>
          <div className="flex-1 relative h-8 flex items-center">
            {/* Slider track background */}
            <div className="absolute inset-x-0 h-2 rounded-full bg-rose-100">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-amber-300 to-rose-400"
                layout
                animate={{ width: `${((excitement - 1) / 9) * 100}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            </div>

            {/* Hidden range input (handles value logic) */}
            <input
              type="range"
              min="1"
              max="10"
              value={excitement}
              onChange={(e) => onExcitementChange(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />

            {/* Animated handle */}
            <motion.div
              className="absolute z-20 pointer-events-none text-xl flex items-center justify-center"
              layout
              animate={{
                left: `calc(${((excitement - 1) / 9) * 100}% - 14px)`,
                scale: [1, 1.15, 1],
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 22,
                scale: { duration: 0.3, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <span className="drop-shadow-lg" style={{ filter: "drop-shadow(0 0 6px rgba(251,191,36,0.6))" }}>
                {excitement >= 9 ? "🌟" : excitement >= 6 ? "⭐" : "💚"}
              </span>
            </motion.div>
          </div>
          <motion.span
            className="text-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🦋
          </motion.span>
        </div>

        {/* Excitement indicator */}
        <div className="text-center">
          <div className="flex justify-center gap-1 mb-2">
            {Array.from({ length: 10 }, (_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: i < excitement ? 1 : 0.5 }}
                className={`text-sm ${i < excitement ? "text-amber-400" : "text-gray-200"}`}
              >
                {i < excitement ? "⭐" : "☆"}
              </motion.span>
            ))}
          </div>
          <motion.div
            key={excitement}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <span className="text-4xl md:text-5xl block mb-1">
              {excitement >= 10 ? "🎉" : excitement >= 8 ? "🤩" : excitement >= 6 ? "😍" : excitement >= 4 ? "🥰" : "😊"}
            </span>
            <p className="text-emerald-700 font-medium">
              {reaction?.emoji} {reaction?.text}
            </p>
          </motion.div>
        </div>

        {/* Decorative bottom */}
        <motion.div
          className="flex justify-center gap-2 mt-6 text-sm"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span>🌸</span>
          <span>✨</span>
          <span>💕</span>
          <span>✨</span>
          <span>🌸</span>
        </motion.div>
      </motion.div>

      {/* Floating hearts */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {sparkleHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute"
            style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              y: [0, -30, -60],
              x: [0, (Math.random() - 0.5) * 20],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              delay: heart.id * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="text-lg">
              {["💕", "💖", "💗", "✨", "⭐", "🌟", "🌸"][heart.id % 7]}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
