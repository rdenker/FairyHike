"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const burstEmojis = ["✨", "🌸", "💚", "⭐", "🦋", "🌟"];

interface BurstParticle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  rotation: number;
}

interface ClickBurstProps {
  trigger: number;
  x: number;
  y: number;
}

export default function ClickBurst({ trigger, x, y }: ClickBurstProps) {
  const [items, setItems] = useState<BurstParticle[]>([]);

  useEffect(() => {
    if (trigger === 0) return;
    const newItems: BurstParticle[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI * 2 * i) / 6 + (Math.random() - 0.5) * 0.8;
      const dist = 30 + Math.random() * 40;
      newItems.push({
        id: Date.now() + i,
        emoji: burstEmojis[i % burstEmojis.length],
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist - 20,
        rotation: Math.random() * 360 - 180,
      });
    }
    setItems(newItems);
    const timer = setTimeout(() => setItems([]), 800);
    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50" style={{ left: x, top: y }}>
      <AnimatePresence>
        {items.map((p) => (
          <motion.div
            key={p.id}
            className="absolute text-lg"
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{ x: p.x, y: p.y, opacity: 0, scale: [0.3, 1, 0.5], rotate: p.rotation }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
