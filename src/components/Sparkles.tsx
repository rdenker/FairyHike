"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  type: "sparkle" | "heart" | "star" | "petal";
}

interface Drifter {
  id: number;
  emoji: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  size: number;
  duration: number;
  delay: number;
}

const colors = [
  "bg-yellow-200",
  "bg-pink-300",
  "bg-purple-300",
  "bg-teal-200",
  "bg-amber-200",
  "bg-rose-300",
];

export default function Sparkles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [drifters, setDrifters] = useState<Drifter[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    const types: Particle["type"][] = ["sparkle", "heart", "star", "petal"];
    for (let i = 0; i < 60; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 5 + 3,
        delay: Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)],
      });
    }
    setParticles(newParticles);

    const drifterEmojis = ["🦋", "🌙", "🌸", "🧚", "🌲", "🍄", "🦌", "⭐", "💫", "🌿"];
    const newDrifters: Drifter[] = drifterEmojis.map((emoji, i) => ({
      id: i,
      emoji,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      endX: Math.random() * 100,
      endY: Math.random() * 100,
      size: Math.random() * 16 + 20,
      duration: Math.random() * 30 + 40,
      delay: Math.random() * 20,
    }));
    setDrifters(newDrifters);
  }, []);

  const renderParticle = (p: Particle) => {
    const base = (
      <motion.div
        key={p.id}
        className={`absolute rounded-full ${p.color}`}
        style={{
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: p.size,
          height: p.size,
          boxShadow: `0 0 ${p.size * 3}px rgba(255, 223, 100, 0.4)`,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 0.8, 0],
          scale: [0, 1, 0.8, 0],
          y: [0, -20 - Math.random() * 30, -40 - Math.random() * 30],
          x: [0, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 40],
        }}
        transition={{
          duration: p.duration,
          delay: p.delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );

    if (p.type === "heart") {
      return (
        <motion.div
          key={p.id}
          className="absolute text-pink-300"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: p.size * 3,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0.6, 0],
            scale: [0, 1.2, 0.8, 0],
            y: [0, -30, -60],
          }}
          transition={{
            duration: p.duration + 1,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ❤
        </motion.div>
      );
    }

    if (p.type === "star") {
      return (
        <motion.div
          key={p.id}
          className="absolute text-amber-300"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: p.size * 2.5,
          }}
          initial={{ opacity: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 0.5, 0],
            rotate: [0, 90, 180],
            scale: [0, 1.2, 0.6, 0],
          }}
          transition={{
            duration: p.duration + 2,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✦
        </motion.div>
      );
    }

    if (p.type === "petal") {
      return (
        <motion.div
          key={p.id}
          className="absolute text-rose-200"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: p.size * 2,
          }}
          initial={{ opacity: 0, x: 0 }}
          animate={{
            opacity: [0, 0.8, 0.4, 0],
            y: [0, 50, 100],
            x: [0, (Math.random() - 0.5) * 60],
            rotate: [0, 30, -20, 10],
          }}
          transition={{
            duration: p.duration + 4,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🌸
        </motion.div>
      );
    }

    return base;
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep background drifters */}
      <div className="absolute inset-0 opacity-30">
        {drifters.map((d) => (
          <motion.div
            key={d.id}
            className="absolute"
            style={{
              left: `${d.startX}%`,
              top: `${d.startY}%`,
              fontSize: d.size,
            }}
            animate={{
              left: `${d.endX}%`,
              top: `${d.endY}%`,
              opacity: [0.15, 0.4, 0.15],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: d.duration,
              delay: d.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {d.emoji}
          </motion.div>
        ))}
      </div>

      {/* Foreground particles */}
      {particles.map(renderParticle)}
    </div>
  );
}
