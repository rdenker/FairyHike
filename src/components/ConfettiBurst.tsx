"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const confettiEmojis = ["🎉", "✨", "🌟", "💚", "🌸", "⭐", "🎊", "💖", "🦋", "🌿"];

interface ConfettiPiece {
  id: number;
  emoji: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export default function ConfettiBurst() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const newPieces: ConfettiPiece[] = [];
    for (let i = 0; i < 40; i++) {
      const angle = (Math.PI * 2 * i) / 40 + (Math.random() - 0.5) * 0.5;
      const distance = 150 + Math.random() * 250;
      newPieces.push({
        id: i,
        emoji: confettiEmojis[i % confettiEmojis.length],
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 50,
        rotation: Math.random() * 720 - 360,
        scale: Math.random() * 0.6 + 0.4,
      });
    }
    setPieces(newPieces);
    const timer = setTimeout(() => setPieces([]), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {pieces.map((p) => (
          <motion.div
            key={p.id}
            className="absolute left-1/2 top-1/3 text-lg md:text-3xl"
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{
              x: p.x,
              y: p.y,
              opacity: [1, 0.8, 0],
              scale: [0.3, p.scale, p.scale * 0.5],
              rotate: p.rotation,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
