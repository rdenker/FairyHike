"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronRight, ChevronLeft, Send } from "lucide-react";
import SparklesBg from "@/components/Sparkles";
import StepParticles from "@/components/StepParticles";
import ConfettiBurst from "@/components/ConfettiBurst";
import ClickBurst from "@/components/ClickBurst";
import SplashScreen from "@/components/SplashScreen";
import NameLock from "@/components/NameLock";
import WelcomeScreen from "@/components/WelcomeScreen";
import TrailCard from "@/components/TrailCard";
import DatePicker from "@/components/DatePicker";
import Moodboard from "@/components/Moodboard";
import VirtualTicket from "@/components/VirtualTicket";
import ExportTicket from "@/components/ExportTicket";
import LoadingSpinner from "@/components/LoadingSpinner";
import { trails } from "@/data/trails";
import { Trail } from "@/types";

const steps = [
  { emoji: "👋", label: "Start" },
  { emoji: "🗺️", label: "Weg" },
  { emoji: "📅", label: "Zeit" },
  { emoji: "💖", label: "Stimmung" },
  { emoji: "🎟️", label: "Ticket" },
];

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    y: 40,
    opacity: 0,
    scale: 0.7,
    rotate: direction > 0 ? 8 : -8,
  }),
  center: {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    y: -40,
    opacity: 0,
    scale: 0.7,
    rotate: direction < 0 ? 8 : -8,
  }),
};

const staggerContainer = {
  hidden: { opacity: 1 },
  show: {
    transition: { staggerChildren: 0.1 },
  },
} satisfies Variants;

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120, damping: 26 } },
} satisfies Variants;

const cardItem = {
  hidden: { opacity: 0, y: 50, scale: 0.85 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 160, damping: 24 } },
} satisfies Variants;

export default function Home() {
  const [phase, setPhase] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [altDate, setAltDate] = useState("");
  const [altTime, setAltTime] = useState("");
  const [excitement, setExcitement] = useState(5);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const ticketRef = useRef<HTMLDivElement | null>(null);
  const [burstKey, setBurstKey] = useState(0);
  const [burstPos, setBurstPos] = useState({ x: 0, y: 0 });

  const fireBurst = useCallback((e: React.MouseEvent) => {
    setBurstPos({ x: e.clientX, y: e.clientY });
    setBurstKey((k) => k + 1);
  }, []);

  // Phase mapping:
  // 0 = SplashScreen
  // 1 = NameLock
  // 2 = WelcomeScreen
  // 3 = Trail Selection
  // 4 = Date Picker
  // 5 = Moodboard
  // 6 = Ticket + Submit
  // After submit: loading spinner → success

  const handleNext = () => {
    setDirection(1);
    if (phase < 6) setPhase(phase + 1);
  };

  const handlePrev = () => {
    setDirection(-1);
    if (phase > 2) setPhase(phase - 1);
  };

  const handleSubmit = async () => {
    if (!selectedTrail) return;

    setShowLoader(true);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trailId: selectedTrail.id,
          trailName: selectedTrail.name,
          date,
          time,
          altDate,
          altTime,
          excitement,
          notes,
        }),
      });

      if (res.ok) {
        // Loading spinner will call onComplete → setIsSubmitted
        // onComplete is handled in the LoadingSpinner
      }
    } catch (err) {
      console.error("Failed to submit", err);
      setIsSubmitting(false);
      setShowLoader(false);
    }
  };

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setIsSubmitting(false);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const canProceed = () => {
    if (phase === 3) return selectedTrail !== null;
    if (phase === 4) return !!date && !!time;
    return true;
  };

  const flowStep = phase - 2; // 0-indexed for progress bar (starts at welcome)

  // Splash screen
  if (phase === 0) {
    return <SplashScreen onComplete={() => setPhase(1)} />;
  }

  // Name lock
  if (phase === 1) {
    return <NameLock onUnlock={() => setPhase(2)} />;
  }

  // Welcome screen (no progress bar)
  if (phase === 2) {
    return (
      <>
        <SparklesBg />
        <WelcomeScreen onStart={() => { setDirection(1); setPhase(3); }} />
      </>
    );
  }

  // Success screen
  if (isSubmitted) {
    return (
      <>
        <SparklesBg />
        <ConfettiBurst />
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-lg"
          >
            <div className="flex justify-center gap-2 mb-4 text-3xl">
              <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>🎉</motion.span>
              <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}>✨</motion.span>
              <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}>🌟</motion.span>
              <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}>🎉</motion.span>
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-bold text-emerald-800 mb-4">
              Es ist ein Date! 🎉
            </h1>
            <p className="text-base md:text-lg text-emerald-700 mb-8 leading-relaxed max-w-md mx-auto">
              Ich freu mich riesig auf unser kleines Abenteuer! Es wird bestimmt zauberhaft 🎉
            </p>

            {selectedTrail && date && time && (
              <>
                <motion.div
                  initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
                  animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 80, damping: 14, mass: 1.2 }}
                  style={{ perspective: "1200px" }}
                >
                  <VirtualTicket
                    ref={ticketRef}
                    trailName={selectedTrail.name}
                    date={date}
                    time={time}
                    excitement={excitement}
                  />
                </motion.div>
                <div className="mt-4">
                  <ExportTicket ticketRef={ticketRef} />
                </div>
              </>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-8 md:mt-10 space-y-2"
            >
              <p className="text-emerald-600 italic font-light text-sm md:text-base">
                &ldquo;Pack schon mal deine Wanderschuhe ein...&rdquo;
              </p>
              <motion.div
                className="flex justify-center gap-2 text-xl md:text-2xl"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span>🌲</span>
                <span>✨</span>
                <span>🏔️</span>
                <span>✨</span>
                <span>🌲</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <SparklesBg />
      <StepParticles trigger={phase} />
      {burstKey > 0 && <ClickBurst trigger={burstKey} x={burstPos.x} y={burstPos.y} />}

      <div className="min-h-screen py-6 md:py-8 px-4 pb-28">
        {/* Progress bar - only from trail selection onward */}
        {phase >= 3 && (
          <div className="max-w-xl mx-auto mb-6 md:mb-8 mt-2 md:mt-4">
            <div className="flex items-center justify-between mb-3 relative">
              <div className="absolute top-1/2 left-6 right-6 h-px bg-gradient-to-r from-emerald-200 via-amber-200 to-emerald-200 -translate-y-1/2 z-0" />

              {steps.map((s, i) => {
                const stepNum = i + 1;
                const currentFlowStep = flowStep;
                const isActive = currentFlowStep >= stepNum;
                const isCurrent = currentFlowStep === stepNum;
                return (
                  <div key={stepNum} className="flex flex-col items-center z-10 relative">
                    {isCurrent && (
                      <motion.span
                        className="absolute inset-0 rounded-full ring-2 ring-amber-300"
                        initial={{ scale: 0.8, opacity: 0.6 }}
                        animate={{ scale: 1.8, opacity: 0 }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                    <motion.div
                      className={`relative w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold ${
                        isActive
                          ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md shadow-emerald-300/50"
                          : "bg-white/60 text-emerald-400 border border-emerald-200"
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {isActive && stepNum < currentFlowStep ? "✓" : s.emoji}
                    </motion.div>
                    <span className={`text-[9px] md:text-[10px] mt-1 font-medium ${isActive ? "text-emerald-700" : "text-emerald-400"}`}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="h-1 md:h-1.5 bg-white/60 rounded-full overflow-hidden shadow-inner relative">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${((flowStep - 1) / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 text-sm pointer-events-none"
                initial={{ left: "0%" }}
                animate={{ left: `${((flowStep - 1) / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ marginLeft: -14 }}
              >
                <motion.span
                  animate={{ y: [0, -4, 0], rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  🧚
                </motion.span>
              </motion.div>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={phase}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 32,
                mass: 1.2,
              }}
            >
              {phase === 3 && (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div variants={fadeUpItem} className="text-center mb-6 md:mb-8">
                    <div className="flex justify-center gap-2 text-xl md:text-2xl mb-2">
                      <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }}>🏔️</motion.span>
                      <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>🌲</motion.span>
                      <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>🌳</motion.span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-display font-bold text-emerald-800 mb-2 px-2">
                      Wähle dein Abenteuer
                    </h2>
                    <p className="text-emerald-600 font-light italic text-sm md:text-base">
                      Jeder Pfad hat seinen eigenen Zauber...
                    </p>
                  </motion.div>
                  <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {trails.map((trail) => (
                      <motion.div key={trail.id} variants={cardItem}>
                        <TrailCard
                          trail={trail}
                          isSelected={selectedTrail?.id === trail.id}
                          onSelect={() => setSelectedTrail(trail)}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {phase === 4 && (
                <div className="max-w-lg mx-auto">
                  <div className="text-center mb-6">
                    <div className="flex justify-center gap-2 text-xl md:text-2xl mb-2">
                      <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>📅</motion.span>
                      <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}>🌙</motion.span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-display font-bold text-emerald-800 mb-2 px-2">
                      Wann soll die Reise losgehen?
                    </h2>
                    <p className="text-emerald-600 font-light italic text-sm md:text-base">
                      Wähle einen Tag, der sich nach Magie anfühlt...
                    </p>
                  </div>
                  <DatePicker
                    date={date}
                    time={time}
                    altDate={altDate}
                    altTime={altTime}
                    onDateChange={setDate}
                    onTimeChange={setTime}
                    onAltDateChange={setAltDate}
                    onAltTimeChange={setAltTime}
                  />
                </div>
              )}

              {phase === 5 && (
                <Moodboard
                  excitement={excitement}
                  onExcitementChange={setExcitement}
                />
              )}

              {phase === 6 && selectedTrail && date && time && (
                showLoader ? (
                  <LoadingSpinner onComplete={handleLoaderComplete} />
                ) : (
                  <div>
                    <div className="text-center mb-6">
                      <div className="flex justify-center gap-2 text-xl md:text-2xl mb-2">
                        <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>🎟️</motion.span>
                        <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}>✨</motion.span>
                      </div>
                      <h2 className="text-2xl md:text-4xl font-display font-bold text-emerald-800 mb-2 px-2">
                        Dein magisches Ticket
                      </h2>
                      <p className="text-emerald-600 font-light italic text-sm md:text-base">
                        Alles bereit für unser Abenteuer?
                      </p>
                    </div>

                    <VirtualTicket
                      ref={ticketRef}
                      trailName={selectedTrail.name}
                      date={date}
                      time={time}
                      excitement={excitement}
                    />

                    <div className="max-w-md mx-auto mt-6 md:mt-8">
                      <label className="block text-sm font-medium text-emerald-700 mb-2 text-center">
                        Lust, mir noch was zu sagen? ✨
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Was denkst du über unsere Pläne?..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-2xl border border-emerald-200 bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:scale-[1.01] focus:shadow-lg focus:shadow-emerald-200/50 text-emerald-800 resize-none placeholder:text-emerald-300 text-sm transition-all duration-300"
                      />
                    </div>
                  </div>
                )
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        {!showLoader && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/90 to-transparent py-3 md:py-4 px-4 z-20">
          <div className="max-w-xl mx-auto flex justify-between items-center">
            <motion.button
              onClick={handlePrev}
              className="flex items-center gap-1 md:gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-full text-emerald-600 hover:bg-emerald-50 transition-all text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              Zurück
            </motion.button>

            {phase < 6 ? (
              <motion.button
                onClick={(e) => { fireBurst(e); handleNext(); }}
                disabled={!canProceed()}
                className={`flex items-center gap-1 md:gap-2 px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-lg font-semibold transition-all ${
                  canProceed()
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-300/30 hover:shadow-xl"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                whileHover={canProceed() ? { scale: 1.05 } : {}}
                whileTap={canProceed() ? { scale: 0.95 } : {}}
              >
                {phase === 5 ? "Zum Ticket" : "Weiter"}
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </motion.button>
            ) : (
              <motion.button
                onClick={(e) => { fireBurst(e); handleSubmit(); }}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 md:px-10 py-2.5 md:py-3 rounded-full text-sm md:text-lg font-semibold bg-gradient-to-r from-rose-400 via-pink-500 to-rose-500 text-white shadow-lg shadow-rose-300/30 hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  "Wird gesendet..."
                ) : (
                  <>
                    Abschicken
                    <Send className="w-4 h-4 md:w-5 md:h-5" />
                    <motion.span
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      💚
                    </motion.span>
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>
        )}
      </div>
    </>
  );
}
