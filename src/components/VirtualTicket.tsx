"use client";

import { forwardRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Heart, TreePine, Sun, MapPin, Sparkles } from "lucide-react";

interface VirtualTicketProps {
  trailName: string;
  date: string;
  time: string;
  excitement: number;
}

const VirtualTicket = forwardRef<HTMLDivElement, VirtualTicketProps>(
  function VirtualTicket({ trailName, date, time, excitement }, ref) {
    const [rx, setRx] = useState(0);
    const [ry, setRy] = useState(0);
    const [hover, setHover] = useState(false);

    const formatDate = (d: string) => {
      if (!d) return "";
      try {
        return new Date(d + "T00:00:00").toLocaleDateString("de-DE", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
      } catch {
        return d;
      }
    };

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const el = e.currentTarget.getBoundingClientRect();
        const cx = el.left + el.width / 2;
        const cy = el.top + el.height / 2;
        const dx = (e.clientX - cx) / el.width;
        const dy = (e.clientY - cy) / el.height;
        setRy(dx * 12);
        setRx(-dy * 12);
      },
      []
    );

    const handleMouseEnter = useCallback(() => setHover(true), []);
    const handleMouseLeave = useCallback(() => {
      setHover(false);
      setRx(0);
      setRy(0);
    }, []);

    const tiltStyle = {
      transform: `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`,
      transition: hover ? "transform 0.08s ease-out" : "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
    };

    const holoGrad = `linear-gradient(
      ${135 + ry * 3}deg,
      rgba(255,255,255,0.15) 0%,
      rgba(251,191,36,0.12) 15%,
      rgba(110,231,183,0.12) 30%,
      rgba(56,189,248,0.12) 50%,
      rgba(196,181,253,0.12) 65%,
      rgba(251,113,133,0.12) 80%,
      rgba(255,255,255,0.15) 100%
    )`;

    const holoShine = `linear-gradient(
      ${45 + ry * 2}deg,
      rgba(255,255,255,0) 30%,
      rgba(255,255,255,0.5) 45%,
      rgba(255,255,255,0.8) 50%,
      rgba(255,255,255,0.5) 55%,
      rgba(255,255,255,0) 70%
    )`;

    return (
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ type: "spring", duration: 1.2 }}
          className="relative max-w-sm mx-auto"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Glowing aura */}
          <div
            className="absolute -inset-4 rounded-[2rem] blur-2xl transition-all duration-500"
            style={{
              background: `radial-gradient(ellipse at ${50 + ry * 10}% ${50 - rx * 10}%, rgba(251,191,36,0.25), rgba(16,185,129,0.15), transparent 70%)`,
              opacity: hover ? 0.8 : 0.4,
            }}
          />

          {/* Ticket */}
          <div
            id="ticket-inner"
            className="relative bg-gradient-to-br from-white via-amber-50/50 to-rose-50/30 backdrop-blur-sm rounded-[2rem] p-[2px] shadow-2xl"
            style={tiltStyle}
          >
            {/* Iridescent border glow */}
            <div
              className="absolute inset-0 rounded-[2rem] pointer-events-none z-20"
              style={{
                background: `linear-gradient(${135 + ry * 3}deg, rgba(251,191,36,0.4), rgba(110,231,183,0.3), rgba(56,189,248,0.3), rgba(196,181,253,0.3), rgba(251,113,133,0.3))`,
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMaskComposite: "xor",
                padding: "2px",
              }}
            />

            <div className="bg-white/95 rounded-[calc(2rem-2px)] p-6 md:p-8 overflow-hidden relative">
              {/* Holo shimmer overlay */}
              <div
                className="absolute inset-0 pointer-events-none rounded-[calc(2rem-2px)] z-10"
                style={{ background: holoGrad }}
              />
              {/* Holo shine sweep */}
              <div
                className="absolute inset-0 pointer-events-none rounded-[calc(2rem-2px)] z-10"
                style={{ background: holoShine }}
              />

              {/* Decorative corners */}
              <motion.div
                className="absolute top-3 left-3 text-xl md:text-2xl opacity-30 z-20"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >🌿</motion.div>
              <motion.div
                className="absolute top-3 right-3 text-xl md:text-2xl opacity-30 z-20"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >✨</motion.div>
              <motion.div
                className="absolute bottom-3 left-3 text-xl md:text-2xl opacity-30 z-20"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >🌸</motion.div>
              <motion.div
                className="absolute bottom-3 right-3 text-xl md:text-2xl opacity-30 z-20"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >🌙</motion.div>

              {/* Perforated edges */}
              <div className="absolute top-1/2 -left-3 w-6 h-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 rounded-full -translate-y-1/2 border border-amber-200/50 z-20" />
              <div className="absolute top-1/2 -right-3 w-6 h-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 rounded-full -translate-y-1/2 border border-amber-200/50 z-20" />

              {/* Decorative header stripe */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-300 via-emerald-400 via-teal-400 to-rose-300 z-20" />

              {/* Top sparkle row */}
              <div className="flex justify-center gap-1 mt-1 mb-4 relative z-20">
                {[0.3, 0.6, 0.9, 0.6, 0.3].map((opacity, i) => (
                  <motion.span
                    key={i}
                    className="text-xs"
                    animate={{ opacity: [opacity, opacity + 0.3, opacity] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    ✦
                  </motion.span>
                ))}
              </div>

              {/* Title */}
              <div className="text-center mb-4 relative z-20">
                <div className="flex justify-center gap-2 mb-2">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </motion.div>
                  <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
                  <TreePine className="w-5 h-5 text-emerald-500" />
                  <MapPin className="w-5 h-5 text-teal-500" />
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </motion.div>
                </div>
                <h3 className="font-display text-emerald-800 font-bold text-base md:text-lg tracking-wider uppercase">
                  ✦ Magisches Ticket ✦
                </h3>
                <p className="text-emerald-500 text-[10px] md:text-xs italic">
                  Gültig für ein märchenhaftes Abenteuer
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-2 my-3 md:my-4 relative z-20">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
                <span className="text-amber-400 text-xs">✧</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
              </div>

              {/* Details */}
              <div className="space-y-3 text-center relative z-20">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-[10px] text-emerald-500 uppercase tracking-[0.2em] font-semibold">
                    Expedition
                  </p>
                  <p className="text-base md:text-lg font-bold font-display text-emerald-800">
                    {trailName}
                  </p>
                </motion.div>

                <div className="flex justify-center gap-4 md:gap-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-[10px] text-emerald-500 uppercase tracking-[0.2em] font-semibold">
                      Datum
                    </p>
                    <p className="text-sm md:text-base font-semibold text-emerald-700">
                      {formatDate(date)}
                    </p>
                  </motion.div>
                  <div className="w-px bg-amber-200/50" />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <p className="text-[10px] text-emerald-500 uppercase tracking-[0.2em] font-semibold">
                      Uhrzeit
                    </p>
                    <p className="text-sm md:text-base font-semibold text-emerald-700">
                      {time} Uhr
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-2 my-3 md:my-4 relative z-20">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
                <span className="text-amber-400 text-xs">✧</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between relative z-20">
                <div className="flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[10px] md:text-[11px] text-emerald-600">
                    Aufregung: {excitement}/10
                  </span>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: Math.min(Math.ceil(excitement / 2), 5) }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-amber-400 text-xs"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      ⭐
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Barcode decoration */}
              <div className="mt-3 md:mt-4 flex justify-center gap-1 relative z-20">
                {[8, 4, 12, 3, 7, 5, 9, 4, 6, 10].map((width, i) => (
                  <motion.div
                    key={i}
                    className="h-5 md:h-6 bg-emerald-800/60 rounded-sm"
                    style={{ width }}
                    initial={{ height: 0 }}
                    animate={{ height: width > 7 ? 24 : 16 }}
                    transition={{ delay: 1 + i * 0.05 }}
                  />
                ))}
              </div>

              {/* Bottom sparkle row */}
              <div className="flex justify-center gap-1 mt-3 relative z-20">
                {[0.5, 0.3, 0.7, 0.4, 0.6].map((opacity, i) => (
                  <motion.span
                    key={i}
                    className="text-xs text-amber-400"
                    animate={{ opacity: [opacity, opacity + 0.4, opacity] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                  >
                    ✦
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
);

export default VirtualTicket;
