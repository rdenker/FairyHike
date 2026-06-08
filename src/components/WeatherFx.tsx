"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface WeatherFxProps {
  weatherCode: number;
}

interface Particle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

export default function WeatherFx({ weatherCode }: WeatherFxProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const isRain = weatherCode >= 51 && weatherCode <= 82;
  const isSnow = weatherCode >= 71 && weatherCode <= 77;
  const isSun = weatherCode === 0 || weatherCode === 1;

  useEffect(() => {
    const count = isRain ? 8 : isSnow ? 6 : isSun ? 5 : 0;
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2,
        size: 10 + Math.random() * 8,
      });
    }
    setParticles(newParticles);
  }, [weatherCode, isRain, isSnow, isSun]);

  if (!isRain && !isSnow && !isSun) return null;

  const emoji = isRain ? "💧" : isSnow ? "❄️" : "☀️";

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: -20,
            fontSize: p.size,
            opacity: isSun ? 0.4 : 0.6,
          }}
          animate={
            isRain || isSnow
              ? { y: [0, 260], opacity: [0.6, 0.8, 0], x: [0, (Math.random() - 0.5) * 30] }
              : { opacity: [0, 0.4, 0], scale: [0.5, 1, 0.5], y: [0, -10, 0] }
          }
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeIn",
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
}
