"use client";

import { motion } from "framer-motion";

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Fairy glowing background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-emerald-900/5 to-amber-900/10" />

      {/* Large glowing orbs */}
      <motion.div
        className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-purple-400/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-pink-400/5 blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Floating fairy emojis */}
      <motion.div
        className="absolute top-16 left-[15%] text-5xl"
        animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        🧚
      </motion.div>
      <motion.div
        className="absolute top-24 right-[18%] text-4xl"
        animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        🌟
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-[12%] text-4xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        🦌
      </motion.div>
      <motion.div
        className="absolute top-[30%] right-[10%] text-3xl"
        animate={{ y: [0, 8, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        🦉
      </motion.div>
      <motion.div
        className="absolute bottom-[25%] right-[22%] text-5xl"
        animate={{ y: [0, -7, 0], rotate: [0, -5, 5, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        🦋
      </motion.div>
      <motion.div
        className="absolute bottom-[15%] left-[22%] text-4xl"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      >
        🐿️
      </motion.div>

      {/* Main content */}
      <div className="text-center z-10 px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        >
          {/* Decorative top */}
          <motion.div
            className="flex justify-center gap-3 mb-6 text-3xl"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span>✨</span>
            <span>🌙</span>
            <span>✨</span>
            <span>🌟</span>
            <span>✨</span>
          </motion.div>

          {/* Title - fairy style */}
          <div className="relative">
            <motion.div
              className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              👑
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-emerald-800 mb-2 leading-tight">
              Ein
              <motion.span
                className="bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent block md:inline"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: "200% auto" }}
              >
                märchenhafter
              </motion.span>
              {" "}Waldspaziergang
            </h1>
            <div className="flex justify-center gap-2 mt-2">
              <motion.span className="text-2xl" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>🌲</motion.span>
              <motion.span className="text-2xl" animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>🌳</motion.span>
              <motion.span className="text-2xl" animate={{ y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>🌲</motion.span>
            </div>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 my-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
            <span className="text-2xl">💚</span>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
          </div>

          <p className="text-lg md:text-xl text-emerald-700 mb-10 max-w-2xl mx-auto leading-relaxed font-light italic">
            &ldquo;Falls du jemals Träume von goldenen Sonnenuntergängen,
            flüsternden Wäldern und magischen Pfaden hattest&hellip;
            <br />
            <span className="not-italic font-normal">Ich hab da eine Idee für ein kleines Abenteuer.&rdquo;</span>
          </p>

          {/* Button with fairy styling */}
          <motion.button
            onClick={onStart}
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />

            {/* Button */}
            <div className="relative bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white px-12 py-5 rounded-full text-xl font-semibold shadow-2xl flex items-center gap-3 transition-all">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🪄
              </motion.span>
              Entdecke den Weg
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                💚
              </motion.span>
            </div>
          </motion.button>

          {/* Bottom decoration */}
          <motion.div
            className="flex justify-center gap-4 mt-10 text-2xl"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span>🍃</span>
            <span>🌙</span>
            <span>⭐</span>
            <span>🌸</span>
            <span>🍃</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
