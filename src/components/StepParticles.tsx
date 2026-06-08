"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const particles = ["✨", "🌸", "🦋", "🌟", "💚", "🧚", "🌙", "⭐", "💫"];

interface Particle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  rotation: number;
}

export default function StepParticles({ trigger }: { trigger: number }) {
  const [items, setItems] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      emoji: particles[Math.floor(Math.random() * particles.length)],
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      rotation: Math.random() * 720 - 360,
    }));
    setItems(newParticles);
    const timer = setTimeout(() => setItems([]), 1000);
    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {items.map((p) => (
          <motion.div
            key={p.id}
            className="absolute left-1/2 top-1/2 text-xl md:text-3xl"
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{
              x: p.x,
              y: p.y,
              opacity: 0,
              scale: [0.3, 1.2, 0.8],
              rotate: p.rotation,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
