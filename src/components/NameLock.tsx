"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, KeyRound } from "lucide-react";

interface NameLockProps {
  onUnlock: () => void;
}

export default function NameLock({ onUnlock }: NameLockProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  const expectedName = (
    process.env.NEXT_PUBLIC_ANNABEL_NAME || "Annabell"
  ).toLowerCase();

  const handleSubmit = () => {
    const cleanName = name.trim().toLowerCase();

    if (!cleanName) {
      setError("Bitte gib deinen Namen ein 🌸");
      triggerShake();
      return;
    }

    if (cleanName === expectedName || cleanName === "annabel" || cleanName === "annabell") {
      setUnlocking(true);
      setTimeout(onUnlock, 1500);
    } else {
      setError("Hmm... das ist nicht der Name, den ich erwartet habe 🌸");
      triggerShake();
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-emerald-950 via-teal-900 to-emerald-900">
      {/* Magical background */}
      <motion.div
        className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-amber-500/5"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Floating sparkles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
          transition={{
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 4,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Lock icon */}
      <motion.div
        className="absolute top-1/4 left-1/3 text-6xl opacity-10"
        animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        🔒
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 right-1/4 text-5xl opacity-10"
        animate={{ y: [0, 8, 0], rotate: [0, -5, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      >
        🗝️
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={shake ? { x: [-10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-sm mx-4"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-[2rem] p-8 border border-white/20 shadow-2xl">
          {/* Decorative top */}
          <div className="flex justify-center gap-1 mb-6">
            {["🌿", "✨", "🌿"].map((e, i) => (
              <motion.span
                key={i}
                className="text-lg"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                {e}
              </motion.span>
            ))}
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            {unlocking ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <KeyRound className="w-12 h-12 text-amber-300" />
              </motion.div>
            ) : (
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Lock className="w-12 h-12 text-emerald-300" />
              </motion.div>
            )}
          </div>

          <h2 className="text-2xl font-display text-white text-center mb-2">
            Willkommen, liebe Fee
          </h2>
          <p className="text-emerald-200/80 text-center text-sm mb-8 font-light">
            Wie lautet dein Name, damit die Magie dich erkennt?
          </p>

          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Dein Name..."
            disabled={unlocking}
            className="w-full px-4 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:scale-[1.01] focus:shadow-lg focus:shadow-emerald-400/20 text-center text-lg transition-all duration-300 disabled:opacity-50"
          />

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-rose-300 text-sm text-center mt-3"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            onClick={handleSubmit}
            disabled={unlocking}
            className="w-full mt-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {unlocking ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ✨
                </motion.span>
                Tor öffnet sich...
              </span>
            ) : (
              "Eintreten"
            )}
          </motion.button>

          {/* Bottom decoration */}
          <div className="flex justify-center gap-1 mt-6">
            {["🌸", "✨", "🌸"].map((e, i) => (
              <motion.span
                key={i}
                className="text-lg opacity-40"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                {e}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
