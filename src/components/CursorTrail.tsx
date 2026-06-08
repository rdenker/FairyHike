"use client";

import { useEffect, useRef, useCallback } from "react";

const emojis = ["✨", "🌸", "💚", "🌟", "🦋", "⭐"];
const MAX_TRAIL = 30;

interface TrailParticle {
  el: HTMLSpanElement;
  born: number;
}

export default function CursorTrail() {
  const particles = useRef<TrailParticle[]>([]);
  const raf = useRef<number>(0);
  const lastSpawn = useRef(0);

  const spawn = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastSpawn.current < 80) return;
    lastSpawn.current = now;

    const el = document.createElement("span");
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.cssText = `
      position: fixed; pointer-events: none; z-index: 9999;
      left: ${x}px; top: ${y}px; font-size: ${14 + Math.random() * 10}px;
      transform: translate(-50%, -50%);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    `;
    document.body.appendChild(el);

    particles.current.push({ el, born: now });

    // Spawn a second smaller sparkle offset slightly
    if (Math.random() > 0.5) {
      const el2 = document.createElement("span");
      el2.textContent = "✦";
      el2.style.cssText = `
        position: fixed; pointer-events: none; z-index: 9999;
        left: ${x + (Math.random() - 0.5) * 20}px;
        top: ${y + (Math.random() - 0.5) * 20}px;
        font-size: 10px; color: #a7f3d0;
        transform: translate(-50%, -50%);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
      `;
      document.body.appendChild(el2);
      particles.current.push({ el: el2, born: now });
    }

    // Cleanup excess
    while (particles.current.length > MAX_TRAIL) {
      const old = particles.current.shift()!;
      old.el.remove();
    }
  }, []);

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;

    let running = true;

    const onMove = (e: MouseEvent) => spawn(e.clientX, e.clientY);

    const tick = () => {
      if (!running) return;
      const now = Date.now();
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        const age = now - p.born;
        if (age > 800) {
          p.el.remove();
          particles.current.splice(i, 1);
        } else {
          const progress = age / 800;
          const driftY = -30 * progress;
          const driftX = (Math.random() - 0.5) * 20 * progress;
          p.el.style.opacity = String(1 - progress);
          p.el.style.transform = `translate(calc(-50% + ${driftX}px), calc(-50% + ${driftY}px)) scale(${1 - progress * 0.5})`;
        }
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      particles.current.forEach((p) => p.el.remove());
      particles.current = [];
    };
  }, [spawn]);

  return null;
}
