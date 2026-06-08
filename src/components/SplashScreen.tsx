"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

const floatingEmojis = [
  { emoji: "🧚", x: 15, delay: 0 },
  { emoji: "🌟", x: 80, delay: 0.5 },
  { emoji: "🦋", x: 25, delay: 1 },
  { emoji: "🌙", x: 70, delay: 1.5 },
  { emoji: "🌸", x: 85, delay: 2 },
  { emoji: "✨", x: 10, delay: 2.5 },
  { emoji: "🦌", x: 90, delay: 3 },
  { emoji: "🍄", x: 50, delay: 3.5 },
];

const flavourTexts = [
  "✨ Du wurdest eingeladen...",
  "🌙 in eine Welt voller Zauber...",
  "🌸 wo die Bäume flüstern...",
  "🌟 und die Sterne tanzen...",
  "🦋 bereit für dein Abenteuer?",
];

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [showTap, setShowTap] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const textTimer = setInterval(() => {
      setTextIndex((i) => {
        if (i >= flavourTexts.length - 1) {
          clearInterval(textTimer);
          return i;
        }
        return i + 1;
      });
    }, 2400);

    const tapTimer = setTimeout(() => setShowTap(true), flavourTexts.length * 2400 + 500);

    return () => {
      clearInterval(textTimer);
      clearTimeout(tapTimer);
    };
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-indigo-950 via-purple-900 to-emerald-900 cursor-pointer"
      onClick={onComplete}
    >
      {/* Magic orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
      />

      {/* Stars background */}
      {isClient && Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
          transition={{
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 5,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Floating emojis */}
      {floatingEmojis.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl md:text-4xl"
          style={{ left: `${item.x}%` }}
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: [0, 0.6, 0.4, 0],
            y: [100, -50, -150, -250],
            x: [0, (Math.random() - 0.5) * 60],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Centre content */}
      <div className="text-center z-10 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          {/* Decorative top */}
          <motion.div
            className="flex justify-center gap-2 mb-8 text-2xl"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span>✦</span>
            <span>✧</span>
            <span>✦</span>
          </motion.div>

          {/* Animated flavour text */}
          <div className="h-40 md:h-48 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={textIndex}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.6 }}
                className="text-2xl md:text-4xl lg:text-5xl text-white/90 font-display leading-relaxed"
              >
                {flavourTexts[textIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Tap indicator */}
          <AnimatePresence>
            {showTap && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8"
              >
                <motion.p
                  className="text-white/40 text-sm tracking-widest uppercase"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✦ tippe irgendwo um zu beginnen ✦
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
