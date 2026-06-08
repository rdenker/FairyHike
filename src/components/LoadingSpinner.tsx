"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingSpinnerProps {
  onComplete: () => void;
}

const messages = [
  "Sternenstaub wird aufgetragen...",
  "Waldweg wird gepflastert...",
  "Glückspilze werden gesammelt...",
  "Ticket wird geschrieben...",
  "Abendstimmung wird gezaubert...",
  "Feenstaub wird verstreut...",
  "Wanderweg wird markiert...",
  "Zauber wird gewirkt...",
  "Katzen werden gekrault...",
  "Ameisenbären werden gestreichelt...",
  "Alles wird bereit gemacht...",
  "Fertig! 🎉",
];

const MSG_DISPLAY_MS = 2000;
const PROGRESS_INTERVAL = 30;

export default function LoadingSpinner({ onComplete }: LoadingSpinnerProps) {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const msgCount = messages.length - 1;
    const totalDuration = msgCount * MSG_DISPLAY_MS;
    const step = 100 / (totalDuration / PROGRESS_INTERVAL);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + step, 100);
        return next;
      });
    }, PROGRESS_INTERVAL);

    const msgTimer = setInterval(() => {
      setMsgIndex((prev) => {
        const next = prev + 1;
        if (next >= messages.length - 1) {
          clearInterval(msgTimer);
          return messages.length - 1;
        }
        return next;
      });
    }, MSG_DISPLAY_MS);

    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(onComplete, 600);
    }, totalDuration + 600);

    return () => {
      clearInterval(timer);
      clearInterval(msgTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="w-full flex items-center justify-center py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isComplete ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-sm mx-auto bg-white/70 backdrop-blur-md rounded-3xl p-8 border border-emerald-200/40 shadow-lg"
      >
        {/* Cute spinner */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 border-4 border-emerald-500/20 rounded-full"
            style={{ borderTopColor: "rgba(52, 211, 153, 0.8)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          {/* Middle ring */}
          <motion.div
            className="absolute inset-2 border-4 border-amber-400/20 rounded-full"
            style={{ borderTopColor: "rgba(251, 191, 36, 0.6)" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          {/* Inner ring */}
          <motion.div
            className="absolute inset-4 border-4 border-rose-400/20 rounded-full"
            style={{ borderTopColor: "rgba(251, 113, 133, 0.6)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="text-3xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🧚
            </motion.span>
          </div>
        </div>

        {/* Animated message */}
        <div className="h-12 mb-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-emerald-800 text-lg font-display"
            >
              {messages[msgIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-64 mx-auto">
          <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-emerald-500/70 text-sm mt-2 font-mono">
            {Math.round(progress)}%
          </p>
        </div>

        {/* Decorative bottom */}
        <motion.div
          className="flex justify-center gap-2 mt-6 text-lg"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>✨</span>
          <span>🌸</span>
          <span>✨</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
